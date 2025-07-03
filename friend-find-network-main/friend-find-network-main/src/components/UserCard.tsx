
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/types/social';
import { UserAvatar } from './UserAvatar';

interface UserCardProps {
  user: User;
  currentUserId: string;
  isFollowing: boolean;
  onToggleFollow: (userId: string) => void;
  onClick?: () => void;
}

export const UserCard = ({ 
  user, 
  currentUserId, 
  isFollowing, 
  onToggleFollow,
  onClick 
}: UserCardProps) => {
  const isCurrentUser = user.id === currentUserId;

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserAvatar user={user} size="lg" />
            <div>
              <h3 className="font-semibold">{user.displayName}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          
          {!isCurrentUser && (
            <Button
              variant={isFollowing ? "secondary" : "default"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFollow(user.id);
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm mb-3">{user.bio}</p>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <span><strong>{user.followers.length}</strong> followers</span>
          <span><strong>{user.following.length}</strong> following</span>
        </div>
      </CardContent>
    </Card>
  );
};
