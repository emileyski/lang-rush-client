import { FC } from "react";
import closeIcon from "@assets/images/close.svg";
import { useDeleteFolderMutation } from "src/genetated/types";
import { removeTokens } from "src/utils";
import { GET_FOLDERS } from "@lib/operations";
import { useNavigate } from "react-router-dom";
import Loader from "src/ui/Loader";

interface IFormDeleteFolderProps {
  onClose: () => void;
  id: string;
}

const FormDeleteFolder: FC<IFormDeleteFolderProps> = ({ onClose, id }) => {
  const navigate = useNavigate();

  const [deleteFolder, { loading, error }] = useDeleteFolderMutation({
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

  const handleDeleteFolder = async () => {
    // const sure = window.confirm("Are you sure you want to delete this folder?");
    // if (!sure) return;

    await deleteFolder({ variables: { id } });
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

      <div className="flex flex-col gap-4">
        <h1 className="text-center text-xl font-semibold">
          Are you sure you want to delete this folder?
        </h1>
        <div className="flex justify-center gap-4">
          <button
            className="rounded-md bg-[#FF4D4D] px-4 py-2 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-[#4D79FF] px-4 py-2 text-white"
            onClick={handleDeleteFolder}
          >
            Delete
          </button>
        </div>
        {error && (
          <span
            className="self-center font-semibold
          text-red-500"
          >
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormDeleteFolder;
