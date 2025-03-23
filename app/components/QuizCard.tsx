import React from 'react';

interface Option {
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    question: string;
    options: Option[];
}

interface QuizCardProps {
    questions: Question[];
    currentQuestionIndex: number;
    onSelectAnswer: (option: string) => void;
    selectedAnswer: string | null;
    onNextQuestion: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
    questions,
    currentQuestionIndex,
    onSelectAnswer,
    selectedAnswer,
    onNextQuestion
}) => {
    const currentQuestion = questions[currentQuestionIndex];
    const timerExpired = selectedAnswer === '';

    return (
        <div className="quiz-card-container">
            <h2 className="quiz-card-question">{currentQuestion.question}</h2>

            <div className="quiz-card-options">
                {currentQuestion.options.map((option) => {
                    const isSelected = selectedAnswer === option.text;
                    const shouldHighlightCorrect = (timerExpired || selectedAnswer !== null) && option.isCorrect;

                    return (
                        <button
                            key={option.text}
                            onClick={() => !selectedAnswer && onSelectAnswer(option.text)}
                            disabled={selectedAnswer !== null || timerExpired}
                            className={`quiz-option-button
                                ${isSelected
                                    ? option.isCorrect
                                        ? "quiz-option-correct"
                                        : "quiz-option-incorrect"
                                    : shouldHighlightCorrect
                                        ? "quiz-option-correct"
                                        : "quiz-option-default"
                                }`}
                        >
                            {option.text}

                            {selectedAnswer && isSelected && (
                                <span
                                    className={`quiz-option-icon ${option.isCorrect ? "quiz-icon-correct" : "quiz-icon-incorrect"}`}
                                >
                                    {option.isCorrect ? "✔️" : "❌"}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {(selectedAnswer !== null || timerExpired) && (
                <div className="quiz-card-next-container">
                    <button onClick={onNextQuestion} className="quiz-card-next-button">
                        Next <span>→</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizCard;
