import React from "react";
const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  onClick,
  width,
  type,
  margin
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ backgroundColor: bgColor, color, borderRadius ,width, margin}}
      className={` text-${size} p-3 hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
