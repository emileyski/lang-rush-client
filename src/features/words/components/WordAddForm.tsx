import React, { FC, useState } from "react";
import { WordForm, useCreateWordMutation } from "src/genetated/types";
import thinPlusIcon from "@assets/images/thin-plus.svg";
import closeIcon from "@assets/images/close.svg";
import { removeTokens } from "src/utils";
// import { GET_FOLDERS } from "@lib/operations";
import { useNavigate } from "react-router-dom";
import Loader from "src/ui/Loader";
import WordFormAddInput from "./WordFormAddInput";
import { useParams } from "react-router-dom";

interface IWordAddFormProps {
  onClose: () => void;
}

const WordAddForm: FC<IWordAddFormProps> = ({ onClose }) => {
  const params = useParams<{ id: string }>() as { id: string };

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [sentences, setSentences] = useState<string[]>([""]);
  const formRef = React.useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const [createWord, { loading, error }] = useCreateWordMutation({
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
  });

  const handleRemoveSentence = (index: number) => {
    setSentences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSentence = () => {
    setErrorMessage("");
    const sentences = formRef.current?.querySelectorAll<HTMLTextAreaElement>(
      'textarea[name="sentence"]',
    );

    const sentencesArray: string[] = [];

    sentences!.forEach((sentence) => {
      sentencesArray.push(sentence.value);
    });

    if (sentencesArray[sentencesArray.length - 1] === "") {
      setErrorMessage("Please fill in the previous sentence");
      return;
    }

    setSentences((prev) => [...prev, ""]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const variables = {
      word: formData.get("word") as string,
      translation: formData.get("translation") as string,
      definition: formData.get("definition") as string,
      sentences: Array.from(formData.getAll("sentence") as string[]).filter(
        (sentence) => sentence !== "",
      ),
      otherNouns: Array.from(formData.getAll("otherNouns") as string[]).filter(
        (noun) => noun !== "",
      ),
      otherVerbs: Array.from(formData.getAll("otherVerbs") as string[]).filter(
        (verb) => verb !== "",
      ),
      otherAdjs: Array.from(formData.getAll("otherAdjs") as string[]).filter(
        (adj) => adj !== "",
      ),
      otherAdvs: Array.from(formData.getAll("otherAdvs") as string[]).filter(
        (adv) => adv !== "",
      ),
      form: formData.get("form") as WordForm,
      folderId: params.id,
    };
    console.log(variables);

    await createWord({
      variables,
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      ref={formRef}
      className="relative flex w-[451px] flex-col rounded-[10px] bg-[#A8D5F7] text-[#252C48]"
    >
      <div className="h-[65px] rounded-tl-[10px] rounded-tr-[10px] bg-[#2C3659] py-[22px] pl-[20px]">
        <input
          type="text"
          name="word"
          placeholder="Enter word here..."
          className="w-[100%] bg-transparent font-sourceSansPro text-[20px] font-[700] text-[#fff] focus:outline-none"
        />
      </div>
      {/*TODO:определить высоту формы*/}
      <div
        className="flex h-[60dvh] flex-col gap-[7px] overflow-y-auto
        px-[20px] pt-[30px] scrollbar-thin scrollbar-track-[#A8D5F7] scrollbar-thumb-[#2C3659]"
      >
        <WordFormAddInput
          id={"translation"}
          name={"translation"}
          label="Translation"
          required
          placeholder="Enter translation here..."
        />

        <div className="flex">
          <span className="w-[25%]">Form*</span>
          <select
            name="form"
            id="form"
            className="w-[140px] rounded-[5px] px-1 focus:outline-none"
          >
            {Object.values(WordForm).map((form, i) => (
              <option key={i} value={form} className="underline">
                {form[0].toUpperCase() + form.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <span className="mt-[15px]">Other forms</span>
        <WordFormAddInput
          id={"otherNouns"}
          name={"otherNouns"}
          label="Nouns"
          placeholder="Enter nouns here..."
          fieldsCount={3}
        />
        <WordFormAddInput
          id={"otherVerbs"}
          name={"otherVerbs"}
          label="Verbs"
          placeholder="Enter verbs here..."
          fieldsCount={3}
        />

        <WordFormAddInput
          id={"otherAdjs"}
          name={"otherAdjs"}
          label="Adjectives"
          fieldsCount={3}
          placeholder="Enter adjectives here..."
        />

        <WordFormAddInput
          id={"otherAdvs"}
          name={"otherAdvs"}
          label="Adverbs"
          placeholder="Enter adverbs here..."
          fieldsCount={3}
        />
        <label className="mt-[15px]" htmlFor="definition">
          Definition
        </label>
        <textarea
          id="definition"
          cols={3}
          className="min-h-[75px] w-[100%] resize-none rounded-[5px] px-1 focus:outline-none"
          placeholder="Enter definition here..."
          name="definition"
        />

        <label className="mt-[15px]" htmlFor="sentence-1">
          Sentences
        </label>
        {sentences.map((_, i) => (
          <div key={i} className="relative">
            {i !== 0 && (
              <button
                className="absolute right-[-10px] top-[-10px] h-[24px] w-[24px]"
                type="button"
                onClick={() => handleRemoveSentence(i)}
              >
                <img src={closeIcon} alt="delete" />
              </button>
            )}
            <textarea
              className="min-h-[50px] w-[100%] resize-none rounded-[5px] px-1 focus:outline-none"
              placeholder="Enter sentence here..."
              name="sentence"
              id={`sentence-${i + 1}`}
            />
          </div>
        ))}

        <button
          className="my-[15px] flex h-[50px] w-[100%] items-center justify-center gap-[10px] rounded-[5px] bg-transparent text-[#252C48]
          focus:outline-none
          "
          type="button"
          onClick={handleAddSentence}
        >
          <img src={thinPlusIcon} alt="plus" />
          <span>Add new sentences</span>
        </button>
        {errorMessage && (
          <span className="mx-auto mb-[15px] text-[#FF0000]">
            {errorMessage}
          </span>
        )}
        {error && (
          <span className="mx-auto mb-[15px] text-[#FF0000]">
            {error.message}
          </span>
        )}
      </div>
      <button
        className="h-[50px] w-[100%] rounded-b-[10px] bg-[#C5F31D]"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default WordAddForm;
