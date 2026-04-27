import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface AdminLoginModalProps {
  onClose: () => void;
}

export const AdminLoginModal = ({ onClose }: AdminLoginModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isAdmin } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const ok = await login(formData.email, formData.password);
    setIsLoading(false);

    if (ok && formData.email.trim().toLowerCase() === 'admin@homevalueplus.com') {
      toast({
        title: 'Login Successful!',
        description: 'Welcome to the Admin Dashboard.',
      });
      onClose();
      navigate('/admin');
      return;
    }

    toast({
      title: 'Login Failed',
      description: 'Use admin@homevalueplus.com / admin123 for admin access.',
      variant: 'destructive'
    });
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} />

      <Card className="relative w-full max-w-md rounded-2xl shadow-2xl bg-white">
        <CardHeader className="p-6 bg-gradient-to-r from-[#0c4a6e] to-[#059669] text-white relative">
          <Button variant="ghost" size="sm" onClick={onClose} className="absolute right-4 top-4 text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription className="text-white/90">Secure login to platform management</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="admin@homevalueplus.com" />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Enter password" />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#0c4a6e] to-[#059669] text-white">
              {isLoading ? 'Logging in...' : 'Access Admin Panel'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
