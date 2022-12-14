import React from "react";

const Statics = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-5">
      <div className="w-full max-w-[200px] h-[140px] flex flex-col gap-2 shadow-md px-4 py-4 rounded-lg items-center">
        <div className="w-full flex flex-row gap-3">
          <div className="w-[30px] h-[30px]">
            <img
              src="/building.svg"
              alt=""
              className="w-full h-full text-purple-400"
            />
          </div>
          <p className="font-semibold text-xl mb-4 text-primary">Spaces</p>
        </div>
        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-semibold text-primary">
          7
        </div>
      </div>
      <div className="w-full max-w-[200px] h-[140px] flex flex-col gap-2 shadow-md px-4 py-4 rounded-lg items-center">
        <div className="w-full flex flex-row gap-3">
          <div className="w-[30px] h-[30px]">
            <img
              src="/building.svg"
              alt=""
              className="w-full h-full text-purple-400"
            />
          </div>
          <p className="font-semibold text-xl mb-4 text-primary">Request</p>
        </div>
        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-semibold text-primary">
          6
        </div>
      </div>
    </div>
  );
};

export default Statics;
