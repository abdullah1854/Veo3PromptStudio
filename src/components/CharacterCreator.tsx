'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { characterPresets } from '@/lib/presets';
import { Character } from '@/types';
import { Plus, Trash2, User, Copy, Wand2 } from 'lucide-react';

const roleOptions = [
  { value: 'hero', label: 'Hero' },
  { value: 'villain', label: 'Villain' },
  { value: 'supporting', label: 'Supporting' },
  { value: 'mother', label: 'Mother Figure' },
  { value: 'crowd', label: 'Crowd' }
];

const visualStyles = [
  { value: '3d-realistic', label: '3D Realistic' },
  { value: 'hyper-realistic', label: 'Hyper-Realistic' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'anime', label: 'Anime' },
  { value: 'stylized', label: 'Stylized' }
];

export default function CharacterCreator() {
  const {
    characters,
    selectedCharacterId,
    addCharacter,
    updateCharacter,
    removeCharacter,
    addCharacterFromPreset,
    selectCharacter
  } = useStore();

  const [newCatchphrase, setNewCatchphrase] = useState('');
  const [newTrait, setNewTrait] = useState('');

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);

  const handleAddBlankCharacter = () => {
    addCharacter({
      name: 'New Character',
      role: 'hero',
      physicalDescription: '',
      clothing: '',
      voiceStyle: '',
      emotionalTraits: [],
      catchphrases: [],
      visualStyle: 'hyper-realistic'
    });
  };

  const handleAddCatchphrase = () => {
    if (selectedCharacter && newCatchphrase.trim()) {
      updateCharacter(selectedCharacter.id, {
        catchphrases: [...selectedCharacter.catchphrases, newCatchphrase.trim()]
      });
      setNewCatchphrase('');
    }
  };

  const handleRemoveCatchphrase = (index: number) => {
    if (selectedCharacter) {
      const newCatchphrases = selectedCharacter.catchphrases.filter((_, i) => i !== index);
      updateCharacter(selectedCharacter.id, { catchphrases: newCatchphrases });
    }
  };

  const handleAddTrait = () => {
    if (selectedCharacter && newTrait.trim()) {
      updateCharacter(selectedCharacter.id, {
        emotionalTraits: [...selectedCharacter.emotionalTraits, newTrait.trim()]
      });
      setNewTrait('');
    }
  };

  const handleRemoveTrait = (index: number) => {
    if (selectedCharacter) {
      const newTraits = selectedCharacter.emotionalTraits.filter((_, i) => i !== index);
      updateCharacter(selectedCharacter.id, { emotionalTraits: newTraits });
    }
  };

  const copyCharacterDescription = () => {
    if (selectedCharacter) {
      const desc = `${selectedCharacter.name}: ${selectedCharacter.physicalDescription}, wearing ${selectedCharacter.clothing}. Voice: ${selectedCharacter.voiceStyle}. Traits: ${selectedCharacter.emotionalTraits.join(', ')}. Style: ${selectedCharacter.visualStyle}.`;
      navigator.clipboard.writeText(desc);
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar - Character List */}
      <div className="w-72 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white mb-3">Characters</h2>

          {/* Presets Dropdown */}
          <div className="space-y-2">
            <select
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => {
                if (e.target.value) {
                  addCharacterFromPreset(e.target.value);
                  e.target.value = '';
                }
              }}
              value=""
            >
              <option value="">+ Add from preset...</option>
              {characterPresets.map(preset => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddBlankCharacter}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              New Blank Character
            </button>
          </div>
        </div>

        {/* Character List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {characters.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-8">
              No characters yet. Add one above!
            </p>
          ) : (
            characters.map(char => (
              <button
                key={char.id}
                onClick={() => selectCharacter(char.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  selectedCharacterId === char.id
                    ? 'bg-amber-600/20 border border-amber-600'
                    : 'bg-zinc-800/50 hover:bg-zinc-800 border border-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  char.role === 'hero' ? 'bg-green-600' :
                  char.role === 'villain' ? 'bg-red-600' :
                  char.role === 'mother' ? 'bg-pink-600' :
                  char.role === 'crowd' ? 'bg-blue-600' :
                  'bg-purple-600'
                }`}>
                  <User size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{char.name}</p>
                  <p className="text-xs text-zinc-400 capitalize">{char.role}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Content - Character Editor */}
      <div className="flex-1 overflow-y-auto">
        {selectedCharacter ? (
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{selectedCharacter.name}</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyCharacterDescription}
                  className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
                >
                  <Copy size={16} />
                  Copy Description
                </button>
                <button
                  onClick={() => removeCharacter(selectedCharacter.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-sm text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={selectedCharacter.name}
                    onChange={(e) => updateCharacter(selectedCharacter.id, { name: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Role</label>
                  <select
                    value={selectedCharacter.role}
                    onChange={(e) => updateCharacter(selectedCharacter.id, { role: e.target.value as Character['role'] })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {roleOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Visual Style</label>
                  <select
                    value={selectedCharacter.visualStyle}
                    onChange={(e) => updateCharacter(selectedCharacter.id, { visualStyle: e.target.value as Character['visualStyle'] })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {visualStyles.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Voice Style</label>
                  <textarea
                    value={selectedCharacter.voiceStyle}
                    onChange={(e) => updateCharacter(selectedCharacter.id, { voiceStyle: e.target.value })}
                    rows={2}
                    placeholder="e.g., Deep, thunderous voice with Hindi accent..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>
              </div>

              {/* Appearance */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Physical Description</label>
                  <textarea
                    value={selectedCharacter.physicalDescription}
                    onChange={(e) => updateCharacter(selectedCharacter.id, { physicalDescription: e.target.value })}
                    rows={4}
                    placeholder="e.g., Extremely muscular green-skinned giant with bulging veins..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Clothing</label>
                  <textarea
                    value={selectedCharacter.clothing}
                    onChange={(e) => updateCharacter(selectedCharacter.id, { clothing: e.target.value })}
                    rows={2}
                    placeholder="e.g., Traditional Indian dhoti, gold armlets..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Traits and Catchphrases */}
            <div className="grid grid-cols-2 gap-6">
              {/* Emotional Traits */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Emotional Traits</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedCharacter.emotionalTraits.map((trait, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm"
                    >
                      {trait}
                      <button
                        onClick={() => handleRemoveTrait(i)}
                        className="hover:text-purple-200"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTrait}
                    onChange={(e) => setNewTrait(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTrait()}
                    placeholder="Add trait..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={handleAddTrait}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Catchphrases */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Catchphrases</label>
                <div className="space-y-2 mb-2">
                  {selectedCharacter.catchphrases.map((phrase, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-lg"
                    >
                      <span className="flex-1 text-sm text-zinc-300">&quot;{phrase}&quot;</span>
                      <button
                        onClick={() => handleRemoveCatchphrase(i)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCatchphrase}
                    onChange={(e) => setNewCatchphrase(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCatchphrase()}
                    placeholder="Add catchphrase..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={handleAddCatchphrase}
                    className="px-3 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-white text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
              <h3 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                <Wand2 size={16} />
                Character Description Preview
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                <strong>{selectedCharacter.name}</strong> ({selectedCharacter.role}): {selectedCharacter.physicalDescription || '[Physical description]'}, wearing {selectedCharacter.clothing || '[clothing]'}. Voice: {selectedCharacter.voiceStyle || '[voice style]'}. Traits: {selectedCharacter.emotionalTraits.length > 0 ? selectedCharacter.emotionalTraits.join(', ') : '[no traits]'}. Visual style: {selectedCharacter.visualStyle}.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">
            <div className="text-center">
              <User size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select a character to edit or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
