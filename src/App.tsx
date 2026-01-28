import { useState } from 'react'
import './style.css'

function App() {
  const [activeSection, setActiveSection] = useState('Configure')
  const [mcpServerUrls, setMcpServerUrls] = useState<string[]>([''])
  const [context, setContext] = useState('')
  const [verificationStatus, setVerificationStatus] = useState<Array<'reachable' | 'unreachable' | null>>([null])
  const [verifying, setVerifying] = useState(false)
  const [generatedTemplates, setGeneratedTemplates] = useState(0)
  const [totalTemplates, setTotalTemplates] = useState(100)
  const [backtranslating, setBacktranslating] = useState(0)
  const [totalBacktranslating, setTotalBacktranslating] = useState(50)
  const [paraphrasing, setParaphrasing] = useState(0)
  const [totalParaphrasing, setTotalParaphrasing] = useState(50)
  const [noiseInjecting, setNoiseInjecting] = useState(0)
  const [totalNoiseInjecting, setTotalNoiseInjecting] = useState(50)
  const [labeledQueries, setLabeledQueries] = useState(0)
  const [totalLabeledQueries, setTotalLabeledQueries] = useState(100)
  const [epoch, setEpoch] = useState(0)
  const [totalEpochs, setTotalEpochs] = useState(5)
  const [steps, setSteps] = useState(0)
  const [totalSteps, setTotalSteps] = useState(5000)
  const [loss, setLoss] = useState(0)

  const sections = ['Configure', 'Train', 'Test']

  const handleAddMcpServer = () => {
    setMcpServerUrls([...mcpServerUrls, ''])
    setVerificationStatus([...verificationStatus, null])
  }

  const handleMcpServerUrlChange = (index: number, value: string) => {
    const newUrls = [...mcpServerUrls]
    newUrls[index] = value
    setMcpServerUrls(newUrls)
    // Clear verification status when URL changes
    const newStatus = [...verificationStatus]
    newStatus[index] = null
    setVerificationStatus(newStatus)
  }

  const handleDeleteMcpServer = (index: number) => {
    if (mcpServerUrls.length > 1) {
      const newUrls = mcpServerUrls.filter((_, i) => i !== index)
      setMcpServerUrls(newUrls)
      const newStatus = verificationStatus.filter((_, i) => i !== index)
      setVerificationStatus(newStatus)
    }
  }

  const handleVerifyMcpServers = async () => {
    const urlsToVerify = mcpServerUrls.filter(url => url.trim())
    if (urlsToVerify.length === 0) return

    setVerifying(true)
    try {
      // Simulate verification - first is reachable, second is unreachable
      const newStatus: Array<'reachable' | 'unreachable' | null> = mcpServerUrls.map((url) => {
        if (!url.trim()) return null
        // First filled URL = reachable, second = unreachable (as per user request)
        const filledUrls = mcpServerUrls.filter(u => u.trim())
        const filledIndex = filledUrls.indexOf(url)
        return filledIndex === 0 ? 'reachable' : 'unreachable'
      })

      setTimeout(() => {
        setVerifying(false)
        setVerificationStatus(newStatus)
      }, 1000)
    } catch {
      setTimeout(() => {
        setVerifying(false)
        const newStatus: Array<'reachable' | 'unreachable' | null> = mcpServerUrls.map((url) => {
          if (!url.trim()) return null
          const filledUrls = mcpServerUrls.filter(u => u.trim())
          const filledIndex = filledUrls.indexOf(url)
          return filledIndex === 0 ? 'reachable' : 'unreachable'
        })
        setVerificationStatus(newStatus)
      }, 1000)
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1 className="main-title">ShrinkMCP</h1>
        <p className="main-description">
          A Pipeline for Distilling Small Language Models (SLMs) on MCP-Powered Tasks
        </p>
      </div>

      <div className="content-container">
        <div className="sidebar">
          <nav className="nav-menu">
            {sections.map((section) => (
              <div
                key={section}
                className={`nav-item ${activeSection === section ? 'active' : ''}`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </div>
            ))}
          </nav>
        </div>

        <div className="main-content">
          {activeSection === 'Configure' && (
            <>
              <div className="section-header">
                {/* <span className="section-badge">Configure</span> */}
                <h2 className="section-title">Configuration</h2>
                <p className="section-description">
                  Configure your MCP server settings and context before generating the pipeline.
                </p>
              </div>

              <div className="config-container">
                <div className="config-form">
                  <div className="mcp-servers-section">
                    {mcpServerUrls.map((url, index) => (
                      <div key={index} className="form-group mcp-server-input-wrapper">
                        {index === 0 && (
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
                              onChange={(e) => handleMcpServerUrlChange(index, e.target.value)}
                            />
                            {mcpServerUrls.length > 1 && (
                              <button
                                type="button"
                                className="delete-button"
                                onClick={() => handleDeleteMcpServer(index)}
                                aria-label="Delete MCP Server URL"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                  <line x1="4" y1="4" x2="12" y2="12"></line>
                                  <line x1="12" y1="4" x2="4" y2="12"></line>
                                </svg>
                              </button>
                            )}
                          </div>
                          {verificationStatus[index] && (
                            <div className={`verification-status ${verificationStatus[index]}`}>
                              {verificationStatus[index] === 'reachable' ? (
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
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="form-actions">
                      <button
                        className="btn btn-primary"
                        onClick={handleAddMcpServer}
                      >
                        Add MCP Server
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleVerifyMcpServers}
                        disabled={verifying || mcpServerUrls.every(url => !url.trim())}
                      >
                        {verifying ? 'Verifying...' : 'Verify MCP Servers'}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="context" className="form-label">
                      Context
                    </label>
                    <textarea
                      id="context"
                      className="form-textarea"
                      placeholder="Enter context information..."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      rows={6}
                    />
                  </div>
                </div>

                <div className="initiate-section">
                  <button
                    className="btn btn-primary btn-large"
                    onClick={() => setActiveSection('Train')}
                  >
                    Initiate ShrinkMCP
                  </button>
                </div>
              </div>
            </>
          )}

          {activeSection === 'Train' && (
            <>
              <div className="section-header">
                <h2 className="section-title">Training Pipeline</h2>
                <p className="section-description">
                  Monitor the training progress and activity logs in real-time.
                </p>
              </div>

              <div className="timeline-container">
                <div className="timeline-event">
                  <div className="timeline-icon-wrapper">
                    <div className="timeline-icon purple">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title">Query Generation</div>
                    <div className="timeline-detail">Generated templates: {generatedTemplates}/{totalTemplates}</div>
                    <div className="timeline-meta">
                    </div>

                  </div>
                </div>

                <div className="timeline-event">
                  <div className="timeline-icon-wrapper">
                    <div className="timeline-icon orange">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>
                    </div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title">Query Augmentation</div>
                    <div className="timeline-detail">Backtranslated queries: {backtranslating}/{totalBacktranslating}</div>
                    <div className="timeline-detail">Paraphrased queries: {paraphrasing}/{totalParaphrasing}</div>
                    <div className="timeline-detail">Noise-injected queries: {noiseInjecting}/{totalNoiseInjecting}</div>
                    <div className="timeline-meta">
                    </div>
                  </div>
                </div>

                <div className="timeline-event">
                  <div className="timeline-icon-wrapper">
                    <div className="timeline-icon green">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title">Knowledge Extraction</div>
                    <div className="timeline-detail">Labeled queries: {labeledQueries}/{totalLabeledQueries}</div>
                    <div className="timeline-meta">
                    </div>
                  </div>
                </div>

                <div className="timeline-event">
                  <div className="timeline-icon-wrapper">
                    <div className="timeline-icon blue">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title">Model Fine-tuning</div>
                    <div className="timeline-detail">Epoch: {epoch}/{totalEpochs}</div>
                    <div className="timeline-detail">Steps: {steps}/{totalSteps.toLocaleString()}</div>
                    <div className="timeline-detail">Loss: {loss.toFixed(2)}</div>
                    <div className="timeline-meta">
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'Test' && (
            <>
              <div className="section-header">
                <h2 className="section-title">Model Testing</h2>
                <p className="section-description">
                  Compare the performance of different models side by side.
                </p>
              </div>

              <div className="test-panels-container">
                <div className="test-panel">
                  <div className="test-panel-header">
                    <div className="test-panel-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <div className="test-panel-title-section">
                      <div className="test-panel-title">ShrinkMCP Model</div>
                    </div>
                  </div>
                  <div className="test-chat-area">
                    {/* Chat messages will appear here */}
                  </div>
                  <div className="test-input-container">
                    <input
                      type="text"
                      className="test-input"
                      placeholder="Type your message..."
                    />
                    <button className="test-send-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="test-panel">
                  <div className="test-panel-header">
                    <div className="test-panel-icon teacher">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                    </div>
                    <div className="test-panel-title-section">
                      <div className="test-panel-title">Teacher Model</div>
                      <div className="test-panel-subtitle">GPT-4</div>
                    </div>
                  </div>
                  <div className="test-chat-area">
                    {/* Chat messages will appear here */}
                  </div>
                  <div className="test-input-container">
                    <input
                      type="text"
                      className="test-input"
                      placeholder="Type your message..."
                    />
                    <button className="test-send-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="test-panel">
                  <div className="test-panel-header">
                    <div className="test-panel-icon student">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="test-panel-title-section">
                      <div className="test-panel-title">Student Model</div>
                      <div className="test-panel-subtitle">Llama-3.2-1B</div>
                    </div>
                  </div>
                  <div className="test-chat-area">
                    {/* Chat messages will appear here */}
                  </div>
                  <div className="test-input-container">
                    <input
                      type="text"
                      className="test-input"
                      placeholder="Type your message..."
                    />
                    <button className="test-send-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="predefined-questions">
                <button className="question-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <span>What is the word formed when peace and maker is joined?</span>
                </button>
                <button className="question-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <span>What are the keywords in this quote: "Of all that is written I love only what a man has written with his blood"</span>
                </button>
                <button className="question-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <span>How to combine lo and ve?</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
