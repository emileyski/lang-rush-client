import React, { FC, useState } from "react";
import { WordForm } from "src/genetated/types";
import thinPlusIcon from "@assets/images/thin-plus.svg";
import closeIcon from "@assets/images/close.svg";

interface IWordFormAddInput {
  id: string;
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  fieldsCount?: number;
  required?: boolean;
}

const WordFormAddInput: FC<IWordFormAddInput> = ({
  id,
  name,
  type = "text",
  label,
  placeholder = "",
  fieldsCount = 1,
  required = false,
}) => {
  return (
    <div
      className={`flex ${
        fieldsCount > 1 ? "justify-between" : "justify-start"
      }`}
    >
      <label className="w-[25%]" htmlFor={id}>
        {label}
        {required && <span className="text-[#FF0000]">*</span>}
      </label>
      {Array(fieldsCount)
        .fill(0)
        .map((_, i) => (
          <input
            key={i}
            type={type}
            id={id}
            placeholder={placeholder}
            name={name}
            className={
              `${fieldsCount > 1 ? "w-[24%]" : "w-[140px]"} 
            }` + "rounded-[10px] rounded-[5px] px-1 focus:outline-none"
            }
          />
        ))}
    </div>
  );
};

const WordAddForm = () => {
  const [sentences, setSentences] = useState<string[]>([""]);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const formRef = React.useRef<HTMLFormElement>(null);

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

    setSentences([...sentencesArray, ""]);
  };

  return (
    <form
      ref={formRef}
      className="flex w-[451px] flex-col rounded-[10px] bg-[#A8D5F7]"
    >
      <div className="h-[65px] rounded-tl-[10px] rounded-tr-[10px] bg-[#2C3659] py-[22px] pl-[20px]">
        <input
          type="text"
          placeholder="Enter word here..."
          className="font-sourceSansPro w-[100%] bg-transparent text-[20px] font-[700] text-[#fff] focus:outline-none"
        />
      </div>
      <div
        className="scrollbar-thin scrollbar-thumb-[#A8D5F7] scrollbar-track-[#2C3659] scrollbar-thumb-rounded-[5px] scrollbar-track-rounded-[5px] flex h-[500px]
        flex-col gap-[7px] overflow-y-auto px-[20px] pt-[30px]
      "
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
          <select className="w-[140px] rounded-[5px] px-1 focus:outline-none">
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
          className="min-h-[75px] w-[100%] rounded-[5px] px-1 focus:outline-none"
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
              >
                <img src={closeIcon} alt="delete" />
              </button>
            )}
            <textarea
              className="min-h-[50px] w-[100%] rounded-[5px] px-1 focus:outline-none"
              placeholder="Enter sentence here..."
              name="sentence"
            />
          </div>
        ))}

        <button
          className="mt-[15px] flex h-[50px] w-[100%] items-center justify-center gap-[10px] rounded-[5px] bg-transparent text-[#252C48]
          focus:outline-none
          "
          type="button"
          onClick={handleAddSentence}
        >
          <img src={thinPlusIcon} alt="plus" />
          <span>Add new sentences</span>
        </button>

        {errorMessage && (
          <span className="mx-auto mt-[15px] text-[#FF0000]">
            {errorMessage}
          </span>
        )}
      </div>
    </form>
  );
};

export default WordAddForm;
