import React from 'react';
import MCPStatusAlert from '../../feedback/MCPStatusAlert';

interface MCPServerInputProps {
    index: number;
    url: string;
    status: 'reachable' | 'unreachable' | null;
    showLabel: boolean;
    canDelete: boolean;
    onChange: (value: string) => void;
    onDelete: () => void;
}

const MCPServerInput: React.FC<MCPServerInputProps> = ({
    index,
    url,
    status,
    showLabel,
    canDelete,
    onChange,
    onDelete,
}) => {
    return (
        <div className="form-group mcp-server-input-wrapper">
            {showLabel && (
                <label htmlFor={`mcp-server-url-${index}`} className="form-label">
                    MCP Server URL
                </label>
            )}
            <div className="input-row">
                <div className="input-with-delete">
                    <input
                        id={`mcp-server-url-${index}`}
                        type="text"
                        className="form-input"
                        placeholder="https://mcp.example.com"
                        value={url}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    {canDelete && (
                        <button
                            type="button"
                            className="delete-button"
                            onClick={onDelete}
                            aria-label="Delete MCP Server URL"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="4" y1="4" x2="12" y2="12"></line>
                                <line x1="12" y1="4" x2="4" y2="12"></line>
                            </svg>
                        </button>
                    )}
                </div>
                <MCPStatusAlert status={status} />
            </div>
        </div>
    );
};

export default MCPServerInput;
