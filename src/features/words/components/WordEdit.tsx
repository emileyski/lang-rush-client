import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWordContext } from "src/Contexts/WordContext";
import { Word, useUpdateWordMutation, useWordQuery } from "src/genetated/types";
import Loader from "src/ui/Loader";
import WordEditForm from "src/ui/WordEditForm";
import { filterNonEmptyValues, removeTokens } from "src/utils";

interface IWordEditProps {
  onClose: () => void;
}

const WordEdit: FC<IWordEditProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>() as { id: string };

  const { refetchWord, wordData } = useWordContext();

  const [updateWord, { loading, error }] = useUpdateWordMutation({
    onCompleted: () => {
      refetchWord();
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

  const handleEditWord = async (word: any) => {
    await updateWord({
      variables: {
        ...word,
        otherAdvs: filterNonEmptyValues(word.otherAdvs),
        otherAdjs: filterNonEmptyValues(word.otherAdjs),
        otherVerbs: filterNonEmptyValues(word.otherVerbs),
        otherNouns: filterNonEmptyValues(word.otherNouns),
        sentences: word.sentences.filter((sentence: string) => sentence !== ""),
        folderId: params.id,
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <WordEditForm
      onClose={onClose}
      editableWord={wordData as Word}
      handleSubmit={handleEditWord}
      loading={loading}
      error={error}
    />
  );
};

export default WordEdit;
