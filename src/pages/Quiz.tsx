import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, ListChecks } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

export default function Quiz() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.quiz.list().then(data => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  const selectAnswer = (answer: string) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentIdx]: answer });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const correctCount = questions.filter((q, idx) => answers[idx] === q.correct_answer).length;
    if (correctCount === questions.length) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  if (loading) return <div className="p-20 text-center">Đang tải câu hỏi...</div>;
  if (questions.length === 0) return <div className="p-20 text-center">Không có câu hỏi nào.</div>;

  const currentQuestion = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  if (isSubmitted) {
    const correctCount = questions.filter((q, idx) => answers[idx] === q.correct_answer).length;
    const score = (correctCount / questions.length) * 100;

    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="bg-blue-600 w-24 h-24 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-200">
            <Trophy size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 italic tracking-tighter">Kết quả trắc nghiệm.</h1>
          <p className="text-lg text-slate-500 mb-12">Bạn đã trả lời đúng {correctCount}/{questions.length} câu hỏi.</p>

          <div className="grid grid-cols-1 gap-6 mb-12">
            {questions.map((q, idx) => (
              <Card key={idx} className={`rounded-[40px] border-2 text-left overflow-hidden ${answers[idx] === q.correct_answer ? "border-emerald-100 bg-emerald-50/50" : "border-rose-100 bg-rose-50/50"}`}>
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${answers[idx] === q.correct_answer ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>
                      {answers[idx] === q.correct_answer ? <CheckCircle2 /> : <XCircle />}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{q.question}</h3>
                        <div className="flex flex-wrap gap-4">
                            <span className="text-sm font-bold text-slate-500">Bạn chọn: <span className={answers[idx] === q.correct_answer ? "text-emerald-600" : "text-rose-600"}>{answers[idx] || "Chưa chọn"}</span></span>
                            <span className="text-sm font-bold text-emerald-600">Đáp án đúng: {q.correct_answer}</span>
                        </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button onClick={handleReset} className="h-16 px-12 rounded-3xl bg-blue-600 hover:bg-blue-700 font-black text-xl shadow-2xl shadow-blue-100 gap-3">
            Thử lại <RotateCcw size={20} />
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-sm">
                <ListChecks size={20} /> Câu hỏi {currentIdx + 1} / {questions.length}
            </div>
            <div className="text-slate-400 font-black text-sm">
                {Math.round(progress)}%
            </div>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               className="h-full bg-blue-600"
             />
          </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={currentIdx}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.3 }}
        >
           <Card className="rounded-[48px] border-none shadow-2xl shadow-slate-200/60 bg-white overflow-hidden p-8 md:p-12">
             <CardHeader className="p-0 mb-10">
                <CardTitle className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                  {currentQuestion.question}
                </CardTitle>
             </CardHeader>
             <CardContent className="p-0">
               <div className="grid grid-cols-1 gap-4">
                 {currentQuestion.answers.map((option: string) => (
                   <button
                     key={option}
                     onClick={() => selectAnswer(option)}
                     className={`group w-full p-6 h-20 rounded-3xl text-left font-bold text-lg border-2 transition-all flex items-center gap-6 ${answers[currentIdx] === option ? "bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-200" : "bg-white border-slate-100 hover:border-blue-200 text-slate-600"}`}
                   >
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${answers[currentIdx] === option ? "bg-white/20" : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"}`}>
                       {option[0]}
                     </div>
                     {option}
                   </button>
                 ))}
               </div>
             </CardContent>
             <CardFooter className="p-0 mt-12 flex justify-between">
                <Button 
                    variant="ghost" 
                    onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentIdx === 0}
                    className="font-bold text-slate-400 hover:text-slate-600"
                >
                    Quay lại
                </Button>
                {currentIdx === questions.length - 1 ? (
                    <Button 
                        onClick={handleSubmit} 
                        disabled={Object.keys(answers).length < questions.length}
                        className="h-16 px-10 rounded-3xl bg-emerald-600 hover:bg-emerald-700 font-black text-white shadow-2xl shadow-emerald-100"
                    >
                        Nộp bài trắc nghiệm
                    </Button>
                ) : (
                    <Button 
                        onClick={() => setCurrentIdx(prev => prev + 1)}
                        disabled={!answers[currentIdx]}
                        className="h-16 px-10 rounded-3xl bg-slate-900 hover:bg-slate-800 font-black text-white gap-2"
                    >
                        Tiếp theo <ArrowRight size={20} />
                    </Button>
                )}
             </CardFooter>
           </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
