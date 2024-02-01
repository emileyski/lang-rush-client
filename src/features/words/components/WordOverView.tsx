import { useWordQuery } from "src/genetated/types";
import { FC, useEffect } from "react";
import closeIcon from "@assets/images/close.svg";
import editIcon from "@assets/images/edit.svg";
import { useWordContext } from "src/Contexts/WordContext";

interface IWordOverviewProps {
  wordId: string;
  handleClose: () => void;
  handleEdit: (id: string) => void;
}

const WordOverview: FC<IWordOverviewProps> = ({
  wordId,
  handleClose,
  handleEdit,
}) => {
  const {
    wordData: word,
    // refetchWord,
    wordLoading: loading,
    wordError: error,
  } = useWordContext();

  // useEffect(() => {
  //   refetchWord();
  // }, [wordId]);

  return (
    <div
      className="w-[375px]
    rounded-[10px] bg-[#CEE6FE]"
    >
      <div className="relative h-[65px] rounded-tl-[10px] rounded-tr-[10px] bg-[#2C3659] py-[22px] pl-[20px]">
        <span className="font-sourceSansPro text-[20px] font-[600] text-[#fff]">
          {word?.word}
        </span>
        <button
          className="absolute right-[-15px] top-[-15px]"
          onClick={handleClose}
        >
          <img src={closeIcon} alt="close" />
        </button>
      </div>
      <div className="relative flex h-[360px] flex-col overflow-y-scroll p-[20px]">
        <button
          className="absolute right-[20px] h-[24px] w-[24px]"
          onClick={() => handleEdit(wordId)}
        >
          <img src={editIcon} alt="edit" />
        </button>

        <span className="font-sourceSansPro text-[20px] text-[#333C66]">
          UA: {word?.translation}
        </span>
        <span className="mt-[20px] font-sourceSansPro text-[22px] font-[600] text-[#333C66]">
          Definition:
        </span>
        <span className="mt-[10px] font-sourceSansPro text-[16px] text-[#333C66]">
          {word?.definition}
        </span>
        <span className="mt-[20px] font-sourceSansPro text-[22px] font-[600] text-[#333C66]">
          Context:
        </span>
        <span className="mt-[10px] font-sourceSansPro text-[16px] text-[#333C66]">
          {word?.sentences?.map((sentence, i) => (
            <p key={i} className="mt-[5px]">
              {sentence}
            </p>
          ))}
        </span>
      </div>
    </div>
  );
};

export default WordOverview;
