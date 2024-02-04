import { QuizType } from "src/genetated/types";
import Quiz from "src/ui/Quiz";

export default function DefinitionQuiz() {
  return <Quiz quizType={QuizType.DefinitionWord} />;
}
