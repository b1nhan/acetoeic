import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  Target, 
  Zap, 
  BarChart3, 
  BookOpen, 
  ArrowRight,
  Star
} from "lucide-react";
import { motion } from "motion/react";

export default function Landing() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-52">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-6">
                Now with AI Feedback
              </span>
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl mb-6">
                Master TOEIC Faster with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  AI-Powered Learning
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-600 mb-10">
                Personalized practice, real simulation exams, and instant AI analytics to help you reach your target score in half the time.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200">
                    Start Free Test <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-200 hover:bg-slate-50">
                    View Courses
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Abstract background blobs */}
        <div className="absolute top-0 -z-10 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden">
          <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[100px] opacity-30"></div>
        </div>
      </section>

      {/* Stats Section - Bento Grid Style */}
      <section className="bg-background py-12 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Students", value: "50,000+", color: "bg-blue-50 text-blue-600" },
              { label: "Avg. Score Increase", value: "+185 pts", color: "bg-emerald-50 text-emerald-600" },
              { label: "AI Practice Sessions", value: "1.2M+", color: "bg-orange-50 text-orange-600" },
              { label: "Success Rate", value: "94%", color: "bg-rose-50 text-rose-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-200 p-8 rounded-[32px] text-center shadow-sm">
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mt-2 ${stat.color}`}>
                   {stat.label}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Features Section - Bento Bento */}
      <section className="py-24 lg:py-32 px-4 h-full bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 sm:text-5xl mb-4 italic tracking-tighter">Engineered for Results.</h2>
            <p className="text-lg text-slate-500 font-medium">Why students choose AceTOEIC over traditional centers.</p>
          </div>

          <div className="grid grid-cols-12 gap-4 auto-rows-[240px]">
            <div className="col-span-12 md:col-span-8 bg-white border border-slate-200 rounded-[40px] p-10 flex flex-col justify-between shadow-sm group hover:shadow-xl transition-all">
               <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <Zap size={32} />
               </div>
               <div>
                  <h3 className="text-2xl font-black mb-3 text-slate-900">Adaptive AI Intelligence</h3>
                  <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                    Our proprietary LLM analyzes your grammar weaknesses in real-time, generating customized drills that target exactly where you're losing points.
                  </p>
               </div>
            </div>

            <div className="col-span-12 md:col-span-4 bg-slate-900 text-white rounded-[40px] p-10 flex flex-col justify-between relative overflow-hidden group">
               <div className="relative z-10">
                 <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6">
                    <Target size={32} />
                 </div>
                 <h3 className="text-2xl font-black mb-3">Real Simulation</h3>
                 <p className="text-slate-400 font-medium text-sm leading-relaxed">
                    100% updated 2024 test formats with real-exam timing and ambient noise options.
                 </p>
               </div>
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-colors" />
            </div>

            <div className="col-span-12 md:col-span-4 bg-emerald-50 border border-emerald-100 rounded-[40px] p-10 flex flex-col justify-between group">
               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <BarChart3 size={32} />
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Growth Tracking</h3>
                  <p className="text-slate-600 text-sm font-medium">Predictive scoring accurate within ±15 points.</p>
               </div>
            </div>

            <div className="col-span-12 md:col-span-8 bg-blue-600 rounded-[40px] p-10 text-white flex items-center justify-between group overflow-hidden relative">
               <div className="relative z-10 max-w-md">
                 <h3 className="text-3xl font-black mb-4 tracking-tighter">Listen and Learn anywhere.</h3>
                 <p className="opacity-80 font-medium">Proprietary audio engine with variable speeds (0.8x to 1.2x).</p>
               </div>
               <div className="hidden lg:block relative z-10">
                  <BookOpen size={100} className="opacity-20 translate-x-12 translate-y-8 rotate-12" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Sneak Peek */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Start Your Roadmap Today</h2>
              <p className="text-lg text-slate-600">Choose the path that fits your current level.</p>
            </div>
            <Link to="/courses">
              <Button variant="link" className="text-blue-600 font-bold p-0 text-lg">
                View all courses <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Foundations", score: "0-450", lessons: 12, rating: 4.8 },
              { title: "Step Up", score: "450-750", lessons: 24, rating: 4.9 },
              { title: "Mastery", score: "750-990", lessons: 18, rating: 5.0 },
            ].map((course, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[16/9] bg-slate-100 rounded-3xl overflow-hidden mb-5 relative">
                  <img 
                    src={`https://picsum.photos/seed/toeic${i}/800/400`} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                      {course.lessons} Lessons
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{course.title} TOEIC</h3>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {course.rating}</span>
                  <span className="text-blue-600 font-bold">Target: {course.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-blue-600 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">Ready to reach your goal?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join 50,000+ students already improving their scores with AceTOEIC. Start your 7-day free trial today.
          </p>
          <Link to="/signup">
            <Button size="lg" className="h-16 px-10 text-xl bg-white text-blue-600 hover:bg-slate-50 shadow-2xl">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
