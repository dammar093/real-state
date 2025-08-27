"use client";
import React, { ReactNode } from "react";
import { IoClose } from "react-icons/io5"; // close icon

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative  max-h-[90vh] overflow-y-auto scroll-hide">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <IoClose size={24} />
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
