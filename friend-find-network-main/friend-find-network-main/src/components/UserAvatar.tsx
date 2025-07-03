
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from '@/types/social';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar = ({ user, size = 'md', className = '' }: UserAvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={user.avatar} alt={user.displayName} />
      <AvatarFallback>
        {user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
