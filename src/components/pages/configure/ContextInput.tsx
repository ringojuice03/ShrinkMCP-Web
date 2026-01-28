import React from 'react';

interface ContextInputProps {
    value: string;
    onChange: (value: string) => void;
}

const ContextInput: React.FC<ContextInputProps> = ({ value, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor="context" className="form-label">
                Context
            </label>
            <textarea
                id="context"
                className="form-textarea"
                placeholder="Enter context information..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={6}
            />
        </div>
    );
};

export default ContextInput;
