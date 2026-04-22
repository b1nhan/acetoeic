import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Loader2 } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await signup({ name, email, password });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Không thể tạo tài khoản");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md border-none shadow-xl rounded-3xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg text-white">
            <GraduationCap size={28} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Tạo tài khoản</CardTitle>
          <CardDescription>
            Tham gia GIỎI TOEIC ngay hôm nay để bắt đầu hành trình của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Họ và Tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Địa chỉ Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Chọn mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
            {error && <p className="text-sm font-medium text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Đăng ký"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-500">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
