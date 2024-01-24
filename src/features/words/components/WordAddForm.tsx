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

const filterEmptyOrReturnUndefined = (arr: string[]) => {
  return arr.filter((item) => item !== "").length > 0
    ? arr.filter((item) => item !== "")
    : undefined;
};

const initialWord = {
  word: "",
  translation: "",
  definition: "",
  sentences: [""],
  otherNouns: Array(3).fill(""),
  otherVerbs: Array(3).fill(""),
  otherAdjs: Array(3).fill(""),
  otherAdvs: Array(3).fill(""),
  form: WordForm.Noun,
  // folderId: "",
};

const reducer = (state: typeof initialWord, action: any) => {
  switch (action.type) {
    case "word":
      return { ...state, word: action.payload };
    case "translation":
      return { ...state, translation: action.payload };
    case "definition":
      return { ...state, definition: action.payload };
    case "sentences":
      return { ...state, sentences: action.payload };
    case "otherNouns":
      return { ...state, otherNouns: action.payload };
    case "otherVerbs":
      return { ...state, otherVerbs: action.payload };
    case "otherAdjs":
      return { ...state, otherAdjs: action.payload };
    case "otherAdvs":
      return { ...state, otherAdvs: action.payload };
    case "form":
      return { ...state, form: action.payload };
    default:
      return state;
  }
};

interface IWordAddFormProps {
  onClose: () => void;
}

const WordAddForm: FC<IWordAddFormProps> = ({ onClose }) => {
  const params = useParams<{ id: string }>() as { id: string };

  const [word, dispatch] = React.useReducer(reducer, initialWord);

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

  const handleAddWord = async () => {
    await createWord({
      variables: {
        ...word,
        //TODO: упростиь код
        //Это нужно для того, чтобы не отправлять пустые строки
        otherAdvs: filterEmptyOrReturnUndefined(word.otherAdvs),
        otherAdjs: filterEmptyOrReturnUndefined(word.otherAdjs),
        otherVerbs: filterEmptyOrReturnUndefined(word.otherVerbs),
        otherNouns: filterEmptyOrReturnUndefined(word.otherNouns),
        sentences: word.sentences.filter((sentence: string) => sentence !== ""),
        folderId: params.id,
      },
    });
  };

  return (
    <div className="relative flex w-[451px] flex-col rounded-[10px] bg-[#A8D5F7] text-[#252C48]">
      <div className="h-[65px] rounded-tl-[10px] rounded-tr-[10px] bg-[#2C3659] py-[22px] pl-[20px]">
        <input
          type="text"
          name="word"
          value={word.word}
          onChange={(e) => dispatch({ type: "word", payload: e.target.value })}
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
          value={word.translation}
          onChange={(e) => {
            dispatch({ type: "translation", payload: e.target.value });
          }}
          placeholder="Enter translation here..."
        />

        <div className="flex">
          <span className="w-[25%]">Form*</span>
          <select
            name="form"
            value={word.form}
            onChange={(e) => {
              dispatch({ type: "form", payload: e.target.value });
            }}
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
          onChange={(e, index) => {
            const otherNouns = [...word.otherNouns];
            otherNouns[index!] = e.target.value;
            dispatch({ type: "otherNouns", payload: otherNouns });
          }}
          value={word.otherNouns}
          id={"otherNouns"}
          name={"otherNouns"}
          label="Nouns"
          placeholder="Enter nouns here..."
          fieldsCount={3}
        />
        <WordFormAddInput
          onChange={(e, index) => {
            const otherVerbs = [...word.otherVerbs];
            otherVerbs[index!] = e.target.value;
            dispatch({ type: "otherVerbs", payload: otherVerbs });
          }}
          value={word.otherVerbs}
          id={"otherVerbs"}
          name={"otherVerbs"}
          label="Verbs"
          placeholder="Enter verbs here..."
          fieldsCount={3}
        />

        <WordFormAddInput
          id={"otherAdjs"}
          onChange={(e, index) => {
            const otherAdjs = [...word.otherAdjs];
            otherAdjs[index!] = e.target.value;
            dispatch({ type: "otherAdjs", payload: otherAdjs });
          }}
          value={word.otherAdjs}
          name={"otherAdjs"}
          label="Adjectives"
          fieldsCount={3}
          placeholder="Enter adjectives here..."
        />

        <WordFormAddInput
          id={"otherAdvs"}
          onChange={(e, index) => {
            const otherAdvs = [...word.otherAdvs];
            otherAdvs[index!] = e.target.value;
            dispatch({ type: "otherAdvs", payload: otherAdvs });
          }}
          value={word.otherAdvs}
          name={"otherAdvs"}
          label="Adverbs"
          placeholder="Enter adverbs here..."
          fieldsCount={3}
        />
        <label className="mt-[15px]" htmlFor="definition">
          Definition
        </label>
        <textarea
          value={word.definition}
          onChange={(e) =>
            dispatch({ type: "definition", payload: e.target.value })
          }
          id="definition"
          cols={3}
          className="min-h-[75px] w-[100%] resize-none rounded-[5px] px-1 focus:outline-none"
          placeholder="Enter definition here..."
          name="definition"
        />

        <label className="mt-[15px]" htmlFor="sentence-1">
          Sentences
        </label>
        {word.sentences.map((_: string, i: number) => (
          <div key={i} className="relative">
            {i !== 0 && (
              <button
                className="absolute right-[-10px] top-[-10px] h-[24px] w-[24px]"
                type="button"
                onClick={() => {
                  const sentences = word.sentences.filter(
                    (sentence: string) => sentence !== word.sentences[i],
                  );
                  dispatch({ type: "sentences", payload: sentences });
                }}
              >
                <img src={closeIcon} alt="delete" />
              </button>
            )}
            <textarea
              className="min-h-[50px] w-[100%] resize-none rounded-[5px] px-1 focus:outline-none"
              placeholder="Enter sentence here..."
              name="sentence"
              id={`sentence-${i + 1}`}
              value={word.sentences[i]}
              onChange={(e) => {
                const sentences = [...word.sentences];
                sentences[i] = e.target.value;
                dispatch({ type: "sentences", payload: sentences });
              }}
            />
          </div>
        ))}

        <button
          className="my-[15px] flex h-[50px] w-[100%] items-center justify-center gap-[10px] rounded-[5px] bg-transparent text-[#252C48]
          focus:outline-none
          "
          type="button"
          onClick={() => {
            dispatch({
              type: "sentences",
              payload: [...word.sentences, ""],
            });
          }}
          // onClick={handleAddSentence}
        >
          <img src={thinPlusIcon} alt="plus" />
          <span>Add new sentences</span>
        </button>
        {error && (
          <span className="mx-auto mb-[15px] text-[#FF0000]">
            {error.message}
          </span>
        )}
      </div>
      <button
        className="h-[50px] w-[100%] rounded-b-[10px] bg-[#C5F31D]"
        onClick={handleAddWord}
      >
        Submit
      </button>
      {loading && <Loader />}
    </div>
  );
};

export default WordAddForm;
