import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-brand-xl">
        <CardContent className="p-8">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold text-gradient-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>
          
          <div className="space-y-4">
            <Button 
              asChild
              className="w-full btn-hero"
            >
              <a href="/">
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </a>
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            Need help? <a href="/#contact" className="text-primary hover:underline">Contact our support team</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
