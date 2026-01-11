'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Character, Scene, Story, StoryBeat, CameraSettings, LightingSettings, AudioSettings } from '@/types';
import { characterPresets, scenePresets } from './presets';

interface StoreState {
  characters: Character[];
  scenes: Scene[];
  story: Story | null;
  activeTab: 'characters' | 'story' | 'scenes' | 'export';
  selectedCharacterId: string | null;
  selectedSceneId: string | null;
}

interface StoreActions {
  // Character actions
  addCharacter: (character: Omit<Character, 'id'>) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  removeCharacter: (id: string) => void;
  addCharacterFromPreset: (presetId: string) => void;
  selectCharacter: (id: string | null) => void;

  // Scene actions
  addScene: (scene?: Partial<Scene>) => void;
  updateScene: (id: string, updates: Partial<Scene>) => void;
  removeScene: (id: string) => void;
  addSceneFromPreset: (presetId: string) => void;
  selectScene: (id: string | null) => void;
  reorderScenes: (sourceIndex: number, destIndex: number) => void;

  // Story actions
  setStory: (story: Story) => void;
  updateStory: (updates: Partial<Story>) => void;
  addStoryBeat: (beat: Omit<StoryBeat, 'id'>) => void;
  updateStoryBeat: (id: string, updates: Partial<StoryBeat>) => void;
  removeStoryBeat: (id: string) => void;

  // Navigation
  setActiveTab: (tab: StoreState['activeTab']) => void;

  // Utility
  clearAll: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

type Store = StoreState & StoreActions;

const defaultCameraSettings: CameraSettings = {
  shotType: 'medium',
  cameraMovement: 'static',
  angle: 'eye-level',
  lensType: 'normal',
  focusStyle: 'deep-focus'
};

const defaultLightingSettings: LightingSettings = {
  timeOfDay: 'golden-hour',
  lightQuality: 'natural',
  lightSource: 'natural',
  mood: 'warm'
};

const defaultAudioSettings: AudioSettings = {
  dialogue: '',
  dialogueEmotion: 'determined',
  sfx: [],
  ambientSound: '',
  musicMood: 'none'
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>({
    characters: [],
    scenes: [],
    story: null,
    activeTab: 'characters',
    selectedCharacterId: null,
    selectedSceneId: null
  });

  // Character actions
  const addCharacter = useCallback((character: Omit<Character, 'id'>) => {
    const newCharacter: Character = { ...character, id: uuidv4() };
    setState(prev => ({
      ...prev,
      characters: [...prev.characters, newCharacter],
      selectedCharacterId: newCharacter.id
    }));
  }, []);

  const updateCharacter = useCallback((id: string, updates: Partial<Character>) => {
    setState(prev => ({
      ...prev,
      characters: prev.characters.map(c => c.id === id ? { ...c, ...updates } : c)
    }));
  }, []);

  const removeCharacter = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      characters: prev.characters.filter(c => c.id !== id),
      selectedCharacterId: prev.selectedCharacterId === id ? null : prev.selectedCharacterId
    }));
  }, []);

  const addCharacterFromPreset = useCallback((presetId: string) => {
    const preset = characterPresets.find(p => p.id === presetId);
    if (preset) {
      addCharacter(preset.character);
    }
  }, [addCharacter]);

  const selectCharacter = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, selectedCharacterId: id }));
  }, []);

  // Scene actions
  const addScene = useCallback((sceneData?: Partial<Scene>) => {
    const newScene: Scene = {
      id: uuidv4(),
      sceneNumber: state.scenes.length + 1,
      characterIds: [],
      action: '',
      camera: { ...defaultCameraSettings },
      lighting: { ...defaultLightingSettings },
      audio: { ...defaultAudioSettings },
      setting: '',
      duration: 8,
      negativePrompts: [],
      ...sceneData
    };
    setState(prev => ({
      ...prev,
      scenes: [...prev.scenes, newScene],
      selectedSceneId: newScene.id
    }));
  }, [state.scenes.length]);

  const updateScene = useCallback((id: string, updates: Partial<Scene>) => {
    setState(prev => ({
      ...prev,
      scenes: prev.scenes.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  }, []);

  const removeScene = useCallback((id: string) => {
    setState(prev => {
      const newScenes = prev.scenes.filter(s => s.id !== id);
      // Renumber scenes
      const renumberedScenes = newScenes.map((s, i) => ({ ...s, sceneNumber: i + 1 }));
      return {
        ...prev,
        scenes: renumberedScenes,
        selectedSceneId: prev.selectedSceneId === id ? null : prev.selectedSceneId
      };
    });
  }, []);

  const addSceneFromPreset = useCallback((presetId: string) => {
    const preset = scenePresets.find(p => p.id === presetId);
    if (preset && preset.template) {
      addScene(preset.template);
    }
  }, [addScene]);

  const selectScene = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, selectedSceneId: id }));
  }, []);

  const reorderScenes = useCallback((sourceIndex: number, destIndex: number) => {
    setState(prev => {
      const newScenes = [...prev.scenes];
      const [removed] = newScenes.splice(sourceIndex, 1);
      newScenes.splice(destIndex, 0, removed);
      // Renumber
      return {
        ...prev,
        scenes: newScenes.map((s, i) => ({ ...s, sceneNumber: i + 1 }))
      };
    });
  }, []);

  // Story actions
  const setStory = useCallback((story: Story) => {
    setState(prev => ({ ...prev, story }));
  }, []);

  const updateStory = useCallback((updates: Partial<Story>) => {
    setState(prev => ({
      ...prev,
      story: prev.story ? { ...prev.story, ...updates } : null
    }));
  }, []);

  const addStoryBeat = useCallback((beat: Omit<StoryBeat, 'id'>) => {
    const newBeat: StoryBeat = { ...beat, id: uuidv4() };
    setState(prev => ({
      ...prev,
      story: prev.story
        ? { ...prev.story, beats: [...prev.story.beats, newBeat] }
        : null
    }));
  }, []);

  const updateStoryBeat = useCallback((id: string, updates: Partial<StoryBeat>) => {
    setState(prev => ({
      ...prev,
      story: prev.story
        ? {
            ...prev.story,
            beats: prev.story.beats.map(b => b.id === id ? { ...b, ...updates } : b)
          }
        : null
    }));
  }, []);

  const removeStoryBeat = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      story: prev.story
        ? { ...prev.story, beats: prev.story.beats.filter(b => b.id !== id) }
        : null
    }));
  }, []);

  // Navigation
  const setActiveTab = useCallback((tab: StoreState['activeTab']) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  // Utility
  const clearAll = useCallback(() => {
    setState({
      characters: [],
      scenes: [],
      story: null,
      activeTab: 'characters',
      selectedCharacterId: null,
      selectedSceneId: null
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('veo-prompt-studio');
    }
  }, []);

  const saveToStorage = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('veo-prompt-studio', JSON.stringify({
        characters: state.characters,
        scenes: state.scenes,
        story: state.story
      }));
    }
  }, [state.characters, state.scenes, state.story]);

  const loadFromStorage = useCallback(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('veo-prompt-studio');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setState(prev => ({
            ...prev,
            characters: data.characters || [],
            scenes: data.scenes || [],
            story: data.story || null
          }));
        } catch (e) {
          console.error('Failed to load from storage:', e);
        }
      }
    }
  }, []);

  const store: Store = {
    ...state,
    addCharacter,
    updateCharacter,
    removeCharacter,
    addCharacterFromPreset,
    selectCharacter,
    addScene,
    updateScene,
    removeScene,
    addSceneFromPreset,
    selectScene,
    reorderScenes,
    setStory,
    updateStory,
    addStoryBeat,
    updateStoryBeat,
    removeStoryBeat,
    setActiveTab,
    clearAll,
    loadFromStorage,
    saveToStorage
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return store;
}
