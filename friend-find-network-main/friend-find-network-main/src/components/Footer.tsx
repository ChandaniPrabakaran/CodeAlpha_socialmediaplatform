
import { Card } from '@/components/ui/card';
import { Logo } from './Logo';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo size="sm" />
              <p className="text-sm text-muted-foreground">
                Connect, Share, and Flex Your Life
              </p>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-accent fill-current" />
              <span>by FlexItHere Team</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>© 2024 FlexItHere. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="hover:text-foreground transition-colors">Privacy Policy</button>
                <button className="hover:text-foreground transition-colors">Terms of Service</button>
                <button className="hover:text-foreground transition-colors">Support</button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </footer>
  );
};
