'use client';
import { useState, useEffect } from 'react';
import QuizCard from '@/app/components/QuizCard';
import StartPage from '@/app/components/StartPage';
import ScorePage from '@/app/components/ScorePage';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

export default function Home() {
  const [showStartPage, setShowStartPage] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(23);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/data/questions.json');
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (showStartPage || loading || timer <= 0 || selectedAnswer !== null) return;

    const interval = setInterval(() => {
      setTimer(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, loading, selectedAnswer, showStartPage]);

  useEffect(() => {
    if (timer === 0) {
      setSelectedAnswer('');
    }
  }, [timer]);

  const handleAnswerSelect = (optionText: string) => {
    setSelectedAnswer(optionText);

    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(option => option.text === optionText);

    if (selectedOption && selectedOption.isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setTimer(23);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimer(23);
    setQuizCompleted(false);
  };

  const startQuiz = () => {
    setShowStartPage(false);
  };

  if (showStartPage) {
    return (
      <StartPage
        title="Guess the Country by its Neighbors Quiz"
        subtitle="Test your geography knowledge with this challenging quiz!"
        imageUrl="/images/world-map-network.jpg"
        startQuizLink="#"
        onStartQuiz={startQuiz}
      />
    );
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading quiz...</div>
      </div>
    );
  }

  if (quizCompleted) {
    return <ScorePage score={score} totalQuestions={questions.length} onRetry={handleRetry} />;
  }

  return (
    <main className="bg-white h-screen flex items-center justify-center p-0 overflow-hidden">
      <div className="max-w-3xl w-full quiz-container rounded-sm shadow-md overflow-hidden p-0 m-0">
        <div className="flex items-center justify-between p-4 border-b border-opacity-20 bg-white p-0 m-0">
          <h1 className="text-xl font-bold text-black">
            Guess the Country by Its Neighbors Quiz
          </h1>

          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 text-bold flex items-center justify-center text-black">
                <div className="h-12 w-12 rounded-full border-2 border-red-600 flex items-center justify-center">
                  <span className="text-lg font-bold text-black">{timer}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-lg font-medium text-black">{currentQuestionIndex + 1} of {questions.length}</div>
              <div className="text-lg text-black bg-blue-100 rounded-full px-4 py-2">
                Score: {score}
              </div>

            </div>
          </div>
        </div>

        {questions.length > 0 && (
          <QuizCard
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onSelectAnswer={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            onNextQuestion={handleNextQuestion}
          />
        )}
      </div>
    </main>
  );
}


