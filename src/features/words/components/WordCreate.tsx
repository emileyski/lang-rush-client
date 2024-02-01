import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWordContext } from "src/Contexts/WordContext";
import { useCreateWordMutation } from "src/genetated/types";
import WordEditForm from "src/ui/WordEditForm";
import { filterNonEmptyValues, removeTokens } from "src/utils";

interface IWordCreateProps {
  onClose: () => void;
}

const WordCreate: FC<IWordCreateProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>() as { id: string };
  const { refetchWords } = useWordContext();

  const [createWord, { loading, error }] = useCreateWordMutation({
    onCompleted: () => {
      onClose();
      refetchWords();
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

  const handleAddWord = async (word: any) => {
    await createWord({
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

  return (
    <WordEditForm
      onClose={onClose}
      handleSubmit={handleAddWord}
      loading={loading}
      error={error}
    />
  );
};

export default WordCreate;
