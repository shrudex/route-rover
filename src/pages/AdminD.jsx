import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminD = ({ currentAdmin }) => {
  let email;
  if (currentAdmin != null) {
    email = currentAdmin.email;
  }
  console.log(currentAdmin);

  return (
    <div>
      {currentAdmin === null ? (
        <div className="w-full h-full text-red-600 text-6xl cardo mt-48 flex items-center justify-center">
          Login First!!!
        </div>
      ) : (
        <div className="w-full h-full pb-12">
          <h1 className="text-black text-6xl mt-4 cardo text-center">
            Hi <span className="text-purple-600">{currentAdmin.full_name}</span>
          </h1>
          <div className="w-fit pr-16 pl-16 mt-3 py-2 gap-2 raleway border-black mx-auto flex flex-col items-center justify-center border rounded card">
            <h3 className="text-xl">
              Name -{" "}
              <span className="text-blue-800 font-semibold">
                {currentAdmin.full_name}
              </span>
            </h3>
            <h3 className="text-xl">
              Email -{" "}
              <span className="text-blue-800 font-semibold">
                {currentAdmin.email}
              </span>
            </h3>
            <h3 className="text-xl">
              Username -{" "}
              <span className="text-blue-800 font-semibold">
                {currentAdmin.username}
              </span>
            </h3>
            <h3 className="text-xl">
              Mobile Number -{" "}
              <span className="text-blue-800 font-semibold">
                {currentAdmin.contact_number}
              </span>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminD;
