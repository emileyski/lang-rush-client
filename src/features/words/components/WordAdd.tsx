import { FC } from "react";
import plus from "@assets/images/plus.svg";

interface IWordAddProps {
  onClick: () => void;
}

const WordAdd: FC<IWordAddProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex h-[75px] w-[245px] cursor-pointer items-center justify-center gap-[15px] rounded-[10px] bg-[#CADFF2] text-[20px] transition-all duration-300 dark:bg-[#2C3659] dark:text-[#FFF]"
    >
      <span>New Word</span>
      <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#39A0ED]">
        <img src={plus} alt="plus" />
      </div>
    </div>
  );
};

export default WordAdd;
