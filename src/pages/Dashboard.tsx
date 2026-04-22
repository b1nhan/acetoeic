import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Flame, 
  Target, 
  BookOpen, 
  ChevronRight, 
  Clock,
  History,
  TrendingUp,
  BrainCircuit,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

const MOCK_CHART_DATA = [
  { date: "Oct", score: 450 },
  { date: "Nov", score: 520 },
  { date: "Dec", score: 480 },
  { date: "Jan", score: 610 },
  { date: "Feb", score: 680 },
  { date: "Mar", score: 720 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api.dashboard.get(),
  });

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading your progress...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bảng điều khiển học viên</h1>
          <p className="text-slate-500 mt-1">Kiên trì là chìa khóa để đạt điểm 750+.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
             <Flame className="w-5 h-5 text-orange-500" />
             <span className="text-sm font-bold text-slate-700">{data?.streak || 0} Ngày liên tiếp</span>
          </div>
          <Link to="/practice">
            <Button className="bg-blue-600 hover:bg-blue-700 h-10 px-6 rounded-full font-bold shadow-lg shadow-blue-100">
              Luyện tập ngay
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 auto-rows-[120px]">
        {/* Main Score Prediction - Bento Large */}
        <div className="col-span-12 lg:col-span-8 row-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between">
           <div className="flex justify-between items-start">
             <div>
               <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Điểm TOEIC dự kiến</h3>
               <div className="flex items-baseline gap-3">
                 <span className="text-6xl font-black text-blue-600">785</span>
                 <span className="text-slate-400 font-bold text-xl">/ 990</span>
               </div>
             </div>
             <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-100">
               +45 từ tuần trước
             </div>
           </div>
           <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Tiến độ hiện tại</span>
                <span>Mục tiêu: 850</span>
              </div>
              <Progress value={82} className="h-3 bg-slate-100" />
           </div>
        </div>

        {/* Daily Mission - Bento Gradient highlight */}
        <div className="col-span-12 lg:col-span-4 row-span-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white flex flex-col">
           <h3 className="font-black text-2xl mb-6">Mục tiêu hôm nay</h3>
           <div className="space-y-6 flex-1">
             {[
               { text: "15 phút luyện Nghe", done: true },
               { text: "10 từ vựng mới", done: false },
               { text: "Hoàn thành bài tập Ngữ pháp Part 5", done: false },
             ].map((goal, i) => (
               <div key={i} className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${goal.done ? 'bg-white border-white text-blue-600' : 'border-white/30 bg-white/10'}`}>
                    {goal.done && <ChevronRight className="w-4 h-4" />}
                  </div>
                  <span className={`text-base font-medium ${goal.done ? 'opacity-100 line-through' : 'opacity-80'}`}>{goal.text}</span>
               </div>
             ))}
           </div>
           <Link to="/practice" className="mt-8">
             <Button className="w-full h-14 bg-white text-blue-700 hover:bg-blue-50 font-black text-lg rounded-2xl shadow-xl transition-all hover:scale-[1.02]">
               Bắt đầu học
             </Button>
           </Link>
        </div>

        {/* Stats Grid - Smaller Bento pieces */}
        <div className="col-span-6 lg:col-span-4 row-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
           <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
             <Target className="w-6 h-6 text-emerald-600" />
           </div>
           <div>
              <p className="text-slate-500 text-sm font-bold">Tổng điểm tích lũy</p>
              <h4 className="text-3xl font-black text-slate-900">{data?.user?.points?.toLocaleString() || 0}</h4>
           </div>
           <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
              <TrendingUp className="w-3 h-3" /> +12% tuần này
           </div>
        </div>

        <div className="col-span-6 lg:col-span-4 row-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
           <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
             <Flame className="w-6 h-6 text-orange-500" />
           </div>
           <div>
              <p className="text-slate-500 text-sm font-bold">Chuỗi học tập</p>
              <h4 className="text-3xl font-black text-slate-900">{data?.streak || 0} Ngày</h4>
           </div>
           <div className="flex gap-1.5">
              {[1, 1, 1, 1, 1, 0, 0].map((v, i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full ${v ? 'bg-orange-400' : 'bg-slate-100'}`} />
              ))}
           </div>
        </div>

        {/* Performance Chart - Large Bento */}
        <div className="col-span-12 lg:col-span-8 row-span-3 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-900 italic">Biểu đồ phong độ</h3>
              <div className="flex gap-2">
                 <Badge variant="outline" className="rounded-lg border-slate-200">Lịch sử điểm</Badge>
              </div>
           </div>
           <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_CHART_DATA}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" hide />
                    <YAxis hide domain={[0, 990]} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
           </div>
        </div>

        {/* Skill Proficiency - Bento pieces */}
        <div className="col-span-12 lg:col-span-4 row-span-3 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
           <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-wider">Mức độ thông thạo</h3>
           <div className="space-y-5">
             {[
               { label: "Nghe hiểu", val: 88, color: "bg-emerald-500" },
               { label: "Đọc hiểu", val: 65, color: "bg-orange-400" },
               { label: "Ngữ pháp", val: 72, color: "bg-blue-500" },
               { label: "Từ vựng", val: 91, color: "bg-blue-600" },
             ].map((skill, i) => (
               <div key={i} className="space-y-2">
                 <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>{skill.label}</span>
                    <span className="text-slate-900">{skill.val}%</span>
                 </div>
                 <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${skill.color} rounded-full transition-all duration-1000`} style={{ width: `${skill.val}%` }} />
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Weakness Alert - The "Red" Bento Piece */}
        <div className="col-span-12 lg:col-span-4 row-span-1 bg-rose-50 border border-rose-100 rounded-3xl p-5 flex items-center gap-5 group cursor-pointer hover:bg-rose-100 transition-colors">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-rose-500">
              <AlertCircle className="w-6 h-6" />
           </div>
           <div className="flex-1">
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Điểm yếu cần chú ý</p>
              <h4 className="text-sm font-bold text-slate-900">Part 6: Hoàn thành đoạn văn</h4>
           </div>
           <ChevronRight className="w-5 h-5 text-rose-300 group-hover:text-rose-500 transition-transform group-hover:translate-x-1" />
        </div>

        {/* Current Lesson - Visual Bento Piece */}
        <div className="col-span-12 lg:col-span-4 row-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group">
           <div className="h-28 overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=600" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
               alt="Course"
               referrerPolicy="no-referrer"
             />
           </div>
           <div className="p-6">
              <h4 className="font-bold text-slate-900 mb-1">TOEIC Masterclass 750+</h4>
              <p className="text-xs text-slate-500 mb-4">Phần 4: Đọc hiểu chi tiết</p>
              <Progress value={62} className="h-1.5 mb-4" />
              <Button variant="outline" className="w-full h-10 rounded-xl font-bold border-slate-100 hover:bg-slate-50">Học tiếp</Button>
           </div>
        </div>

        {/* AI Buddy - Bento piece */}
        <div className="col-span-12 lg:col-span-4 row-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
           <div className="relative z-10">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                 <BrainCircuit className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-2">Trợ lý AI</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">"Nhận diện câu hỏi đuôi trong Part 2. Đây là điểm bạn hay mất điểm nhất hiện tại."</p>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full h-10 rounded-xl font-bold">Luyện tập thêm</Button>
           </div>
           <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-colors" />
        </div>
      </div>
    </div>
  );
}
