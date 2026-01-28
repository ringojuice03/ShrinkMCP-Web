import React from 'react';
import PageHeader from '../components/pages/layout/PageHeader';
import MCPServerList from '../components/pages/configure/MCPServerList';
import MCPServerActions from '../components/pages/configure/MCPServerActions';
import ContextInput from '../components/pages/configure/ContextInput';

interface ConfigureProps {
    mcpServerUrls: string[];
    context: string;
    verificationStatus: Array<'reachable' | 'unreachable' | null>;
    verifying: boolean;
    onAddMcpServer: () => void;
    onMcpServerUrlChange: (index: number, value: string) => void;
    onDeleteMcpServer: (index: number) => void;
    onVerifyMcpServers: () => void;
    onContextChange: (value: string) => void;
    onInitiate: () => void;
}

const Configure: React.FC<ConfigureProps> = ({
    mcpServerUrls,
    context,
    verificationStatus,
    verifying,
    onAddMcpServer,
    onMcpServerUrlChange,
    onDeleteMcpServer,
    onVerifyMcpServers,
    onContextChange,
    onInitiate,
}) => {
    return (
        <>
            <PageHeader
                title="Configuration"
                description="Configure your MCP server settings and context before generating the pipeline."
            />

            <div className="config-container">
                <div className="config-form">
                    <div className="mcp-servers-section">
                        <MCPServerList
                            urls={mcpServerUrls}
                            statuses={verificationStatus}
                            onUrlChange={onMcpServerUrlChange}
                            onDelete={onDeleteMcpServer}
                        />

                        <MCPServerActions
                            onAdd={onAddMcpServer}
                            onVerify={onVerifyMcpServers}
                            verifying={verifying}
                            isVerifyDisabled={mcpServerUrls.every(url => !url.trim())}
                        />
                    </div>

                    <ContextInput
                        value={context}
                        onChange={onContextChange}
                    />
                </div>

                <div className="initiate-section">
                    <button
                        className="btn btn-primary btn-large"
                        onClick={onInitiate}
                    >
                        Initiate ShrinkMCP
                    </button>
                </div>
            </div>
        </>
    );
};

export default Configure;
