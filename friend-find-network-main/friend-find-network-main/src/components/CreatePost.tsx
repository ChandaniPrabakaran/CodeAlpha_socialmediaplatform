
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types/social';
import { UserAvatar } from './UserAvatar';

interface CreatePostProps {
  user: User;
  onCreatePost: (content: string, imageUrl?: string) => void;
}

export const CreatePost = ({ user, onCreatePost }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost(content, imageUrl || undefined);
      setContent('');
      setImageUrl('');
    }
  };

  return (
    <Card className="mb-6 border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <UserAvatar user={user} />
          <span className="text-primary">What's on your mind?</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Share your thoughts with FlexItHere community..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px] border-accent/30 focus:border-accent"
        />
        
        <div>
          <Label htmlFor="image-url" className="text-secondary">Image URL (optional)</Label>
          <Input
            id="image-url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border-accent/30 focus:border-accent"
          />
        </div>
        
        <Button 
          onClick={handleSubmit} 
          className="w-full flex-gradient text-white hover:opacity-90 transition-opacity"
          disabled={!content.trim()}
        >
          Flex It Here!
        </Button>
      </CardContent>
    </Card>
  );
};
