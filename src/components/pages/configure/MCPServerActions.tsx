import React from 'react';

interface MCPServerActionsProps {
    onAdd: () => void;
    onVerify: () => void;
    verifying: boolean;
    isVerifyDisabled: boolean;
}

const MCPServerActions: React.FC<MCPServerActionsProps> = ({
    onAdd,
    onVerify,
    verifying,
    isVerifyDisabled,
}) => {
    return (
        <div className="form-actions">
            <button
                className="btn btn-primary"
                onClick={onAdd}
            >
                Add MCP Server
            </button>
            <button
                className="btn btn-secondary"
                onClick={onVerify}
                disabled={verifying || isVerifyDisabled}
            >
                {verifying ? 'Verifying...' : 'Verify MCP Servers'}
            </button>
        </div>
    );
};

export default MCPServerActions;
