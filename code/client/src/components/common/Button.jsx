import React from "react";

function Button({ content }) {
  return (
    <button className="bg-blue-600 rounded-2xl text-white p-2 cursor-pointer">
      {content}
    </button>
  );
}

export default Button;
