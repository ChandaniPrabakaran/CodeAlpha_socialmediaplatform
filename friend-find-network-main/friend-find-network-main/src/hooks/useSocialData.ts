
import { useState, useEffect } from 'react';
import { User, Post, Comment } from '@/types/social';

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    displayName: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Tech enthusiast and coffee lover ☕',
    followers: ['2', '3'],
    following: ['2'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    username: 'jane_smith',
    displayName: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Designer & photographer 📸',
    followers: ['1', '3'],
    following: ['1', '3'],
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    username: 'mike_wilson',
    displayName: 'Mike Wilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer 💻',
    followers: ['1', '2'],
    following: ['1'],
    createdAt: new Date('2024-01-05')
  }
];

const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just finished building an amazing new feature! 🚀',
    likes: ['2', '3'],
    createdAt: new Date('2024-07-03T10:30:00')
  },
  {
    id: '2',
    userId: '2',
    content: 'Beautiful sunset today! Nature never fails to amaze me. 🌅',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    likes: ['1', '3'],
    createdAt: new Date('2024-07-03T08:15:00')
  },
  {
    id: '3',
    userId: '3',
    content: 'Working on some new React components. The possibilities are endless!',
    likes: ['1'],
    createdAt: new Date('2024-07-02T16:45:00')
  }
];

const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    userId: '2',
    content: 'Looks awesome! Can\'t wait to see it in action.',
    createdAt: new Date('2024-07-03T11:00:00')
  },
  {
    id: '2',
    postId: '2',
    userId: '1',
    content: 'Stunning photo! Where was this taken?',
    createdAt: new Date('2024-07-03T09:00:00')
  }
];

export const useSocialData = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [currentUserId, setCurrentUserId] = useState<string>('1'); // Simulate logged in user

  const getCurrentUser = () => users.find(u => u.id === currentUserId);

  const getUserById = (id: string) => users.find(u => u.id === id);

  const getPostsByUser = (userId: string) => 
    posts.filter(p => p.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const getCommentsByPost = (postId: string) => 
    comments.filter(c => c.postId === postId).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const createPost = (content: string, imageUrl?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUserId,
      content,
      imageUrl,
      likes: [],
      createdAt: new Date()
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const createComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      userId: currentUserId,
      content,
      createdAt: new Date()
    };
    setComments(prev => [...prev, newComment]);
    return newComment;
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(currentUserId);
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== currentUserId)
            : [...post.likes, currentUserId]
        };
      }
      return post;
    }));
  };

  const toggleFollow = (userId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === currentUserId) {
        const isFollowing = user.following.includes(userId);
        return {
          ...user,
          following: isFollowing
            ? user.following.filter(id => id !== userId)
            : [...user.following, userId]
        };
      }
      if (user.id === userId) {
        const isFollowed = user.followers.includes(currentUserId);
        return {
          ...user,
          followers: isFollowed
            ? user.followers.filter(id => id !== currentUserId)
            : [...user.followers, currentUserId]
        };
      }
      return user;
    }));
  };

  const getFeedPosts = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const followingIds = [...currentUser.following, currentUserId];
    return posts
      .filter(post => followingIds.includes(post.userId))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  return {
    users,
    posts,
    comments,
    currentUserId,
    setCurrentUserId,
    getCurrentUser,
    getUserById,
    getPostsByUser,
    getCommentsByPost,
    createPost,
    createComment,
    toggleLike,
    toggleFollow,
    getFeedPosts
  };
};
