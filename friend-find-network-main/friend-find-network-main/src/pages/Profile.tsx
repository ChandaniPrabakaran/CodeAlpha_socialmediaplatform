
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/PostCard';
import { UserAvatar } from '@/components/UserAvatar';
import { useSocialData } from '@/hooks/useSocialData';

export const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    getCurrentUser,
    getUserById,
    getPostsByUser,
    getCommentsByPost,
    createComment,
    toggleLike,
    toggleFollow,
    users,
    currentUserId
  } = useSocialData();

  const currentUser = getCurrentUser();
  const profileUser = getUserById(userId || currentUserId);
  const userPosts = getPostsByUser(userId || currentUserId);

  if (!currentUser || !profileUser) {
    return <div>User not found</div>;
  }

  const isCurrentUser = profileUser.id === currentUserId;
  const isFollowing = currentUser.following.includes(profileUser.id);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <UserAvatar user={profileUser} size="lg" />
              <div>
                <h1 className="text-2xl font-bold">{profileUser.displayName}</h1>
                <p className="text-muted-foreground">@{profileUser.username}</p>
              </div>
            </div>
            
            {!isCurrentUser && (
              <Button
                variant={isFollowing ? "secondary" : "default"}
                onClick={() => toggleFollow(profileUser.id)}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="mb-4">{profileUser.bio}</p>
          <div className="flex space-x-6 text-sm">
            <span><strong>{profileUser.followers.length}</strong> followers</span>
            <span><strong>{profileUser.following.length}</strong> following</span>
            <span><strong>{userPosts.length}</strong> posts</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {userPosts.map(post => {
          const comments = getCommentsByPost(post.id);
          
          return (
            <PostCard
              key={post.id}
              post={post}
              user={profileUser}
              comments={comments}
              currentUserId={currentUserId}
              users={users}
              onLike={toggleLike}
              onComment={createComment}
            />
          );
        })}
      </div>
      
      {userPosts.length === 0 && (
        <div className="text-center text-muted-foreground mt-12">
          <p>{isCurrentUser ? "You haven't" : `${profileUser.displayName} hasn't`} posted anything yet!</p>
        </div>
      )}
    </div>
  );
};
