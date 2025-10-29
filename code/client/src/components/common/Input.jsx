import React from "react";

function Input({ placeholder, name, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="outline-1"
      name={name}
      onChange={onChange}
    />
  );
}

export default Input;
