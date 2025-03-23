// // app/components/StartPage.tsx
// 'use client';
// import React from 'react';
// import Image from 'next/image';

// interface StartPageProps {
//     title: string;
//     subtitle: string;
//     imageUrl: string;
//     startQuizLink: string;
//     onStartQuiz: () => void;
// }

// const StartPage: React.FC<StartPageProps> = ({
//     title = "Guess the Country by its Neighbors Quiz",
//     subtitle = "Test your geography knowledge with this challenging quiz!",
//     startQuizLink = "/quiz",
//     onStartQuiz
// }) => {
//     return (
//         <div className="min-h-screen bg-[#f5f5f5] text-[#333]">
//             <div className="max-w-[800px] mx-auto p-5">
//                 <header className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-[#2c3e50] mb-2">{title}</h1>
//                     <p className="text-lg text-[#7f8c8d] mb-8">{subtitle}</p>
//                 </header>

//                 <div className="relative w-full h-[450px] rounded-lg mb-8 shadow-md overflow-hidden">
//                     <Image
//                         src="/download.jpg"
//                         alt="World map network showing country connections"
//                         fill
//                         style={{ objectFit: 'cover' }}
//                         priority
//                     />

//                     {/* Overlay box */}
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-4/5 max-w-md text-center">
//                         <h2 className="text-xl font-bold mb-4 text-[#2c3e50]">Test Your Geography Knowledge</h2>
//                         <p className="mb-4">Every country shares borders with neighbors. Your challenge is to identify countries based only on their neighbors.</p>
//                         <p className="mb-6">Ready to put your global knowledge to the test?</p>
//                         <button
//                             onClick={onStartQuiz}
//                             className="w-[200px] py-4 bg-[#3498db] text-white text-center font-bold text-lg rounded transition-colors hover:bg-[#2980b9]"
//                         >
//                             Start Quiz
//                         </button>
//                     </div>
//                 </div>

//                 <footer className="text-center mt-12 text-sm text-[#7f8c8d]">
//                     <p>© {new Date().getFullYear()} Geography Quiz Challenge. All rights reserved.</p>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default StartPage;


'use client';
import React from 'react';
import Image from 'next/image';

interface StartPageProps {
    title: string;
    subtitle: string;
    startQuizLink: string;
    onStartQuiz: () => void;
}

const StartPage: React.FC<StartPageProps> = ({
    title = "Guess the Country by its Neighbors Quiz",
    subtitle = "Test your geography knowledge with this challenging quiz!",
    startQuizLink = "/quiz",
    onStartQuiz
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
