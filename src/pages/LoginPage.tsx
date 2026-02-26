// src/pages/LoginPage.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email and a password of at least 6 characters.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const ok = await login(email, password);

    setIsLoading(false);

    if (!ok) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials (mock). Use any email and password >= 6 chars.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Welcome, ${email}`,
    });

    // After login, redirect to home
    navigate("/", { replace: true });
  };

  const gradientBackground = "min-h-screen flex items-center justify-center p-4 relative overflow-hidden";
  const cardStyles = "w-full max-w-md shadow-2xl rounded-xl backdrop-blur-md bg-white/90 relative z-10";
  const buttonGradient = "bg-gradient-to-r from-[#0c4a6e] to-[#059669] hover:from-[#0a3a56] hover:to-[#047857] text-white font-semibold";

  return (
    <div className={gradientBackground}>
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c4a6e]/80 via-[#059669]/70 to-[#d97706]/60" />
      
      <Card className={cardStyles}>
        <CardHeader className="text-center pt-8 pb-6">
          <CardTitle className="text-3xl font-extrabold text-[#0c4a6e]">
            {isSignUp ? "Create Your Account" : "Welcome to HomeValue+"}
          </CardTitle>
          <p className="text-sm text-gray-500">
            {isSignUp ? "Join now to track your property’s value." : "Sign in to access personalized recommendations."}
          </p>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:border-[#059669] focus:ring-[#059669]"
                aria-label="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" />
                Password (min 6 characters)
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:border-[#059669] focus:ring-[#059669]"
                aria-label="password"
              />
            </div>

            <Button type="submit" disabled={isLoading} className={`w-full ${buttonGradient} mt-6`} aria-busy={isLoading}>
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 inline-block" aria-hidden="true" />
                  Processing...
                </>
              ) : (
                <>
                  {isSignUp ? <UserPlus className="w-4 h-4 mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
                  {isSignUp ? "Sign Up" : "Log In"}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-[#0c4a6e] hover:text-[#d97706] p-0 h-auto">
              {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
