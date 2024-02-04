import { QuizType, Word } from "src/genetated/types";

const getCorrectAnswersCount = (
  answers: Word[],
  userAnswers: string[],
  quizType: QuizType,
) => {
  const correctAnswersCount = answers?.reduce((acc, curr) => {
    const index =
      (answers?.findIndex((q: Word) => q.id === curr.id) as number) ??
      undefined;

    if (
      userAnswers[index] === curr.translation &&
      quizType === QuizType.WordTranslation
    )
      acc++;
    else if (
      userAnswers[index] === curr.word &&
      quizType === QuizType.DefinitionWord
    ) {
      console.log("userAnswers[index]", userAnswers[index]);
      acc++;
    }
    return acc;
  }, 0);

  return correctAnswersCount;
};

export default getCorrectAnswersCount;
