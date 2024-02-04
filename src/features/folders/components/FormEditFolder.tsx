import React from "react";
import closeIcon from "@assets/images/close.svg";
import { useWordContext } from "src/Contexts/WordContext";
import { useUpdateFolderMutation } from "src/genetated/types";
import { removeTokens } from "src/utils";
import { useNavigate } from "react-router-dom";
import Loader from "src/ui/Loader";

interface IFormEditFolderProps {
  onClose: () => void;
}

const FormEditFolder: React.FC<IFormEditFolderProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const [newName, setNewName] = React.useState<string>("");

  const { refetchFolder, folder } = useWordContext();
  const [updateFolder, { loading }] = useUpdateFolderMutation({
    onCompleted: () => {
      refetchFolder();
      onClose();
    },
    onError: ({ graphQLErrors }) => {
      if (!graphQLErrors) return;
      for (const err of graphQLErrors) {
        if (err?.message === "Unauthorized") {
          removeTokens();
          navigate("/signin");
          break;
        }
      }
    },
  });

  const handleSubmit = async () => {
    await updateFolder({
      variables: {
        id: folder?.id as string,
        name: newName,
      },
    });
  };

  return (
    <div
      className="relative flex w-[400px] flex-col gap-[10px] rounded-md border-[1px] border-[#C4C4C4] bg-[#F0F0F0] p-[20px] dark:border-[#333C66]   dark:bg-[#2C3659] 
dark:text-[#C4C4C4]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute right-[-10px] top-[-10px] h-[36px] w-[36px] 
"
      >
        <img src={closeIcon} alt="delete" />
      </button>
      {loading && <Loader />}
      {!loading && (
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="name">Enter new name for folder</label>
          <input
            type="text"
            placeholder="Example Name..."
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="rounded-md border-[1px] border-[#C4C4C4] p-[10px] dark:border-[#333C66]"
          />

          <button
            onClick={handleSubmit}
            className="rounded-md bg-[#2C3659] p-[10px] text-[#fff]"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default FormEditFolder;
