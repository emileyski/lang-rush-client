import folderImage from "@assets/images/folder.svg";
import { FC } from "react";
import deleteIcon from "@assets/images/delete.svg";
import { useNavigate } from "react-router-dom";

interface IFolderProps {
  id: string;
  name: string;
  handleDeleteClick: (id: string) => void;
}

const Folder: FC<IFolderProps> = ({ id, name, handleDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div className="folder" onClick={() => navigate(`/${id}/words`)}>
      <img src={folderImage} alt="folder" />
      <span className="font-semibold">{name}</span>
      <button
        className="absolute bottom-[-10px] right-[-10px] h-[36px] w-[36px] rounded-full bg-[#fff]"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteClick(id);
        }}
      >
        <img src={deleteIcon} alt="delete" />
      </button>
    </div>
  );
};

export default Folder;
