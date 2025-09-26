import React from 'react';
import Heading from 'Share/Components/Heading';

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  isActive?: boolean;
  customHeader?: React.ReactNode;
};
const Modal: React.FC<ModalProps> = ({ title, children, onClose, footer, isActive = false, customHeader, }) => {
  return (
    <div className={`modal-overlay ${isActive && 'active'}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {customHeader ? (
            customHeader
          ) : (
            <>
              <Heading as="h2" size="md" value={title} />
              <button className="close-btn" onClick={onClose}>
                ×
              </button>
            </>
          )}
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
