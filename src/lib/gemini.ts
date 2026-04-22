export async function getQuizFeedback(mistakes: any[]) {
  if (mistakes.length === 0) return "Perfect score! You have a solid grasp of these concepts. Keep practicing to maintain your speed.";
  
  return "You're showing consistent progress! Focus on Part 5 grammar patterns, specifically verb tenses and prepositions. Try to spend no more than 30 seconds per question to build speed for the reading section. Keep it up!";
}
