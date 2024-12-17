'use client';

import { useState } from 'react';
import { INTRO_TEXT, QUESTIONS, RESULTS, QUIZ_CONFIG, END_TEXT } from '@/lib/quiz-content';
import { calculateResult } from '@/lib/scoring-system';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(1);
  };

  const handleQuestionChange = (questionId: number, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    if (questionId === QUIZ_CONFIG.totalQuestions) {
      const reindeerResult = calculateResult(answers);
      setResult(reindeerResult);
    } else {
      setCurrentQuestion(questionId + 1);
    }
  };

  const handleAnswer = (questionId: number, answerId: string) => {
    if (window.innerWidth <= 480) {
      setIsTransitioning(true);
      if (!isTransitioning) {
        requestAnimationFrame(() => {
          handleQuestionChange(questionId, answerId);
          requestAnimationFrame(() => {
            setIsTransitioning(false);
          });
        });
      }
    } else {
      handleQuestionChange(questionId, answerId);
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
      <div className="survey-container">
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
    const reindeerResult = RESULTS[result as keyof typeof RESULTS];
    return (
      <div className="survey-container">
        <h2 className="survey-header">{reindeerResult.title}</h2>
        <div className="traits-container">
          {reindeerResult.traits.map((trait, index) => (
            <span key={index} className="trait-tag">{trait}</span>
          ))}
        </div>
        <p>{reindeerResult.description}</p>
        
        <div className="share-section">
          <button 
            onClick={() => setShowShareModal(true)} 
            className="primary-share-button"
          >
            Share Your Result
          </button>

          {showShareModal && (
            <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
              <div className="share-modal" onClick={e => e.stopPropagation()}>
                <h3>Share Your Result</h3>
                <div className="share-options">
                  <button 
                    onClick={() => handleShare('twitter')} 
                    className="share-option-button twitter"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>Share on X/Twitter</span>
                  </button>
                  <button 
                    onClick={() => handleShare('facebook')} 
                    className="share-option-button facebook"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                    </svg>
                    <span>Share on Facebook</span>
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')} 
                    className="share-option-button whatsapp"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Share on WhatsApp</span>
                  </button>
                  <button 
                    onClick={() => handleShare('copy')} 
                    className="share-option-button copy"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                    <span>Copy Link</span>
                  </button>
                </div>
                <button 
                  className="close-modal" 
                  onClick={() => setShowShareModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="button-container">
          <button onClick={handleRetake} className="survey-button">
            {END_TEXT.retakeButton}
          </button>
        </div>
      </div>
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
      
      <div className="options-container">
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
