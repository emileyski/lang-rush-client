import { QuizType } from "src/genetated/types";

interface IQuizResultsProps {
  answers: string[];
  data: any;
  quizType: QuizType;
}

const QuizResults: React.FC<IQuizResultsProps> = ({
  answers,
  data,
  quizType,
}: any) => {
  return (
    <div className="flex w-[450px] flex-col">
      {/* нужно вывести в виде карточек, где будет слово на английском
  и правильный перевод а также галочка либо крестик, в зависимости
  от того, правильно ли пользователь ответил */}
      <span className="text-center font-semibold">Results of the quiz:</span>
      <div className="flex justify-between">
        <span className="w-[25%]">
          {quizType === QuizType.WordTranslation ? "Word" : "Definition"}
        </span>
        <span className="w-[25%]">Your answer</span>
        <span className="w-[25%]">Correct answer</span>
        <span className="w-[25%]">Result</span>
      </div>

      {data.answers.map((a: any, idx: number) => (
        <div
          key={a.id}
          className="mt-[10px] flex justify-between rounded-[10px] bg-slate-300 p-2"
        >
          <span className="relative w-[25%]">
            {quizType === QuizType.WordTranslation
              ? a.word
              : a.definition.length > 20
                ? a.definition.slice(0, 20) + "..."
                : a.definition}
            {quizType === QuizType.DefinitionWord &&
              a.definition.length > 20 && (
                <i
                  className="bx bxs-info-circle absolute right-[.25rem] top-0"
                  title={a.definition}
                ></i>
              )}
          </span>
          <span className="w-[25%]">{answers[idx]}</span>
          <span className="w-[25%]">
            {quizType === QuizType.WordTranslation ? a.translation : a.word}
          </span>
          <span className="w-[25%]">
            {quizType === QuizType.WordTranslation
              ? a.translation === answers[idx]
                ? "✅"
                : "❌"
              : a.word === answers[idx]
                ? "✅"
                : "❌"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default QuizResults;
