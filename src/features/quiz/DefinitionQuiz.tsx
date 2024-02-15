import { QuizType } from "src/genetated/types";
import Quiz from "src/ui/Quiz";

const DefinitionQuiz = () => {
  return <Quiz quizType={QuizType.DefinitionWord} />;
};

export default DefinitionQuiz;
