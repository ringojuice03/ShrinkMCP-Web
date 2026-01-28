import React from 'react';
import PageHeader from '../components/pages/layout/PageHeader';
import GlobalChatInput from '../components/pages/test/GlobalChatInput';
import ModelPanel from '../components/pages/test/ModelPanel';
import PredefinedQuestions from '../components/pages/test/PredefinedQuestions';

const Test: React.FC = () => {
    const handleSend = (message: string) => {
        console.log('Sending message:', message);
    };

    const handleQuestionSelect = (question: string) => {
        console.log('Selected question:', question);
    };

    const questions = [
        { text: "What is the word formed when peace and maker is joined?" },
        { text: "What are the keywords in this quote: \"Of all that is written, I love only what a man has written with his blood.\"" },
        { text: "How to combine lo and ve?" }
    ];

    return (
        <>
            <PageHeader
                title="Model Testing"
                description="Compare the performance of different models side by side."
            />

            <div className="test-panels-container">
                <ModelPanel
                    title="ShrinkMCP Model"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                        </svg>
                    }
                />

                <ModelPanel
                    title="Teacher Model"
                    subtitle="GPT-4"
                    iconClass="teacher"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                        </svg>
                    }
                />

                <ModelPanel
                    title="Student Model"
                    subtitle="Llama-3.2-1B"
                    iconClass="student"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    }
                />
            </div>

            <PredefinedQuestions
                questions={questions}
                onSelect={handleQuestionSelect}
            />

            <GlobalChatInput onSend={handleSend} />
        </>
    );
};

export default Test;
