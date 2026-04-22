import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => api.courses.list(),
  });

  if (isLoading) return <div className="p-20 text-center text-slate-500">Loading catalog...</div>;

  const filteredCourses = courses?.filter((c: any) => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
          Lộ trình học tập bài bản
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Từ kiến thức nền tảng đến các chiến lược giải đề nâng cao, hãy chọn lộ trình phù hợp để đạt mục tiêu TOEIC dự định.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input 
            placeholder="Tìm kiếm khóa học, mô đun hoặc kỹ năng..." 
            className="pl-12 h-14 rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-14 px-6 rounded-2xl border-slate-200 bg-white shadow-sm font-bold flex items-center gap-2">
          <Filter className="h-5 w-5" /> Lọc bài học
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses?.map((course: any) => (
          <Card key={course.id} className="group border border-slate-200 shadow-sm rounded-3xl overflow-hidden flex flex-col bg-white transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="aspect-[16/10] relative overflow-hidden">
               <img 
                 src={course.image} 
                 alt={course.title}
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute top-4 left-4 flex gap-2">
                 <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 border-none px-3 py-1 font-bold shadow-sm rounded-lg">
                   {course.level}
                 </Badge>
                 {course.level === 'Nâng cao' && (
                   <Badge className="bg-blue-600 text-white border-none px-3 py-1 font-bold rounded-lg shadow-lg shadow-blue-200">
                     <Sparkles className="w-3 h-3 mr-1" /> Nổi bật
                   </Badge>
                 )}
               </div>
            </div>
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                {course.title}
              </CardTitle>
              <CardDescription className="text-slate-500 mt-2 font-medium leading-relaxed line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 flex-1">
              <div className="flex items-center gap-6 text-[10px] uppercase font-bold text-slate-400">
                <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 12giờ 45phút</div>
                <div className="flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> 24 Bài học</div>
                <div className="flex items-center gap-1.5"><Users className="w-3 h-3" /> 2.4k Học viên</div>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0">
               <Button className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black transition-all flex items-center justify-center gap-2 group-hover:shadow-xl group-hover:shadow-blue-100 group-hover:translate-x-1">
                  Đăng ký ngay <ChevronRight className="w-4 h-4" />
               </Button>
            </CardFooter>
          </Card>
        ))}
        {filteredCourses?.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500">
             Không tìm thấy khóa học nào khớp với "{searchTerm}"
          </div>
        )}
      </div>

      <div className="mt-24 p-12 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
           <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Cảm nhận học viên</span>
           <h2 className="text-3xl font-bold text-slate-900 mb-6 italic leading-relaxed">
             "GIỎI TOEIC đã thay đổi cách học của tôi. Tôi đã tăng từ 520 lên 785 chỉ trong 6 tuần luyện tập mỗi ngày. Phản hồi AI như một gia sư riêng 24/7."
           </h2>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">MT</div>
              <div>
                 <p className="font-bold text-slate-900">Minh Tú</p>
                 <p className="text-sm text-slate-500">Samsung Global Logistics</p>
              </div>
           </div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="aspect-square bg-slate-200 rounded-3xl overflow-hidden relative group">
                <img 
                  src={`https://picsum.photos/seed/review${i}/400/400`} 
                  alt="Học viên thành công"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                   <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
