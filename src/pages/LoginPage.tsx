import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, LogIn, UserPlus, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
  const { toast } = useToast();
  const { login, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

  useEffect(() => {
    if (!user) return;
    navigate(isAdmin ? "/admin" : "/", { replace: true });
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!email || password.length < 6) {
      const message = "Please enter a valid email and a password of at least 6 characters.";
      setErrorMessage(message);
      toast({
        title: "Validation Error",
        description: message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    let ok = false;
    let failureReason = "";

    if (mode === "register") {
      if (!/\d/.test(password)) {
        const message = "Password must contain at least one number.";
        setErrorMessage(message);
        toast({
          title: "Validation Error",
          description: message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: normalizedEmail, password }),
        });
        ok = res.ok;
        if (!res.ok) {
          failureReason = (await res.text()) || "Could not create the account.";
        }
      } catch {
        ok = false;
        failureReason = "Could not reach the server. Please make sure the backend is running.";
      }
    } else {
      const result = await login(normalizedEmail, password);
      ok = result.ok;
      if (!result.ok) {
        failureReason = result.message || "Invalid email or password.";
      }
    }

    setIsLoading(false);

    if (!ok) {
      setErrorMessage(failureReason);
      toast({
        title: mode === "register" ? "Registration Failed" : "Login Failed",
        description: failureReason || (mode === "register"
          ? "Could not create the account. The email may already exist."
          : "Invalid email or password. Admin and user both log in here."),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: mode === "register" ? "Account Created" : "Login Successful",
      description: mode === "register"
        ? "Your user account has been created. Please log in now."
        : `Welcome, ${normalizedEmail}`,
    });

    if (mode === "register") {
      setMode("login");
      setPassword("");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c4a6e]/80 via-[#059669]/70 to-[#d97706]/60" />

      <Card className="w-full max-w-md shadow-2xl rounded-xl backdrop-blur-md bg-white/90 relative z-10">
        <CardHeader className="text-center pt-8 pb-6">
          <div className="flex justify-center mb-4 gap-2">
            <button onClick={() => setMode("login")} className={`px-4 py-2 rounded-md text-sm font-semibold ${mode === "login" ? "bg-[#0c4a6e] text-white" : "bg-gray-100 text-gray-700"}`}>
              Login
            </button>
            <button onClick={() => setMode("register")} className={`px-4 py-2 rounded-md text-sm font-semibold ${mode === "register" ? "bg-[#059669] text-white" : "bg-gray-100 text-gray-700"}`}>
              Register User
            </button>
          </div>
          <CardTitle className="text-3xl font-extrabold text-[#0c4a6e]">
            {mode === "register" ? "Create User Account" : "Admin and User Login"}
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            {mode === "register"
              ? "Register a normal user account here."
              : "Both admin and user log in from this same page."}
          </p>
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-left text-xs text-gray-600">
            <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2"><Shield className="w-4 h-4" /> Demo accounts</div>
            <div>Admin: admin@homevalueplus.com / admin123</div>
            <div>User: user@homevalueplus.com / user123</div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" /> Email
              </Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="focus:border-[#059669] focus:ring-[#059669]" aria-label="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" /> Password (min 6 characters, include a number)
              </Label>
              <Input id="password" name="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required className="focus:border-[#059669] focus:ring-[#059669]" aria-label="password" />
            </div>

            {errorMessage && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#0c4a6e] to-[#059669] hover:from-[#0a3a56] hover:to-[#047857] text-white font-semibold mt-6" aria-busy={isLoading}>
              {isLoading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 inline-block" aria-hidden="true" />Processing...</>
              ) : (
                <>{mode === "register" ? <UserPlus className="w-4 h-4 mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}{mode === "register" ? "Create User Account" : "Log In"}</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
