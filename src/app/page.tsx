'use client';

import { useState } from 'react';
import { INTRO_TEXT, QUESTIONS, RESULTS, QUIZ_CONFIG, END_TEXT } from '@/lib/quiz-content';
import { calculateResult } from '@/lib/scoring-system';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);

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
    const result = RESULTS[result as keyof typeof RESULTS];
    const shareText = result?.shareText || '';
    const shareUrl = `${QUIZ_CONFIG.shareBaseUrl}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${QUIZ_CONFIG.shareHashtag}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(result?.title || '')}&summary=${encodeURIComponent(shareText)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText + ' ' + shareUrl);
        break;
    }
  };

  if (!started) {
    return (
      <div className="quiz-container">
        <h1 className="quiz-header">{INTRO_TEXT.title}</h1>
        <p className="quiz-description">{INTRO_TEXT.description}</p>
        <div className="text-center">
          <button onClick={handleStart} className="start-button">
            {INTRO_TEXT.startButton}
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    const reindeerResult = RESULTS[result as keyof typeof RESULTS];
    return (
      <div className="quiz-container result-container">
        <h2 className="result-title">{reindeerResult.title}</h2>
        <div className="traits-list">
          {reindeerResult.traits.map((trait, index) => (
            <span key={index} className="trait-tag">{trait}</span>
          ))}
        </div>
        <p className="result-description">{reindeerResult.description}</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={() => handleShare('twitter')} className="share-button">
            Share on X/Twitter
          </button>
          <button onClick={() => handleShare('facebook')} className="share-button">
            Share on Facebook
          </button>
          <button onClick={() => handleShare('linkedin')} className="share-button">
            Share on LinkedIn
          </button>
          <button onClick={() => handleShare('whatsapp')} className="share-button">
            Share on WhatsApp
          </button>
          <button onClick={() => handleShare('copy')} className="share-button">
            Copy Link
          </button>
        </div>
        
        <button onClick={handleRetake} className="retake-button">
          {END_TEXT.retakeButton}
        </button>
      </div>
    );
  }

  const question = QUESTIONS.find(q => q.id === currentQuestion);
  if (!question) return null;

  const progress = (currentQuestion / QUIZ_CONFIG.totalQuestions) * 100;

  return (
    <div className="quiz-container">
      {QUIZ_CONFIG.showQuestionNumber && (
        <div className="question-number">
          Question {currentQuestion} of {QUIZ_CONFIG.totalQuestions}
        </div>
      )}
      
      {QUIZ_CONFIG.showProgressBar && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      <h2 className="question-text">{question.text}</h2>
      
      <div>
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(question.id, option.id)}
            className={`option-button ${answers[question.id] === option.id ? 'selected' : ''}`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
