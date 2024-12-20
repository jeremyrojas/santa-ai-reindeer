'use client';

import { useState } from 'react';
import { INTRO_TEXT, QUESTIONS, RESULTS, QUIZ_CONFIG } from '@/lib/quiz-content';
import { calculateResult } from '@/lib/scoring-system';
import { ResultCard } from '@/components/ResultCard';
import Image from 'next/image';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(1);
  };

  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    if (questionId === QUIZ_CONFIG.totalQuestions) {
      const reindeerResult = calculateResult(answers);
      setResult(reindeerResult);
    } else {
      setCurrentQuestion(questionId + 1);
    }
  };

  const handleRetake = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const handleShare = (platform: string) => {
    const resultData = result ? RESULTS[result as keyof typeof RESULTS] : null;
    if (!resultData) return;

    const shareText = resultData.shareText;
    const shareUrl = QUIZ_CONFIG.shareBaseUrl;
    const hashtag = QUIZ_CONFIG.shareHashtag;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtag}`);
        break;
      case 'facebook':
        const fbHashtag = encodeURIComponent(hashtag);
        const fbShareText = `${shareText}\n\n#${hashtag}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&hashtag=%23${fbHashtag}&quote=${encodeURIComponent(fbShareText)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n#${hashtag} ${shareUrl}`)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n\n#${hashtag} ${shareUrl}`).then(() => {
          alert('Link copied to clipboard!');
        });
        break;
    }
  };

  if (!started) {
    return (
      <div className="survey-container has-profile">
        <div className="reindeer-profile">
          <Image 
            src="/images/santa.png"
            alt="Santa in his AI workshop with reindeer"
            width={200}
            height={200}
            className="reindeer-avatar"
            priority
          />
        </div>
        <h1 className="survey-header">{INTRO_TEXT.title}</h1>
        <p>{INTRO_TEXT.description}</p>
        <div className="button-container">
          <button onClick={handleStart} className="survey-button">
            {INTRO_TEXT.startButton}
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <ResultCard
        result={result}
        onRetake={handleRetake}
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        handleShare={handleShare}
      />
    );
  }

  const question = QUESTIONS.find(q => q.id === currentQuestion);
  if (!question) return null;

  const progress = (currentQuestion / QUIZ_CONFIG.totalQuestions) * 100;

  return (
    <div className="survey-container">
      {QUIZ_CONFIG.showProgressBar && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      {QUIZ_CONFIG.showQuestionNumber && (
        <div className="question-number">
          <span className="question-number-text">Question {currentQuestion} of {QUIZ_CONFIG.totalQuestions}</span>
          <div className="question-number-ornaments">
            <span className="ornament left">❄️</span>
            <span className="ornament right">❄️</span>
          </div>
        </div>
      )}

      <h2 className="survey-header">{question.text}</h2>
      
      <div className="options-container" key={`question-${currentQuestion}`}>
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(question.id, option.id)}
            className="option-card"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
