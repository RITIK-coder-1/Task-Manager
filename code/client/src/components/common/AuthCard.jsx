import React from "react";

function AuthCard({ children }) {
  return (
    <form className="flex flex-col justify-center items-start p-2 gap-2">
      {children}
    </form>
  );
}

export default AuthCard;
