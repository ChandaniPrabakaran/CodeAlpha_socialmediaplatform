
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Users, Home } from 'lucide-react';
import { Logo } from './Logo';

export const Header = () => {
  const navItems = [
    { to: '/', label: 'Feed', icon: Home },
    { to: '/users', label: 'Users', icon: Users },
    { to: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            
            <nav className="flex items-center space-x-2">
              {navItems.map(item => (
                <NavLink key={item.to} to={item.to} end>
                  {({ isActive }) => (
                    <Button 
                      variant={isActive ? 'default' : 'ghost'} 
                      size="sm"
                      className={isActive ? 'flex-gradient text-white' : ''}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </Card>
      </div>
    </header>
  );
};
