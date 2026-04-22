const DEFAULT_VOCABULARY = [
  {
    id: 1,
    word: "Commitment",
    pronunciation: "/kəˈmɪtmənt/",
    meaning: "Sự cam kết, tận tụy",
    example: "Our company has a strong commitment to quality.",
  },
  {
    id: 2,
    word: "Negotiate",
    pronunciation: "/nəˈɡoʊʃieɪt/",
    meaning: "Đàm phán, thương lượng",
    example: "We need to negotiate the terms of the contract.",
  },
  {
    id: 3,
    word: "Implementation",
    pronunciation: "/ˌɪmplɪmenˈteɪʃn/",
    meaning: "Sự triển khai, thực hiện",
    example: "The implementation of the new policy will start next week.",
  },
  {
    id: 4,
    word: "Innovative",
    pronunciation: "/ˈɪnəveɪtɪv/",
    meaning: "Sáng tạo, đổi mới",
    example: "The company is known for its innovative products.",
  },
  {
    id: 5,
    word: "Proficiency",
    pronunciation: "/prəˈfɪʃnsi/",
    meaning: "Sự thông thạo, thành thạo",
    example: "She has high proficiency in English.",
  },
];

const DEFAULT_QUIZ = [
  {
    id: 1,
    question: "The team is working _______ to finish the project on time.",
    answers: ["hardly", "hard", "harder", "hardness"],
    correct_answer: "hard",
  },
  {
    id: 2,
    question: "I would like to _______ an appointment with Dr. Smith.",
    answers: ["make", "do", "take", "give"],
    correct_answer: "make",
  },
  {
    id: 3,
    question: "The new marketing strategy was _______ successful.",
    answers: ["height", "highly", "high", "highest"],
    correct_answer: "highly",
  },
  {
    id: 4,
    question: "Please _______ the attached document for more details.",
    answers: ["refer", "look", "see", "read"],
    correct_answer: "refer",
  },
  {
    id: 5,
    question: "They have decided to _______ the meeting until next Friday.",
    answers: ["put off", "call off", "take off", "go off"],
    correct_answer: "put off",
  },
];

const MOCK_QUESTIONS = [
  // Từ DEFAULT_QUIZ - convert sang format Practice
  {
    id: 1,
    part: 5,
    type: "Incomplete Sentences",
    text: "The team is working _______ to finish the project on time.",
    audio_url: null,
    option_a: "hardly",
    option_b: "hard",
    option_c: "harder",
    option_d: "hardness",
    correct_answer: "B",
    explanation:
      "'Hard' là trạng từ chỉ cách thức, dùng sau động từ. 'Hardly' mang nghĩa 'hầu như không', không phù hợp ngữ cảnh.",
  },
  {
    id: 2,
    part: 5,
    type: "Incomplete Sentences",
    text: "I would like to _______ an appointment with Dr. Smith.",
    audio_url: null,
    option_a: "make",
    option_b: "do",
    option_c: "take",
    option_d: "give",
    correct_answer: "A",
    explanation:
      "'Make an appointment' là cụm từ cố định trong tiếng Anh thương mại.",
  },
  {
    id: 3,
    part: 5,
    type: "Incomplete Sentences",
    text: "The new marketing strategy was _______ successful.",
    audio_url: null,
    option_a: "height",
    option_b: "high",
    option_c: "highly",
    option_d: "highest",
    correct_answer: "C",
    explanation:
      "'Highly' là trạng từ bổ nghĩa cho tính từ 'successful'. Các đáp án còn lại là tính từ hoặc danh từ.",
  },
  {
    id: 4,
    part: 5,
    type: "Incomplete Sentences",
    text: "Please _______ the attached document for more details.",
    audio_url: null,
    option_a: "refer to",
    option_b: "look",
    option_c: "see",
    option_d: "read",
    correct_answer: "A",
    explanation:
      "'Refer to' có nghĩa 'tham khảo, xem thêm' — dùng phổ biến trong văn phong kinh doanh.",
  },
  {
    id: 5,
    part: 5,
    type: "Incomplete Sentences",
    text: "They have decided to _______ the meeting until next Friday.",
    audio_url: null,
    option_a: "put off",
    option_b: "call off",
    option_c: "take off",
    option_d: "go off",
    correct_answer: "A",
    explanation:
      "'Put off' nghĩa là hoãn lại. 'Call off' là hủy bỏ hoàn toàn, không phải hoãn.",
  },
  // Từ DEFAULT_VOCABULARY - tạo câu hỏi về từ vựng
  {
    id: 6,
    part: 5,
    type: "Vocabulary in Context",
    text: "The board praised the CEO for his strong _______ to the company's long-term vision.",
    audio_url: null,
    option_a: "commitment",
    option_b: "negotiation",
    option_c: "implementation",
    option_d: "proficiency",
    correct_answer: "A",
    explanation:
      "'Commitment' (sự cam kết) phù hợp nhất — dùng khi nói về sự tận tụy với mục tiêu lâu dài.",
  },
  {
    id: 7,
    part: 5,
    type: "Vocabulary in Context",
    text: "Both parties agreed to _______ the salary package before signing the contract.",
    audio_url: null,
    option_a: "implement",
    option_b: "negotiate",
    option_c: "commit",
    option_d: "demonstrate",
    correct_answer: "B",
    explanation:
      "'Negotiate' (đàm phán) là động từ đúng khi hai bên thảo luận về điều khoản hợp đồng.",
  },
  {
    id: 8,
    part: 5,
    type: "Vocabulary in Context",
    text: "The _______ of the new software system will take approximately three months.",
    audio_url: null,
    option_a: "commitment",
    option_b: "proficiency",
    option_c: "implementation",
    option_d: "negotiation",
    correct_answer: "C",
    explanation:
      "'Implementation' (sự triển khai) dùng khi đề cập đến quá trình đưa hệ thống vào hoạt động.",
  },
  {
    id: 9,
    part: 6,
    type: "Text Completion",
    text: "Applicants must demonstrate _______ in at least two foreign languages to qualify for this position.",
    audio_url: null,
    option_a: "commitment",
    option_b: "innovation",
    option_c: "proficiency",
    option_d: "negotiation",
    correct_answer: "C",
    explanation:
      "'Proficiency' (sự thông thạo) là danh từ chính xác khi đề cập đến trình độ ngôn ngữ.",
  },
  {
    id: 10,
    part: 6,
    type: "Text Completion",
    text: "Our R&D team is known for developing _______ solutions that disrupt traditional markets.",
    audio_url: null,
    option_a: "committed",
    option_b: "innovative",
    option_c: "negotiable",
    option_d: "implemented",
    correct_answer: "B",
    explanation:
      "'Innovative' (sáng tạo, đổi mới) bổ nghĩa cho 'solutions', phù hợp ngữ cảnh R&D.",
  },
];

const MOCK_USER = {
  id: 1,
  name: "Người dùng Thử nghiệm",
  email: "user@test.com",
  level: "Trung cấp",
  points: 1250,
  role: "user" as const,
};

const MOCK_ADMIN = {
  id: 2,
  name: "Quản trị viên",
  email: "admin@test.com",
  level: "Nâng cao",
  points: 9999,
  role: "admin" as const,
};

const MOCK_COURSES = [
  {
    id: 1,
    title: "Chinh phục TOEIC 750+",
    description:
      "Hướng dẫn toàn diện để đạt điểm 750+ tập trung vào kỹ năng đọc chiến thuật và kỹ thuật nghe nâng cao.",
    level: "Trung cấp",
    image: "https://picsum.photos/seed/toeic1/800/600",
  },
  {
    id: 2,
    title: "Nền tảng Tiếng Anh cho TOEIC",
    description:
      "Hoàn hảo cho người mới bắt đầu muốn xây dựng nền tảng ngữ pháp và từ vựng vững chắc cho kỳ thi TOEIC.",
    level: "Cơ bản",
    image: "https://picsum.photos/seed/toeic2/800/600",
  },
  {
    id: 3,
    title: "Chiến lược Đọc hiểu Nâng cao",
    description:
      "Làm chủ Part 7 với các kỹ thuật skimming và scanning nâng cao để đạt tốc độ và độ chính xác tối đa.",
    level: "Nâng cao",
    image: "https://picsum.photos/seed/toeic3/800/600",
  },
];

export const api = {
  auth: {
    login: async (credentials: any) => {
      // Mock validation for specific accounts
      if (
        credentials.email === "admin@test.com" &&
        credentials.password === "123456"
      ) {
        return { token: "mock-admin-token", user: MOCK_ADMIN };
      }
      if (
        credentials.email === "user@test.com" &&
        credentials.password === "123456"
      ) {
        return { token: "mock-user-token", user: MOCK_USER };
      }

      // Fallback for others (allow generic login for demo)
      return {
        token: "mock-token",
        user: {
          ...MOCK_USER,
          email: credentials.email,
          name: credentials.email.split("@")[0],
        },
      };
    },
    signup: async (data: any) => {
      return {
        token: "mock-token",
        user: { ...MOCK_USER, name: data.name, email: data.email },
      };
    },
  },
  dashboard: {
    get: async () => {
      return {
        user: MOCK_USER,
        completedLessons: 12,
        recentTests: [
          { id: 1, total_score: 720, created_at: new Date().toISOString() },
          {
            id: 2,
            total_score: 680,
            created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
        ],
        streak: 5,
        dailyGoal: 75,
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
      return MOCK_QUESTIONS;
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
    },
  },
  quiz: {
    list: async () => {
      const stored = localStorage.getItem("quiz_data");
      return stored ? JSON.parse(stored) : DEFAULT_QUIZ;
    },
    save: async (data: any) => {
      localStorage.setItem("quiz_data", JSON.stringify(data));
      return { success: true };
    },
  },
};
