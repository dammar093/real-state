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
  label?: string;
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
  label,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className="text-[14px] font-semibold text-gray-700 capitalize"
          htmlFor={label?.split(" ")[0]}
        >
          {label}
        </label>
      )}
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
        id={label?.split(" ")[0]}
        className={`w-full p-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-[var(--primary-color)] ${className}`}
      />
    </div>
  );
};

export default Input;
