import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFolderQuery } from "src/genetated/types";
import Loader from "src/ui/Loader";
import { removeTokens } from "src/utils";
import Word from "./Word";
import WordAdd from "./WordAdd";
import Dialog from "src/ui/Dialog";
import WordAddForm from "./WordAddForm";

const WordsContainer = () => {
  const [isEditingFolder, setIsEditingFolder] = useState(false);
  const [isAddingWord, setIsAddingWord] = useState(false);
  const params = useParams<{ id: string }>() as { id: string };
  const navigate = useNavigate();

  const { data, loading, error } = useFolderQuery({
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
    <div className="flex gap-[30px] py-[70px]">
      <WordAdd />
      {data?.folder.words?.map((word, i) => (
        <Word key={i} id={word.id} name={word.word} />
      ))}
      <Dialog onClose={() => setIsEditingFolder(false)}>
        <WordAddForm />
      </Dialog>
    </div>
  );
};

export default WordsContainer;
