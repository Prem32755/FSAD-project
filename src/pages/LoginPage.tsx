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

  const gradientBackground = "min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-[#4B39EF] to-[#CC5500]";
  const cardStyles = "w-full max-w-md shadow-2xl rounded-xl";
  const buttonGradient = "bg-gradient-to-r from-[#4B39EF] to-[#CC5500] hover:from-[#3a29d5] hover:to-[#b84c00] text-white font-semibold";

  return (
    <div className={gradientBackground}>
      <Card className={cardStyles}>
        <CardHeader className="text-center pt-8 pb-6">
          <CardTitle className="text-3xl font-extrabold text-[#4B39EF]">
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
                className="focus:border-[#CC5500] focus:ring-[#CC5500]"
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
                className="focus:border-[#CC5500] focus:ring-[#CC5500]"
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
            <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-[#4B39EF] hover:text-[#CC5500] p-0 h-auto">
              {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
