import React from "react";
import Dialog from "./Dialog";
import QuizResultsDetails from "./QuizResultsDetails";
import { QuizType } from "src/genetated/types";
import getCorrectAnswersCount from "src/utils/getCorrectAnswersCount";

interface IDispatchArgs {
  type: "answers" | "currentIdx" | "showResults";
  payload: any;
}

interface IQuizResultsProps {
  answers: string[];
  data: any;
  quizType: QuizType;
  showResults: boolean;
  dispatch: React.Dispatch<IDispatchArgs>;
  sendingAnswersData: any;
  id: string;
  navigate: (path: string) => void;
}

const QuizResults: React.FC<IQuizResultsProps> = ({
  answers,
  sendingAnswersData,
  quizType,
  showResults,
  dispatch,
  id,
  navigate,
}) => {
  return (
    <Dialog onClose={() => {}}>
      <div className="flex flex-col gap-4 rounded-md bg-[#F0F0F0] p-4">
        <h1 className="text-center text-xl font-semibold">
          You have finished the quiz!
        </h1>
        <span className="text-center">
          (Correct answers:{" "}
          {getCorrectAnswersCount(
            sendingAnswersData.answers as Word[],
            answers,
            quizType,
          )}
          /{answers.length})
        </span>
        <div className="flex justify-center gap-4">
          <button
            className="rounded-md bg-[#4D79FF] px-4 py-2 text-white"
            onClick={() => navigate(`/${id}/words`)}
          >
            Go to words
          </button>

          <button
            className="rounded-md bg-[#4D79FF] px-4 py-2 text-white"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>

          <button
            className="rounded-md bg-[#4D79FF] px-4 py-2 text-white"
            onClick={() => {
              dispatch({ type: "showResults", payload: !showResults });
            }}
          >
            {showResults ? "Hide results" : "Show results"}
          </button>
        </div>

        {showResults && (
          <QuizResultsDetails
            answers={answers}
            data={sendingAnswersData}
            quizType={quizType}
          />
        )}
      </div>
    </Dialog>
  );
};

export default QuizResults;
