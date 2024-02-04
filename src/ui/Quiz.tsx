import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Answer,
  QuizType,
  useAnswersMutation,
  useQuestionsQuery,
} from "src/genetated/types";
import Dialog from "src/ui/Dialog";
import Loader from "src/ui/Loader";
import QuizResults from "./QuizResults";

const initialState = {
  answers: [""],
  currentIdx: 0,
  showResults: false,
};

const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case "answers":
      return { ...state, answers: action.payload };
    case "currentIdx":
      return { ...state, currentIdx: action.payload };
    case "showResults":
      return { ...state, showResults: action.payload };
    default:
      return state;
  }
};

interface IQuizProps {
  quizType: QuizType;
}

export default function Quiz({ quizType }: IQuizProps) {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>() as { id: string };

  const { data, loading } = useQuestionsQuery({
    variables: {
      quizType,
      folderId: params.id,
    },
    onCompleted: (data) => {
      dispatch({
        type: "answers",
        payload: Array(data?.questions?.questions.length).fill(""),
      });
    },
  });

  const [{ answers, currentIdx, showResults }, dispatch] = React.useReducer(
    reducer,
    initialState,
  );

  const [sendAnswers, { data: sendingAnswersData }] = useAnswersMutation({});

  const handleSubmit = async () => {
    if (answers[currentIdx].trim() === "") return;

    if (currentIdx === (data?.questions?.questions.length as number) - 1) {
      await sendAnswers({
        variables: {
          answers: data?.questions?.questions.map((q, idx) => ({
            wordId: q.wordId as string,
            answer: answers[idx] as string,
          })) as Answer[],
          folderId: params.id,
          quizType,
        },
      });
      return;
    }

    dispatch({ type: "currentIdx", payload: currentIdx + 1 });
  };

  const handlePrev = () => {
    if (currentIdx === 0) return;
    dispatch({ type: "currentIdx", payload: currentIdx - 1 });
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="flex flex-col items-center">
        <span className="mt-[70px] font-sourceSansPro text-[24px] font-bold">
          Write the appropriate word for definition in the input fields:
        </span>
        <div className="mt-[45px] w-[435px] text-[20px] text-[#252C48]">
          <div className="rounded-[10px] bg-[#f0f0f0] px-[15px] py-[10px] text-justify font-sourceSansPro">
            <span>
              {currentIdx + 1}.{" "}
              {data?.questions?.questions[currentIdx].question}
            </span>
            <div className="mt-[10px] flex justify-between">
              <div className="flex gap-[10px]">
                <span>(noun)</span>
                <input
                  value={answers[currentIdx]}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[currentIdx] = e.target.value;
                    dispatch({ type: "answers", payload: newAnswers });
                  }}
                  type="text"
                  className="w-[140px] rounded-[5px] px-1 focus:outline-none"
                />
              </div>
              <span>
                {currentIdx + 1} / {data?.questions?.questions.length}
              </span>
            </div>
          </div>
          <div className="mt-[25px] flex justify-between ">
            {currentIdx > 0 && (
              <button onClick={handlePrev}>
                <i className="bx bxs-caret-left-circle text-[45px] text-[#C5F31D]"></i>
              </button>
            )}
            <button
              onClick={handleSubmit}
              className={`h-[45px] ${
                currentIdx > 0 ? "w-[85%]" : "w-[100%]"
              } rounded-[10px] bg-[#C5F31D] font-sourceSansPro text-[24px] uppercase`}
              // onClick={() => handleSubmit(word as Word)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {sendingAnswersData && (
        <Dialog onClose={() => {}}>
          <QuizResults
            answers={answers}
            data={sendingAnswersData}
            quizType={quizType}
            showResults={showResults}
            dispatch={dispatch}
            id={params.id}
            navigate={navigate}
            sendingAnswersData={sendingAnswersData}
          />
        </Dialog>
      )}
    </>
  );
}
