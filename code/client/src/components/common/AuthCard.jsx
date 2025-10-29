import React from "react";

function AuthCard({ children, onSubmit }) {
  return (
    <form
      className="flex flex-col justify-center items-start p-2 gap-2"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default AuthCard;
