import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Plus, Trash2, Layout, Book, CheckSquare } from "lucide-react";

export default function AdminCMS() {
  const [landing, setLanding] = useState<any>({
    heroTitle: "GIỎI TOEIC",
    heroSubtitle: "Luyện TOEIC hiệu quả, Đạt mục tiêu dễ dàng",
    ctaText: "Bắt đầu luyện tập",
    stats: {
      students: "300+",
      listening: "1,000+",
      grammar: "500+"
    },
    testimonials: [
      { name: "Minh Anh", score: "850+ TOEIC", text: "GIỎI TOEIC giúp mình tăng 200 điểm chỉ sau 2 tháng luyện tập. Hệ thống chấm bài AI rất chính xác." },
      { name: "Thanh Hà", score: "780 TOEIC", text: "Ngân hàng câu hỏi phong phú, giải thích chi tiết từng đáp án. Luyện ở đâu cũng được, rất tiện!" },
      { name: "Quốc Bảo", score: "900+ TOEIC", text: "Thầy Hải dạy rất dễ hiểu, phương pháp độc đáo giúp mình nắm ngữ pháp nhanh hơn hẳn." }
    ],
    founder: {
      name: "Nguyễn Hữu Hải",
      role: "Founder & Giảng viên chính",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      highlights: ["TOEIC 965/990", "Listening 495/495"],
      achievements: [
        "Lấy lại gốc chỉ sau 3 buổi",
        "Đơn giản hoá tiếng Anh - Phương pháp dạy độc đáo",
        "Phương pháp tăng điểm cấp tốc với công thức ghép câu",
        "Cam kết chất lượng đào tạo và điểm số đầu ra"
      ]
    }
  });
  const [vocab, setVocab] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedLanding = localStorage.getItem("landing_content");
    if (storedLanding) {
      setLanding(JSON.parse(storedLanding));
    }

    Promise.all([api.vocabulary.list(), api.quiz.list()]).then(([v, q]) => {
      setVocab(v);
      setQuiz(q);
      setLoading(false);
    });
  }, []);

  const saveLanding = () => {
    localStorage.setItem("landing_content", JSON.stringify(landing));
    alert("Đã lưu nội dung trang chủ!");
    window.location.reload(); // Refresh to reflect immediately if needed
  };

  const saveVocab = () => {
    api.vocabulary.save(vocab).then(() => alert("Đã lưu từ vựng!"));
  };

  const saveQuiz = () => {
    api.quiz.save(quiz).then(() => alert("Đã lưu trắc nghiệm!"));
  };

  if (loading) return <div className="p-20 text-center">Đang tải dữ liệu quản trị...</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Hệ thống Quản trị (CMS).</h1>
        <p className="text-slate-500 font-medium">Chỉnh sửa nội dung và dữ liệu thực tế cho ứng dụng.</p>
      </div>

      <Tabs defaultValue="landing" className="space-y-8">
        <TabsList className="bg-slate-100 p-1 rounded-2xl h-auto">
          <TabsTrigger value="landing" className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold gap-2">
            <Layout size={18} /> Trang Chủ
          </TabsTrigger>
          <TabsTrigger value="vocab" className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold gap-2">
            <Book size={18} /> Từ vựng
          </TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold gap-2">
            <CheckSquare size={18} /> Trắc nghiệm
          </TabsTrigger>
        </TabsList>

        {/* Landing Page CMS */}
        <TabsContent value="landing" className="space-y-6">
          <Card className="rounded-[40px] border-none shadow-xl p-8">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-2xl font-black italic">Nội dung Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-slate-400">Tiêu đề chính (Title)</label>
                <Input value={landing.heroTitle} onChange={e => setLanding({...landing, heroTitle: e.target.value})} className="h-14 rounded-2xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-slate-400">Tiêu đề phụ (Subtitle)</label>
                <Textarea value={landing.heroSubtitle} onChange={e => setLanding({...landing, heroSubtitle: e.target.value})} className="rounded-2xl border-slate-200 min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-slate-400">Nút kêu gọi hành động (CTA Text)</label>
                <Input value={landing.ctaText} onChange={e => setLanding({...landing, ctaText: e.target.value})} className="h-14 rounded-2xl border-slate-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase text-slate-400">Số HV đang học</label>
                  <Input value={landing.stats?.students} onChange={e => setLanding({...landing, stats: {...landing.stats, students: e.target.value}})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase text-slate-400">Số câu luyện nghe</label>
                  <Input value={landing.stats?.listening} onChange={e => setLanding({...landing, stats: {...landing.stats, listening: e.target.value}})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase text-slate-400">Số câu ngữ pháp</label>
                  <Input value={landing.stats?.grammar} onChange={e => setLanding({...landing, stats: {...landing.stats, grammar: e.target.value}})} className="rounded-xl" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-6">
                <CardTitle className="text-xl font-black italic">Học viên Feedback</CardTitle>
                {landing.testimonials?.map((t: any, i: number) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Tên học viên" value={t.name} onChange={e => {
                        const newT = [...landing.testimonials];
                        newT[i].name = e.target.value;
                        setLanding({...landing, testimonials: newT});
                      }} className="rounded-xl" />
                      <Input placeholder="Điểm số/Thành tích" value={t.score} onChange={e => {
                        const newT = [...landing.testimonials];
                        newT[i].score = e.target.value;
                        setLanding({...landing, testimonials: newT});
                      }} className="rounded-xl" />
                    </div>
                    <Textarea placeholder="Nội dung feedback" value={t.text} onChange={e => {
                      const newT = [...landing.testimonials];
                      newT[i].text = e.target.value;
                      setLanding({...landing, testimonials: newT});
                    }} className="rounded-xl" />
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-6">
                <CardTitle className="text-xl font-black italic">Thông tin Giảng viên</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400">Tên giảng viên</label>
                    <Input value={landing.founder?.name} onChange={e => setLanding({...landing, founder: {...landing.founder, name: e.target.value}})} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400">Chức danh</label>
                    <Input value={landing.founder?.role} onChange={e => setLanding({...landing, founder: {...landing.founder, role: e.target.value}})} className="rounded-xl" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-400">Ảnh giảng viên (URL)</label>
                    <Input value={landing.founder?.avatar} onChange={e => setLanding({...landing, founder: {...landing.founder, avatar: e.target.value}})} className="rounded-xl" />
                  </div>
                </div>
              </div>

              <Button onClick={saveLanding} className="bg-blue-600 h-14 px-8 rounded-2xl font-black gap-2 shadow-lg shadow-blue-100">
                <Save size={18} /> Lưu trang chủ
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vocabulary CMS */}
        <TabsContent value="vocab" className="space-y-6">
          <Card className="rounded-[40px] border-none shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <CardTitle className="text-2xl font-black italic">Quản lý Flashcards</CardTitle>
              <Button onClick={() => setVocab([...vocab, { id: Date.now(), word: "", pronunciation: "", meaning: "", example: "" }])} variant="outline" className="rounded-xl h-12 gap-2 border-slate-200 font-bold">
                 <Plus size={18} /> Thêm từ mới
              </Button>
            </div>
            <CardContent className="p-0 space-y-8">
              {vocab.map((v, idx) => (
                <div key={v.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 relative group">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Từ vựng" value={v.word} onChange={e => {
                        const newV = [...vocab];
                        newV[idx].word = e.target.value;
                        setVocab(newV);
                    }} className="rounded-xl" />
                    <Input placeholder="Phiên âm" value={v.pronunciation} onChange={e => {
                        const newV = [...vocab];
                        newV[idx].pronunciation = e.target.value;
                        setVocab(newV);
                    }} className="rounded-xl" />
                    <Input placeholder="Nghĩa tiếng Việt" value={v.meaning} onChange={e => {
                        const newV = [...vocab];
                        newV[idx].meaning = e.target.value;
                        setVocab(newV);
                    }} className="rounded-xl md:col-span-2" />
                    <Textarea placeholder="Câu ví dụ" value={v.example} onChange={e => {
                        const newV = [...vocab];
                        newV[idx].example = e.target.value;
                        setVocab(newV);
                    }} className="rounded-xl md:col-span-2" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setVocab(vocab.filter(i => i.id !== v.id))} className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 rounded-xl">
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
              <Button onClick={saveVocab} className="bg-blue-600 h-14 px-8 rounded-2xl font-black gap-2 shadow-lg shadow-blue-100">
                <Save size={18} /> Lưu từ vựng
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quiz CMS */}
        <TabsContent value="quiz" className="space-y-6">
          <Card className="rounded-[40px] border-none shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <CardTitle className="text-2xl font-black italic">Quản lý Câu hỏi Trắc nghiệm</CardTitle>
              <Button onClick={() => setQuiz([...quiz, { id: Date.now(), question: "", answers: ["", "", "", ""], correct_answer: "" }])} variant="outline" className="rounded-xl h-12 gap-2 border-slate-200 font-bold">
                 <Plus size={18} /> Thêm câu hỏi
              </Button>
            </div>
            <CardContent className="p-0 space-y-8">
              {quiz.map((q, idx) => (
                <div key={q.id} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 relative group">
                  <div className="space-y-4">
                    <Textarea placeholder="Nội dung câu hỏi" value={q.question} onChange={e => {
                        const newQ = [...quiz];
                        newQ[idx].question = e.target.value;
                        setQuiz(newQ);
                    }} className="rounded-2xl border-slate-200 font-bold" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.answers.map((ans: string, aIdx: number) => (
                        <Input key={aIdx} placeholder={`Đáp án ${aIdx + 1}`} value={ans} onChange={e => {
                            const newQ = [...quiz];
                            newQ[idx].answers[aIdx] = e.target.value;
                            setQuiz(newQ);
                        }} className="rounded-xl" />
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">Đáp án đúng (Phải khớp chính xác với một trong các lựa chọn trên)</label>
                        <Input placeholder="Nhập đáp án đúng" value={q.correct_answer} onChange={e => {
                            const newQ = [...quiz];
                            newQ[idx].correct_answer = e.target.value;
                            setQuiz(newQ);
                        }} className="rounded-xl border-blue-200 bg-blue-50/30 text-blue-600 font-bold" />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setQuiz(quiz.filter(i => i.id !== q.id))} className="absolute top-4 right-4 text-rose-500 hover:bg-rose-50 rounded-xl">
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
              <Button onClick={saveQuiz} className="bg-blue-600 h-14 px-8 rounded-2xl font-black gap-2 shadow-lg shadow-blue-100">
                <Save size={18} /> Lưu trắc nghiệm
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
