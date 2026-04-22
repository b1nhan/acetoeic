const MOCK_USER = {
  id: 1,
  name: "Nguyên Hải",
  email: "hai@example.com",
  level: "Trung cấp",
  points: 1250
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

const MOCK_QUESTIONS = [
  {
    id: 1,
    type: "ngữ pháp",
    part: 5,
    text: "The marketing director _______ the final proposal before the meeting started yesterday.",
    option_a: "reviews",
    option_b: "is reviewing",
    option_c: "had reviewed",
    option_d: "will review",
    correct_answer: "C",
    explanation: "Thì quá khứ hoàn thành (had reviewed) được sử dụng vì hành động đã hoàn thành trước một hành động khác trong quá khứ (cuộc họp bắt đầu)."
  },
  {
    id: 2,
    type: "từ vựng",
    part: 5,
    text: "Please submit your monthly expense reports _______ the end of the week.",
    option_a: "within",
    option_b: "before",
    option_c: "until",
    option_d: "during",
    correct_answer: "B",
    explanation: "'Before' là giới từ phù hợp nhất để chỉ thời hạn cuối cùng."
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
      return Array(5).fill(MOCK_QUESTIONS).flat().slice(0, 10);
    },
  }
};
