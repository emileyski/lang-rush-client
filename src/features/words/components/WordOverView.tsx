import { useWordQuery } from "src/genetated/types";
import { FC, useEffect } from "react";
import closeIcon from "@assets/images/close.svg";
import editIcon from "@assets/images/edit.svg";
import { useWordContext } from "src/Contexts/WordContext";
import playSoundIcon from "@assets/images/play-sound.svg";
import Loader from "src/ui/Loader";

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

  const onPlaySoundClick = () => {
    const audioUrl = word?.audioUrl;

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div className="relative min-h-[400px] w-[375px] rounded-[10px] bg-[#CEE6FE]">
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="relative flex h-[65px] items-center  rounded-tl-[10px] rounded-tr-[10px] bg-[#2C3659] py-[22px] pl-[20px]">
            <button className="h-[40px] w-[40px]" onClick={onPlaySoundClick}>
              <img src={playSoundIcon} alt="play sound" />
            </button>
            <span className="ml-[20px] font-sourceSansPro text-[20px] font-[600] text-[#fff]">
              {word?.word}{" "}
              <span className="font-[400] lowercase">
                ({word?.form}) - {word?.translation}
              </span>
            </span>
            <button
              className="absolute right-[-15px] top-[-15px]"
              onClick={handleClose}
            >
              <img src={closeIcon} alt="close" />
            </button>
          </div>
          <div className=" relative flex h-[360px] flex-col overflow-y-scroll p-[15px] scrollbar-thin scrollbar-track-[#A8D5F7] scrollbar-thumb-[#2C3659]">
            <button
              className="absolute right-[20px] h-[24px] w-[24px]"
              onClick={() => handleEdit(wordId)}
            >
              <img src={editIcon} alt="edit" />
            </button>

            <span className="mt-[10px] font-sourceSansPro text-[16px] text-[#333C66]">
              {word!.otherAdjs?.length > 0 && (
                <>
                  Adjectives: {word?.otherAdjs?.join(", ")} <br />
                </>
              )}
              {word!.otherVerbs?.length > 0 && (
                <>
                  Verbs: {word?.otherVerbs?.join(", ")} <br />
                </>
              )}
              {word!.otherAdvs?.length > 0 && (
                <>
                  Adverbs: {word?.otherAdvs?.join(", ")} <br />
                </>
              )}
              {word!.otherNouns?.length > 0 && (
                <>
                  Nouns: {word?.otherNouns?.join(", ")} <br />
                </>
              )}
            </span>
            <span className="font-sourceSansPro text-[22px] font-[600] text-[#333C66]">
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
        </>
      )}
    </div>
  );
};

export default WordOverview;
