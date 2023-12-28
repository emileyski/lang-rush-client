import folderImage from "@assets/images/folder.svg";
import { FC } from "react";
import deleteIcon from "@assets/images/delete.svg";

interface IFolderProps {
  id: string;
  name: string;
  handleDeleteClick: (id: string) => void;
}

const Folder: FC<IFolderProps> = ({ id, name, handleDeleteClick }) => {
  return (
    <div className="folder">
      <img src={folderImage} alt="folder" />
      <span className="font-semibold">{name}</span>
      <button
        className="absolute bottom-[-10px] right-[-10px] h-[36px] w-[36px] rounded-full bg-[#fff]"
        onClick={() => handleDeleteClick(id)}
      >
        <img src={deleteIcon} alt="delete" />
      </button>
    </div>
  );
};

export default Folder;
