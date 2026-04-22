import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import morgan from "morgan";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "toeic-secret-key-123";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Database setup
  const db = new Database("toeic.db");
  db.pragma("journal_mode = WAL");

  // Initialize schema
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      level TEXT DEFAULT 'Beginner',
      points INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      level TEXT,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS modules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      title TEXT NOT NULL,
      order_index INTEGER,
      FOREIGN KEY(course_id) REFERENCES courses(id)
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      module_id INTEGER,
      title TEXT NOT NULL,
      content TEXT,
      type TEXT, -- 'video', 'reading', 'quiz'
      order_index INTEGER,
      FOREIGN KEY(module_id) REFERENCES modules(id)
    );

    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT, -- 'listening', 'reading', 'grammar', 'vocabulary'
      part INTEGER, -- TOEIC Part 1-7
      image_url TEXT,
      audio_url TEXT,
      text TEXT,
      option_a TEXT,
      option_b TEXT,
      option_c TEXT,
      option_d TEXT,
      correct_answer TEXT,
      explanation TEXT
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      user_id INTEGER,
      lesson_id INTEGER,
      completed BOOLEAN DEFAULT 0,
      score INTEGER,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(user_id, lesson_id),
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(lesson_id) REFERENCES lessons(id)
    );

    CREATE TABLE IF NOT EXISTS test_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      score_listening INTEGER,
      score_reading INTEGER,
      total_score INTEGER,
      duration_seconds INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  // Seed sample data if empty
  const userCount = db.prepare("SELECT count(*) as count FROM users").get() as { count: number };
  if (userCount.count === 0) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    db.prepare("INSERT INTO users (name, email, password, level) VALUES (?, ?, ?, ?)").run(
      "Demo Student",
      "student@example.com",
      hashedPassword,
      "Intermediate"
    );

    // Initial Courses
    const courseId = db.prepare("INSERT INTO courses (title, description, level, image) VALUES (?, ?, ?, ?)").run(
      "TOEIC Mastery 750+",
      "Comprehensive guide to achieve 750+ scores focused on strategic reading and advanced listening techniques.",
      "Intermediate",
      "https://picsum.photos/seed/toeic1/800/600"
    ).lastInsertRowid;

    const modId = db.prepare("INSERT INTO modules (course_id, title, order_index) VALUES (?, ?, ?)").run(
      courseId,
      "Part 5: Incomplete Sentences",
      1
    ).lastInsertRowid;

    db.prepare("INSERT INTO lessons (module_id, title, content, type, order_index) VALUES (?, ?, ?, ?, ?)").run(
      modId,
      "Grammar: Verb Tenses",
      "Learn the most common verb tenses tested in TOEIC Part 5. Focus on progressive and perfect tenses.",
      "reading",
      1
    );

    // Initial Questions
    db.prepare(`INSERT INTO questions (type, part, text, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
      "grammar",
      5,
      "The marketing director _______ the final proposal before the meeting started yesterday.",
      "reviews",
      "is reviewing",
      "had reviewed",
      "will review",
      "C",
      "Past perfect tense (had reviewed) is used because the action was completed before another past action (the meeting started)."
    );
  }

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  // Auth Routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, hashedPassword);
      const token = jwt.sign({ id: result.lastInsertRowid }, JWT_SECRET);
      res.json({ token, user: { id: result.lastInsertRowid, name, email, level: 'Beginner' } });
    } catch (error) {
      res.status(400).json({ error: "Email already exists or invalid data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, level: user.level, points: user.points } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Data Routes
  app.get("/api/dashboard", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(authHeader.split(" ")[1], JWT_SECRET) as any;
      const user = db.prepare("SELECT id, name, email, level, points FROM users WHERE id = ?").get(decoded.id) as any;
      const progress = db.prepare("SELECT count(*) as count FROM user_progress WHERE user_id = ? AND completed = 1").get(decoded.id) as any;
      const recentTests = db.prepare("SELECT * FROM test_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").all(decoded.id);
      
      res.json({
        user,
        completedLessons: progress.count,
        recentTests,
        streak: 5, // Mock streak
        dailyGoal: 75
      });
    } catch (e) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.get("/api/courses", (req, res) => {
    const courses = db.prepare("SELECT * FROM courses").all();
    res.json(courses);
  });

  app.get("/api/practice/questions", (req, res) => {
    const questions = db.prepare("SELECT * FROM questions ORDER BY RANDOM() LIMIT 10").all();
    res.json(questions);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
