import React from 'react';

export const SigninContainer: React.FC = ({ children }) => {
  return (
    <div className="signin-container">
      <img
        className="mb-4"
        src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
        alt="icon"
        width="72"
        height="72"
      />

      {children}
    </div>
  );
};
