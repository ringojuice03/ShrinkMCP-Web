import React from 'react';
import MCPServerInput from './MCPServerInput';

interface MCPServerListProps {
    urls: string[];
    statuses: Array<'reachable' | 'unreachable' | null>;
    onUrlChange: (index: number, value: string) => void;
    onDelete: (index: number) => void;
}

const MCPServerList: React.FC<MCPServerListProps> = ({
    urls,
    statuses,
    onUrlChange,
    onDelete,
}) => {
    return (
        <>
            {urls.map((url, index) => (
                <MCPServerInput
                    key={index}
                    index={index}
                    url={url}
                    status={statuses[index]}
                    showLabel={index === 0}
                    canDelete={urls.length > 1}
                    onChange={(value) => onUrlChange(index, value)}
                    onDelete={() => onDelete(index)}
                />
            ))}
        </>
    );
};

export default MCPServerList;
