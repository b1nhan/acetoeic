import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Email hoặc mật khẩu không chính xác");
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
          <CardTitle className="text-2xl font-bold tracking-tight">Chào mừng trở lại</CardTitle>
          <CardDescription>
            Nhập thông tin đăng nhập để truy cập bảng điều khiển
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl border-slate-200"
              />
            </div>
            {error && <p className="text-sm font-medium text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Đăng nhập"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-500">
            Chưa có tài khoản?{" "}
            <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
              Đăng ký miễn phí
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
