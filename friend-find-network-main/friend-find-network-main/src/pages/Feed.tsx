
import { CreatePost } from '@/components/CreatePost';
import { PostCard } from '@/components/PostCard';
import { useSocialData } from '@/hooks/useSocialData';

export const Feed = () => {
  const {
    getCurrentUser,
    getUserById,
    getCommentsByPost,
    createPost,
    createComment,
    toggleLike,
    getFeedPosts,
    users,
    currentUserId
  } = useSocialData();

  const currentUser = getCurrentUser();
  const feedPosts = getFeedPosts();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <CreatePost user={currentUser} onCreatePost={createPost} />
      
      <div className="space-y-4">
        {feedPosts.map(post => {
          const postUser = getUserById(post.userId);
          const comments = getCommentsByPost(post.id);
          
          if (!postUser) return null;
          
          return (
            <PostCard
              key={post.id}
              post={post}
              user={postUser}
              comments={comments}
              currentUserId={currentUserId}
              users={users}
              onLike={toggleLike}
              onComment={createComment}
            />
          );
        })}
      </div>
      
      {feedPosts.length === 0 && (
        <div className="text-center text-muted-foreground mt-12">
          <p>No posts in your feed yet!</p>
          <p className="text-sm mt-2">Follow some users to see their posts here.</p>
        </div>
      )}
    </div>
  );
};
