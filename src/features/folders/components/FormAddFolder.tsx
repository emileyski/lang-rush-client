import { FC, useState } from "react";
import closeIcon from "@assets/images/close.svg";
import { useCreateFolderMutation } from "src/genetated/types";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "src/utils";
import { GET_FOLDERS } from "@lib/operations";
import Loader from "src/ui/Loader";

interface IFormAddFolderProps {
  onClose: () => void;
}

const FormAddFolder: FC<IFormAddFolderProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");

  const [createFolder, { loading, error }] = useCreateFolderMutation({
    onCompleted: () => {
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
    refetchQueries: [
      {
        query: GET_FOLDERS,
      },
    ],
  });

  const handleAddFolder = async () => {
    if (name.trim() === "") return;

    await createFolder({ variables: { name } });
  };

  if (loading) {
    return <Loader />;
  }

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
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-[50px] w-full rounded-md border px-3 dark:bg-[#3F4763]"
        placeholder="Folder name"
      />
      <button
        className="h-[50px] w-full rounded-md bg-[#333C66]  font-semibold text-[#fff] dark:bg-[#1E1E1E]"
        onClick={handleAddFolder}
      >
        Add folder
      </button>
      {error && (
        <span className="font-semibold text-red-500">{error.message}</span>
      )}
    </div>
  );
};

export default FormAddFolder;
