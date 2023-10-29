import React from "react";

const Dashboard = ({ currentUser }) => {
  return (
    <div>
      {currentUser === null ? (
        <div className="w-full h-full text-red-600 text-6xl cardo mt-48 flex items-center justify-center">
          Login First!!!
        </div>
      ) : (
        <div>Hi</div>
      )}
    </div>
  );
};

export default Dashboard;
