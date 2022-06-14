import React from 'react';

function ModalProfile({ signOut }) {
  return (
    <div className="fixed right-[-450px] sm:w-[700px] top-[60px] w-screen h-screen">
      <div className="bg-white rounded-md border w-max border-gray-300">
        <h3 className="text-sm px-4 py-1 cursor-pointer hover:bg-gray-100">
          Your profile
        </h3>
        <h3
          onClick={() => signOut()}
          className="text-sm py-1 pl-4 cursor-pointer hover:bg-gray-100"
        >
          Signout
        </h3>
      </div>
    </div>
  );
}

export default ModalProfile;
