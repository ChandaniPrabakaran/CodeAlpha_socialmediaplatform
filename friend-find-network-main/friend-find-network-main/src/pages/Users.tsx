
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { UserCard } from '@/components/UserCard';
import { useSocialData } from '@/hooks/useSocialData';

export const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const {
    users,
    getCurrentUser,
    toggleFollow,
    currentUserId
  } = useSocialData();

  const currentUser = getCurrentUser();
  
  const filteredUsers = users.filter(user =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Discover Users</h1>
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        {filteredUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            currentUserId={currentUserId}
            isFollowing={currentUser.following.includes(user.id)}
            onToggleFollow={toggleFollow}
            onClick={() => navigate(`/profile/${user.id}`)}
          />
        ))}
      </div>
      
      {filteredUsers.length === 0 && (
        <div className="text-center text-muted-foreground mt-12">
          <p>No users found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};
