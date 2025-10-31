import React from "react";

function Button({ content, onClick, type, disabled }) {
  return (
    <button
      className="bg-blue-600 rounded-2xl text-white p-2 cursor-pointer"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default Button;
