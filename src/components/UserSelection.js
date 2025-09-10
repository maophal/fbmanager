import React from 'react';

const UserSelection = ({ users, selectedUser, selectUser }) => {
  if (!users || users.length === 0) {
    return <p>No Facebook user found. Please connect one in Settings.</p>;
  }

  return (
    <div className="form-group">
      <label>Select a User</label>
      <div className="list-group">
        {users.map(user => (
          <button
            key={user.id}
            type="button"
            className={`list-group-item list-group-item-action ${selectedUser === user.id ? 'active' : ''}`}
            onClick={() => selectUser(user.id)}
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserSelection;
