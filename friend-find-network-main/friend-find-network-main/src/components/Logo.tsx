
import { Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 40
  };

  return (
    <div className={`flex items-center gap-2 font-bold ${sizeClasses[size]} ${className}`}>
      <div className="flex items-center justify-center w-fit h-fit p-1 rounded-lg flex-gradient">
        <Zap size={iconSizes[size]} className="text-white" />
      </div>
      <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        FlexItHere
      </span>
    </div>
  );
};
