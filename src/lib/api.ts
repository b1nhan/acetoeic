const MOCK_USER = {
  id: 1,
  name: "Demo Student",
  email: "student@example.com",
  level: "Intermediate",
  points: 1250
};

const MOCK_COURSES = [
  {
    id: 1,
    title: "TOEIC Mastery 750+",
    description: "Comprehensive guide to achieve 750+ scores focused on strategic reading and advanced listening techniques.",
    level: "Intermediate",
    image: "https://picsum.photos/seed/toeic1/800/600"
  },
  {
    id: 2,
    title: "Foundations of English",
    description: "Perfect for beginners looking to build a strong grammar and vocabulary base for the TOEIC test.",
    level: "Beginner",
    image: "https://picsum.photos/seed/toeic2/800/600"
  },
  {
    id: 3,
    title: "Advanced Reading Strategies",
    description: "Master Part 7 with advanced skimming and scanning techniques for maximum speed and accuracy.",
    level: "Advanced",
    image: "https://picsum.photos/seed/toeic3/800/600"
  }
];

const MOCK_QUESTIONS = [
  {
    id: 1,
    type: "grammar",
    part: 5,
    text: "The marketing director _______ the final proposal before the meeting started yesterday.",
    option_a: "reviews",
    option_b: "is reviewing",
    option_c: "had reviewed",
    option_d: "will review",
    correct_answer: "C",
    explanation: "Past perfect tense (had reviewed) is used because the action was completed before another past action (the meeting started)."
  },
  {
    id: 2,
    type: "vocabulary",
    part: 5,
    text: "Please submit your monthly expense reports _______ the end of the week.",
    option_a: "within",
    option_b: "before",
    option_c: "until",
    option_d: "during",
    correct_answer: "B",
    explanation: "'Before' is the most appropriate preposition to indicate a deadline."
  }
];

export const api = {
  auth: {
    login: async (credentials: any) => {
      console.log("Mock Login:", credentials);
      return { token: "mock-token", user: MOCK_USER };
    },
    signup: async (data: any) => {
      console.log("Mock Signup:", data);
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
      // Return a shuffled/repeated list of mock questions to fill 10 slots
      return Array(5).fill(MOCK_QUESTIONS).flat().slice(0, 10);
    },
  }
};
