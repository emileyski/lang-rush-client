import { FC } from "react";

interface IWordFormAddInput {
  id: string;
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  fieldsCount?: number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => void;
  value?: string | string[];
}

const WordFormAddInput: FC<IWordFormAddInput> = ({
  id,
  name,
  type = "text",
  label,
  placeholder = "",
  fieldsCount = 1,
  required = false,
  onChange,
  value,
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
      {fieldsCount === 1 ? (
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className="w-[140px] rounded-[5px] px-1 focus:outline-none"
          onChange={onChange}
          value={value}
        />
      ) : (
        [...Array(fieldsCount)].map((_, i) => (
          <input
            key={i}
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            className="w-[24%] rounded-[5px] px-1 focus:outline-none"
            onChange={(e) => onChange && onChange(e, i)}
            value={Array.isArray(value) ? value[i] : value}
          />
        ))
      )}
    </div>
  );
};

export default WordFormAddInput;
