import folderImage from "@assets/images/folder.svg";
import plus from "@assets/images/plus.svg";
import { FC } from "react";

interface IFolderAddProps {
  onClick: () => void;
}

const FolderAdd: FC<IFolderAddProps> = ({ onClick }) => {
  return (
    <div className="folder" onClick={onClick}>
      <div className="relative">
        <img src={folderImage} alt="folder" />
        <div
          className="absolute bottom-[-10px] right-[-10px] flex h-[36px] w-[36px] items-center
            justify-center rounded-full bg-[#39A0ED]
        "
        >
          <img src={plus} alt="plus" />
        </div>
      </div>
      <span className="font-semibold">New folder</span>
    </div>
  );
};

export default FolderAdd;
