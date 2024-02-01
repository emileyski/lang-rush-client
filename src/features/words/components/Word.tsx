import React from "react";
import deleteIcon from "@assets/images/delete.svg";
import { removeTokens } from "src/utils";
import { useNavigate } from "react-router-dom";
import { useDeleteWordMutation } from "src/genetated/types";
import Loader from "src/ui/Loader";

interface IWordProps {
  id: string;
  name: string;
  handleDeleteClick: (id: string) => void;
  selectCurrentWord: (id: string) => void;
}

const Word: React.FC<IWordProps> = ({
  id,
  name,
  handleDeleteClick,
  selectCurrentWord,
}) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    selectCurrentWord(id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleDeleteClick(id);
  };

  return (
    <div
      className="relative flex h-[75px] w-[100%] cursor-pointer items-center justify-center rounded-[10px] bg-[#CADFF2] text-[20px] transition-all duration-300 dark:bg-[#2C3659] dark:text-[#FFF]"
      onClick={handleSelect}
    >
      <span>{name}</span>
      <button
        className="absolute bottom-[-10px] right-[-10px] h-[28px] w-[28px] rounded-full bg-[#fff]"
        onClick={handleDelete}
      >
        <img src={deleteIcon} alt="delete" />
      </button>
    </div>
  );
};

export default Word;
