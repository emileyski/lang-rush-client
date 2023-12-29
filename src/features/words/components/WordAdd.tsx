import React from "react";
import plus from "@assets/images/plus.svg";

const WordAdd = () => {
  return (
    <div className="flex h-[75px] w-[255px] cursor-pointer items-center justify-center gap-[15px] rounded-[10px] bg-[#CADFF2] text-[20px] transition-all duration-300 dark:bg-[#2C3659] dark:text-[#FFF]">
      <span>New Word</span>
      <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#39A0ED]">
        <img src={plus} alt="plus" />
      </div>
    </div>
  );
};

export default WordAdd;
