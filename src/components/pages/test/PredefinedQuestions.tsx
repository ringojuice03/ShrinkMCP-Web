import React from 'react';

interface Question {
    text: string;
}

interface PredefinedQuestionsProps {
    questions: Question[];
    onSelect: (question: string) => void;
}

const PredefinedQuestions: React.FC<PredefinedQuestionsProps> = ({ questions, onSelect }) => {
    return (
        <div className="predefined-questions">
            {questions.map((q, index) => (
                <button
                    key={index}
                    className="question-button"
                    onClick={() => onSelect(q.text)}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span>{q.text}</span>
                </button>
            ))}
        </div>
    );
};

export default PredefinedQuestions;
