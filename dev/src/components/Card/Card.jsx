import React from "react";

export const Card = () => {
  return (
    <>
      <div className="border rounded-md px-4 py-2 w-[700px] text-center">
        <div>Name of the question</div>
        <div className="flex justify-center">
          <div>difficulty</div>
        </div>
        <div>short description of the question</div>
      </div>
    </>
  );
};
