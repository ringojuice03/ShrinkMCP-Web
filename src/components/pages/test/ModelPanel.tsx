import React from 'react';

interface ModelPanelProps {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    iconClass?: string;
    children?: React.ReactNode;
}

const ModelPanel: React.FC<ModelPanelProps> = ({ title, subtitle, icon, iconClass, children }) => {
    return (
        <div className="test-panel">
            <div className="test-panel-header">
                <div className={`test-panel-icon ${iconClass || ''}`}>
                    {icon}
                </div>
                <div className="test-panel-title-section">
                    <div className="test-panel-title">{title}</div>
                    {subtitle && <div className="test-panel-subtitle">{subtitle}</div>}
                </div>
            </div>
            <div className="test-chat-area">
                {children || <div className="placeholder-text">Chat messages will appear here</div>}
            </div>
        </div>
    );
};

export default ModelPanel;
