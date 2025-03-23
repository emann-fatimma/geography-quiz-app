import React from 'react';
// import { CheckCircle, XCircle } from "lucide-react"; 


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
<div className="bg-blue-50 rounded-sm shadow-md p-6 animate-fadeIn overflow-hidden">
<h2 className="text-xl font-black font-semibold mb-6 text-black">{currentQuestion.question}</h2>

            <div className="grid grid-cols-2 gap-3">
                {currentQuestion.options.map((option) => {
                    const isSelected = selectedAnswer === option.text;
                    const shouldHighlightCorrect = (timerExpired || selectedAnswer !== null) && option.isCorrect;

                    return (
                        <button
                            key={option.text}
                            onClick={() => !selectedAnswer && onSelectAnswer(option.text)}
                            disabled={selectedAnswer !== null || timerExpired}
                            className={`
    p-4 rounded-md text-left transition-all duration-200 text-black outline outline-1 outline-blue-500 flex justify-between items-center
    ${isSelected
                                    ? option.isCorrect
                                        ? "bg-green-100 border-2 border-green-500"
                                        : "bg-red-100 border-2 border-red-500"
                                    : shouldHighlightCorrect
                                        ? "bg-green-100 border-2 border-green-500"
                                        : "border border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                                }
  `}
                        >
                            {option.text}

                            {selectedAnswer && isSelected && (
                                <span
                                    className={`ml-2 text-lg font-bold ${option.isCorrect ? "text-green-500" : "text-red-500"} relative`}
                                    style={{ top: "-31px", right: "-25px" }} // Moves the tick/cross upwards
                                >
                                    {option.isCorrect ? "✔️" : "❌"}
                                </span>
                            )}

                        </button>

                    );
                })}
            </div>

            {(selectedAnswer !== null || timerExpired) && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onNextQuestion}
                        className="bg-[rgb(20,60,120)] hover:bg-[rgb(15,50,100)] text-white py-2 px-6 rounded-md transition-colors duration-200 font-medium flex items-center gap-2"
                    >
                        Next <span>→</span>
                    </button>

                </div>
            )}
        </div>
    );
};

export default QuizCard;