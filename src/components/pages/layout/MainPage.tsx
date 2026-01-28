import React from 'react';
import StepSidebar from '../../navigation/StepSidebar';

interface MainPageProps {
    children: React.ReactNode;
}

const MainPage: React.FC<MainPageProps> = ({ children }) => {
    const sections = ['Configure', 'Train', 'Test'];

    return (
        <div className="app">
            <div className="header">
                <h1 className="main-title text-primary">ShrinkMCP</h1>
                <p className="main-description">
                    A Pipeline for Distilling Small Language Models (SLMs) on MCP-Powered Tasks
                </p>
            </div>

            <div className="content-container">
                <StepSidebar sections={sections} />

                <div className="main-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
