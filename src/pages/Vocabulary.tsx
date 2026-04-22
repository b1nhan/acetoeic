import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Vocabulary() {
  const [vocab, setVocab] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.vocabulary.list().then(data => {
      setVocab(data);
      setLoading(false);
    });
  }, []);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % vocab.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + vocab.length) % vocab.length);
    }, 150);
  };

  if (loading) return <div className="p-20 text-center">Đang tải từ vựng...</div>;
  if (vocab.length === 0) return <div className="p-20 text-center">Không có từ vựng nào.</div>;

  const currentItem = vocab[currentIdx];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic mb-4">Flashcards Từ Vựng.</h1>
        <p className="text-slate-500 font-medium">Nhấp vào thẻ để xem nghĩa và ví dụ.</p>
      </div>

      <div className="flex flex-col items-center gap-12">
        <div className="relative w-full max-w-md h-80 perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx + (isFlipped ? "-flipped" : "-front")}
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <Card className={`w-full h-full rounded-[40px] border-2 flex flex-col items-center justify-center p-8 text-center shadow-2xl transition-colors ${isFlipped ? "bg-blue-600 border-blue-500 text-white" : "bg-white border-slate-100 text-slate-900"}`}>
                <CardContent className="flex flex-col items-center justify-center h-full w-full">
                  {!isFlipped ? (
                    <>
                      <h2 className="text-4xl font-black mb-4 tracking-tight">{currentItem.word}</h2>
                      <p className="text-blue-500 font-mono text-lg bg-blue-50 px-4 py-1 rounded-full">{currentItem.pronunciation}</p>
                      <div className="mt-8 text-slate-300">
                         <RotateCcw className="w-6 h-6 animate-pulse" />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-black mb-4">Nghĩa: {currentItem.meaning}</h3>
                      <div className="bg-white/10 p-6 rounded-3xl border border-white/20 w-full text-left">
                        <p className="text-xs font-black uppercase tracking-widest text-blue-200 mb-2">Ví dụ:</p>
                        <p className="text-lg font-medium leading-relaxed italic">"{currentItem.example}"</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-6">
           <div className="flex items-center gap-8">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrev}
                className="w-16 h-16 rounded-full border-2 border-slate-200 hover:bg-slate-100 hover:scale-110 transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <div className="text-sm font-black text-slate-400 bg-slate-100 px-6 py-2 rounded-full">
                {currentIdx + 1} / {vocab.length}
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNext}
                className="w-16 h-16 rounded-full border-2 border-slate-200 hover:bg-slate-100 hover:scale-110 transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
           </div>
           
           <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Dùng phím mũi tên hoặc nhấp để lật thẻ</p>
        </div>
      </div>
    </div>
  );
}
