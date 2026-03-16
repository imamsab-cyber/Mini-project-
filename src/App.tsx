/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Search, 
  Lock, 
  FileText, 
  Globe, 
  Terminal, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  ChevronRight,
  Download,
  Copy,
  Trash2,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
type Tool = 'port-scanner' | 'password-analyzer' | 'log-analyzer' | 'subdomain-finder' | 'dashboard';

interface ScanResult {
  id: string;
  timestamp: string;
  tool: string;
  target: string;
  status: 'success' | 'warning' | 'error';
  summary: string;
  details: any;
}

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool>('dashboard');
  const [results, setResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState<string[]>(["[SYSTEM] Cybersecurity Toolkit initialized...", "[SYSTEM] Ready for operations."]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalOutput]);

  const addTerminalLine = (line: string) => {
    setTerminalOutput(prev => [...prev.slice(-49), `[${new Date().toLocaleTimeString()}] ${line}`]);
  };

  const clearTerminal = () => setTerminalOutput(["[SYSTEM] Terminal cleared."]);

  const addResult = (tool: string, target: string, status: 'success' | 'warning' | 'error', summary: string, details: any) => {
    const newResult: ScanResult = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleString(),
      tool,
      target,
      status,
      summary,
      details
    };
    setResults(prev => [newResult, ...prev]);
  };

  // --- Tool Implementations ---

  // 1. Port Scanner (Simulated)
  const [portTarget, setPortTarget] = useState('127.0.0.1');
  const [portRange, setPortRange] = useState('20-100');

  const runPortScan = async () => {
    setIsScanning(true);
    setProgress(0);
    addTerminalLine(`Starting port scan on ${portTarget}...`);
    
    const ports = [21, 22, 23, 25, 53, 80, 110, 443, 3306, 8080];
    const found: number[] = [];

    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 300));
      if (i % 30 === 0 && i > 0) {
        const p = ports[Math.floor(Math.random() * ports.length)];
        if (!found.includes(p)) {
          found.push(p);
          addTerminalLine(`[+] Found open port: ${p}`);
        }
      }
    }

    addResult('Port Scanner', portTarget, found.length > 0 ? 'warning' : 'success', `Scan complete. Found ${found.length} open ports.`, { ports: found });
    addTerminalLine(`Scan complete. Found ${found.length} open ports.`);
    setIsScanning(false);
  };

  // 2. Password Analyzer
  const [password, setPassword] = useState('');
  const [passAnalysis, setPassAnalysis] = useState<any>(null);

  const analyzePass = () => {
    if (!password) return;
    addTerminalLine(`Analyzing password strength...`);
    
    let score = 0;
    const feedback = [];
    if (password.length >= 8) score++; else feedback.push("Too short (min 8)");
    if (/[A-Z]/.test(password)) score++; else feedback.push("Missing uppercase");
    if (/[a-z]/.test(password)) score++; else feedback.push("Missing lowercase");
    if (/\d/.test(password)) score++; else feedback.push("Missing number");
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++; else feedback.push("Missing special char");

    const strength = score === 5 ? 'Very Strong' : score >= 4 ? 'Strong' : score >= 3 ? 'Moderate' : 'Weak';
    const status = score >= 4 ? 'success' : score >= 3 ? 'warning' : 'error';
    
    const result = { score, strength, feedback };
    setPassAnalysis(result);
    addResult('Password Analyzer', 'User Input', status, `Strength: ${strength} (${score}/5)`, result);
    addTerminalLine(`Analysis complete: ${strength}`);
  };

  // 3. Log Analyzer
  const [logContent, setLogContent] = useState('');
  
  const analyzeLog = () => {
    if (!logContent) return;
    addTerminalLine(`Analyzing log content (${logContent.length} chars)...`);
    
    const lines = logContent.split('\n');
    const errors = lines.filter(l => /ERROR|CRITICAL|FAIL/i.test(l));
    const warnings = lines.filter(l => /WARN|WARNING/i.test(l));
    
    const status = errors.length > 0 ? 'error' : warnings.length > 0 ? 'warning' : 'success';
    const summary = `Found ${errors.length} errors and ${warnings.length} warnings in ${lines.length} lines.`;
    
    addResult('Log Analyzer', 'Text Input', status, summary, { errors, warnings, total: lines.length });
    addTerminalLine(`Log analysis complete. ${errors.length} errors found.`);
  };

  // 4. Subdomain Finder (Simulated)
  const [domain, setDomain] = useState('example.com');

  const runSubdomainFinder = async () => {
    setIsScanning(true);
    setProgress(0);
    addTerminalLine(`Searching subdomains for ${domain}...`);
    
    const common = ['www', 'mail', 'ftp', 'dev', 'api', 'staging', 'blog', 'shop'];
    const found: string[] = [];

    for (let i = 0; i < common.length; i++) {
      setProgress(Math.round(((i + 1) / common.length) * 100));
      await new Promise(r => setTimeout(r, 400));
      if (Math.random() > 0.5) {
        const sub = `${common[i]}.${domain}`;
        found.push(sub);
        addTerminalLine(`[+] Found subdomain: ${sub}`);
      }
    }

    addResult('Subdomain Finder', domain, found.length > 0 ? 'success' : 'warning', `Found ${found.length} subdomains.`, { subdomains: found });
    addTerminalLine(`Search complete. ${found.length} subdomains found.`);
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] font-sans selection:bg-[#F27D26] selection:text-black">
      {/* Header */}
      <header className="border-b border-[#1A1A1A] p-4 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F27D26] rounded flex items-center justify-center text-black">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight uppercase">CyberToolkit v1.0</h1>
            <p className="text-[10px] text-[#8E9299] font-mono uppercase tracking-widest">Security Operations Center</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] rounded-full border border-[#2A2A2A]">
            <Activity size={14} className="text-[#00FF00] animate-pulse" />
            <span className="text-[10px] font-mono uppercase">System Online</span>
          </div>
          <button className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors">
            <Download size={20} className="text-[#8E9299]" />
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)]">
        {/* Sidebar Navigation */}
        <nav className="w-full lg:w-64 border-r border-[#1A1A1A] p-4 flex flex-col gap-2">
          <p className="text-[10px] font-mono text-[#8E9299] uppercase mb-2 px-2">Navigation</p>
          
          <NavItem 
            active={activeTool === 'dashboard'} 
            onClick={() => setActiveTool('dashboard')}
            icon={<Activity size={18} />}
            label="Dashboard"
          />
          
          <div className="h-4" />
          <p className="text-[10px] font-mono text-[#8E9299] uppercase mb-2 px-2">Security Modules</p>
          
          <NavItem 
            active={activeTool === 'port-scanner'} 
            onClick={() => setActiveTool('port-scanner')}
            icon={<Search size={18} />}
            label="Port Scanner"
          />
          <NavItem 
            active={activeTool === 'password-analyzer'} 
            onClick={() => setActiveTool('password-analyzer')}
            icon={<Lock size={18} />}
            label="Password Strength"
          />
          <NavItem 
            active={activeTool === 'log-analyzer'} 
            onClick={() => setActiveTool('log-analyzer')}
            icon={<FileText size={18} />}
            label="Log Analyzer"
          />
          <NavItem 
            active={activeTool === 'subdomain-finder'} 
            onClick={() => setActiveTool('subdomain-finder')}
            icon={<Globe size={18} />}
            label="Subdomain Finder"
          />

          <div className="mt-auto pt-4 border-t border-[#1A1A1A]">
            <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
              <p className="text-[10px] font-mono text-[#F27D26] uppercase mb-1">Python Toolkit</p>
              <p className="text-[11px] text-[#8E9299] leading-tight mb-2">Standalone CLI version available in /python_toolkit</p>
              <button className="w-full py-1.5 bg-[#F27D26] text-black text-[10px] font-bold uppercase rounded hover:bg-[#FF8C37] transition-colors flex items-center justify-center gap-2">
                <Terminal size={12} /> View Source
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#0A0A0A]">
          <AnimatePresence mode="wait">
            {activeTool === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard label="Total Scans" value={results.length.toString()} icon={<Activity size={20} />} />
                  <StatCard label="Critical Alerts" value={results.filter(r => r.status === 'error').length.toString()} icon={<AlertTriangle size={20} />} color="text-red-500" />
                  <StatCard label="Uptime" value="99.9%" icon={<Globe size={20} />} color="text-green-500" />
                </div>

                <div className="bg-[#111] border border-[#1A1A1A] rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-[#1A1A1A] flex justify-between items-center">
                    <h2 className="text-sm font-bold uppercase tracking-wider">Recent Activity</h2>
                    <button onClick={() => setResults([])} className="text-[10px] text-[#8E9299] hover:text-white flex items-center gap-1">
                      <Trash2 size={12} /> Clear History
                    </button>
                  </div>
                  <div className="divide-y divide-[#1A1A1A]">
                    {results.length === 0 ? (
                      <div className="p-12 text-center text-[#8E9299]">
                        <Activity size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-sm italic">No recent activity recorded.</p>
                      </div>
                    ) : (
                      results.map(result => (
                        <div key={result.id} className="p-4 hover:bg-[#161616] transition-colors flex items-start justify-between group">
                          <div className="flex gap-4">
                            <div className={`mt-1 ${
                              result.status === 'success' ? 'text-green-500' : 
                              result.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                            }`}>
                              {result.status === 'success' ? <CheckCircle2 size={18} /> : 
                               result.status === 'warning' ? <AlertTriangle size={18} /> : <XCircle size={18} />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-mono text-[#8E9299]">{result.timestamp}</span>
                                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-[#222] rounded text-[#F27D26]">{result.tool}</span>
                              </div>
                              <p className="text-sm font-medium">{result.summary}</p>
                              <p className="text-xs text-[#8E9299] mt-1">Target: {result.target}</p>
                            </div>
                          </div>
                          <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTool === 'port-scanner' && (
              <ToolContainer 
                title="Port Scanner" 
                description="Identify open ports and services running on a target host."
                icon={<Search size={24} />}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[#8E9299] uppercase">Target Host</label>
                      <input 
                        type="text" 
                        value={portTarget}
                        onChange={(e) => setPortTarget(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded p-3 text-sm focus:outline-none focus:border-[#F27D26]"
                        placeholder="e.g. 127.0.0.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[#8E9299] uppercase">Port Range</label>
                      <input 
                        type="text" 
                        value={portRange}
                        onChange={(e) => setPortRange(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded p-3 text-sm focus:outline-none focus:border-[#F27D26]"
                        placeholder="e.g. 20-100"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={runPortScan}
                    disabled={isScanning}
                    className="w-full py-3 bg-[#F27D26] text-black font-bold uppercase rounded hover:bg-[#FF8C37] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isScanning ? <Activity size={18} className="animate-spin" /> : <Play size={18} />}
                    {isScanning ? 'Scanning...' : 'Start Scan'}
                  </button>
                </div>
              </ToolContainer>
            )}

            {activeTool === 'password-analyzer' && (
              <ToolContainer 
                title="Password Strength Analyzer" 
                description="Evaluate password security based on complexity and length."
                icon={<Lock size={24} />}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#8E9299] uppercase">Password to Analyze</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded p-3 text-sm focus:outline-none focus:border-[#F27D26]"
                        placeholder="Enter password..."
                      />
                      <button 
                        onClick={analyzePass}
                        className="absolute right-2 top-2 p-1.5 bg-[#F27D26] text-black rounded hover:bg-[#FF8C37]"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                  {passAnalysis && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold uppercase">Analysis Results</h3>
                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                          passAnalysis.score >= 4 ? 'bg-green-500/20 text-green-500' : 
                          passAnalysis.score >= 3 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {passAnalysis.strength}
                        </span>
                      </div>
                      
                      <div className="w-full bg-[#222] h-2 rounded-full mb-4 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            passAnalysis.score >= 4 ? 'bg-green-500' : 
                            passAnalysis.score >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(passAnalysis.score / 5) * 100}%` }}
                        />
                      </div>

                      {passAnalysis.feedback.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-[10px] font-mono text-[#8E9299] uppercase mb-1">Feedback</p>
                          {passAnalysis.feedback.map((f: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#8E9299]">
                              <AlertTriangle size={12} className="text-yellow-500" />
                              {f}
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </ToolContainer>
            )}

            {activeTool === 'log-analyzer' && (
              <ToolContainer 
                title="Log File Analyzer" 
                description="Scan system logs for errors, warnings, and critical failures."
                icon={<FileText size={24} />}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#8E9299] uppercase">Log Content</label>
                    <textarea 
                      value={logContent}
                      onChange={(e) => setLogContent(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded p-3 text-sm focus:outline-none focus:border-[#F27D26] h-48 font-mono"
                      placeholder="Paste log content here..."
                    />
                  </div>
                  <button 
                    onClick={analyzeLog}
                    className="w-full py-3 bg-[#F27D26] text-black font-bold uppercase rounded hover:bg-[#FF8C37] transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText size={18} /> Analyze Logs
                  </button>
                </div>
              </ToolContainer>
            )}

            {activeTool === 'subdomain-finder' && (
              <ToolContainer 
                title="Subdomain Finder" 
                description="Discover subdomains associated with a primary domain."
                icon={<Globe size={24} />}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#8E9299] uppercase">Primary Domain</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded p-3 text-sm focus:outline-none focus:border-[#F27D26]"
                        placeholder="e.g. example.com"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={runSubdomainFinder}
                    disabled={isScanning}
                    className="w-full py-3 bg-[#F27D26] text-black font-bold uppercase rounded hover:bg-[#FF8C37] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isScanning ? <Activity size={18} className="animate-spin" /> : <Globe size={18} />}
                    {isScanning ? 'Searching...' : 'Start Discovery'}
                  </button>
                </div>
              </ToolContainer>
            )}
          </AnimatePresence>
        </main>

        {/* Terminal / Console */}
        <aside className="w-full lg:w-96 border-l border-[#1A1A1A] bg-[#050505] flex flex-col">
          <div className="p-3 border-b border-[#1A1A1A] flex justify-between items-center bg-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-[#F27D26]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">System Console</span>
            </div>
            <button onClick={clearTerminal} className="text-[10px] text-[#8E9299] hover:text-white">CLEAR</button>
          </div>
          
          <div className="flex-1 p-4 font-mono text-[11px] overflow-y-auto space-y-1">
            {terminalOutput.map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-[#8E9299] shrink-0">{'>'}</span>
                <span className={line.includes('[+]') ? 'text-[#00FF00]' : line.includes('[!]') ? 'text-red-500' : 'text-[#E4E3E0]'}>
                  {line}
                </span>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {isScanning && (
            <div className="p-4 border-t border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-[#8E9299] uppercase">Operation Progress</span>
                <span className="text-[10px] font-mono text-[#F27D26]">{progress}%</span>
              </div>
              <div className="w-full bg-[#1A1A1A] h-1 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-[#F27D26] h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

// Helper Components
function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
        active 
          ? 'bg-[#F27D26] text-black font-bold' 
          : 'text-[#8E9299] hover:bg-[#1A1A1A] hover:text-white'
      }`}
    >
      {icon}
      <span className="text-xs uppercase tracking-wide">{label}</span>
    </button>
  );
}

function StatCard({ label, value, icon, color = "text-[#F27D26]" }: { label: string, value: string, icon: React.ReactNode, color?: string }) {
  return (
    <div className="bg-[#111] border border-[#1A1A1A] p-4 rounded-xl">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-mono text-[#8E9299] uppercase">{label}</span>
        <div className={color}>{icon}</div>
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

function ToolContainer({ title, description, icon, children }: { title: string, description: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl flex items-center justify-center text-[#F27D26]">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight uppercase">{title}</h2>
          <p className="text-sm text-[#8E9299]">{description}</p>
        </div>
      </div>
      
      <div className="bg-[#111] border border-[#1A1A1A] p-6 rounded-2xl shadow-2xl">
        {children}
      </div>

      <div className="mt-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl flex gap-3">
        <AlertTriangle size={20} className="text-yellow-500 shrink-0" />
        <p className="text-xs text-yellow-500/80 leading-relaxed">
          <span className="font-bold uppercase block mb-1">Security Notice</span>
          This web-based tool is for demonstration purposes. Some network operations are simulated due to browser security restrictions. For full functionality, use the standalone Python toolkit provided in the project files.
        </p>
      </div>
    </motion.div>
  );
}
