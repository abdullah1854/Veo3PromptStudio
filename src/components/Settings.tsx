'use client';

import { useState, useEffect } from 'react';
import { getAPISettings, saveAPISettings, testAPIConnection } from '@/lib/aiService';
import { Settings as SettingsIcon, Key, Check, X, Loader2, Eye, EyeOff } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

// Load API settings lazily
function loadSettings() {
  if (typeof window === 'undefined') return { apiKey: '', model: 'gpt-4o-mini' };
  const settings = getAPISettings();
  return settings || { apiKey: '', model: 'gpt-4o-mini' };
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  // Initialize from localStorage lazily
  const [apiKey, setApiKey] = useState(() => loadSettings().apiKey);
  const [model, setModel] = useState(() => loadSettings().model);
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [saved, setSaved] = useState(false);

  // Sync settings when modal opens - legitimate pattern for syncing external state
  useEffect(() => {
    if (isOpen) {
      const settings = loadSettings();
      /* eslint-disable */
      setApiKey(settings.apiKey);
      setModel(settings.model);
      /* eslint-enable */
    }
  }, [isOpen]);

  const handleSave = () => {
    saveAPISettings({ apiKey, model });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTest = async () => {
    if (!apiKey) return;
    setTesting(true);
    setTestResult(null);

    const success = await testAPIConnection(apiKey, model);
    setTestResult(success ? 'success' : 'error');
    setTesting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl border border-zinc-700 w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center">
              <SettingsIcon size={20} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">API Settings</h2>
              <p className="text-xs text-zinc-400">Configure your OpenAI API key</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* API Key Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              <Key size={14} className="inline mr-2" />
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="gpt-4o-mini">GPT-4o Mini (Recommended - Fast & Cheap)</option>
              <option value="gpt-4o">GPT-4o (Best Quality)</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
            </select>
          </div>

          {/* Test Connection */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTest}
              disabled={!apiKey || testing}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm text-zinc-300 transition-colors"
            >
              {testing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <SettingsIcon size={16} />
              )}
              Test Connection
            </button>

            {testResult === 'success' && (
              <span className="flex items-center gap-1 text-green-400 text-sm">
                <Check size={16} />
                Connection successful!
              </span>
            )}
            {testResult === 'error' && (
              <span className="flex items-center gap-1 text-red-400 text-sm">
                <X size={16} />
                Connection failed
              </span>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
            <h4 className="text-sm font-medium text-zinc-300 mb-2">How to get an API key:</h4>
            <ol className="text-xs text-zinc-400 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">platform.openai.com/api-keys</a></li>
              <li>Create a new API key</li>
              <li>Copy and paste it here</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-700 bg-zinc-800/30">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!apiKey}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium text-white transition-colors"
          >
            {saved ? (
              <>
                <Check size={16} />
                Saved!
              </>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
