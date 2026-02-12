
import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check, Trash2, Undo2, Redo2 } from 'lucide-react';
import { StrengthResult } from '../types';
import { STRENGTH_COLORS } from '../constants';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  strengthResult: StrengthResult;
  onGenerate?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ 
  value, 
  onChange, 
  strengthResult, 
  onGenerate,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleClear = () => {
    onChange('');
    setCopied(false);
  };

  // Premium glow effect based on strength
  const getGlowColor = () => {
     if (!value) return 'gray';
     switch(strengthResult.strength) {
         case 'very-strong': return 'rgba(34, 197, 94, 0.2)'; // green
         case 'strong': return 'rgba(132, 204, 22, 0.2)'; // lime
         case 'medium': return 'rgba(234, 179, 8, 0.2)'; // yellow
         case 'weak': return 'rgba(249, 115, 22, 0.2)'; // orange
         default: return 'rgba(239, 68, 68, 0.2)'; // red
     }
  };

  return (
    <div className="w-full">
      <div 
        className="relative transition-all duration-500 rounded-2xl bg-gray-50 dark:bg-black/20 group"
        style={{
            boxShadow: value ? `0 0 30px ${getGlowColor()}` : 'none'
        }}
      >
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a password..."
          className="w-full pl-6 pr-16 py-6 bg-transparent border-2 border-transparent focus:border-blue-500/20 rounded-2xl text-2xl md:text-3xl font-medium tracking-tight text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 outline-none transition-all font-sans"
          autoComplete="off"
          spellCheck={false}
        />
        
        {/* Visibility Toggle - Stays Inside */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                title={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
        </div>
      </div>

      {/* External Toolbar */}
      <div className="flex items-center justify-between mt-3 px-1 animate-in fade-in slide-in-from-top-1 duration-300">
          
          {/* History Controls */}
          <div className="flex items-center gap-2">
            {(onUndo || onRedo) && (
                <div className="flex items-center bg-gray-100/50 dark:bg-white/5 rounded-xl p-1 border border-gray-200/50 dark:border-white/5">
                    {onUndo && (
                        <button
                            onClick={onUndo}
                            disabled={!canUndo}
                            className={`p-2 rounded-lg transition-all duration-200 ${canUndo ? 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white shadow-sm' : 'text-gray-300 dark:text-gray-700 cursor-not-allowed'}`}
                            title="Undo"
                        >
                            <Undo2 size={18} />
                        </button>
                    )}
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-700/50 mx-1" />
                    {onRedo && (
                        <button
                            onClick={onRedo}
                            disabled={!canRedo}
                            className={`p-2 rounded-lg transition-all duration-200 ${canRedo ? 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white shadow-sm' : 'text-gray-300 dark:text-gray-700 cursor-not-allowed'}`}
                            title="Redo"
                        >
                            <Redo2 size={18} />
                        </button>
                    )}
                </div>
            )}
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
             {value && (
                <button
                  onClick={handleClear}
                  className="group flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  title="Clear password"
                >
                  <Trash2 size={18} />
                  <span className="text-sm font-medium hidden sm:inline">Delete</span>
                </button>
              )}

              {value && (
                <button
                    onClick={handleCopy}
                    className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 border backdrop-blur-md shadow-lg
                        ${copied 
                            ? 'bg-green-500/20 border-green-500/30 text-green-600 dark:text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)] scale-100 cursor-default' 
                            : 'bg-white/40 dark:bg-white/5 border-white/50 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-white/15 hover:scale-105 active:scale-95 shadow-black/5'
                        }
                    `}
                    title="Copy to clipboard"
                >
                    {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={16} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
          </div>
      </div>
    </div>
  );
};
