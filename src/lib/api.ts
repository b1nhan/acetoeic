const DEFAULT_VOCABULARY = [
  { id: 1, word: "Commitment", pronunciation: "/kəˈmɪtmənt/", meaning: "Sự cam kết, tận tụy", example: "Our company has a strong commitment to quality." },
  { id: 2, word: "Negotiate", pronunciation: "/nəˈɡoʊʃieɪt/", meaning: "Đàm phán, thương lượng", example: "We need to negotiate the terms of the contract." },
  { id: 3, word: "Implementation", pronunciation: "/ˌɪmplɪmenˈteɪʃn/", meaning: "Sự triển khai, thực hiện", example: "The implementation of the new policy will start next week." },
  { id: 4, word: "Innovative", pronunciation: "/ˈɪnəveɪtɪv/", meaning: "Sáng tạo, đổi mới", example: "The company is known for its innovative products." },
  { id: 5, word: "Proficiency", pronunciation: "/prəˈfɪʃnsi/", meaning: "Sự thông thạo, thành thạo", example: "She has high proficiency in English." },
];

const DEFAULT_QUIZ = [
  { 
    id: 1, 
    question: "The team is working _______ to finish the project on time.", 
    answers: ["hardly", "hard", "harder", "hardness"], 
    correct_answer: "hard" 
  },
  { 
    id: 2, 
    question: "I would like to _______ an appointment with Dr. Smith.", 
    answers: ["make", "do", "take", "give"], 
    correct_answer: "make" 
  },
  { 
    id: 3, 
    question: "The new marketing strategy was _______ successful.", 
    answers: ["height", "highly", "high", "highest"], 
    correct_answer: "highly" 
  },
  { 
    id: 4, 
    question: "Please _______ the attached document for more details.", 
    answers: ["refer", "look", "see", "read"], 
    correct_answer: "refer" 
  },
  { 
    id: 5, 
    question: "They have decided to _______ the meeting until next Friday.", 
    answers: ["put off", "call off", "take off", "go off"], 
    correct_answer: "put off" 
  },
];

const MOCK_USER = {
  id: 1,
  name: "Người dùng Thử nghiệm",
  email: "user@test.com",
  level: "Trung cấp",
  points: 1250,
  role: "user" as const
};

const MOCK_ADMIN = {
  id: 2,
  name: "Quản trị viên",
  email: "admin@test.com",
  level: "Nâng cao",
  points: 9999,
  role: "admin" as const
};

const MOCK_COURSES = [
  {
    id: 1,
    title: "Chinh phục TOEIC 750+",
    description: "Hướng dẫn toàn diện để đạt điểm 750+ tập trung vào kỹ năng đọc chiến thuật và kỹ thuật nghe nâng cao.",
    level: "Trung cấp",
    image: "https://picsum.photos/seed/toeic1/800/600"
  },
  {
    id: 2,
    title: "Nền tảng Tiếng Anh cho TOEIC",
    description: "Hoàn hảo cho người mới bắt đầu muốn xây dựng nền tảng ngữ pháp và từ vựng vững chắc cho kỳ thi TOEIC.",
    level: "Cơ bản",
    image: "https://picsum.photos/seed/toeic2/800/600"
  },
  {
    id: 3,
    title: "Chiến lược Đọc hiểu Nâng cao",
    description: "Làm chủ Part 7 với các kỹ thuật skimming và scanning nâng cao để đạt tốc độ và độ chính xác tối đa.",
    level: "Nâng cao",
    image: "https://picsum.photos/seed/toeic3/800/600"
  }
];

export const api = {
  auth: {
    login: async (credentials: any) => {
      // Mock validation for specific accounts
      if (credentials.email === "admin@test.com" && credentials.password === "123456") {
        return { token: "mock-admin-token", user: MOCK_ADMIN };
      }
      if (credentials.email === "user@test.com" && credentials.password === "123456") {
        return { token: "mock-user-token", user: MOCK_USER };
      }
      
      // Fallback for others (allow generic login for demo)
      return { 
        token: "mock-token", 
        user: { ...MOCK_USER, email: credentials.email, name: credentials.email.split('@')[0] } 
      };
    },
    signup: async (data: any) => {
      return { token: "mock-token", user: { ...MOCK_USER, name: data.name, email: data.email } };
    },
  },
  dashboard: {
    get: async () => {
      return {
        user: MOCK_USER,
        completedLessons: 12,
        recentTests: [
          { id: 1, total_score: 720, created_at: new Date().toISOString() },
          { id: 2, total_score: 680, created_at: new Date(Date.now() - 86400000 * 2).toISOString() }
        ],
        streak: 5,
        dailyGoal: 75
      };
    },
  },
  courses: {
    list: async () => {
      return MOCK_COURSES;
    },
  },
  practice: {
    questions: async () => {
      return Array(5).fill([]).flat().slice(0, 10); // Not used for new trac-nghiem but kept for compatibility
    },
  },
  vocabulary: {
    list: async () => {
      const stored = localStorage.getItem("vocab_data");
      return stored ? JSON.parse(stored) : DEFAULT_VOCABULARY;
    },
    save: async (data: any) => {
      localStorage.setItem("vocab_data", JSON.stringify(data));
      return { success: true };
    }
  },
  quiz: {
    list: async () => {
      const stored = localStorage.getItem("quiz_data");
      return stored ? JSON.parse(stored) : DEFAULT_QUIZ;
    },
    save: async (data: any) => {
      localStorage.setItem("quiz_data", JSON.stringify(data));
      return { success: true };
    }
  }
};
