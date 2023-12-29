import React from "react";

interface IWordProps {
  id: string;
  name: string;
}

const Word: React.FC<IWordProps> = ({ id, name }) => {
  return (
    <div className="flex h-[75px] w-[255px] cursor-pointer items-center justify-center rounded-[10px] bg-[#CADFF2] text-[20px] transition-all duration-300 dark:bg-[#2C3659] dark:text-[#FFF]">
      <span>{name}</span>
    </div>
  );
};

export default Word;
