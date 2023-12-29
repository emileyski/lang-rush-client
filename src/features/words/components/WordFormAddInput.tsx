import { FC } from "react";

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

export default WordFormAddInput;
