import { useNavigate } from "react-router-dom";
import Loader from "src/ui/Loader";
import { removeTokens } from "src/utils";
import Word from "./Word";
import WordAdd from "./WordAdd";
import Dialog from "src/ui/Dialog";
import editIcon from "@assets/images/edit-dark.svg";
import playIcon from "@assets/images/play.svg";
import style from "./WordContainer.module.css";
import WordOverview from "./WordOverView";
import FormDeleteWord from "./FormDeleteWord";
import WordEdit from "./WordEdit";
import WordCreate from "./WordCreate";
import { useWordContext } from "src/Contexts/WordContext";

const WordsContainer = () => {
  //TODO: выводить картинку на основании выбранной темы
  //TODO: добавить возможность редактировать название папки

  const { state, dispatch, folder, wordsError, wordsLoading } =
    useWordContext();

  const navigate = useNavigate();

  if (wordsError?.message === "Unauthorized") {
    removeTokens();
    navigate("/signin");
  }

  const selectCurrentWord = (id: string) => {
    const word = folder?.words?.find((word) => word.id === id);

    if (word) {
      dispatch({ type: "SET_SELECTED_WORD_ID", payload: id });
    }
  };

  if (wordsLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col py-[50px]">
      <div className="mb-[20px] flex items-center justify-between">
        <div className="flex justify-center gap-[7.5px]">
          <span className="font-sourceSansPro text-[48px] text-[#333C66] dark:text-[#fff]">
            {folder?.name}
          </span>
          <button
          //TODO: добавить возможность редактировать название папки
          >
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
            onClick={() =>
              dispatch({ type: "SET_IS_ADDING_WORD", payload: true })
            }
            // folderId={params.id}
          />
          {folder?.words?.map((word, i) => (
            <Word
              key={i}
              id={word.id}
              name={word.word}
              handleDeleteClick={() => {
                dispatch({
                  type: "SET_SELECTED_FOR_DELETING_WORD_ID",
                  payload: word.id,
                });
              }}
              selectCurrentWord={selectCurrentWord}
            />
          ))}
        </div>
        {state.selectedWordId && (
          <WordOverview
            wordId={state.selectedWordId}
            handleEdit={(id) => {
              dispatch({
                type: "SET_SELECTED_FOR_EDITING_WORD_ID",
                payload: id,
              });
            }}
            handleClose={() =>
              dispatch({ type: "SET_SELECTED_WORD_ID", payload: "" })
            }
          />
        )}
      </div>
      {state.isAddingWord && (
        <Dialog
          onClose={() =>
            dispatch({ type: "SET_IS_ADDING_WORD", payload: false })
          }
        >
          <WordCreate
            // refetch={refetch}
            onClose={() =>
              dispatch({ type: "SET_IS_ADDING_WORD", payload: false })
            }
          />
        </Dialog>
      )}
      {state.selectedForDeletingWordId && (
        <Dialog
          onClose={() =>
            dispatch({ type: "SET_SELECTED_FOR_DELETING_WORD_ID", payload: "" })
          }
        >
          <FormDeleteWord
            id={state.selectedForDeletingWordId}
            refetch={() => {
              // refetch();
              if (state.selectedForDeletingWordId === state.selectedWordId) {
                dispatch({ type: "SET_SELECTED_WORD_ID", payload: "" });
              }
            }}
            onClose={() =>
              dispatch({
                type: "SET_SELECTED_FOR_DELETING_WORD_ID",
                payload: "",
              })
            }
          />
        </Dialog>
      )}
      {state.selectedForEditingWordId && (
        <Dialog
          onClose={() =>
            dispatch({
              type: "SET_SELECTED_FOR_EDITING_WORD_ID",
              payload: "",
            })
          }
        >
          <WordEdit
            editableWordId={state.selectedForEditingWordId}
            onClose={() => {
              dispatch({
                type: "SET_SELECTED_FOR_EDITING_WORD_ID",
                payload: "",
              });
            }}
          />
        </Dialog>
      )}
    </div>
  );
};

export default WordsContainer;
