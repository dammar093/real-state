import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, label, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            className="text-[14px] font-semibold text-gray-700 capitalize"
            htmlFor={label?.split(" ")[0]}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          id={label?.split(" ")[0]}
          className={`w-full p-2  rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-400 ${className}`}
          {...rest}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input"; // required for forwardRef
export default Input;
