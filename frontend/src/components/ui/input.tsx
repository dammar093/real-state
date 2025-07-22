import React from "react";
interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
}

const Input = ({
  className,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled,
  required,
  autoComplete,
  autoFocus,
}: InputProps) => {
  return (
    <>
      {" "}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={`w-full p-2 border-none outline-none border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-[var(--primary-color)] ${className}`}
      />
    </>
  );
};

export default Input;
