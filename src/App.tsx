import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/layout/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center">Đang tải...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/practice" 
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
