import React, { useState } from 'react';

type ActionMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  const handleItemClick = (e: React.MouseEvent, action: 'edit' | 'delete') => {
    e.stopPropagation();
    setShowDropdown(false);
    if (action === 'edit') onEdit();
    if (action === 'delete') onDelete();
  };

  return (
    <div className="action-menu">
      <button className="action-btn" onClick={toggleDropdown} type="button">
        ⋯
      </button>
      {showDropdown && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={(e) => handleItemClick(e, 'edit')}>
            Edit
          </button>
          <button className="dropdown-item delete" onClick={(e) => handleItemClick(e, 'delete')}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
