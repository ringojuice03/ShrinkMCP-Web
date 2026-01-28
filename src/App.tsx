import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './style.css'
import Configure from './pages/Configure'
import Train from './pages/Train'
import Test from './pages/Test'
import MainPage from './components/pages/layout/MainPage'

function App() {
  const navigate = useNavigate()
  const [mcpServerUrls, setMcpServerUrls] = useState<string[]>([''])
  const [context, setContext] = useState('')
  const [verificationStatus, setVerificationStatus] = useState<Array<'reachable' | 'unreachable' | null>>([null])
  const [verifying, setVerifying] = useState(false)
  const [generatedTemplates, _setGeneratedTemplates] = useState(0)
  const [totalTemplates, _setTotalTemplates] = useState(100)
  const [backtranslating, _setBacktranslating] = useState(0)
  const [totalBacktranslating, _setTotalBacktranslating] = useState(50)
  const [paraphrasing, _setParaphrasing] = useState(0)
  const [totalParaphrasing, _setTotalParaphrasing] = useState(50)
  const [noiseInjecting, _setNoiseInjecting] = useState(0)
  const [totalNoiseInjecting, _setTotalNoiseInjecting] = useState(50)
  const [labeledQueries, _setLabeledQueries] = useState(0)
  const [totalLabeledQueries, _setTotalLabeledQueries] = useState(100)
  const [epoch, _setEpoch] = useState(0)
  const [totalEpochs, _setTotalEpochs] = useState(5)
  const [steps, _setSteps] = useState(0)
  const [totalSteps, _setTotalSteps] = useState(5000)
  const [loss, _setLoss] = useState(0)

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
    <MainPage>
      <Routes>
        <Route path="/" element={<Navigate to="/configure" replace />} />
        <Route
          path="/configure"
          element={
            <Configure
              mcpServerUrls={mcpServerUrls}
              context={context}
              verificationStatus={verificationStatus}
              verifying={verifying}
              onAddMcpServer={handleAddMcpServer}
              onMcpServerUrlChange={handleMcpServerUrlChange}
              onDeleteMcpServer={handleDeleteMcpServer}
              onVerifyMcpServers={handleVerifyMcpServers}
              onContextChange={setContext}
              onInitiate={() => navigate('/train')}
            />
          }
        />
        <Route
          path="/train"
          element={
            <Train
              generatedTemplates={generatedTemplates}
              totalTemplates={totalTemplates}
              backtranslating={backtranslating}
              totalBacktranslating={totalBacktranslating}
              paraphrasing={paraphrasing}
              totalParaphrasing={totalParaphrasing}
              noiseInjecting={noiseInjecting}
              totalNoiseInjecting={totalNoiseInjecting}
              labeledQueries={labeledQueries}
              totalLabeledQueries={totalLabeledQueries}
              epoch={epoch}
              totalEpochs={totalEpochs}
              steps={steps}
              totalSteps={totalSteps}
              loss={loss}
            />
          }
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </MainPage>
  )
}

export default App
