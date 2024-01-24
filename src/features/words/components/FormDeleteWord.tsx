import { GET_FOLDERS } from "@lib/operations";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "src/ui/Loader";
import { removeTokens } from "src/utils";
import { useDeleteWordMutation } from "src/genetated/types";
import closeIcon from "@assets/images/close.svg";

interface IFormDeleteWordProps {
  onClose: () => void;
  id: string;
  refetch: () => void;
}

const FormDeleteWord: FC<IFormDeleteWordProps> = ({ onClose, id, refetch }) => {
  const navigate = useNavigate();

  const [deleteWord, { loading, error }] = useDeleteWordMutation({
    onCompleted: () => {
      onClose();
      refetch();
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

  const handleDeleteWord = async () => {
    await deleteWord({ variables: { id } });
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
          Are you sure you want to delete this word?
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
            onClick={handleDeleteWord}
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

export default FormDeleteWord;
