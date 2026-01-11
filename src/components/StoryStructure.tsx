'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '@/lib/store';
import { storyThemes, settings } from '@/lib/presets';
import { generateStoryPrompt, generateChatGPTPrompt } from '@/lib/promptGenerator';
import { Story, StoryBeat } from '@/types';
import { Plus, Trash2, Copy, BookOpen, Sparkles, Zap } from 'lucide-react';

const beatTypes = [
  { id: 'hook', label: 'Hook', color: 'bg-red-600', description: 'Shocking opening to grab attention' },
  { id: 'emotional', label: 'Emotional', color: 'bg-pink-600', description: 'Show vulnerability to build empathy' },
  { id: 'conflict', label: 'Conflict', color: 'bg-orange-600', description: 'Introduce villain/problem with tension' },
  { id: 'resolution', label: 'Resolution', color: 'bg-green-600', description: 'Satisfying victory or emotional closure' }
];

const languages = [
  { value: 'hindi', label: 'Hindi' },
  { value: 'english', label: 'English' },
  { value: 'hinglish', label: 'Hinglish (Mix)' }
];

export default function StoryStructure() {
  const { story, characters, setStory, updateStory, addStoryBeat, updateStoryBeat, removeStoryBeat } = useStore();

  const [showChatGPTPrompt, setShowChatGPTPrompt] = useState(false);

  // Initialize story if not exists
  useEffect(() => {
    if (!story) {
      setStory({
        id: uuidv4(),
        title: 'Untitled Story',
        theme: 'family-honor',
        setting: 'dusty Indian village square',
        beats: [],
        language: 'hindi'
      });
    }
  }, [story, setStory]);

  const handleAddBeat = (beatType: StoryBeat['beatType']) => {
    addStoryBeat({
      beatType,
      description: '',
      dialogue: '',
      duration: 8
    });
  };

  const handleQuickSetup = () => {
    // Add all 4 story beats at once
    beatTypes.forEach(beat => {
      addStoryBeat({
        beatType: beat.id as StoryBeat['beatType'],
        description: '',
        dialogue: '',
        duration: 8
      });
    });
  };

  const copyStoryPrompt = () => {
    if (story) {
      const prompt = generateStoryPrompt(
        storyThemes.find(t => t.id === story.theme)?.name || story.theme,
        story.setting,
        story.language
      );
      navigator.clipboard.writeText(prompt);
    }
  };

  const copyChatGPTPrompt = () => {
    const prompt = generateChatGPTPrompt(characters);
    navigator.clipboard.writeText(prompt);
  };

  if (!story) return null;

  const getBeatInfo = (type: string) => beatTypes.find(b => b.id === type) || beatTypes[0];

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Story Structure</h2>
          <p className="text-zinc-400 text-sm">Plan your viral 4-beat story arc</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowChatGPTPrompt(!showChatGPTPrompt)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              showChatGPTPrompt
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
          >
            <Sparkles size={16} />
            ChatGPT Setup
          </button>
          <button
            onClick={copyStoryPrompt}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
          >
            <Copy size={16} />
            Copy Story Prompt
          </button>
        </div>
      </div>

      {/* ChatGPT Setup Prompt */}
      {showChatGPTPrompt && (
        <div className="mb-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-4 border border-purple-600/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-purple-400 flex items-center gap-2">
              <Sparkles size={16} />
              ChatGPT Character Setup Prompt
            </h3>
            <button
              onClick={copyChatGPTPrompt}
              className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm text-white transition-colors"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>
          <p className="text-xs text-zinc-400 mb-2">
            Paste this into ChatGPT to set up your character context. Then describe scenes and it will generate Veo 3.1 prompts.
          </p>
          <pre className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap bg-zinc-900/50 p-3 rounded-lg max-h-48 overflow-y-auto">
            {generateChatGPTPrompt(characters)}
          </pre>
        </div>
      )}

      {/* Story Settings */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Story Title</label>
          <input
            type="text"
            value={story.title}
            onChange={(e) => updateStory({ title: e.target.value })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Theme</label>
          <select
            value={story.theme}
            onChange={(e) => updateStory({ theme: e.target.value })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {storyThemes.map(theme => (
              <option key={theme.id} value={theme.id}>{theme.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Language</label>
          <select
            value={story.language}
            onChange={(e) => updateStory({ language: e.target.value as Story['language'] })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-zinc-400 mb-1">Setting</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={story.setting}
            onChange={(e) => updateStory({ setting: e.target.value })}
            placeholder="Where does your story take place?"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <select
            onChange={(e) => {
              if (e.target.value) {
                updateStory({ setting: e.target.value });
                e.target.value = '';
              }
            }}
            value=""
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-400 focus:outline-none"
          >
            <option value="">Quick pick...</option>
            {settings.map(setting => (
              <option key={setting} value={setting}>{setting}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Story Beats */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <BookOpen size={20} />
          Story Beats
        </h3>
        {story.beats.length === 0 && (
          <button
            onClick={handleQuickSetup}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium text-white transition-colors"
          >
            <Zap size={16} />
            Quick Setup (Add All 4 Beats)
          </button>
        )}
      </div>

      {/* Beat Type Selector */}
      {story.beats.length < 4 && story.beats.length > 0 && (
        <div className="mb-4 flex gap-2">
          {beatTypes
            .filter(bt => !story.beats.some(b => b.beatType === bt.id))
            .map(beatType => (
              <button
                key={beatType.id}
                onClick={() => handleAddBeat(beatType.id as StoryBeat['beatType'])}
                className={`flex items-center gap-2 px-3 py-2 ${beatType.color} hover:opacity-90 rounded-lg text-sm font-medium text-white transition-colors`}
              >
                <Plus size={16} />
                Add {beatType.label}
              </button>
            ))}
        </div>
      )}

      {/* Beats List */}
      <div className="space-y-4">
        {story.beats.length === 0 ? (
          <div className="text-center py-12 bg-zinc-800/30 rounded-lg border border-zinc-700 border-dashed">
            <BookOpen size={48} className="mx-auto mb-4 text-zinc-600" />
            <p className="text-zinc-500 mb-4">No story beats yet</p>
            <p className="text-zinc-600 text-sm">Click &quot;Quick Setup&quot; to add all 4 viral story beats</p>
          </div>
        ) : (
          story.beats.map((beat, index) => {
            const beatInfo = getBeatInfo(beat.beatType);
            return (
              <div
                key={beat.id}
                className="bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden"
              >
                {/* Beat Header */}
                <div className={`${beatInfo.color} px-4 py-2 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-medium">{beatInfo.label}</span>
                      <span className="text-white/70 text-sm ml-2">- {beatInfo.description}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeStoryBeat(beat.id)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Beat Content */}
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Scene Description</label>
                    <textarea
                      value={beat.description}
                      onChange={(e) => updateStoryBeat(beat.id, { description: e.target.value })}
                      rows={2}
                      placeholder={
                        beat.beatType === 'hook' ? "What shocking moment opens the story? e.g., Hulk discovers his father is missing..." :
                        beat.beatType === 'emotional' ? "What shows vulnerability? e.g., Hulk sitting alone, tears in eyes..." :
                        beat.beatType === 'conflict' ? "What creates tension? e.g., Villain appears and threatens..." :
                        "How does it resolve? e.g., Hulk defeats villain, villagers celebrate..."
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">
                        Key Dialogue ({story.language === 'english' ? 'English' : 'Hindi'})
                      </label>
                      <textarea
                        value={beat.dialogue}
                        onChange={(e) => updateStoryBeat(beat.id, { dialogue: e.target.value })}
                        rows={2}
                        placeholder={
                          beat.beatType === 'hook' ? "Mera baap kahan hai?!" :
                          beat.beatType === 'emotional' ? "Maa, main bahut haar gaya..." :
                          beat.beatType === 'conflict' ? "Tum mujhse takraoge?" :
                          "Yeh jeet maa ke liye hai!"
                        }
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Duration (seconds)</label>
                      <input
                        type="number"
                        min={4}
                        max={10}
                        value={beat.duration}
                        onChange={(e) => updateStoryBeat(beat.id, { duration: parseInt(e.target.value) || 8 })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Story Summary */}
      {story.beats.length > 0 && (
        <div className="mt-8 bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Story Summary</h4>
          <p className="text-zinc-300 text-sm">
            <strong>{story.title}</strong> ({storyThemes.find(t => t.id === story.theme)?.name}) - {story.setting}
          </p>
          <p className="text-zinc-400 text-sm mt-1">
            Total duration: {story.beats.reduce((sum, b) => sum + b.duration, 0)} seconds • {story.beats.length} beats
          </p>
        </div>
      )}
    </div>
  );
}
