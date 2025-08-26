import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  title?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, title }) => {
  return (
    <button
      title={title}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
        checked ? "bg-blue-500" : "bg-gray-400"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default Toggle;
