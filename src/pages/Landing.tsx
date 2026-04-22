import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  Headphones,
  Library,
  ListChecks,
  Video,
  Bug,
  Bell,
  House,
  Users,
  FileText,
  Award,
  Zap,
  Target,
  Brain,
  TrendingUp,
  Clock,
  Shield,
  MessageSquareQuote,
  Star,
  CircleUser,
  Trophy,
  CheckCircle,
  Rocket,
  Swords,
  ChartColumn
} from "lucide-react";
import { motion } from "motion/react";

export default function Landing() {
  const [content, setContent] = useState<any>({
    heroTitle: "Ten Academy",
    heroSubtitle: "Luyện TOEIC hiệu quả. Đạt mục tiêu dễ dàng",
    ctaText: "Bắt đầu luyện tập",
    stats: {
      students: "300+",
      listening: "1,000+",
      grammar: "500+"
    },
    testimonials: [
      { name: "Minh Anh", score: "850+ TOEIC", text: "Ten Academy giúp mình tăng 200 điểm chỉ sau 2 tháng luyện tập. Hệ thống chấm bài AI rất chính xác." },
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

  useEffect(() => {
    const stored = localStorage.getItem("landing_content");
    if (stored) {
      const parsed = JSON.parse(stored);
      setContent({
        ...content,
        ...parsed
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>
        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-8 border border-blue-100 shadow-sm">
              <Sparkles className="w-4 h-4" />
              Nền tảng luyện TOEIC hàng đầu cho người Việt
            </div>
            <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tighter text-slate-900 mb-8 whitespace-pre-line">
              {content.heroTitle}
            </h1>
            <p className="mt-6 text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pb-10">
              <Link to="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-10 h-16 text-lg font-black gap-2 shadow-2xl shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                  {content.ctaText} <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 rounded-2xl px-10 h-16 text-lg font-bold">
                  Xem khóa học
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Đăng ký miễn phí</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Theo dõi tiến độ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Giải thích chi tiết</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600/40" />
              </div>
              <p className="text-4xl font-black text-blue-600 tracking-tighter">{content.stats?.students}</p>
              <p className="text-sm text-slate-500 mt-2 font-bold uppercase tracking-wider">Học viên đang học</p>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-blue-600/40" />
              </div>
              <p className="text-4xl font-black text-blue-600 tracking-tighter">{content.stats?.listening}</p>
              <p className="text-sm text-slate-500 mt-2 font-bold uppercase tracking-wider">Câu luyện nghe</p>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-blue-600/40" />
              </div>
              <p className="text-4xl font-black text-blue-600 tracking-tighter">{content.stats?.grammar}</p>
              <p className="text-sm text-slate-500 mt-2 font-bold uppercase tracking-wider">Câu hỏi ngữ pháp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Bento Grid */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter italic">Luyện tập thông minh.</h2>
          <p className="text-slate-500 text-lg mt-4 font-medium">Chọn kỹ năng bạn muốn tập trung hôm nay</p>
        </div>

        <div className="grid grid-cols-12 gap-4 auto-rows-[180px]">
          {/* Main Skills Group */}
          <div className="col-span-12 md:col-span-8 row-span-2 bg-white border border-slate-200 rounded-[40px] p-8 flex flex-col justify-between group hover:shadow-xl transition-all">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                <Headphones className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">Reading & Listening</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Bộ đề mô phỏng sát 100% đề thi ETS thật với đầy đủ các phần từ Part 1 đến Part 7.</p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 row-span-1 bg-blue-600 rounded-[40px] p-8 text-white flex items-center justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-1">Ngữ pháp</h3>
              <p className="text-blue-100 text-sm font-bold opacity-80">Chuyên sâu 24 chủ điểm</p>
            </div>
            <Library className="w-12 h-12 text-white/20 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
          </div>

          <div className="col-span-12 md:col-span-4 row-span-1 bg-slate-900 rounded-[40px] p-8 text-white flex items-center justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-1">Từ vựng</h3>
              <p className="text-slate-400 text-sm font-bold opacity-80">Flashcard thông minh</p>
            </div>
            <Zap className="w-12 h-12 text-white/20 relative z-10" />
          </div>

          {/* Tools Grid */}
          <div className="col-span-6 md:col-span-3 row-span-1 bg-white border border-slate-200 rounded-[32px] p-6 flex flex-col justify-between hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <ListChecks className="w-6 h-6" />
            </div>
            <p className="font-black text-slate-900">Trắc nghiệm</p>
          </div>

          <div className="col-span-6 md:col-span-3 row-span-1 bg-white border border-slate-200 rounded-[32px] p-6 flex flex-col justify-between hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
              <Video className="w-6 h-6" />
            </div>
            <p className="font-black text-slate-900">Video bài giảng</p>
          </div>

          <div className="col-span-6 md:col-span-3 row-span-1 bg-white border border-slate-200 rounded-[32px] p-6 flex flex-col justify-between hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
              <Swords className="w-6 h-6" />
            </div>
            <p className="font-black text-slate-900">Dò bài live</p>
          </div>

          <div className="col-span-6 md:col-span-3 row-span-1 bg-white border border-slate-200 rounded-[32px] p-6 flex flex-col justify-between hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <ChartColumn className="w-6 h-6" />
            </div>
            <p className="font-black text-slate-900">Tiến độ</p>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.1),transparent)]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-400 text-sm font-bold mb-4 border border-white/10 shadow-sm">
              <Sparkles className="w-4 h-4" />
              Điểm khác biệt
            </div>
            <h2 className="text-3xl sm:text-5xl font-black italic tracking-tighter mb-4">Tại sao chọn Ten Academy?</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Công nghệ hiện đại kết hợp phương pháp học tập khoa học cá nhân hóa cho người Việt.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "AI chấm bài thông minh", 
                desc: "Hệ thống AI phân tích bài làm, chỉ ra lỗi sai và gợi ý cách cải thiện chi tiết cho từng câu.", 
                icon: <Brain className="w-6 h-6" />,
                color: "from-blue-500/20 to-cyan-500/20"
              },
              { 
                title: "3,000+ câu hỏi cập nhật", 
                desc: "Ngân hàng đề thi khổng lồ, bám sát format ETS, cập nhật xu hướng đề mới nhất hàng tháng.", 
                icon: <Target className="w-6 h-6" />,
                color: "from-emerald-500/20 to-teal-500/20"
              },
              { 
                title: "Phân tích điểm yếu", 
                desc: "Dashboard thông minh tự động phát hiện kỹ năng cần cải thiện, đề xuất lộ trình cá nhân hóa.", 
                icon: <TrendingUp className="w-6 h-6" />,
                color: "from-violet-500/20 to-purple-500/20"
              },
              { 
                title: "Luyện tập không giới hạn", 
                desc: "Truy cập 24/7 trên mọi thiết bị, không giới hạn số lần làm bài, học mọi lúc mọi nơi.", 
                icon: <Zap className="w-6 h-6" />,
                color: "from-amber-500/20 to-orange-500/20"
              },
              { 
                title: "Chấm điểm tức thì", 
                desc: "Nhận kết quả và giải thích ngay sau khi hoàn thành, tiết kiệm thời gian chờ đợi.", 
                icon: <Clock className="w-6 h-6" />,
                color: "from-rose-500/20 to-pink-500/20"
              },
              { 
                title: "Bảo mật & riêng tư", 
                desc: "Dữ liệu học tập được mã hóa và bảo vệ, chỉ bạn mới có quyền truy cập kết quả cá nhân.", 
                icon: <Shield className="w-6 h-6" />,
                color: "from-slate-500/20 to-gray-500/20"
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[40px] p-8 group hover:bg-white/10 transition-colors">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br transition-transform group-hover:scale-110 flex items-center justify-center mb-6 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="font-black text-xl mb-3">{feature.title}</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4 border border-blue-100 shadow-sm">
              <MessageSquareQuote className="w-4 h-4" />
              Học viên nói gì
            </div>
            <h2 className="text-3xl sm:text-5xl font-black italic tracking-tighter text-slate-900">Feedback từ học viên.</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.testimonials?.map((testimonial: any, i: number) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-[40px] p-10 relative group hover:shadow-xl transition-all">
                <div className="flex items-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-700 text-lg font-medium italic leading-relaxed mb-8">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="text-slate-900 font-black">— {testimonial.name}</p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full">{testimonial.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="bg-slate-50 border-y border-slate-200 relative overflow-hidden py-24">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4 border border-blue-100 shadow-sm">
              <CircleUser className="w-4 h-4" />
              Người sáng lập
            </div>
            <h2 className="text-3xl sm:text-5xl font-black italic tracking-tighter text-slate-900">Giảng viên & Người sáng lập</h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-[48px] overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="md:w-2/5 relative bg-blue-600 flex items-center justify-center p-8">
                <div className="w-64 h-64 bg-white/20 rounded-full blur-[80px] absolute" />
                <img 
                  src={content.founder?.avatar} 
                  alt={content.founder?.name} 
                  className="w-full aspect-square object-cover rounded-3xl relative z-10 shadow-2xl ring-8 ring-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center">
                <p className="text-blue-600 text-sm font-black uppercase tracking-widest mb-2">{content.founder?.role}</p>
                <h3 className="text-4xl font-black text-slate-900 mb-6">{content.founder?.name}</h3>
                <div className="flex flex-wrap gap-3 mb-10">
                  {content.founder?.highlights?.map((h: string, i: number) => (
                    <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-sm font-black shadow-lg">
                      {h.includes("TOEIC") ? <Trophy className="w-4 h-4 text-amber-400" /> : <Headphones className="w-4 h-4" />} {h}
                    </span>
                  ))}
                </div>
                <ul className="space-y-4">
                  {content.founder?.achievements?.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-4 text-slate-600 font-bold">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Rocket className="w-16 h-16 text-blue-600 mx-auto mb-8 animate-bounce" />
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter italic mb-6">Sẵn sàng chinh phục TOEIC?</h2>
            <p className="text-xl text-slate-500 mb-12 max-w-lg mx-auto font-medium">Tham gia cùng 300+ học viên đang phá kỷ lục điểm số mỗi ngày trên Ten Academy.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl px-12 h-20 text-2xl font-black gap-3 shadow-2xl shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                  Bắt đầu ngay <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400 font-bold uppercase tracking-widest">
          <span>© 2025 Ten Academy. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-600 transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Bảo mật</a>
          </div>
          <span className="text-slate-300">Nền tảng luyện thi hàng đầu Việt Nam</span>
        </div>
      </footer>
    </div>
  );
}
