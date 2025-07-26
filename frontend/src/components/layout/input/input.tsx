import React from "react";

interface InputProps {
  className?: string;
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  type = "text",
  name,
  id,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      {name && <label htmlFor={id || name}>{name}</label>}
      <input
        className={className}
        type={type}
        name={name}
        id={id || name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
