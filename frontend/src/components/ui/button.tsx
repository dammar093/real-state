import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

const Button = ({
  type = "button",
  className,
  children,
  loading,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        className={`bg-[var(--primary-color)] text-white px-4 py-2 rounded-full cursor-pointer ${className}`}
        onClick={onClick}
        disabled={loading}
      >
        {loading ? "Loading..." : children}
      </button>
    </>
  );
};

export default Button;
