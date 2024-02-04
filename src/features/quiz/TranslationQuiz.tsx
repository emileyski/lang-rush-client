import { QuizType } from "src/genetated/types";
import Quiz from "src/ui/Quiz";

const TranslationQuiz = () => {
  return <Quiz quizType={QuizType.WordTranslation} />;
};

export default TranslationQuiz;
