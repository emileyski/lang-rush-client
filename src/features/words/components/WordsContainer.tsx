import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Word as WordType, useFolderQuery } from "src/genetated/types";
import Loader from "src/ui/Loader";
import { removeTokens } from "src/utils";
import Word from "./Word";
import WordAdd from "./WordAdd";
import Dialog from "src/ui/Dialog";
import WordAddForm from "./WordAddForm";
import editIconDark from "@assets/images/edit.svg";
import editIcon from "@assets/images/edit-dark.svg";
import { useAppSelector } from "src/store/store";
import playIcon from "@assets/images/play.svg";
import style from "./WordContainer.module.css";
import WordOverview from "./WordOverView";

const WordsContainer = () => {
  //TODO: выводить картинку на основании выбранной темы
  const isDark = useAppSelector((state) => state.theme.isDark);

  //TODO: добавить возможность редактировать название папки
  const [isEditingFolder, setIsEditingFolder] = useState(false);

  const [selectedWord, setSelectedWord] = useState<WordType | null>(null);

  const [isAddingWord, setIsAddingWord] = useState(false);
  const params = useParams<{ id: string }>() as { id: string };
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useFolderQuery({
    variables: {
      id: params.id,
    },
  });

  if (error?.message === "Unauthorized") {
    removeTokens();
    navigate("/signin");
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col py-[50px]">
      <div className="mb-[20px] flex items-center justify-between">
        <div className="flex justify-center gap-[7.5px]">
          <span className="font-sourceSansPro text-[48px] text-[#333C66] dark:text-[#fff]">
            {data?.folder.name}
          </span>
          <button onClick={() => setIsEditingFolder(true)}>
            <img src={editIcon} alt="edit" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-[15px] md:flex-row">
          <button className="flex h-[60px] w-[200px] items-center justify-center rounded-[10px] bg-[#C5F31D]">
            <img src={playIcon} alt="play" />
            <span className="font-sourceSansPro text-[20px] text-[#252C48]">
              Translation
            </span>
          </button>
          <button className="flex h-[60px] w-[200px] items-center justify-center rounded-[10px] bg-[#C5F31D]">
            <img src={playIcon} alt="play" />
            <span className="font-sourceSansPro text-[20px] text-[#252C48]">
              Definition
            </span>
          </button>
        </div>
      </div>
      <hr className="dark:border-[#F0F0F0 mb-[20px] border-[1.5px] border-[#333C66]" />

      <div className="flex justify-between gap-[25px]">
        <div className={style.container}>
          <WordAdd
            onClick={() => setIsAddingWord(true)}
            // folderId={params.id}
          />
          {data?.folder.words?.map((word, i) => (
            <Word key={i} id={word.id} name={word.word} />
          ))}
          {isAddingWord && (
            <Dialog onClose={() => setIsAddingWord(false)}>
              <WordAddForm
                onClose={() => {
                  setIsAddingWord(false);
                  refetch();
                }}
              />
            </Dialog>
          )}
        </div>
        <WordOverview />
      </div>
    </div>
  );
};

export default WordsContainer;
