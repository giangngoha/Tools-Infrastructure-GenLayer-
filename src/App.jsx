import React, { useState, useEffect, useMemo } from 'react';
import { 
  Code2, 
  CloudSun, 
  TrendingUp, 
  Share2, 
  ShieldCheck, 
  Key, 
  Play, 
  Terminal, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  Cpu,
  Database,
  Search,
  Copy,
  Plus
} from 'lucide-react';

// --- CONTRACT TEMPLATES ---
const TEMPLATES = [
  {
    id: 'weather-oracle',
    name: 'Weather Insurance Contract',
    icon: <CloudSun className="w-5 h-5" />,
    description: 'Triggers payouts based on precipitation levels from OpenWeather.',
    code: `// Intelligent Weather Contract
import { Oracle, Guard } from "@intel/std";

contract WeatherInsurance {
    address public oracle = "0x7a...42";
    
    // Pattern: Request-Response
    function checkRainfall(string memory city) public {
        Oracle.request(
            oracle, 
            "GET_WEATHER", 
            { "city": city, "field": "rain.1h" },
            this.fulfill.selector
        );
    }

    function fulfill(uint256 value) external onlyOracle {
        if (value > 10) { // >10mm rain
            processPayout();
        }
    }
}`,
    api: 'OpenWeatherMap'
  },
  {
    id: 'price-feed',
    name: 'Dynamic Price Feed',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Multi-source price aggregation for DeFi lending.',
    code: `// Intelligent Price Feed
import { Aggregator } from "@intel/feeds";

contract PriceOracle {
    function getPrice(string memory pair) public returns (uint256) {
        // Fetches from Binance & Coinbase via Secure Gateway
        uint256 binance = Aggregator.fetch("BINANCE", pair);
        uint256 coinbase = Aggregator.fetch("COINBASE", pair);
        
        return (binance + coinbase) / 2;
    }
}`,
    api: 'Exchange Feeds'
  },
  {
    id: 'social-auth',
    name: 'Social Media Verifier',
    icon: <Share2 className="w-5 h-5" />,
    description: 'Validates proof-of-post for marketing rewards.',
    code: `// Intelligent Social Contract
import { SocialAPI } from "@intel/social";

contract RewardSystem {
    function claimReward(string memory tweetId) public {
        bool verified = SocialAPI.verifyMention(
            tweetId, 
            msg.sender, 
            "@ProtocolXYZ"
        );
        
        require(verified, "No valid tweet found");
        transferToken(msg.sender, 100);
    }
}`,
    api: 'X / Twitter API'
  }
];

// --- APP COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('editor');
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [keys, setKeys] = useState([
    { id: 1, name: 'OpenWeather API', value: 'sk_live_....2a3b', status: 'Active' },
    { id: 2, name: 'Twitter OAuth', value: 'app_key_....9f8e', status: 'Pending' }
  ]);
  const [logs, setLogs] = useState([
    { time: '14:20:01', msg: 'Studio Engine Initialized.', type: 'info' },
    { time: '14:20:05', msg: 'Standard Libraries @intel/std loaded.', type: 'success' }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setCode(selectedTemplate.code);
  }, [selectedTemplate]);

  const addLog = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [...prev, { time, msg, type }]);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    addLog(`Compiling ${selectedTemplate.name}...`, 'info');
    
    setTimeout(() => {
      addLog('Contract deployed to local sandbox 0xSandbox_1.', 'success');
      addLog(`Requesting external data from ${selectedTemplate.api}...`, 'info');
      
      setTimeout(() => {
        addLog('Oracle Response: Data verified via Secure Enclave.', 'success');
        addLog('State Update: Condition MET. Payout processing.', 'success');
        setIsSimulating(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-200 font-sans selection:bg-blue-500/30">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 px-6 py-3 flex items-center justify-between bg-[#161922]">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Intelligent Studio <span className="text-xs font-normal text-blue-400 border border-blue-400/30 px-1.5 py-0.5 rounded ml-2">v2.5</span></h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Powered by Secure Oracles</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex bg-[#0a0c12] rounded-lg p-1 border border-white/5">
            <button 
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-1.5 rounded-md text-sm transition-all ${activeTab === 'editor' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/5'}`}
            >
              Contract Editor
            </button>
            <button 
              onClick={() => setActiveTab('vault')}
              className={`px-4 py-1.5 rounded-md text-sm transition-all ${activeTab === 'vault' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/5'}`}
            >
              Key Vault
            </button>
          </div>
          <button className="bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="flex h-[calc(100-60px)] overflow-hidden">
        {/* Left Sidebar - Template Library */}
        <aside className="w-72 border-r border-white/10 bg-[#161922] p-4 flex flex-col gap-6 overflow-y-auto">
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Contract Templates</h2>
            <div className="space-y-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t)}
                  className={`w-full text-left p-3 rounded-xl transition-all group flex gap-3 items-start border ${selectedTemplate.id === t.id ? 'bg-blue-600/10 border-blue-500/50' : 'border-transparent hover:bg-white/5'}`}
                >
                  <div className={`p-2 rounded-lg ${selectedTemplate.id === t.id ? 'bg-blue-600 text-white' : 'bg-[#1c212e] group-hover:bg-[#252b3d]'}`}>
                    {t.icon}
                  </div>
                  <div>
                    <h3 className={`text-sm font-medium ${selectedTemplate.id === t.id ? 'text-white' : 'text-gray-300'}`}>{t.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{t.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-4 border border-blue-500/20">
              <ShieldCheck className="w-8 h-8 text-blue-400 mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">Secure Execution</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                All external API calls are routed through hardware-protected Trusted Execution Environments (TEE).
              </p>
            </div>
          </div>
        </aside>

        {/* Center - Workspace */}
        <section className="flex-1 flex flex-col bg-[#0f1117]">
          {activeTab === 'editor' ? (
            <>
              {/* Toolbar */}
              <div className="h-12 border-b border-white/5 bg-[#161922]/50 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">main.isc</span>
                  <span className="text-xs text-gray-600 italic">Autosaved just now</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                    Copy Code
                  </button>
                  <button 
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${isSimulating ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(22,163,74,0.3)]'}`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    {isSimulating ? 'Running...' : 'Simulate Contract'}
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-12 h-full bg-[#161922]/30 border-r border-white/5 flex flex-col items-center py-4 text-[10px] text-gray-600 font-mono select-none">
                  {Array.from({length: 25}).map((_, i) => <div key={i} className="h-6 flex items-center">{i + 1}</div>)}
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-transparent p-4 pl-16 font-mono text-sm resize-none focus:outline-none text-blue-100/90 leading-6"
                  spellCheck="false"
                />
              </div>

              {/* Console/Logs */}
              <div className="h-64 border-t border-white/10 bg-[#0a0c12]">
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#161922]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                    <Terminal className="w-3.5 h-3.5" />
                    Simulation Console
                  </div>
                  <button onClick={() => setLogs([])} className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors">Clear</button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-40px)] space-y-2 font-mono text-xs">
                  {logs.length === 0 && <p className="text-gray-700 italic">No activity recorded...</p>}
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 group">
                      <span className="text-gray-700 select-none">[{log.time}]</span>
                      <span className={`${log.type === 'success' ? 'text-green-400' : log.type === 'error' ? 'text-red-400' : 'text-blue-400'}`}>
                        {log.type === 'success' ? '✓' : log.type === 'error' ? '✖' : 'ℹ'}
                      </span>
                      <span className={log.type === 'error' ? 'text-red-200' : 'text-gray-300'}>{log.msg}</span>
                    </div>
                  ))}
                  {isSimulating && <div className="animate-pulse flex gap-4 text-blue-400"><span className="text-gray-700">--:--:--</span><span>⟳</span><span>Processing transaction...</span></div>}
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 max-w-4xl mx-auto w-full">
              <header className="mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Key className="text-blue-500" />
                  Secure Key Vault
                </h2>
                <p className="text-gray-400 mt-2">Manage your private API keys. These are never stored on-chain and only accessible by the secure Oracle Gateway.</p>
              </header>

              <div className="grid gap-4">
                {keys.map((key) => (
                  <div key={key.id} className="bg-[#161922] border border-white/10 rounded-2xl p-5 flex items-center justify-between group hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-600/10 rounded-xl">
                        <Database className="text-blue-400 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{key.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-xs text-gray-500 bg-black/30 px-2 py-0.5 rounded tracking-tighter">{key.value}</code>
                          <button className="text-gray-600 hover:text-blue-400"><Copy className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${key.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                        {key.status}
                      </span>
                      <button className="text-gray-600 hover:text-red-400 transition-colors p-2 hover:bg-red-400/10 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                <button className="border-2 border-dashed border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all group mt-4">
                  <div className="bg-white/5 group-hover:bg-blue-600 p-3 rounded-full transition-all">
                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 group-hover:text-gray-300">Add New Secure API Secret</span>
                </button>
              </div>

              <div className="mt-12 bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6 flex gap-4">
                <ShieldCheck className="w-12 h-12 text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-2 text-lg">Infrastructure Security</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Our platform uses **Intel SGX** (Software Guard Extensions) to create secure hardware enclaves. When your contract requests data, the Oracle service decrypts your API keys only inside the enclave. No administrator, operating system, or hacker can view your keys during execution.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right Sidebar - Properties & Docs */}
        <aside className="w-80 border-l border-white/10 bg-[#161922] p-6 flex flex-col gap-8">
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Contract Metadata</h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-600 font-bold uppercase">Target Chain</label>
                <div className="bg-[#0a0c12] border border-white/10 p-2.5 rounded-lg text-sm flex items-center justify-between">
                  Intelligent Mainnet
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-600 font-bold uppercase">Estimated Gas</label>
                <div className="text-white text-sm font-mono">0.00042 ISC</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Oracle Patterns</h4>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <h5 className="text-xs font-bold text-blue-400 mb-1">Request-Response</h5>
                <p className="text-[11px] text-gray-400 leading-normal">
                  Standard pattern for fetching data. Request emitted on-chain, fulfill triggered off-chain.
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <h5 className="text-xs font-bold text-purple-400 mb-1">Multi-Source Guard</h5>
                <p className="text-[11px] text-gray-400 leading-normal">
                  Requires 3+ Oracles to agree on a value before contract state can change.
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 opacity-50 grayscale cursor-not-allowed">
                <h5 className="text-xs font-bold text-gray-500 mb-1 flex justify-between items-center">
                  Zk-Proof Oracle
                  <span className="text-[8px] border border-gray-600 px-1 rounded">Soon</span>
                </h5>
                <p className="text-[11px] text-gray-600 leading-normal">
                  Prove API results without revealing the actual payload.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Deploy to Production
            </button>
          </div>
        </aside>
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-8 border-t border-white/10 bg-[#0a0c12] px-6 flex items-center justify-between text-[10px] text-gray-600">
        <div className="flex items-center gap-4 uppercase tracking-widest font-bold">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Oracle Mesh Online
          </div>
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-4">
            Block Height: 12,402,941
          </div>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-400 transition-colors">Documentation</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
          <a href="#" className="hover:text-blue-400 transition-colors">v2.5.0-beta</a>
        </div>
      </footer>
    </div>
  );
}