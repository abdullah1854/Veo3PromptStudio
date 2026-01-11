'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { scenePresets, sfxOptions } from '@/lib/presets';
import { generateSinglePrompt } from '@/lib/promptGenerator';
import { CameraSettings, LightingSettings, AudioSettings } from '@/types';
import {
  Plus, Trash2, Copy, Camera, Sun, Volume2, Film,
  ChevronUp, ChevronDown, Wand2, Eye
} from 'lucide-react';

const shotTypes = ['wide', 'medium', 'close-up', 'extreme-close-up', 'pov', 'two-shot'];
const cameraMovements = ['static', 'dolly', 'tracking', 'crane', 'pan', 'tilt', 'handheld', 'aerial'];
const cameraAngles = ['eye-level', 'low-angle', 'high-angle', 'dutch-angle', 'birds-eye'];
const lensTypes = ['normal', 'wide-angle', 'telephoto', 'macro'];
const focusStyles = ['deep-focus', 'shallow-dof', 'rack-focus', 'soft-focus'];

const timesOfDay = ['dawn', 'morning', 'noon', 'golden-hour', 'dusk', 'night', 'blue-hour'];
const lightQualities = ['soft', 'hard', 'diffused', 'dramatic', 'natural'];
const lightSources = ['natural', 'practical', 'rim', 'backlit', 'silhouette'];
const lightMoods = ['warm', 'cool', 'neutral', 'moody', 'vibrant'];

const dialogueEmotions = ['angry', 'sad', 'determined', 'fearful', 'joyful', 'menacing', 'soft', 'roaring'];
const musicMoods = ['epic', 'emotional', 'tense', 'triumphant', 'melancholic', 'none'];

export default function SceneBuilder() {
  const {
    scenes,
    characters,
    selectedSceneId,
    addScene,
    updateScene,
    removeScene,
    addSceneFromPreset,
    selectScene,
    reorderScenes
  } = useStore();

  const [activeSection, setActiveSection] = useState<'camera' | 'lighting' | 'audio' | 'action'>('action');
  const [newSfx, setNewSfx] = useState('');
  const [newNegative, setNewNegative] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const selectedScene = scenes.find(s => s.id === selectedSceneId);

  const handleMoveScene = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < scenes.length) {
      reorderScenes(index, newIndex);
    }
  };

  const handleCameraChange = (key: keyof CameraSettings, value: string) => {
    if (selectedScene) {
      updateScene(selectedScene.id, {
        camera: { ...selectedScene.camera, [key]: value }
      });
    }
  };

  const handleLightingChange = (key: keyof LightingSettings, value: string) => {
    if (selectedScene) {
      updateScene(selectedScene.id, {
        lighting: { ...selectedScene.lighting, [key]: value }
      });
    }
  };

  const handleAudioChange = (key: keyof AudioSettings, value: string | string[]) => {
    if (selectedScene) {
      updateScene(selectedScene.id, {
        audio: { ...selectedScene.audio, [key]: value }
      });
    }
  };

  const handleAddSfx = (sfx: string) => {
    if (selectedScene && sfx.trim()) {
      const newSfxList = [...selectedScene.audio.sfx, sfx.trim()];
      handleAudioChange('sfx', newSfxList);
      setNewSfx('');
    }
  };

  const handleRemoveSfx = (index: number) => {
    if (selectedScene) {
      const newSfxList = selectedScene.audio.sfx.filter((_, i) => i !== index);
      handleAudioChange('sfx', newSfxList);
    }
  };

  const handleAddNegative = () => {
    if (selectedScene && newNegative.trim()) {
      updateScene(selectedScene.id, {
        negativePrompts: [...selectedScene.negativePrompts, newNegative.trim()]
      });
      setNewNegative('');
    }
  };

  const handleRemoveNegative = (index: number) => {
    if (selectedScene) {
      updateScene(selectedScene.id, {
        negativePrompts: selectedScene.negativePrompts.filter((_, i) => i !== index)
      });
    }
  };

  const handleCharacterToggle = (charId: string) => {
    if (selectedScene) {
      const newCharIds = selectedScene.characterIds.includes(charId)
        ? selectedScene.characterIds.filter(id => id !== charId)
        : [...selectedScene.characterIds, charId];
      updateScene(selectedScene.id, { characterIds: newCharIds });
    }
  };

  const copyScenePrompt = () => {
    if (selectedScene) {
      const prompt = generateSinglePrompt(selectedScene, characters);
      navigator.clipboard.writeText(prompt.prompt);
    }
  };

  const getGeneratedPrompt = () => {
    if (selectedScene) {
      return generateSinglePrompt(selectedScene, characters).prompt;
    }
    return '';
  };

  return (
    <div className="flex h-full">
      {/* Sidebar - Scene List */}
      <div className="w-72 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white mb-3">Scenes</h2>

          <div className="space-y-2">
            <select
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => {
                if (e.target.value) {
                  addSceneFromPreset(e.target.value);
                  e.target.value = '';
                }
              }}
              value=""
            >
              <option value="">+ Add from preset...</option>
              {scenePresets.map(preset => (
                <option key={preset.id} value={preset.id}>
                  {preset.name} ({preset.category})
                </option>
              ))}
            </select>

            <button
              onClick={() => addScene()}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              New Blank Scene
            </button>
          </div>
        </div>

        {/* Scene List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {scenes.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-8">
              No scenes yet. Add one above!
            </p>
          ) : (
            scenes.map((scene, index) => (
              <div
                key={scene.id}
                className={`group relative rounded-lg transition-colors ${
                  selectedSceneId === scene.id
                    ? 'bg-amber-600/20 border border-amber-600'
                    : 'bg-zinc-800/50 hover:bg-zinc-800 border border-transparent'
                }`}
              >
                <button
                  onClick={() => selectScene(scene.id)}
                  className="w-full flex items-center gap-3 p-3 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center text-sm font-bold text-white">
                    {scene.sceneNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {scene.action || 'Untitled Scene'}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {scene.duration}s • {scene.camera.shotType}
                    </p>
                  </div>
                </button>

                {/* Reorder buttons */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex flex-col gap-1 transition-opacity">
                  <button
                    onClick={() => handleMoveScene(index, 'up')}
                    disabled={index === 0}
                    className="p-1 bg-zinc-700 hover:bg-zinc-600 rounded disabled:opacity-30"
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    onClick={() => handleMoveScene(index, 'down')}
                    disabled={index === scenes.length - 1}
                    className="p-1 bg-zinc-700 hover:bg-zinc-600 rounded disabled:opacity-30"
                  >
                    <ChevronDown size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total Duration */}
        {scenes.length > 0 && (
          <div className="p-4 border-t border-zinc-800 bg-zinc-900">
            <p className="text-sm text-zinc-400">
              Total Duration: <span className="text-white font-medium">{scenes.reduce((sum, s) => sum + s.duration, 0)}s</span>
            </p>
          </div>
        )}
      </div>

      {/* Main Content - Scene Editor */}
      <div className="flex-1 overflow-y-auto">
        {selectedScene ? (
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Scene {selectedScene.sceneNumber}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    showPreview
                      ? 'bg-amber-600 text-white'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                >
                  <Eye size={16} />
                  Preview Prompt
                </button>
                <button
                  onClick={copyScenePrompt}
                  className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
                >
                  <Copy size={16} />
                  Copy Prompt
                </button>
                <button
                  onClick={() => removeScene(selectedScene.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-sm text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>

            {/* Prompt Preview */}
            {showPreview && (
              <div className="mb-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-lg p-4 border border-amber-600/30">
                <h3 className="text-sm font-medium text-amber-400 mb-2 flex items-center gap-2">
                  <Wand2 size={16} />
                  Generated Veo 3.1 Prompt
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {getGeneratedPrompt()}
                </p>
              </div>
            )}

            {/* Section Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'action', icon: Film, label: 'Action & Setting' },
                { id: 'camera', icon: Camera, label: 'Camera' },
                { id: 'lighting', icon: Sun, label: 'Lighting' },
                { id: 'audio', icon: Volume2, label: 'Audio' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as typeof activeSection)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === tab.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Action & Setting Section */}
            {activeSection === 'action' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Action Description</label>
                    <textarea
                      value={selectedScene.action}
                      onChange={(e) => updateScene(selectedScene.id, { action: e.target.value })}
                      rows={4}
                      placeholder="e.g., walking forward with powerful strides, dust swirling around feet, determined expression"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Setting</label>
                    <textarea
                      value={selectedScene.setting}
                      onChange={(e) => updateScene(selectedScene.id, { setting: e.target.value })}
                      rows={4}
                      placeholder="e.g., dusty village wrestling arena with crowd on both sides"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Duration (seconds)</label>
                  <input
                    type="number"
                    min={4}
                    max={10}
                    value={selectedScene.duration}
                    onChange={(e) => updateScene(selectedScene.id, { duration: parseInt(e.target.value) || 8 })}
                    className="w-32 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Veo 3.1 supports 4-8 seconds per clip</p>
                </div>

                {/* Characters in Scene */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Characters in Scene</label>
                  <div className="flex flex-wrap gap-2">
                    {characters.length === 0 ? (
                      <p className="text-zinc-500 text-sm">Create characters first in the Characters tab</p>
                    ) : (
                      characters.map(char => (
                        <button
                          key={char.id}
                          onClick={() => handleCharacterToggle(char.id)}
                          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedScene.characterIds.includes(char.id)
                              ? 'bg-amber-600 text-white'
                              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                          }`}
                        >
                          {char.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Negative Prompts */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Negative Prompts (what to exclude)</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedScene.negativePrompts.map((neg, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-red-600/20 text-red-400 rounded-full text-sm"
                      >
                        {neg}
                        <button onClick={() => handleRemoveNegative(i)} className="hover:text-red-200">
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNegative}
                      onChange={(e) => setNewNegative(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddNegative()}
                      placeholder="e.g., blurry, low quality, watermark..."
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      onClick={handleAddNegative}
                      className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Camera Section */}
            {activeSection === 'camera' && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Shot Type</label>
                  <select
                    value={selectedScene.camera.shotType}
                    onChange={(e) => handleCameraChange('shotType', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {shotTypes.map(type => (
                      <option key={type} value={type}>{type.replace('-', ' ').toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Camera Movement</label>
                  <select
                    value={selectedScene.camera.cameraMovement}
                    onChange={(e) => handleCameraChange('cameraMovement', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {cameraMovements.map(move => (
                      <option key={move} value={move}>{move.replace('-', ' ').toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Camera Angle</label>
                  <select
                    value={selectedScene.camera.angle}
                    onChange={(e) => handleCameraChange('angle', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {cameraAngles.map(angle => (
                      <option key={angle} value={angle}>{angle.replace('-', ' ').toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Lens Type</label>
                  <select
                    value={selectedScene.camera.lensType}
                    onChange={(e) => handleCameraChange('lensType', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {lensTypes.map(lens => (
                      <option key={lens} value={lens}>{lens.replace('-', ' ').toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Focus Style</label>
                  <select
                    value={selectedScene.camera.focusStyle}
                    onChange={(e) => handleCameraChange('focusStyle', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {focusStyles.map(focus => (
                      <option key={focus} value={focus}>{focus.replace('-', ' ').toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Lighting Section */}
            {activeSection === 'lighting' && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Time of Day</label>
                  <select
                    value={selectedScene.lighting.timeOfDay}
                    onChange={(e) => handleLightingChange('timeOfDay', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {timesOfDay.map(time => (
                      <option key={time} value={time}>{time.replace('-', ' ').toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Light Quality</label>
                  <select
                    value={selectedScene.lighting.lightQuality}
                    onChange={(e) => handleLightingChange('lightQuality', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {lightQualities.map(quality => (
                      <option key={quality} value={quality}>{quality.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Light Source</label>
                  <select
                    value={selectedScene.lighting.lightSource}
                    onChange={(e) => handleLightingChange('lightSource', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {lightSources.map(source => (
                      <option key={source} value={source}>{source.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Color Mood</label>
                  <select
                    value={selectedScene.lighting.mood}
                    onChange={(e) => handleLightingChange('mood', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {lightMoods.map(mood => (
                      <option key={mood} value={mood}>{mood.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Audio Section */}
            {activeSection === 'audio' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Dialogue (in Hindi or English)</label>
                    <textarea
                      value={selectedScene.audio.dialogue}
                      onChange={(e) => handleAudioChange('dialogue', e.target.value)}
                      rows={3}
                      placeholder="e.g., Main tumhe nahi chodunga!"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Dialogue Emotion</label>
                    <select
                      value={selectedScene.audio.dialogueEmotion}
                      onChange={(e) => handleAudioChange('dialogueEmotion', e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {dialogueEmotions.map(emotion => (
                        <option key={emotion} value={emotion}>{emotion.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Ambient Sound</label>
                  <input
                    type="text"
                    value={selectedScene.audio.ambientSound}
                    onChange={(e) => handleAudioChange('ambientSound', e.target.value)}
                    placeholder="e.g., crowd murmuring in anticipation, village evening sounds"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Music Mood</label>
                  <select
                    value={selectedScene.audio.musicMood}
                    onChange={(e) => handleAudioChange('musicMood', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {musicMoods.map(mood => (
                      <option key={mood} value={mood}>{mood === 'none' ? 'NO MUSIC' : mood.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                {/* Sound Effects */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Sound Effects (SFX)</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedScene.audio.sfx.map((sfx, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                      >
                        {sfx}
                        <button onClick={() => handleRemoveSfx(i)} className="hover:text-blue-200">
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Quick SFX buttons */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {sfxOptions.slice(0, 8).map(sfx => (
                      <button
                        key={sfx}
                        onClick={() => handleAddSfx(sfx)}
                        disabled={selectedScene.audio.sfx.includes(sfx)}
                        className="px-2 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded disabled:opacity-30"
                      >
                        + {sfx}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSfx}
                      onChange={(e) => setNewSfx(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSfx(newSfx)}
                      placeholder="Add custom sound effect..."
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      onClick={() => handleAddSfx(newSfx)}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">
            <div className="text-center">
              <Film size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select a scene to edit or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
