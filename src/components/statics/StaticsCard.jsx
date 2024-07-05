import React from "react";

const StaticsCard = ({ title, amount, img }) => {
  return (
    <div className="card-item bg-[#006341] rounded-md p-8">
      <div className="flex gap-x-10">
        <div className="rounded-2xl bg-white w-16 h-16 p-3">
          <img src={img} alt="" />
        </div>
        <div className="text-white">
          <p className="mb-2 text-lg font-bold">{title}</p>
          <p className="text-xl font-semibold">{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default StaticsCard;
