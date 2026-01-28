import React from 'react';

interface MCPStatusAlertProps {
    status: 'reachable' | 'unreachable' | null;
}

const MCPStatusAlert: React.FC<MCPStatusAlertProps> = ({ status }) => {
    if (!status) return null;

    const isReachable = status === 'reachable';

    return (
        <div className={`verification-status ${status}`}>
            {isReachable ? (
                <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8L6 11L13 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Reachable</span>
                </>
            ) : (
                <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="4" y1="4" x2="12" y2="12"></line>
                        <line x1="12" y1="4" x2="4" y2="12"></line>
                    </svg>
                    <span>Unreachable</span>
                </>
            )}
        </div>
    );
};

export default MCPStatusAlert;
