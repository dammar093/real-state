import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
}

const Button = ({
  type = "button",
  className,
  children,
  loading,
  onClick,
  disabled,
  title,
}: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        className={` text-white rounded-full cursor-pointer ${className} bg-[var(--primary-color)] whitespace-nowrap`}
        onClick={onClick}
        disabled={loading || disabled}
        title={title}
      >
        {loading ? "Loading..." : children}
      </button>
    </>
  );
};

export default Button;
