import React from "react";

function Input({
  placeholder,
  name,
  onChange,
  value,
  id,
  width = "w-48",
  height = "h-auto",
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`outline-1 ${width} ${height}`}
      name={name}
      onChange={onChange}
      value={value}
      readOnly={false}
      id={id}
    />
  );
}

export default Input;
