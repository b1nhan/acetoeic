import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Menu, 
  X, 
  User, 
  LayoutDashboard, 
  LogOut,
  GraduationCap
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-105">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">
              GIỎI<span className="text-blue-600">TOEIC</span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <Link to="/courses">
            <Button variant="ghost" className="text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-4">Khóa học</Button>
          </Link>
          <Link to="/tu-vung">
            <Button variant="ghost" className="text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-4">Từ vựng</Button>
          </Link>
          <Link to="/trac-nghiem">
            <Button variant="ghost" className="text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-4">Trắc nghiệm</Button>
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin/cms-landing">
              <Button variant="ghost" className="text-sm font-black text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg px-4">Admin CMS</Button>
            </Link>
          )}
          <Link to="/pricing">
            <Button variant="ghost" className="text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-4">Bảng giá</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" className="text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-4">Về chúng tôi</Button>
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="text-slate-600 font-bold hover:bg-slate-50">Cá nhân</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Button variant="ghost" className="relative h-10 w-10 rounded-xl p-0 hover:bg-slate-50">
                    <Avatar className="h-10 w-10 border border-slate-200 rounded-xl overflow-hidden">
                      <AvatarFallback className="bg-blue-50 text-blue-600 font-black rounded-none">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-2 rounded-2xl border-slate-200 shadow-xl" align="end">
                  <DropdownMenuLabel className="font-bold py-2 px-3">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-black text-slate-900">{user.name}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Tài khoản học viên</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="rounded-xl focus:bg-slate-50 cursor-pointer font-bold px-3 py-2">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Bảng điều khiển</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-xl focus:bg-rose-50 text-rose-600 cursor-pointer font-bold px-3 py-2">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-4">
              <Link to="/login">
                <Button variant="ghost" className="text-slate-600 font-bold hover:bg-slate-50 px-6">Đăng nhập</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 rounded-xl shadow-lg shadow-blue-100 transition-all hover:scale-105 active:scale-95">
                  Bắt đầu ngay
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white p-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/courses" className="text-base font-medium text-slate-600">Courses</Link>
            <Link to="/pricing" className="text-base font-medium text-slate-600">Pricing</Link>
            <Link to="/dashboard" className="text-base font-medium text-slate-600">Dashboard</Link>
            <div className="flex flex-col gap-2 pt-2">
              {!user && (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
