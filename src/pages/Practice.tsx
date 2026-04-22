import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Timer, 
  Play, 
  Pause, 
  BrainCircuit,
  Volume2,
  AlertCircle,
  XCircle,
  Trophy,
  ArrowRight,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

import { getQuizFeedback } from "../lib/gemini";

export default function Practice() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes for 10 questions
  const [isPlaying, setIsPlaying] = useState(false);

  const { data: questions, isLoading, isError } = useQuery({
    queryKey: ["practice-questions"],
    queryFn: () => api.practice.questions(),
  });

  useEffect(() => {
    if (isSubmitted && !aiFeedback && !isGeneratingFeedback) {
      const mistakes = questions.filter((q: any, i: number) => answers[i] !== q.correct_answer)
        .map((q: any, i: number) => ({
          text: q.text,
          studentAnswer: answers[i] || 'None',
          correctAnswer: q.correct_answer
        }));
      
      setIsGeneratingFeedback(true);
      getQuizFeedback(mistakes).then(feedback => {
        setAiFeedback(feedback || "");
        setIsGeneratingFeedback(false);
      });
    }
  }, [isSubmitted, aiFeedback, questions, answers]);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const selectAnswer = (answer: string) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentIdx]: answer });
  };

  const handleNext = () => {
    if (currentIdx < (questions?.length || 0) - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const calculateScore = () => {
    if (!questions) return 0;
    let correct = 0;
    questions.forEach((q: any, idx: number) => {
      if (answers[idx] === q.correct_answer) correct++;
    });
    return (correct / questions.length) * 100;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isLoading) return <div className="p-20 text-center text-slate-500">Loading exercise...</div>;
  if (isError) return <div className="p-20 text-center text-red-500">Error loading questions.</div>;

  const currentQuestion = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;
  const score = calculateScore();

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="text-center"
        >
          <div className="bg-blue-600 w-20 h-20 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-200">
             <Trophy size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Quiz Completed!</h1>
          <p className="text-lg text-slate-500 mb-8">Excellent work on finishing your daily practice session.</p>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
             <Card className="border border-slate-200 shadow-sm rounded-[32px] bg-white">
                <CardContent className="p-8">
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Your Score</p>
                   <h3 className="text-4xl font-black text-slate-900">{Math.round(score)}%</h3>
                </CardContent>
             </Card>
             <Card className="border border-slate-200 shadow-sm rounded-[32px] bg-white">
                <CardContent className="p-8">
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Time Elapsed</p>
                   <h3 className="text-4xl font-black text-slate-900">{formatTime(600 - timeLeft)}</h3>
                </CardContent>
             </Card>
          </div>

          <Card className="border-none shadow-xl rounded-[32px] bg-slate-900 text-white mb-12 overflow-hidden relative">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-blue-400" /> AI Tutor Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              {isGeneratingFeedback ? (
                <div className="flex items-center gap-3 text-slate-400">
                  <Loader2 className="animate-spin" /> Analyzing performance...
                </div>
              ) : (
                <p className="text-lg text-slate-300 italic leading-relaxed text-left font-medium">
                  "{aiFeedback}"
                </p>
              )}
            </CardContent>
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
          </Card>

          <div className="space-y-4 text-left">
            <h3 className="text-xl font-black text-slate-900 mb-6 px-2 italic">Review Answers</h3>
            {questions.map((q: any, i: number) => (
              <Card key={i} className={`border border-slate-200 shadow-sm rounded-[32px] overflow-hidden ${answers[i] === q.correct_answer ? 'bg-white' : 'bg-rose-50/50 border-rose-100'}`}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`mt-1 h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${answers[i] === q.correct_answer ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {answers[i] === q.correct_answer ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 mb-3">{i + 1}. {q.text}</h4>
                      <div className="flex items-center gap-4 mb-6">
                         <div className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-lg text-slate-500">
                            Your: <span className="text-slate-900">{answers[i] || '—'}</span>
                         </div>
                         <div className="text-xs font-bold px-3 py-1 bg-emerald-50 rounded-lg text-emerald-600">
                            Correct: {q.correct_answer}
                         </div>
                      </div>
                      <div className="bg-white border border-slate-100 p-6 rounded-2xl text-sm italic text-slate-500 leading-relaxed shadow-sm">
                        <span className="font-black text-blue-600 not-italic uppercase tracking-widest text-[10px] block mb-2">Explanation</span>
                        {q.explanation}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard" className="flex-1">
               <Button variant="outline" className="w-full h-14 rounded-2xl font-black border-slate-200 text-slate-600 hover:bg-slate-50">Dashboard</Button>
            </Link>
            <Button onClick={() => window.location.reload()} className="flex-1 h-14 rounded-2xl bg-blue-600 font-black text-white shadow-xl shadow-blue-100 hover:scale-105 transition-transform">
              Try Another Set
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header Sticky */}
      <div className="sticky top-20 z-40 bg-slate-50/80 backdrop-blur-sm pb-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Practice Session</h2>
            <p className="text-sm text-slate-500 font-medium">Mixed TOEIC Questions (Part 5 & 6)</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
            <Timer className={`w-5 h-5 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-blue-500'}`} />
            <span className={`font-mono font-bold text-lg ${timeLeft < 60 ? 'text-red-600' : 'text-slate-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="relative">
          <Progress value={progress} className="h-2 bg-slate-200" />
          <div className="absolute top-4 left-0 text-xs font-bold text-slate-400">
            Question {currentIdx + 1} of {questions.length}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={currentIdx}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.3 }}
           className="mt-8"
        >
           <Card className="border-none shadow-xl shadow-slate-200/60 rounded-[32px] overflow-hidden">
             <CardHeader className="bg-slate-50 p-8 border-b border-slate-100">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">
                   <BrainCircuit size={18} /> Part {currentQuestion.part}: {currentQuestion.type}
                </div>
                {currentQuestion.audio_url && (
                   <div className="mb-6 p-6 bg-white rounded-2xl flex items-center justify-between shadow-sm border border-slate-100">
                      <div className="flex items-center gap-4">
                         <Button 
                            variant="secondary" 
                            size="icon" 
                            className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600"
                            onClick={() => setIsPlaying(!isPlaying)}
                         >
                            {isPlaying ? <Pause /> : <Play />}
                         </Button>
                         <div>
                            <p className="font-bold text-slate-700">Listening Audio</p>
                            <p className="text-xs text-slate-400">Question {currentIdx + 1} recorded snippet</p>
                         </div>
                      </div>
                      <Volume2 className="text-slate-300" />
                   </div>
                )}
                <CardTitle className="text-xl md:text-2xl font-bold leading-relaxed text-slate-800">
                   {currentQuestion.text.includes("_______") ? (
                     <>
                       {currentQuestion.text.split("_______")[0]}
                       <span className="inline-block w-24 border-b-2 border-blue-500 mx-1">
                          {answers[currentIdx] ? (
                             <span className="text-blue-600 block text-center -mb-1 font-black">{answers[currentIdx]}</span>
                          ) : null}
                       </span>
                       {currentQuestion.text.split("_______")[1]}
                     </>
                   ) : currentQuestion.text}
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['A', 'B', 'C', 'D'].map((option) => {
                    const key = `option_${option.toLowerCase()}`;
                    const label = currentQuestion[key];
                    if (!label) return null;
                    const isSelected = answers[currentIdx] === option;
                    
                    return (
                      <button
                        key={option}
                        onClick={() => selectAnswer(option)}
                        className={`group flex items-center gap-4 p-5 rounded-2xl text-left transition-all border-2 
                          ${isSelected 
                            ? 'bg-blue-50 border-blue-600 shadow-lg shadow-blue-100' 
                            : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50'}`}
                      >
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors
                          ${isSelected 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                          {option}
                        </div>
                        <span className={`font-semibold text-lg ${isSelected ? 'text-blue-900' : 'text-slate-600'}`}>
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
             </CardContent>
             <CardFooter className="p-8 flex justify-between bg-slate-50/50 border-t border-slate-100">
                <div className="flex gap-2">
                   <Button 
                      variant="outline" 
                      onClick={handlePrev} 
                      disabled={currentIdx === 0}
                      className="rounded-xl border-slate-200 text-slate-600"
                   >
                     <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                   </Button>
                   <Button 
                      variant="outline" 
                      onClick={handleNext} 
                      disabled={currentIdx === questions.length - 1}
                      className="rounded-xl border-slate-200 text-slate-600"
                   >
                     Next <ChevronRight className="ml-2 h-4 w-4" />
                   </Button>
                </div>
                
                {Object.keys(answers).length === questions.length && currentIdx === questions.length - 1 && (
                  <Button 
                    onClick={handleSubmit} 
                    className="bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-100 rounded-xl px-8 font-bold"
                  >
                    Finish & Grade <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {currentIdx < questions.length - 1 && (
                   <Button 
                      onClick={() => setCurrentIdx(currentIdx + 1)}
                      disabled={!answers[currentIdx]}
                      className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 font-bold shadow-lg shadow-blue-100"
                   >
                     Submit Answer
                   </Button>
                )}
             </CardFooter>
           </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
         <AlertCircle className="text-amber-600 shrink-0 mt-1" />
         <div>
            <h4 className="font-bold text-amber-800">Pro Tip</h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              TOEIC Reading parts require managing your time strictly. Try to spend no more than 30 seconds per question on Part 5 & 6 to save time for the longer passages in Part 7.
            </p>
         </div>
      </div>
    </div>
  );
}
