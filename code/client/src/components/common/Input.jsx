import React from "react";

function Input({ placeholder, name, onChange, value }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="outline-1"
      name={name}
      onChange={onChange}
      value={value}
      readOnly={false}
    />
  );
}

export default Input;
