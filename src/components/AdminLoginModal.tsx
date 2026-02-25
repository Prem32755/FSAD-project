import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Shield, User, Lock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginModalProps {
  onClose: () => void;
}

export const AdminLoginModal = ({ onClose }: AdminLoginModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate admin login (demo)
    setTimeout(() => {
      if (formData.email === 'admin@homevalueplus.com' && formData.password === 'admin123') {
        toast({
          title: "Login Successful!",
          description: "Welcome to the Admin Dashboard.",
        });
        onClose();
        // In a real app, you would redirect to the admin dashboard here
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
    >
      {/* Backdrop: slightly dim with subtle blur */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card: near-opaque background for readability; ensure no clipping */}
      <Card
        className="relative w-full max-w-md max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl
                   bg-white/97 text-gray-900 dark:(bg-gray-900/95 text-gray-100) border border-gray-200/30"
      >
        <CardHeader className="p-6 rounded-t-2xl bg-gradient-to-r from-[#4B39EF] to-[#CC5500] text-white relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:bg-white/10"
            aria-label="Close admin login"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <CardTitle id="admin-login-title" className="text-2xl font-semibold">Admin Access</CardTitle>
              <CardDescription className="text-white/90">Secure login to platform management</CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Card content: keep readable inputs; allow dropdowns/popovers to escape if added later */}
        <CardContent className="p-6 overflow-visible">
          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-gradient-to-r from-white/40 to-white/20 rounded-lg border border-gray-100/40">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#4B39EF] mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Demo Credentials</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Email: <span className="font-mono">admin@homevalueplus.com</span><br />
                  Password: <span className="font-mono">admin123</span>
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="adminEmail"
                type="email"
                inputMode="email"
                placeholder="admin@homevalueplus.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="bg-white border border-gray-200 text-gray-900 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-[#4B39EF]/30 focus:border-[#4B39EF]"
                aria-label="Admin email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPassword" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="adminPassword"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="bg-white border border-gray-200 text-gray-900 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-[#4B39EF]/30 focus:border-[#4B39EF]"
                aria-label="Admin password"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#4B39EF] to-[#CC5500] text-white flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  Logging in...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Access Admin Panel
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Need help? Contact{' '}
              <a href="mailto:support@homevalueplus.com" className="text-[#4B39EF] hover:underline">
                support@homevalueplus.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
