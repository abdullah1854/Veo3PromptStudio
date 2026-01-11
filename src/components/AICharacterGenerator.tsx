'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Character, ProjectConfig, StylePreset } from '@/types';
import { generateCharacters, getAPISettings, generateReferenceImagePrompt, generateCustomCharacter, regenerateReferencePrompt } from '@/lib/aiService';
import { characterPresets, getFilteredPresets } from '@/lib/presets';
import { getDynamicRoles, getDefaultSelectedRoles } from '@/lib/themeRoles';
import {
  Sparkles, Users, Trash2, Wand2, Loader2, Copy, Check,
  User, Image as ImageIcon, AlertCircle, ChevronDown, ChevronUp, Zap, Plus, RefreshCw, PenLine
} from 'lucide-react';

interface AICharacterGeneratorProps {
  config: ProjectConfig | null;
  characters: Character[];
  onUpdateCharacters: (characters: Character[]) => void;
  onNext: () => void;
  onBack: () => void;
  onOpenSettings: () => void;
}

export default function AICharacterGenerator({
  config,
  characters,
  onUpdateCharacters,
  onNext,
  onBack,
  onOpenSettings
}: AICharacterGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numCharacters, setNumCharacters] = useState(3);
  const [selectedRoles, setSelectedRoles] = useState<Character['role'][]>([]);
  const [expandedCharacter, setExpandedCharacter] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom character creation state
  const [showCustomCreator, setShowCustomCreator] = useState(false);
  const [customDescription, setCustomDescription] = useState('');
  const [generatingCustom, setGeneratingCustom] = useState(false);

  // Reference prompt regeneration state
  const [regeneratingPromptId, setRegeneratingPromptId] = useState<string | null>(null);

  // Track previous theme to detect changes
  const prevThemeRef = useRef<string | null>(null);

  // Get the current theme (either preset or custom)
  const currentTheme = config?.theme || config?.customTheme || '';

  // Dynamic role options based on theme and genre
  const roleOptions = useMemo(() => {
    if (!config) {
      // Return default roles if no config
      return [
        { value: 'hero' as Character['role'], label: 'Hero', description: 'Main protagonist' },
        { value: 'villain' as Character['role'], label: 'Villain', description: 'Main antagonist' },
        { value: 'love-interest' as Character['role'], label: 'Love Interest', description: 'Romantic partner' },
        { value: 'mother' as Character['role'], label: 'Mother', description: 'Maternal figure' },
        { value: 'sidekick' as Character['role'], label: 'Sidekick', description: 'Hero\'s ally' },
        { value: 'supporting' as Character['role'], label: 'Supporting', description: 'Side character' }
      ];
    }
    return getDynamicRoles(currentTheme, config.genre);
  }, [config, currentTheme]);

  // Auto-update selected roles when theme changes
  // Note: selectedRoles.length is intentionally not in deps - we only check it for initial mount
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!config) return;

    const themeKey = currentTheme + config.genre;

    // Only update if theme actually changed (not on initial mount with existing selection)
    if (prevThemeRef.current !== null && prevThemeRef.current !== themeKey) {
      const defaultRoles = getDefaultSelectedRoles(currentTheme, config.genre);
      setSelectedRoles(defaultRoles);
    } else if (selectedRoles.length === 0) {
      // Initial mount - set defaults
      const defaultRoles = getDefaultSelectedRoles(currentTheme, config.genre);
      setSelectedRoles(defaultRoles);
    }

    prevThemeRef.current = themeKey;
  }, [config, currentTheme]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleAIGenerate = async () => {
    const apiSettings = getAPISettings();
    if (!apiSettings?.apiKey) {
      onOpenSettings();
      return;
    }

    if (!config) {
      setError('Please complete project setup first');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const newCharacters = await generateCharacters(
        apiSettings.apiKey,
        apiSettings.model,
        config.genre,
        numCharacters,
        config.stylePreset,
        config.language,
        config.videoPlatform,
        config.theme || config.customTheme
      );

      onUpdateCharacters([...characters, ...newCharacters]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate characters');
    } finally {
      setGenerating(false);
    }
  };

  const handleAddFromPreset = (presetId: string) => {
    const preset = characterPresets.find(p => p.id === presetId);
    if (preset) {
      const newCharacter: Character = {
        ...preset.character,
        id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      onUpdateCharacters([...characters, newCharacter]);
    }
  };

  const handleRemoveCharacter = (id: string) => {
    onUpdateCharacters(characters.filter(c => c.id !== id));
  };

  const handleUpdateCharacter = useCallback((id: string, updates: Partial<Character>) => {
    onUpdateCharacters(characters.map(c => c.id === id ? { ...c, ...updates } : c));
  }, [characters, onUpdateCharacters]);

  const handleCopyRefPrompt = (character: Character) => {
    const prompt = character.referenceImagePrompt ||
      generateReferenceImagePrompt(character, config?.stylePreset || 'hyper-realistic' as StylePreset);
    navigator.clipboard.writeText(prompt);
    setCopiedId(character.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate custom character from user description
  const handleGenerateCustom = async () => {
    const apiSettings = getAPISettings();
    if (!apiSettings?.apiKey) {
      onOpenSettings();
      return;
    }

    if (!config) {
      setError('Please complete project setup first');
      return;
    }

    if (!customDescription.trim()) {
      setError('Please describe your character');
      return;
    }

    setGeneratingCustom(true);
    setError(null);

    try {
      const newCharacter = await generateCustomCharacter(
        apiSettings.apiKey,
        apiSettings.model,
        customDescription,
        config.genre,
        config.stylePreset,
        config.language,
        config.videoPlatform
      );

      onUpdateCharacters([...characters, newCharacter]);
      setCustomDescription('');
      setShowCustomCreator(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate custom character');
    } finally {
      setGeneratingCustom(false);
    }
  };

  // Regenerate reference image prompt for a character
  const handleRegenerateRefPrompt = useCallback(async (characterId: string) => {
    const apiSettings = getAPISettings();
    if (!apiSettings?.apiKey) {
      onOpenSettings();
      return;
    }

    const character = characters.find(c => c.id === characterId);
    if (!character || !config) return;

    setRegeneratingPromptId(characterId);

    try {
      const newPrompt = await regenerateReferencePrompt(
        apiSettings.apiKey,
        apiSettings.model,
        character,
        config.stylePreset
      );

      handleUpdateCharacter(characterId, { referenceImagePrompt: newPrompt });
    } catch (err) {
      console.error('Failed to regenerate prompt:', err);
    } finally {
      setRegeneratingPromptId(null);
    }
  }, [characters, config, onOpenSettings, handleUpdateCharacter]);

  const toggleRole = (role: Character['role']) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  // Get filtered presets based on current platform and genre
  const filteredPresets = useMemo(() => {
    if (!config) return characterPresets;
    return getFilteredPresets(config.videoPlatform, config.genre);
  }, [config]);

  // Get label for a role (dynamic based on theme)
  const getRoleLabel = (role: Character['role']): string => {
    const roleOption = roleOptions.find(r => r.value === role);
    return roleOption?.label || role.replace('-', ' ');
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="text-amber-500" />
            Characters
          </h2>
          <p className="text-zinc-400 mt-1">Generate or manually create your characters</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300"
          >
            Back
          </button>
          <button
            onClick={onNext}
            disabled={characters.length === 0}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 rounded-lg text-sm font-medium text-white"
          >
            Continue to Story
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: AI Generator */}
        <div className="col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-5 border border-purple-600/30">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Wand2 className="text-purple-400" />
              AI Character Generator
            </h3>

            {/* Theme Context Badge */}
            {currentTheme && (
              <div className="mb-4 p-3 bg-amber-900/30 border border-amber-600/30 rounded-lg">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-medium mb-1">
                  <Zap size={12} />
                  THEME-AWARE GENERATION
                </div>
                <p className="text-xs text-amber-300/80 leading-relaxed">
                  Characters will be tailored for: <span className="font-medium text-amber-200">&quot;{currentTheme}&quot;</span>
                </p>
              </div>
            )}

            {/* Number of characters */}
            <div className="mb-4">
              <label className="block text-sm text-zinc-400 mb-2">Number of Characters</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={numCharacters}
                  onChange={(e) => setNumCharacters(parseInt(e.target.value))}
                  className="flex-1 accent-purple-500"
                />
                <span className="bg-zinc-800 px-3 py-1 rounded text-white font-bold">{numCharacters}</span>
              </div>
            </div>

            {/* Dynamic Role selection */}
            <div className="mb-4">
              <label className="block text-sm text-zinc-400 mb-2">
                Character Roles
                {currentTheme && (
                  <span className="text-purple-400 ml-2 text-xs">(themed for your story)</span>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {roleOptions.map(role => (
                  <button
                    key={role.value}
                    onClick={() => toggleRole(role.value)}
                    title={role.description}
                    className={`px-2 py-1.5 rounded text-xs transition-all ${
                      selectedRoles.includes(role.value)
                        ? 'bg-purple-600 text-white ring-1 ring-purple-400'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
              {selectedRoles.length > 0 && (
                <p className="text-xs text-zinc-500 mt-2">
                  {selectedRoles.length} role{selectedRoles.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-600/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              onClick={handleAIGenerate}
              disabled={generating}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 rounded-lg text-white font-medium flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate with AI
                </>
              )}
            </button>

            <p className="text-xs text-zinc-500 mt-2 text-center">
              Uses GPT-4o to create unique theme-aware characters
            </p>
          </div>

          {/* Custom Character Creator */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-xl p-5 border border-emerald-600/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <PenLine size={16} className="text-emerald-400" />
                Create Custom Character
              </h3>
              <button
                onClick={() => setShowCustomCreator(!showCustomCreator)}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                {showCustomCreator ? 'Close' : 'Open'}
                {showCustomCreator ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {showCustomCreator ? (
              <div className="space-y-3">
                <p className="text-xs text-zinc-400">
                  Describe your character and AI will generate all the details
                </p>
                <textarea
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="E.g., An angry green muscular giant who protects his village, speaks in Hindi with thunderous voice, wears torn shorts..."
                  rows={4}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={handleGenerateCustom}
                  disabled={generatingCustom || !customDescription.trim()}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2"
                >
                  {generatingCustom ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Create Character
                    </>
                  )}
                </button>
              </div>
            ) : (
              <p className="text-xs text-zinc-500">
                Have a specific character in mind? Describe it and let AI create the details.
              </p>
            )}
          </div>

          {/* Preset Characters - Filtered by platform and genre */}
          <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700">
            <h3 className="text-sm font-semibold text-zinc-400 mb-1">Or Add from Presets</h3>
            {config && (
              <p className="text-xs text-zinc-500 mb-3">
                Showing presets for {config.videoPlatform === 'higgsfield' ? 'Higgsfield' : 'Veo 3.1'} + {config.genre.replace('-', ' ')}
              </p>
            )}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredPresets.length > 0 ? (
                filteredPresets.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handleAddFromPreset(preset.id)}
                    className="w-full p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-left transition-colors"
                  >
                    <div className="text-sm font-medium text-white">{preset.name}</div>
                    <div className="text-xs text-zinc-400">{preset.description}</div>
                  </button>
                ))
              ) : (
                <div className="text-xs text-zinc-500 text-center py-4">
                  No presets for this combination.<br />Use AI to generate characters.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Character List */}
        <div className="col-span-2">
          {characters.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center bg-zinc-800/30 rounded-xl border border-zinc-700 border-dashed p-12">
              <Users size={48} className="text-zinc-600 mb-4" />
              <h3 className="text-lg font-medium text-zinc-400 mb-2">No Characters Yet</h3>
              <p className="text-sm text-zinc-500 mb-6">
                Use AI to generate characters or add from presets
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {characters.map(character => (
                <div
                  key={character.id}
                  className="bg-zinc-800/50 rounded-xl border border-zinc-700 overflow-hidden"
                >
                  {/* Character Header */}
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800/70"
                    onClick={() => setExpandedCharacter(expandedCharacter === character.id ? null : character.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                        character.role === 'hero' ? 'bg-green-600' :
                        character.role === 'villain' ? 'bg-red-600' :
                        character.role === 'love-interest' ? 'bg-pink-600' :
                        character.role === 'mother' ? 'bg-purple-600' :
                        'bg-blue-600'
                      }`}>
                        <User size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{character.name}</h4>
                        <p className="text-sm text-zinc-400">{getRoleLabel(character.role)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyRefPrompt(character);
                        }}
                        className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white"
                        title="Copy reference image prompt"
                      >
                        {copiedId === character.id ? <Check size={16} className="text-green-400" /> : <ImageIcon size={16} />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCharacter(character.id);
                        }}
                        className="p-2 hover:bg-red-600/20 rounded-lg text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                      {expandedCharacter === character.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedCharacter === character.id && (
                    <div className="px-4 pb-4 space-y-4 border-t border-zinc-700 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">Name</label>
                          <input
                            type="text"
                            value={character.name}
                            onChange={(e) => handleUpdateCharacter(character.id, { name: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">Role</label>
                          <select
                            value={character.role}
                            onChange={(e) => handleUpdateCharacter(character.id, { role: e.target.value as Character['role'] })}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white"
                          >
                            {roleOptions.map(role => (
                              <option key={role.value} value={role.value}>{role.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Physical Description</label>
                        <textarea
                          value={character.physicalDescription}
                          onChange={(e) => handleUpdateCharacter(character.id, { physicalDescription: e.target.value })}
                          rows={2}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Clothing</label>
                        <input
                          type="text"
                          value={character.clothing}
                          onChange={(e) => handleUpdateCharacter(character.id, { clothing: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Catchphrases</label>
                        <div className="flex flex-wrap gap-2">
                          {character.catchphrases.map((phrase, i) => (
                            <span key={i} className="px-2 py-1 bg-amber-600/20 text-amber-400 rounded text-xs">
                              &quot;{phrase}&quot;
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Reference Image Prompt */}
                      <div className="bg-zinc-900 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs text-zinc-400 flex items-center gap-1">
                            <ImageIcon size={12} />
                            Reference Image Prompt (for Imagen/DALL-E)
                          </label>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRegenerateRefPrompt(character.id)}
                              disabled={regeneratingPromptId === character.id}
                              className="text-xs text-emerald-400 hover:text-emerald-300 disabled:opacity-50 flex items-center gap-1"
                              title="Regenerate prompt based on current character details"
                            >
                              {regeneratingPromptId === character.id ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                <RefreshCw size={12} />
                              )}
                              Regenerate
                            </button>
                            <button
                              onClick={() => handleCopyRefPrompt(character)}
                              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                            >
                              {copiedId === character.id ? <Check size={12} /> : <Copy size={12} />}
                              Copy
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {character.referenceImagePrompt ||
                            generateReferenceImagePrompt(character, config?.stylePreset || 'hyper-realistic' as StylePreset)}
                        </p>
                        <p className="text-xs text-zinc-500 mt-2 italic">
                          💡 Click &quot;Regenerate&quot; after editing character details to update this prompt
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
