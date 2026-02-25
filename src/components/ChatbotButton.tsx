import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary hover:shadow-glow transition-all duration-300 z-40 p-0"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white animate-pulse" />
        )}
      </Button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 z-40 animate-scale-in">
          <Card className="shadow-brand-xl border-primary/20">
            <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                HomeValue+ Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Hi! I'm here to help you with home improvement questions. 
                  What would you like to know about enhancing your property?
                </p>
                
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => {
                      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                  >
                    💰 Calculate property value increase
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => {
                      document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                  >
                    🏠 Browse home improvement ideas
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                  >
                    📞 Contact our experts
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    Available 24/7 • Powered by AI
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};