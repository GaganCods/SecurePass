
import React, { useState, useEffect, useMemo } from 'react';
import { generateStrongPassword, calculatePasswordStrength } from '../utils/passwordLogic';
import { PasswordGeneratorConfig, GeneratorMode } from '../types';
import { Settings, RefreshCw, X, Copy, Check, ShieldCheck, Dice5, Brain, KeyRound } from 'lucide-react';
import { STRENGTH_COLORS, STRENGTH_LABELS } from '../constants';

interface PasswordGeneratorProps {
  onGenerate: (password: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onGenerate, isOpen, onClose }) => {
  // Config State
  const [config, setConfig] = useState<PasswordGeneratorConfig>({
    mode: 'random',
    length: 16,
    useLower: true,
    useUpper: true,
    useNumbers: true,
    useSymbols: true,
    excludeAmbiguous: false,
    requireAllTypes: true,
    customChars: '',
    wordCount: 4,
    separator: '-',
    capitalize: true,
    includeNumber: false,
  });

  // Generated Password State
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate on open or config change
  useEffect(() => {
    if (isOpen) {
        const pwd = generateStrongPassword(config);
        setGeneratedPassword(pwd);
    }
  }, [isOpen, config]);

  const handleRegenerate = () => {
    const pwd = generateStrongPassword(config);
    setGeneratedPassword(pwd);
  };

  const handleCopy = async () => {
    if (!generatedPassword) return;
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleUsePassword = () => {
      onGenerate(generatedPassword);
      onClose();
  };

  // Live Strength Analysis for Preview
  const previewStrength = useMemo(() => calculatePasswordStrength(generatedPassword), [generatedPassword]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white/90 dark:bg-[#161b28]/90 backdrop-blur-xl rounded-[24px] shadow-2xl max-w-lg w-full border border-gray-200 dark:border-white/10 overflow-hidden transform scale-100 transition-all flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Settings size={20} className="text-blue-500" />
                Password Generator
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
                <X size={24} />
            </button>
        </div>
        
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
            
            {/* Live Preview Section */}
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 dark:border-white/5 relative group">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex justify-between">
                    <span>Preview</span>
                    <span className={`${STRENGTH_COLORS[previewStrength.strength].replace('bg-', 'text-')} transition-colors`}>
                        {STRENGTH_LABELS[previewStrength.strength]} ({Math.round(previewStrength.entropy)} bits)
                    </span>
                </div>
                <div className="break-all font-mono text-2xl md:text-3xl text-gray-900 dark:text-white font-medium mb-4 leading-tight min-h-[4rem] flex items-center">
                    {generatedPassword}
                </div>
                
                <div className="flex items-center gap-2 justify-end">
                     <button 
                        onClick={handleRegenerate}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                        title="Regenerate"
                    >
                        <RefreshCw size={20} />
                    </button>
                    <button 
                        onClick={handleCopy}
                        className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all"
                        title="Copy"
                    >
                        {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    </button>
                </div>
                
                {/* Strength Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
                     <div 
                        className={`h-full transition-all duration-300 ${STRENGTH_COLORS[previewStrength.strength]}`} 
                        style={{ width: `${previewStrength.score}%`}}
                     />
                </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-gray-100/50 dark:bg-white/5 p-1 rounded-xl backdrop-blur-md">
                {(['random', 'memorable', 'passphrase'] as GeneratorMode[]).map((m) => (
                    <button
                        key={m}
                        onClick={() => setConfig({ ...config, mode: m })}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                            config.mode === m 
                            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        }`}
                    >
                        {m === 'random' && <Dice5 size={16} />}
                        {m === 'memorable' && <Brain size={16} />}
                        {m === 'passphrase' && <KeyRound size={16} />}
                        <span className="capitalize">{m}</span>
                    </button>
                ))}
            </div>

            {/* Controls */}
            <div className="space-y-6">
                
                {/* RANDOM MODE CONTROLS */}
                {config.mode === 'random' && (
                    <>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Length</label>
                                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded font-mono font-bold text-sm">
                                    {config.length}
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="6" 
                                max="64" 
                                value={config.length} 
                                onChange={(e) => setConfig({...config, length: parseInt(e.target.value)})}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Lowercase (a-z)', key: 'useLower' },
                                { label: 'Uppercase (A-Z)', key: 'useUpper' },
                                { label: 'Numbers (0-9)', key: 'useNumbers' },
                                { label: 'Symbols (!@#)', key: 'useSymbols' },
                            ].map((opt) => (
                                <label key={opt.key} className="flex items-center gap-3 p-3 border border-gray-100 dark:border-white/10 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <input 
                                        type="checkbox"
                                        checked={(config as any)[opt.key]}
                                        onChange={(e) => setConfig({...config, [opt.key]: e.target.checked})}
                                        className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-transparent"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{opt.label}</span>
                                </label>
                            ))}
                        </div>

                        {/* Advanced Random Options */}
                         <div className="space-y-3 pt-2">
                             <label className="flex items-center gap-3">
                                <input 
                                    type="checkbox"
                                    checked={config.requireAllTypes}
                                    onChange={(e) => setConfig({...config, requireAllTypes: e.target.checked})}
                                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-transparent border-gray-300 dark:border-gray-600"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Ensure at least one of each selected type</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input 
                                    type="checkbox"
                                    checked={config.excludeAmbiguous}
                                    onChange={(e) => setConfig({...config, excludeAmbiguous: e.target.checked})}
                                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-transparent border-gray-300 dark:border-gray-600"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Exclude Ambiguous (0, O, 1, I, l)</span>
                            </label>

                            <div className="pt-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Custom Characters (Optional)</label>
                                <input 
                                    type="text"
                                    value={config.customChars}
                                    onChange={(e) => setConfig({...config, customChars: e.target.value})}
                                    placeholder="e.g. abc123"
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500/50"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* MEMORABLE MODE CONTROLS */}
                {config.mode === 'memorable' && (
                    <div className="space-y-4">
                         <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Length</label>
                                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded font-mono font-bold text-sm">
                                    {config.length}
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="8" 
                                max="32" 
                                value={config.length} 
                                onChange={(e) => setConfig({...config, length: parseInt(e.target.value)})}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                        <div className="flex gap-4">
                             <label className="flex items-center gap-3 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={config.capitalize}
                                    onChange={(e) => setConfig({...config, capitalize: e.target.checked})}
                                    className="w-5 h-5 rounded text-blue-600 bg-transparent border-gray-300 dark:border-gray-600"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Capitalize</span>
                            </label>
                             <label className="flex items-center gap-3 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={config.includeNumber}
                                    onChange={(e) => setConfig({...config, includeNumber: e.target.checked})}
                                    className="w-5 h-5 rounded text-blue-600 bg-transparent border-gray-300 dark:border-gray-600"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Add Number</span>
                            </label>
                        </div>
                    </div>
                )}

                {/* PASSPHRASE MODE CONTROLS */}
                {config.mode === 'passphrase' && (
                    <div className="space-y-6">
                         <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Word Count</label>
                                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded font-mono font-bold text-sm">
                                    {config.wordCount}
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="3" 
                                max="10" 
                                value={config.wordCount} 
                                onChange={(e) => setConfig({...config, wordCount: parseInt(e.target.value)})}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>3 words</span>
                                <span>10 words</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Separator</label>
                                <select 
                                    value={config.separator}
                                    onChange={(e) => setConfig({...config, separator: e.target.value})}
                                    className="w-full p-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white outline-none"
                                >
                                    <option value="-">Hyphen (-)</option>
                                    <option value="_">Underscore (_)</option>
                                    <option value=".">Period (.)</option>
                                    <option value=" ">Space ( )</option>
                                    <option value="">None</option>
                                </select>
                             </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                             <label className="flex items-center gap-3 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={config.capitalize}
                                    onChange={(e) => setConfig({...config, capitalize: e.target.checked})}
                                    className="w-5 h-5 rounded text-blue-600 bg-transparent border-gray-300 dark:border-gray-600"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Capitalize</span>
                            </label>
                             <label className="flex items-center gap-3 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={config.includeNumber}
                                    onChange={(e) => setConfig({...config, includeNumber: e.target.checked})}
                                    className="w-5 h-5 rounded text-blue-600 bg-transparent border-gray-300 dark:border-gray-600"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Add Number</span>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 backdrop-blur-md">
            <button 
                onClick={handleUsePassword}
                className="w-full py-4 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
                <ShieldCheck size={20} />
                Use This Password
            </button>
        </div>
      </div>
    </div>
  );
};
