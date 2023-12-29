import React from "react";
import deleteIcon from "@assets/images/delete.svg";

interface IWordProps {
  id: string;
  name: string;
}

const Word: React.FC<IWordProps> = ({ id, name }) => {
  return (
    <div className="relative flex h-[75px] w-[255px] cursor-pointer items-center justify-center rounded-[10px] bg-[#CADFF2] text-[20px] transition-all duration-300 dark:bg-[#2C3659] dark:text-[#FFF]">
      <span>{name}</span>
      <button
        className="absolute bottom-[-10px] right-[-10px] h-[28px] w-[28px] rounded-full bg-[#fff]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src={deleteIcon} alt="delete" />
      </button>
    </div>
  );
};

export default Word;
