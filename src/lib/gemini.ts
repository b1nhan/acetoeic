export async function getQuizFeedback(mistakes: any[]) {
  if (mistakes.length === 0) return "Điểm tuyệt đối! Bạn đã nắm vững các khái niệm này. Hãy tiếp tục luyện tập để duy trì tốc độ nhé.";
  
  return "Bạn đang cho thấy sự tiến bộ ổn định! Hãy tập trung vào các cấu trúc ngữ pháp Part 5, đặc biệt là các thì của động từ và giới từ. Cố gắng dành không quá 30 giây cho mỗi câu để xây dựng tốc độ cho phần đọc hiểu. Cố lên!";
}
