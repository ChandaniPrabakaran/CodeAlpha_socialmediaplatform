
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';

export const Navigation = () => {
  const navItems = [
    { to: '/', label: 'Feed' },
    { to: '/users', label: 'Users' },
    { to: '/profile', label: 'Profile' }
  ];

  return (
    <Card className="p-4 mb-6">
      <nav className="flex justify-center space-x-2">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end>
            {({ isActive }) => (
              <Button variant={isActive ? 'default' : 'ghost'} size="sm">
                {item.label === 'Profile' && <User className="w-4 h-4 mr-2" />}
                {item.label}
              </Button>
            )}
          </NavLink>
        ))}
      </nav>
    </Card>
  );
};
