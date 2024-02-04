//В этот контекст будет обёрнута страничка из словами
//и будет содержать логику для этой странички (получение данных, обработка данных, состояние и т.д.)
import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  Folder,
  Word,
  useFolderQuery,
  useWordQuery,
} from "src/genetated/types";

export enum WordContextActionType {
  SET_SELECTED_WORD_ID = "SET_SELECTED_WORD_ID",
  SET_SELECTED_FOR_DELETING_WORD_ID = "SET_SELECTED_FOR_DELETING_WORD_ID",
  SET_SELECTED_FOR_EDITING_WORD_ID = "SET_SELECTED_FOR_EDITING_WORD_ID",
  SET_IS_ADDING_WORD = "SET_IS_ADDING_WORD",
}

// Начальное состояние
const initialValue = {
  selectedWordId: "",
  selectedForDeletingWordId: "",
  selectedForEditingWordId: "",
  isAddingWord: false,
};

const reducer = (state: typeof initialValue, action: any) => {
  switch (action.type) {
    case WordContextActionType.SET_SELECTED_WORD_ID:
      return {
        ...state,
        selectedWordId: action.payload,
      };
    case WordContextActionType.SET_SELECTED_FOR_DELETING_WORD_ID:
      return {
        ...state,
        selectedForDeletingWordId: action.payload,
      };
    case WordContextActionType.SET_SELECTED_FOR_EDITING_WORD_ID:
      return {
        ...state,
        selectedForEditingWordId: action.payload,
      };
    case WordContextActionType.SET_IS_ADDING_WORD:
      return {
        ...state,
        isAddingWord: action.payload,
      };
    default:
      return state;
  }
};

// Создание контекста
export const WordContext = createContext<
  | {
      state: typeof initialValue;
      dispatch: React.Dispatch<any>;
      folder: Folder | undefined;
      folderLoading: boolean;
      folderError: any;
      refetchFolder: any;
      wordLoading: boolean;
      wordError: any;
      refetchWord: any;
      wordData: Word | undefined;
    }
  | undefined
>(undefined);

// Поставщик контекста
export const WordContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialValue);
  const params = useParams<{ id: string }>() as { id: string };

  const {
    data: wordsData,
    loading: folderLoading,
    error: folderError,
    refetch: refetchFolder,
  } = useFolderQuery({
    variables: {
      id: params.id,
    },
  });

  const {
    data: wordData,
    loading: wordLoading,
    error: wordError,
    refetch: refetchWord,
  } = useWordQuery({
    variables: {
      id: state.selectedWordId,
    },
  });

  return (
    <WordContext.Provider
      value={{
        state,
        dispatch,
        folder: wordsData?.folder as Folder,
        folderLoading,
        folderError,
        refetchFolder,
        wordLoading,
        wordError,
        refetchWord,
        wordData: wordData?.word as Word,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

// Хук для удобного использования контекста
export const useWordContext = () => {
  const context = useContext(WordContext);
  if (!context) {
    throw new Error("useWordContext must be used within a WordContextProvider");
  }
  return context;
};
