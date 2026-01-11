'use client';

import { useState, useEffect, useRef } from 'react';
import { Character, ProjectConfig, GeneratedScene } from '@/types';
import ProjectSetup from '@/components/ProjectSetup';
import AICharacterGenerator from '@/components/AICharacterGenerator';
import AIStoryGenerator from '@/components/AIStoryGenerator';
import ExportPanel from '@/components/ExportPanel';
import Settings from '@/components/Settings';
import {
  Clapperboard, Settings as SettingsIcon, Sparkles, Users,
  BookOpen, Download, ChevronRight, RotateCcw, AlertTriangle
} from 'lucide-react';

type Step = 'setup' | 'characters' | 'story' | 'export';

// Helper to normalize character data (fixes [object Object] bug)
function normalizeCharacterData(characters: Character[]): Character[] {
  const normalizeToString = (val: unknown): string => {
    if (typeof val === 'string') return val;
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') {
      return Object.entries(val).map(([k, v]) => `${k}: ${v}`).join(', ');
    }
    return String(val);
  };

  return characters.map((c: Character) => ({
    ...c,
    name: normalizeToString(c.name),
    physicalDescription: normalizeToString(c.physicalDescription),
    clothing: normalizeToString(c.clothing),
    voiceStyle: normalizeToString(c.voiceStyle),
    backstory: normalizeToString(c.backstory),
    referenceImagePrompt: normalizeToString(c.referenceImagePrompt),
    emotionalTraits: Array.isArray(c.emotionalTraits)
      ? c.emotionalTraits.map((t: unknown) => normalizeToString(t))
      : [normalizeToString(c.emotionalTraits)],
    catchphrases: Array.isArray(c.catchphrases)
      ? c.catchphrases.map((p: unknown) => normalizeToString(p))
      : [normalizeToString(c.catchphrases)]
  }));
}

// Load saved state from localStorage (used for lazy initialization)
function loadSavedState() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem('veo-prompt-studio-v2');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load saved data:', e);
  }
  return null;
}

export default function Home() {
  // Use lazy initializers that call loadSavedState directly (not via ref)
  const [currentStep, setCurrentStep] = useState<Step>(() => {
    const saved = loadSavedState();
    return saved?.currentStep || 'setup';
  });
  const [showSettings, setShowSettings] = useState(false);

  // Project state - initialized from localStorage
  const [config, setConfig] = useState<ProjectConfig | null>(() => {
    const saved = loadSavedState();
    return saved?.config || null;
  });
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = loadSavedState();
    return saved?.characters ? normalizeCharacterData(saved.characters) : [];
  });
  const [generatedScenes, setGeneratedScenes] = useState<GeneratedScene[]>(() => {
    const saved = loadSavedState();
    return saved?.generatedScenes || [];
  });

  // Track previous config for change detection
  const prevConfigRef = useRef<{ genre: string; theme: string; customTheme: string; videoPlatform: string } | null>(null);

  // Modal state for character regeneration prompt
  const [showRegeneratePrompt, setShowRegeneratePrompt] = useState(false);
  const [pendingConfigChange, setPendingConfigChange] = useState<ProjectConfig | null>(null);
  const [changedField, setChangedField] = useState<'genre' | 'video platform' | 'theme' | null>(null);

  // Initialize prevConfigRef on mount (only once)
  useEffect(() => {
    if (config && !prevConfigRef.current) {
      prevConfigRef.current = {
        genre: config.genre,
        theme: config.theme || '',
        customTheme: config.customTheme || '',
        videoPlatform: config.videoPlatform || 'veo-3.1'
      };
    }
  }, [config]);

  // Save to localStorage on state change
  useEffect(() => {
    const data = { config, characters, generatedScenes, currentStep };
    localStorage.setItem('veo-prompt-studio-v2', JSON.stringify(data));
  }, [config, characters, generatedScenes, currentStep]);

  // Handle config updates with change detection for character regeneration
  const handleConfigUpdate = (newConfig: ProjectConfig) => {
    const prev = prevConfigRef.current;

    // Check if significant changes were made that would affect characters
    const hasSignificantChange = prev && characters.length > 0 && (
      prev.genre !== newConfig.genre ||
      prev.videoPlatform !== newConfig.videoPlatform ||
      (prev.theme !== newConfig.theme && newConfig.theme) ||
      (prev.customTheme !== newConfig.customTheme && newConfig.customTheme)
    );

    if (hasSignificantChange) {
      // Determine which field changed for the modal message
      const fieldChanged = prev.genre !== newConfig.genre ? 'genre' :
        prev.videoPlatform !== newConfig.videoPlatform ? 'video platform' : 'theme';

      // Store the pending change and show prompt
      setPendingConfigChange(newConfig);
      setChangedField(fieldChanged);
      setShowRegeneratePrompt(true);
    } else {
      // Apply change directly
      setConfig(newConfig);
      prevConfigRef.current = {
        genre: newConfig.genre,
        theme: newConfig.theme || '',
        customTheme: newConfig.customTheme || '',
        videoPlatform: newConfig.videoPlatform
      };
    }
  };

  // Handle regenerate confirmation
  const handleRegenerateConfirm = (shouldRegenerate: boolean) => {
    if (pendingConfigChange) {
      setConfig(pendingConfigChange);
      prevConfigRef.current = {
        genre: pendingConfigChange.genre,
        theme: pendingConfigChange.theme || '',
        customTheme: pendingConfigChange.customTheme || '',
        videoPlatform: pendingConfigChange.videoPlatform
      };

      if (shouldRegenerate) {
        // Clear characters and scenes to regenerate
        setCharacters([]);
        setGeneratedScenes([]);
      }
    }
    setShowRegeneratePrompt(false);
    setPendingConfigChange(null);
    setChangedField(null);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? This will clear all your progress.')) {
      setConfig(null);
      setCharacters([]);
      setGeneratedScenes([]);
      setCurrentStep('setup');
      localStorage.removeItem('veo-prompt-studio-v2');
    }
  };

  const steps: { id: Step; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'setup', label: 'Setup', icon: Sparkles },
    { id: 'characters', label: 'Characters', icon: Users },
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'export', label: 'Export', icon: Download }
  ];

  const stepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Clapperboard size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Veo Prompt Studio</h1>
              <p className="text-xs text-zinc-400">AI-Powered Viral Video Creation</p>
            </div>
          </div>

          {/* Step Progress */}
          <nav className="flex items-center gap-1">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => {
                    // Allow going back to previous steps
                    if (index <= stepIndex) {
                      setCurrentStep(step.id);
                    }
                  }}
                  disabled={index > stepIndex}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentStep === step.id
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                      : index < stepIndex
                      ? 'bg-zinc-800 text-amber-400 hover:bg-zinc-700'
                      : 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  <step.icon size={16} />
                  {step.label}
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight size={16} className="mx-1 text-zinc-600" />
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
              title="Start Over"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
            >
              <SettingsIcon size={16} />
              API Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {currentStep === 'setup' && (
          <ProjectSetup
            config={config}
            onUpdateConfig={handleConfigUpdate}
            onNext={() => setCurrentStep('characters')}
          />
        )}
        {currentStep === 'characters' && (
          <AICharacterGenerator
            config={config}
            characters={characters}
            onUpdateCharacters={setCharacters}
            onNext={() => setCurrentStep('story')}
            onBack={() => setCurrentStep('setup')}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
        {currentStep === 'story' && (
          <AIStoryGenerator
            config={config}
            characters={characters}
            generatedScenes={generatedScenes}
            onUpdateScenes={setGeneratedScenes}
            onNext={() => setCurrentStep('export')}
            onBack={() => setCurrentStep('characters')}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
        {currentStep === 'export' && (
          <ExportPanel
            config={config}
            characters={characters}
            generatedScenes={generatedScenes}
            onBack={() => setCurrentStep('story')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 border-t border-zinc-800 bg-zinc-900 px-6 py-2">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <p>Veo 3.1 Prompt Studio • Create viral Hulk-style AI shorts with GPT-4o</p>
          <p>
            {config && (
              <span className="text-zinc-400">
                {config.name} • {characters.length} characters • {generatedScenes.length} scenes
              </span>
            )}
          </p>
        </div>
      </footer>

      {/* Settings Modal */}
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {/* Regenerate Characters Prompt Modal */}
      {showRegeneratePrompt && pendingConfigChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-600/20 flex items-center justify-center">
                <AlertTriangle size={20} className="text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">Regenerate Characters?</h3>
            </div>

            <p className="text-zinc-400 mb-4">
              You&apos;ve changed the <span className="text-amber-400 font-medium">
                {changedField || 'settings'}
              </span>. Your existing characters were created for a different context.
            </p>

            <p className="text-zinc-500 text-sm mb-6">
              Would you like to regenerate characters to match your new settings, or keep the existing ones?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => handleRegenerateConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
              >
                Keep Existing
              </button>
              <button
                onClick={() => handleRegenerateConfirm(true)}
                className="flex-1 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors font-medium"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
