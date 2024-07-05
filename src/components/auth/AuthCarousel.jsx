import React from "react";

const AuthCarousel = ({ img, title, desc }) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-10 items-center justify-center mb-28 px-28 py-28 h-screen">
        <img src={img} alt="" />
        <h3 className="font-semibold text-white text-[30px]">{title}</h3>
        <p className="font-bold text-white text-[20px]">{desc}</p>
      </div>
    </div>
  );
};

export default AuthCarousel;
