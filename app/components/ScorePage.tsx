import React from 'react';

interface ScorePageProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

const ScorePage: React.FC<ScorePageProps> = ({ score, totalQuestions, onRetry }) => {
  // Calculate percentage
  const percentage = (score / totalQuestions) * 100;
  
  // Generate message based on score
  const getMessage = () => {
    if (percentage === 100) return "Perfect! You're a geography genius!";
    if (percentage >= 80) return "Great job! You really know your borders!";
    if (percentage >= 50) return "Good effort! Keep practicing!";
    return "Better luck next time! Try again and improve!";
  };

  return (
    <div className="score-page-container">
      <div className="map-background">
        <div className="overlay-container">
          <div className="result-card">
            <h1 className="result-title">Quiz Completed!</h1>
            <p className="score-display">
              Your Score: <span className="score-value">{score} / {totalQuestions}</span>
            </p>
            <p className="score-message">{getMessage()}</p>
            <button
              onClick={onRetry}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;








// import React from 'react';
// interface ScorePageProps {
//   score: number;
//   totalQuestions: number;
//   onRetry: () => void;
// }

// const ScorePage: React.FC<ScorePageProps> = ({ score, totalQuestions, onRetry }) => {
//   // Calculate percentage
//   const percentage = (score / totalQuestions) * 100;

//   // Generate message based on score

//   const getMessage = () => {
//     if (percentage === 100) return "Perfect! You're a geography genius!";
//     if (percentage >= 80) return "Great job! You really know your borders!";
//     if (percentage >= 50) return "Good effort! Keep practicing!";
//     return "Better luck next time! Try again and improve!";
//   };

// return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 relative">
//       {/* Background Image Wrapper with Padding */}
//       <div 
//         className="relative w-full max-w-5xl min-h-[500px] p-6 rounded-lg shadow-3xl bg-cover bg-center" 
//         style={{ backgroundImage: "url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/world-map-watercolor-michael-tompsett.jpg')" }}
//       >
//         {/* Overlay to Center the Quiz Completion Box */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="bg-white bg-opacity-90 rounded-lg p-8 text-center shadow-2xl w-full max-w-md">
//             <h1 className="text-2xl font-bold text-black mb-4">Quiz Completed!</h1>
//             <p className="text-lg text-black mb-2">
//               Your Score: <span className="font-semibold">{score} / {totalQuestions}</span>
//             </p>
//             <p className="text-lg text-gray-700 mb-6">{getMessage()}</p>
  
//             {/* Try Again Button */}
//             <button 
//               onClick={onRetry} 
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors duration-200 font-medium"
//             >
//               Try Again 
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default ScorePage;




