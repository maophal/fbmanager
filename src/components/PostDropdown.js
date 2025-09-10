import React, { useState } from 'react';

const PostDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (type) => {
    onSelect(type);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Create Post
      </button>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        <button className="dropdown-item" type="button" onClick={() => handleSelect('text')}>
          Post with text
        </button>
        <button className="dropdown-item" type="button" onClick={() => handleSelect('image')}>
          Post image
        </button>
        <button className="dropdown-item" type="button" onClick={() => handleSelect('video')}>
          Post video
        </button>
      </div>
    </div>
  );
};

export default PostDropdown;