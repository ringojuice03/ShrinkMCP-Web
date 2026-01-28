import React from 'react';

interface GlobalChatInputProps {
    onSend: (message: string) => void;
}

const GlobalChatInput: React.FC<GlobalChatInputProps> = ({ onSend }) => {
    const [message, setMessage] = React.useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="global-chat-input-container">
            <div className="chat-input-content">
                <div className="chat-input-main-row">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sparkles-icon">
                        <path d="M12 3l1.91 5.89L20 10.8l-5.89 1.91L12 18.6l-1.91-5.89L4.2 10.8l5.89-1.91L12 3z" />
                        <path d="M5 3l.64 1.96L7.6 5.6 5.64 6.24 5 8.2l-.64-1.96L2.4 5.6l1.96-.64L5 3z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Ask me anything..."
                        className="global-chat-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="send-btn" onClick={handleSend} disabled={!message.trim()}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="19" x2="12" y2="5" />
                            <polyline points="5 12 12 5 19 12" />
                        </svg>
                        <span>Send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GlobalChatInput;
