
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageSquare } from 'lucide-react';
import { Post, User, Comment } from '@/types/social';
import { UserAvatar } from './UserAvatar';

interface PostCardProps {
  post: Post;
  user: User;
  comments: Comment[];
  currentUserId: string;
  users: User[];
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

export const PostCard = ({ 
  post, 
  user, 
  comments, 
  currentUserId, 
  users,
  onLike, 
  onComment 
}: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const isLiked = post.likes.includes(currentUserId);
  
  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'now';
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <UserAvatar user={user} />
          <div>
            <p className="font-semibold">{user.displayName}</p>
            <p className="text-sm text-muted-foreground">@{user.username} • {formatDate(post.createdAt)}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="mb-3">{post.content}</p>
        
        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full h-64 object-cover rounded-lg mb-3"
          />
        )}
        
        <div className="flex items-center space-x-4 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : ''}`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            <span>{post.likes.length}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1"
          >
            <MessageSquare size={16} />
            <span>{comments.length}</span>
          </Button>
        </div>
        
        {showComments && (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              />
              <Button onClick={handleComment} size="sm">Post</Button>
            </div>
            
            <div className="space-y-2">
              {comments.map(comment => {
                const commentUser = users.find(u => u.id === comment.userId);
                if (!commentUser) return null;
                
                return (
                  <div key={comment.id} className="flex space-x-2">
                    <UserAvatar user={commentUser} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{commentUser.displayName}</span>{' '}
                        {comment.content}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
