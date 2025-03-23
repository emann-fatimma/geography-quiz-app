'use client';
import React from 'react';
import Image from 'next/image';

interface StartPageProps {
  title?: string;
  subtitle?: string;
  onStartQuiz: () => void;
}

const StartPage: React.FC<StartPageProps> = ({
  title = "Guess the Country by its Neighbors Quiz",
  subtitle = "Test your geography knowledge with this challenging quiz!",
  onStartQuiz,
}) => {
  return (
    <div className="start-page-container">
      <div className="start-page-content">
        <header className="start-page-header">
          <h1 className="start-page-title">{title}</h1>
          <p className="start-page-subtitle">{subtitle}</p>
        </header>

        <div className="start-page-image-container">
          <Image
            src="/download.jpg"
            alt="World map network showing country connections"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />

          {/* Overlay box */}
          <div className="start-page-overlay">
            <h2 className="overlay-title">Test Your Geography Knowledge</h2>
            <p className="overlay-text">
              Every country shares borders with neighbors. Your challenge is to identify countries based only on their neighbors.
            </p>
            <p className="overlay-text">Ready to put your global knowledge to the test?</p>
            <button onClick={onStartQuiz} className="start-page-button">
              Start Quiz
            </button>
          </div>
        </div>

        <footer className="start-page-footer">
          <p>© {new Date().getFullYear()} Geography Quiz Challenge. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default StartPage;



// 'use client';
// import React from 'react';
// import Image from 'next/image';

// interface StartPageProps {
//   title?: string;
//   subtitle?: string;
// }

// const StartPage: React.FC<StartPageProps> = ({
//   title = "Guess the Country by its Neighbors Quiz",
//   subtitle = "Test your geography knowledge with this challenging quiz!",
// }) => {
//   return (
//     <div className="start-page-container">
//       <div className="start-page-content">
//         <header className="start-page-header">
//           <h1 className="start-page-title">{title}</h1>
//           <p className="start-page-subtitle">{subtitle}</p>
//         </header>

//         <div className="start-page-image-container">
//           <Image
//             src="/download.jpg"
//             alt="World map network showing country connections"
//             fill
//             style={{ objectFit: 'cover' }}
//             priority
//           />

//           {/* Overlay box */}
//           <div className="start-page-overlay">
//             <h2 className="overlay-title">Test Your Geography Knowledge</h2>
//             <p className="overlay-text">
//               Every country shares borders with neighbors. Your challenge is to identify countries based only on their neighbors.
//             </p>
//             <p className="overlay-text">Ready to put your global knowledge to the test?</p>
//           </div>
//         </div>

//         <footer className="start-page-footer">
//           <p>© {new Date().getFullYear()} Geography Quiz Challenge. All rights reserved.</p>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default StartPage;





