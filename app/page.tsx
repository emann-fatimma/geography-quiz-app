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
    const interval = setInterval(() => setTimer(prevTime => prevTime - 1), 1000);
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
    setShowStartPage(true);
  };

  if (showStartPage) {
    return <StartPage onStartQuiz={() => setShowStartPage(false)} />;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading quiz...</div>
      </div>
    );
  }

  if (quizCompleted) {
    return <ScorePage score={score} totalQuestions={questions.length} onRetry={handleRetry} />;
  }

  return (
    <main className="quiz-main">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1 className="quiz-title">Guess the Country by Its Neighbors Quiz</h1>
          <div className="quiz-stats">
            <div className="timer-container">
              <div className="timer-circle">
                <span className="timer-text">{timer}</span>
              </div>
            </div>
            <div className="quiz-progress">
              <div className="question-counter">{currentQuestionIndex + 1} of {questions.length}</div>
              <div className="score-indicator">Score: {score}</div>
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



