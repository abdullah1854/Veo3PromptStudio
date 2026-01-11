'use client';

import { useState } from 'react';
import { Genre, StylePreset, ProjectConfig, VideoPlatform, HiggsfieldSettings } from '@/types';
import { Sparkles, Film, Palette, Languages, Clock, Layers, Video, Camera, Timer, Monitor, Maximize, Gauge, Waypoints } from 'lucide-react';

interface ProjectSetupProps {
  config: ProjectConfig | null;
  onUpdateConfig: (config: ProjectConfig) => void;
  onNext: () => void;
}

// Platform-specific genre recommendations
// Higgsfield: Best for realistic, action, sci-fi (photorealism, bullet time, FPV drone, dynamic camera)
// Veo 3.1: Best for dialogue-heavy, emotional, multilingual content (native audio sync)
const genres: { id: Genre; label: string; emoji: string; description: string; bestFor: VideoPlatform[] }[] = [
  { id: 'action-thriller', label: 'Action Thriller', emoji: '🔥', description: 'High-octane action and suspense', bestFor: ['higgsfield', 'veo-3.1'] },
  { id: 'mystery', label: 'Mystery/Thriller', emoji: '🔍', description: 'Suspense and secrets', bestFor: ['higgsfield', 'veo-3.1'] },
  { id: 'supernatural', label: 'Sci-Fi/Supernatural', emoji: '✨', description: 'Sci-fi, magic and fantasy', bestFor: ['higgsfield'] },
  { id: 'horror', label: 'Horror', emoji: '👻', description: 'Scary and supernatural', bestFor: ['higgsfield', 'veo-3.1'] },
  { id: 'revenge-saga', label: 'Revenge Saga', emoji: '⚔️', description: 'Justice and retribution', bestFor: ['higgsfield', 'veo-3.1'] },
  { id: 'romantic-drama', label: 'Romantic Drama', emoji: '💕', description: 'Love stories with emotional depth', bestFor: ['veo-3.1'] },
  { id: 'family-drama', label: 'Family Drama', emoji: '👨‍👩‍👧', description: 'Family bonds and emotions', bestFor: ['veo-3.1'] },
  { id: 'comedy', label: 'Comedy', emoji: '😂', description: 'Humor and light-hearted fun', bestFor: ['veo-3.1'] },
  { id: 'inspirational', label: 'Inspirational', emoji: '🌟', description: 'Underdog stories', bestFor: ['veo-3.1'] },
  { id: 'village-drama', label: 'Village Drama', emoji: '🏡', description: 'Rural Indian stories', bestFor: ['veo-3.1'] }
];

const stylePresets: { id: StylePreset; label: string; description: string }[] = [
  { id: 'bollywood-drama', label: 'Bollywood Drama', description: 'Vibrant, dramatic, filmy' },
  { id: 'hollywood-action', label: 'Hollywood Action', description: 'Slick, high-production' },
  { id: 'indian-village', label: 'Indian Village', description: 'Earthy, rustic, authentic' },
  { id: 'film-noir', label: 'Film Noir', description: 'Dark, shadowy, mysterious' },
  { id: 'colorful-vibrant', label: 'Colorful Vibrant', description: 'Bright, saturated, energetic' },
  { id: 'dark-moody', label: 'Dark Moody', description: 'Atmospheric, emotional' },
  { id: 'realistic-documentary', label: 'Documentary Style', description: 'Natural, authentic' },
  { id: 'anime-style', label: 'Anime Style', description: 'Stylized, expressive' }
];

const themePresets: Record<Genre, string[]> = {
  'romantic-drama': [
    'A love story with a tragic twist',
    'Childhood sweethearts reunited after years',
    'Love across social classes',
    'Second chance at love'
  ],
  'action-thriller': [
    'One man army against a crime syndicate',
    'Escape from a deadly conspiracy',
    'Race against time to save family',
    'Undercover mission gone wrong'
  ],
  'comedy': [
    'Mistaken identity leads to chaos',
    'Wedding disasters',
    'Office pranks gone too far',
    'Family reunion mayhem'
  ],
  'horror': [
    'Haunted ancestral home',
    'Village curse awakens',
    'Possessed family member',
    'Supernatural revenge'
  ],
  'family-drama': [
    'Mother\'s sacrifice for children',
    'Brother\'s betrayal and redemption',
    'Father returns after years',
    'Joint family conflicts'
  ],
  'revenge-saga': [
    'Brother avenges sister\'s honor',
    'Son returns to destroy corrupt family',
    'Wrongly accused seeks justice',
    'Village hero vs corrupt landlord'
  ],
  'mystery': [
    'Murder in a locked room',
    'Disappearance in the village',
    'Hidden treasure hunt',
    'Family secrets unveiled'
  ],
  'inspirational': [
    'Poor boy becomes champion',
    'Single mother\'s struggle to success',
    'Disabled hero proves everyone wrong',
    'Village girl achieves dreams'
  ],
  'village-drama': [
    'Land dispute between families',
    'Love across enemy clans',
    'Returning son challenges traditions',
    'Widow fights for rights'
  ],
  'supernatural': [
    'Guardian spirit protects family',
    'Magical powers awakened',
    'Demon hunter in modern times',
    'Reincarnation and destiny'
  ]
};

const videoPlatforms: { id: VideoPlatform; label: string; description: string; features: string[] }[] = [
  {
    id: 'veo-3.1',
    label: 'Google Veo 3.1',
    description: 'Best for dialogue & audio',
    features: ['Native audio sync', 'Dialogue generation', 'Text-based control', '720p-1080p']
  },
  {
    id: 'higgsfield',
    label: 'Higgsfield Cinema Studio',
    description: 'Best for cinematic visuals',
    features: ['Real camera simulation', '6 camera bodies', '11 cinema lenses', '4K, 21:9 CinemaScope']
  }
];

const defaultHiggsfieldSettings: HiggsfieldSettings = {
  sceneDuration: 5,
  resolution: '1080p',
  upscale: 'none',
  slowMotion: false,
  keyframeInterpolation: false
};

export default function ProjectSetup({ config, onUpdateConfig, onNext }: ProjectSetupProps) {
  const [localConfig, setLocalConfig] = useState<ProjectConfig>(() => config || {
    id: `project-${Date.now()}`,
    name: 'My Viral Video Project',
    genre: 'village-drama',
    theme: '',
    customTheme: '',
    numberOfScenes: 10,
    aspectRatio: '9:16',
    stylePreset: 'indian-village',
    language: 'hindi',
    targetDuration: 80,
    videoPlatform: 'veo-3.1',
    higgsfieldSettings: defaultHiggsfieldSettings
  });

  const updateConfig = (updates: Partial<ProjectConfig>) => {
    const newConfig = { ...localConfig, ...updates };
    // Auto-update target duration based on platform and settings
    if (newConfig.videoPlatform === 'higgsfield') {
      const duration = newConfig.higgsfieldSettings?.sceneDuration || 5;
      newConfig.targetDuration = newConfig.numberOfScenes * duration;
    } else {
      newConfig.targetDuration = newConfig.numberOfScenes * 8;
    }
    setLocalConfig(newConfig);
    onUpdateConfig(newConfig);
  };

  const updateHiggsfieldSettings = (updates: Partial<HiggsfieldSettings>) => {
    const newSettings = { ...(localConfig.higgsfieldSettings || defaultHiggsfieldSettings), ...updates };
    updateConfig({ higgsfieldSettings: newSettings });
  };

  const handleProceed = () => {
    if (!localConfig.theme && !localConfig.customTheme) {
      alert('Please select or enter a theme');
      return;
    }
    onUpdateConfig(localConfig);
    onNext();
  };

  const currentThemes = themePresets[localConfig.genre] || [];

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Sparkles className="text-amber-500" />
          Project Setup
        </h2>
        <p className="text-zinc-400 mt-1">Configure your viral video project</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Project Name</label>
            <input
              type="text"
              value={localConfig.name}
              onChange={(e) => updateConfig({ name: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="My Awesome Project"
            />
          </div>

          {/* Genre Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
              <Film size={16} />
              Genre
              {localConfig.videoPlatform === 'higgsfield' && (
                <span className="text-xs text-purple-400 ml-2">(Recommended: Action, Sci-Fi, Thriller)</span>
              )}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {genres.map(genre => {
                const isRecommended = genre.bestFor.includes(localConfig.videoPlatform);
                return (
                  <button
                    key={genre.id}
                    onClick={() => updateConfig({ genre: genre.id, theme: '', customTheme: '' })}
                    className={`p-3 rounded-lg text-left transition-all relative ${
                      localConfig.genre === genre.id
                        ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                        : isRecommended
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        : 'bg-zinc-800/50 text-zinc-500 hover:bg-zinc-700/50'
                    }`}
                  >
                    <span className="text-lg mr-2">{genre.emoji}</span>
                    <span className="text-sm font-medium">{genre.label}</span>
                    {isRecommended && localConfig.videoPlatform === 'higgsfield' && localConfig.genre !== genre.id && (
                      <span className="absolute top-1 right-1 text-[10px] px-1 py-0.5 bg-purple-600/50 text-purple-300 rounded">Best</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Theme / Story Idea
            </label>
            <div className="space-y-2 mb-3">
              {currentThemes.map((theme, i) => (
                <button
                  key={i}
                  onClick={() => updateConfig({ theme, customTheme: '' })}
                  className={`w-full p-3 rounded-lg text-left text-sm transition-all ${
                    localConfig.theme === theme
                      ? 'bg-amber-600/20 text-amber-400 border border-amber-600'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-transparent'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                value={localConfig.customTheme}
                onChange={(e) => updateConfig({ customTheme: e.target.value, theme: '' })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Or enter your own theme..."
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                Custom
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Style Preset */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
              <Palette size={16} />
              Visual Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {stylePresets.map(style => (
                <button
                  key={style.id}
                  onClick={() => updateConfig({ stylePreset: style.id })}
                  className={`p-3 rounded-lg text-left transition-all ${
                    localConfig.stylePreset === style.id
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <div className="text-sm font-medium">{style.label}</div>
                  <div className="text-xs opacity-70">{style.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
              <Languages size={16} />
              Dialogue Language
              {localConfig.videoPlatform === 'higgsfield' && (
                <span className="text-xs text-purple-400 ml-2">(English only for Higgsfield)</span>
              )}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'hindi', label: 'Hindi', desc: 'हिंदी' },
                { id: 'english', label: 'English', desc: 'English' },
                { id: 'hinglish', label: 'Hinglish', desc: 'Mix' }
              ].map(lang => {
                const isDisabled = localConfig.videoPlatform === 'higgsfield' && lang.id !== 'english';
                return (
                  <button
                    key={lang.id}
                    onClick={() => !isDisabled && updateConfig({ language: lang.id as ProjectConfig['language'] })}
                    disabled={isDisabled}
                    className={`p-3 rounded-lg text-center transition-all ${
                      localConfig.language === lang.id
                        ? 'bg-green-600 text-white ring-2 ring-green-400'
                        : isDisabled
                        ? 'bg-zinc-800/30 text-zinc-600 cursor-not-allowed'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <div className="text-sm font-medium">{lang.label}</div>
                    <div className="text-xs opacity-70">{lang.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
              <Video size={16} />
              Video Generation Platform
            </label>
            <div className="grid grid-cols-1 gap-3">
              {videoPlatforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => {
                    const updates: Partial<ProjectConfig> = { videoPlatform: platform.id };

                    if (platform.id === 'higgsfield') {
                      // Higgsfield: English only, realistic/action focus, 21:9 CinemaScope
                      updates.language = 'english';
                      updates.aspectRatio = '21:9';
                      updates.stylePreset = 'hollywood-action';
                      // If current genre is not recommended for Higgsfield, switch to action-thriller
                      const currentGenreInfo = genres.find(g => g.id === localConfig.genre);
                      if (!currentGenreInfo?.bestFor.includes('higgsfield')) {
                        updates.genre = 'action-thriller';
                        updates.theme = '';
                        updates.customTheme = '';
                      }
                    } else if (platform.id === 'veo-3.1') {
                      // Veo 3.1: Restore multilingual, vertical format
                      if (localConfig.aspectRatio === '21:9') {
                        updates.aspectRatio = '9:16';
                      }
                    }
                    updateConfig(updates);
                  }}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    localConfig.videoPlatform === platform.id
                      ? platform.id === 'veo-3.1'
                        ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500 ring-2 ring-blue-400'
                        : 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500 ring-2 ring-purple-400'
                      : 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      platform.id === 'veo-3.1' ? 'bg-blue-600' : 'bg-purple-600'
                    }`}>
                      {platform.id === 'veo-3.1' ? <Video size={20} className="text-white" /> : <Camera size={20} className="text-white" />}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{platform.label}</div>
                      <div className="text-xs text-zinc-400">{platform.description}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {platform.features.map((feature, i) => (
                      <span key={i} className={`text-xs px-2 py-0.5 rounded ${
                        localConfig.videoPlatform === platform.id
                          ? platform.id === 'veo-3.1' ? 'bg-blue-600/30 text-blue-300' : 'bg-purple-600/30 text-purple-300'
                          : 'bg-zinc-700 text-zinc-400'
                      }`}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Higgsfield Settings - Only show when Higgsfield is selected */}
          {localConfig.videoPlatform === 'higgsfield' && (
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-4 space-y-4">
              <h4 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                <Camera size={16} />
                Higgsfield Cinema Settings
              </h4>

              {/* Scene Duration - THE KEY MISSING FEATURE */}
              <div>
                <label className="block text-xs font-medium text-purple-300/80 mb-2 flex items-center gap-2">
                  <Timer size={14} />
                  Scene Duration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 5 as const, label: '5 seconds', desc: 'Fast-paced, action shots' },
                    { value: 10 as const, label: '10 seconds', desc: 'Establishing, emotional' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateHiggsfieldSettings({ sceneDuration: option.value })}
                      className={`p-3 rounded-lg text-left transition-all ${
                        localConfig.higgsfieldSettings?.sceneDuration === option.value
                          ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                          : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      <div className="text-sm font-bold">{option.label}</div>
                      <div className="text-xs opacity-70">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              <div>
                <label className="block text-xs font-medium text-purple-300/80 mb-2 flex items-center gap-2">
                  <Monitor size={14} />
                  Resolution
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: '480p' as const, label: '480p', desc: 'Fast preview/testing' },
                    { value: '1080p' as const, label: '1080p', desc: 'Final delivery' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateHiggsfieldSettings({ resolution: option.value })}
                      className={`p-2 rounded-lg text-center transition-all ${
                        localConfig.higgsfieldSettings?.resolution === option.value
                          ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                          : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-xs opacity-70">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upscale */}
              <div>
                <label className="block text-xs font-medium text-purple-300/80 mb-2 flex items-center gap-2">
                  <Maximize size={14} />
                  Upscale Output
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 'none' as const, label: 'None' },
                    { value: '2k' as const, label: '2K' },
                    { value: '4k' as const, label: '4K' },
                    { value: '8k' as const, label: '8K' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateHiggsfieldSettings({ upscale: option.value })}
                      className={`p-2 rounded-lg text-center transition-all ${
                        localConfig.higgsfieldSettings?.upscale === option.value
                          ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                          : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles Row */}
              <div className="grid grid-cols-2 gap-3">
                {/* Slow Motion */}
                <button
                  onClick={() => updateHiggsfieldSettings({ slowMotion: !localConfig.higgsfieldSettings?.slowMotion })}
                  className={`p-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                    localConfig.higgsfieldSettings?.slowMotion
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                      : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <Gauge size={18} />
                  <div>
                    <div className="text-sm font-medium">Slow Motion</div>
                    <div className="text-xs opacity-70">{localConfig.higgsfieldSettings?.slowMotion ? 'Enabled' : 'Disabled'}</div>
                  </div>
                </button>

                {/* Keyframe Interpolation */}
                <button
                  onClick={() => updateHiggsfieldSettings({ keyframeInterpolation: !localConfig.higgsfieldSettings?.keyframeInterpolation })}
                  className={`p-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                    localConfig.higgsfieldSettings?.keyframeInterpolation
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                      : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <Waypoints size={18} />
                  <div>
                    <div className="text-sm font-medium">Keyframes</div>
                    <div className="text-xs opacity-70">{localConfig.higgsfieldSettings?.keyframeInterpolation ? 'Start/End frames' : 'Disabled'}</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Aspect Ratio */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
              <Layers size={16} />
              Aspect Ratio
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: '9:16', label: 'Vertical', desc: 'Shorts/Reels' },
                { id: '16:9', label: 'Horizontal', desc: 'YouTube' },
                { id: '1:1', label: 'Square', desc: 'Instagram' },
                { id: '21:9', label: 'CinemaScope', desc: 'Higgsfield' }
              ].map(ratio => (
                <button
                  key={ratio.id}
                  onClick={() => updateConfig({ aspectRatio: ratio.id as ProjectConfig['aspectRatio'] })}
                  disabled={ratio.id === '21:9' && localConfig.videoPlatform !== 'higgsfield'}
                  className={`p-3 rounded-lg text-center transition-all ${
                    localConfig.aspectRatio === ratio.id
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                      : ratio.id === '21:9' && localConfig.videoPlatform !== 'higgsfield'
                      ? 'bg-zinc-800/30 text-zinc-600 cursor-not-allowed'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <div className="text-sm font-medium">{ratio.label}</div>
                  <div className="text-xs opacity-70">{ratio.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Number of Scenes */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
              <Clock size={16} />
              Number of Scenes
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={5}
                max={20}
                value={localConfig.numberOfScenes}
                onChange={(e) => updateConfig({ numberOfScenes: parseInt(e.target.value) })}
                className="flex-1 accent-amber-500"
              />
              <div className="bg-zinc-800 rounded-lg px-4 py-2 min-w-[100px] text-center">
                <span className="text-xl font-bold text-white">{localConfig.numberOfScenes}</span>
                <span className="text-xs text-zinc-400 ml-1">scenes</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Total duration: ~{localConfig.targetDuration} seconds ({Math.round(localConfig.targetDuration / 60 * 10) / 10} min)
              {localConfig.videoPlatform === 'higgsfield' && (
                <span className="text-purple-400 ml-1">
                  ({localConfig.higgsfieldSettings?.sceneDuration || 5}s per scene)
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Summary & Proceed */}
      <div className="mt-8 bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-white mb-4">Project Summary</h3>
        <div className="grid grid-cols-4 gap-4 text-sm mb-6">
          <div>
            <span className="text-zinc-400">Genre:</span>
            <span className="text-white ml-2">{genres.find(g => g.id === localConfig.genre)?.label}</span>
          </div>
          <div>
            <span className="text-zinc-400">Style:</span>
            <span className="text-white ml-2">{stylePresets.find(s => s.id === localConfig.stylePreset)?.label}</span>
          </div>
          <div>
            <span className="text-zinc-400">Language:</span>
            <span className="text-white ml-2 capitalize">{localConfig.language}</span>
          </div>
          <div>
            <span className="text-zinc-400">Platform:</span>
            <span className={`ml-2 ${localConfig.videoPlatform === 'veo-3.1' ? 'text-blue-400' : 'text-purple-400'}`}>
              {videoPlatforms.find(p => p.id === localConfig.videoPlatform)?.label}
            </span>
          </div>
          <div className="col-span-4">
            <span className="text-zinc-400">Theme:</span>
            <span className="text-white ml-2">{localConfig.customTheme || localConfig.theme || 'Not selected'}</span>
          </div>
          {localConfig.videoPlatform === 'higgsfield' && localConfig.higgsfieldSettings && (
            <div className="col-span-4 flex flex-wrap gap-2 mt-2 pt-2 border-t border-zinc-700">
              <span className="text-purple-400 text-xs font-medium">Higgsfield:</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-600/30 text-purple-300">
                {localConfig.higgsfieldSettings.sceneDuration}s scenes
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-600/30 text-purple-300">
                {localConfig.higgsfieldSettings.resolution}
              </span>
              {localConfig.higgsfieldSettings.upscale !== 'none' && (
                <span className="text-xs px-2 py-0.5 rounded bg-purple-600/30 text-purple-300">
                  Upscale: {localConfig.higgsfieldSettings.upscale.toUpperCase()}
                </span>
              )}
              {localConfig.higgsfieldSettings.slowMotion && (
                <span className="text-xs px-2 py-0.5 rounded bg-purple-600/30 text-purple-300">
                  Slow-Mo
                </span>
              )}
              {localConfig.higgsfieldSettings.keyframeInterpolation && (
                <span className="text-xs px-2 py-0.5 rounded bg-purple-600/30 text-purple-300">
                  Keyframes
                </span>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleProceed}
          className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-lg text-white font-semibold text-lg transition-all flex items-center justify-center gap-2"
        >
          <Sparkles size={20} />
          Proceed to Character Generation
        </button>
      </div>
    </div>
  );
}
