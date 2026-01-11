'use client';

import { useState } from 'react';
import { Character, ProjectConfig, GeneratedScene, StoryGenerationResponse } from '@/types';
import { generateStory, getAPISettings, generatedSceneToVeoPrompt, generatedSceneToHiggsfieldPrompt, generateReferenceImagePrompt } from '@/lib/aiService';
import {
  Sparkles, BookOpen, Loader2, Copy, Check, Play, ChevronDown, ChevronUp,
  AlertCircle, Film, MessageSquare, Camera, Sun, Volume2, Wand2, Trash2,
  Users, Image as ImageIcon, RefreshCw
} from 'lucide-react';

interface AIStoryGeneratorProps {
  config: ProjectConfig | null;
  characters: Character[];
  generatedScenes: GeneratedScene[];
  onUpdateScenes: (scenes: GeneratedScene[]) => void;
  onNext: () => void;
  onBack: () => void;
  onOpenSettings: () => void;
}

export default function AIStoryGenerator({
  config,
  characters,
  generatedScenes,
  onUpdateScenes,
  onNext,
  onBack,
  onOpenSettings
}: AIStoryGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [expandedScene, setExpandedScene] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerateStory = async () => {
    const apiSettings = getAPISettings();
    if (!apiSettings?.apiKey) {
      onOpenSettings();
      return;
    }

    if (!config) {
      setError('Please complete project setup first');
      return;
    }

    if (characters.length === 0) {
      setError('Please create characters first');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const theme = config.customTheme || config.theme;
      const response: StoryGenerationResponse = await generateStory(
        apiSettings.apiKey,
        apiSettings.model,
        config.genre,
        theme,
        characters,
        config.numberOfScenes,
        config.language,
        config.stylePreset,
        config.videoPlatform,
        config.higgsfieldSettings
      );

      setStoryTitle(response.title);
      setSynopsis(response.synopsis);
      onUpdateScenes(response.scenes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate story');
    } finally {
      setGenerating(false);
    }
  };

  const handleClearStory = () => {
    if (confirm('Clear current story and generate a new one?')) {
      setStoryTitle('');
      setSynopsis('');
      onUpdateScenes([]);
      setExpandedScene(null);
    }
  };

  const handleCopyPrompt = (scene: GeneratedScene, isLastScene: boolean = false) => {
    const isHiggsfield = config?.videoPlatform === 'higgsfield';
    let promptText: string;

    if (isHiggsfield) {
      const { prompt, settings } = generatedSceneToHiggsfieldPrompt(scene, characters, config?.stylePreset || 'indian-village');
      // Format with settings for Higgsfield
      promptText = `[HIGGSFIELD SETTINGS]
Camera: ${settings.cameraBody} + ${settings.lens}
Focal: ${settings.focalLength}mm @ ${settings.aperture}
Movements: ${settings.movements.join(' → ')}
Film Grain: ${settings.filmGrain}
Color: ${settings.colorPalette}
Duration: ${settings.duration}s

[PROMPT]
${prompt}`;
    } else {
      promptText = generatedSceneToVeoPrompt(scene, characters, config?.stylePreset || 'indian-village', isLastScene);
    }

    navigator.clipboard.writeText(promptText);
    setCopiedId(scene.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyCharacterRef = (character: Character) => {
    const prompt = character.referenceImagePrompt ||
      generateReferenceImagePrompt(character, config?.stylePreset || 'indian-village');
    navigator.clipboard.writeText(prompt);
    setCopiedId(`char-${character.id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAllPrompts = () => {
    const isHiggsfield = config?.videoPlatform === 'higgsfield';
    const platformLabel = isHiggsfield ? 'HIGGSFIELD' : 'VEO 3.1';

    const allPrompts = generatedScenes.map((scene, index) => {
      const sceneChars = getSceneCharacters(scene);
      const charInfo = sceneChars.map(c => `${c.name} (${c.role})`).join(', ');

      let promptContent: string;
      if (isHiggsfield) {
        const { prompt, settings } = generatedSceneToHiggsfieldPrompt(scene, characters, config?.stylePreset || 'indian-village');
        promptContent = `Camera: ${settings.cameraBody} + ${settings.lens}
Focal: ${settings.focalLength}mm @ ${settings.aperture}
Movements: ${settings.movements.join(' → ')}
Film Grain: ${settings.filmGrain}
Duration: ${settings.duration}s

${prompt}`;
      } else {
        const isLastScene = index === generatedScenes.length - 1;
        promptContent = generatedSceneToVeoPrompt(scene, characters, config?.stylePreset || 'indian-village', isLastScene);
      }

      return `[SCENE ${index + 1}: ${scene.title}]\nPlatform: ${platformLabel}\nCharacters: ${charInfo}\nDuration: ${scene.duration}s | Emotion: ${scene.emotion}\n\n${promptContent}`;
    }).join('\n\n' + '═'.repeat(60) + '\n\n');

    navigator.clipboard.writeText(allPrompts);
    setCopiedId('all');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSceneCharacters = (scene: GeneratedScene) => {
    return characters.filter(c =>
      scene.characterIds.includes(c.name) || scene.characterIds.includes(c.id)
    );
  };

  const totalDuration = generatedScenes.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <BookOpen className="text-amber-500" />
            Story Generator
          </h2>
          <p className="text-zinc-400 mt-1">AI creates your complete story with filmy dialogues</p>
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
            disabled={generatedScenes.length === 0}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 rounded-lg text-sm font-medium text-white"
          >
            Continue to Export
          </button>
        </div>
      </div>

      {/* Generator Panel */}
      {generatedScenes.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-xl p-8 border border-amber-600/30 text-center">
            <Wand2 size={48} className="mx-auto mb-4 text-amber-500" />
            <h3 className="text-xl font-bold text-white mb-2">Generate Your Story</h3>
            <p className="text-zinc-400 mb-6">
              AI will create {config?.numberOfScenes || 10} scenes with dramatic dialogues in {config?.language || 'Hindi'}
            </p>

            {/* Summary */}
            <div className="bg-zinc-900/50 rounded-lg p-4 mb-6 text-left">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-zinc-500">Genre:</span>
                  <span className="text-white ml-2 capitalize">{config?.genre?.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Style:</span>
                  <span className="text-white ml-2 capitalize">{config?.stylePreset?.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Characters:</span>
                  <span className="text-white ml-2">{characters.length}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Scenes:</span>
                  <span className="text-white ml-2">{config?.numberOfScenes}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-zinc-500">Theme:</span>
                  <span className="text-white ml-2">{config?.customTheme || config?.theme}</span>
                </div>
              </div>
            </div>

            {/* Characters Preview */}
            <div className="bg-zinc-900/50 rounded-lg p-4 mb-6 text-left">
              <h4 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
                <Users size={14} />
                Characters to Use
              </h4>
              <div className="flex flex-wrap gap-2">
                {characters.map(char => (
                  <div
                    key={char.id}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      char.role === 'hero' ? 'bg-green-600/20 text-green-400' :
                      char.role === 'villain' ? 'bg-red-600/20 text-red-400' :
                      char.role === 'love-interest' ? 'bg-pink-600/20 text-pink-400' :
                      char.role === 'mother' ? 'bg-purple-600/20 text-purple-400' :
                      'bg-blue-600/20 text-blue-400'
                    }`}
                  >
                    {char.name} ({char.role})
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-600/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              onClick={handleGenerateStory}
              disabled={generating}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-3 mx-auto"
            >
              {generating ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Generating Story...
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  Generate Complete Story
                </>
              )}
            </button>

            <p className="text-xs text-zinc-500 mt-4">
              This may take 30-60 seconds depending on the number of scenes
            </p>
          </div>
        </div>
      ) : (
        /* Story Display */
        <div className="space-y-6">
          {/* Story Header */}
          <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{storyTitle}</h3>
                <p className="text-zinc-400">{synopsis}</p>
                <div className="flex gap-4 mt-4 text-sm">
                  <span className="text-zinc-500">
                    <Film size={14} className="inline mr-1" />
                    {generatedScenes.length} scenes
                  </span>
                  <span className="text-zinc-500">
                    <Play size={14} className="inline mr-1" />
                    {totalDuration}s (~{Math.round(totalDuration / 60 * 10) / 10} min)
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyAllPrompts}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium text-white"
                >
                  {copiedId === 'all' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedId === 'all' ? 'Copied!' : 'Copy All Prompts'}
                </button>
                <button
                  onClick={handleClearStory}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-sm text-red-400"
                  title="Clear story and start fresh"
                >
                  <Trash2 size={16} />
                  Clear Story
                </button>
                <button
                  onClick={handleGenerateStory}
                  disabled={generating}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm text-zinc-300"
                >
                  {generating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                  Regenerate
                </button>
              </div>
            </div>
          </div>

          {/* Character Reference Images Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-600/20">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ImageIcon className="text-purple-400" />
              Step 1: Generate Character Reference Images First
            </h4>
            <p className="text-sm text-zinc-400 mb-4">
              Use these prompts in <strong>Imagen 3.0</strong> or <strong>DALL-E 3</strong> to create consistent character images.
              You will need these images when generating videos in {config?.videoPlatform === 'higgsfield' ? 'Higgsfield Cinema Studio' : 'Veo 3.1'}.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {characters.map(char => {
                const refPrompt = char.referenceImagePrompt ||
                  generateReferenceImagePrompt(char, config?.stylePreset || 'indian-village');
                return (
                  <div key={char.id} className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          char.role === 'hero' ? 'bg-green-600' :
                          char.role === 'villain' ? 'bg-red-600' :
                          char.role === 'love-interest' ? 'bg-pink-600' :
                          char.role === 'mother' ? 'bg-purple-600' :
                          'bg-blue-600'
                        }`}>
                          {char.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-medium text-white">{char.name}</span>
                          <span className="text-xs text-zinc-400 ml-2 capitalize">({char.role})</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyCharacterRef(char)}
                        className="flex items-center gap-1 px-2 py-1 bg-purple-600/20 hover:bg-purple-600/30 rounded text-xs text-purple-400"
                      >
                        {copiedId === `char-${char.id}` ? <Check size={12} /> : <Copy size={12} />}
                        Copy Image Prompt
                      </button>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">{refPrompt}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scene List */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Film className="text-amber-500" />
              Step 2: Generate Videos for Each Scene
            </h4>
            <div className="space-y-3">
              {generatedScenes.map((scene, index) => {
                const sceneChars = getSceneCharacters(scene);
                return (
                  <div
                    key={scene.id}
                    className="bg-zinc-800/50 rounded-xl border border-zinc-700 overflow-hidden"
                  >
                    {/* Scene Header */}
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800/70"
                      onClick={() => setExpandedScene(expandedScene === scene.id ? null : scene.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center text-amber-500 font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{scene.title}</h4>
                          <p className="text-sm text-zinc-400 line-clamp-1">{scene.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Character badges */}
                        <div className="flex -space-x-2">
                          {sceneChars.slice(0, 3).map(char => (
                            <div
                              key={char.id}
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-zinc-800 ${
                                char.role === 'hero' ? 'bg-green-600' :
                                char.role === 'villain' ? 'bg-red-600' :
                                char.role === 'love-interest' ? 'bg-pink-600' :
                                char.role === 'mother' ? 'bg-purple-600' :
                                'bg-blue-600'
                              }`}
                              title={char.name}
                            >
                              {char.name.charAt(0)}
                            </div>
                          ))}
                          {sceneChars.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-zinc-600 flex items-center justify-center text-white text-xs border-2 border-zinc-800">
                              +{sceneChars.length - 3}
                            </div>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          scene.emotion === 'angry' ? 'bg-red-600/20 text-red-400' :
                          scene.emotion === 'sad' ? 'bg-blue-600/20 text-blue-400' :
                          scene.emotion === 'romantic' ? 'bg-pink-600/20 text-pink-400' :
                          scene.emotion === 'triumphant' ? 'bg-green-600/20 text-green-400' :
                          scene.emotion === 'menacing' ? 'bg-purple-600/20 text-purple-400' :
                          scene.emotion === 'joyful' ? 'bg-yellow-600/20 text-yellow-400' :
                          'bg-amber-600/20 text-amber-400'
                        }`}>
                          {scene.emotion}
                        </span>
                        <span className="text-xs text-zinc-500">{scene.duration}s</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPrompt(scene, index === generatedScenes.length - 1);
                          }}
                          className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white"
                          title={`Copy ${config?.videoPlatform === 'higgsfield' ? 'Higgsfield' : 'Veo 3.1'} prompt`}
                        >
                          {copiedId === scene.id ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                        </button>
                        {expandedScene === scene.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedScene === scene.id && (
                      <div className="px-4 pb-4 space-y-4 border-t border-zinc-700 pt-4">
                        {/* Characters Required for This Scene */}
                        <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-600/20">
                          <h5 className="text-sm font-medium text-purple-400 mb-3 flex items-center gap-2">
                            <Users size={14} />
                            Reference Images Required for This Scene
                          </h5>
                          <div className="grid grid-cols-2 gap-3">
                            {sceneChars.map(char => (
                              <div key={char.id} className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                    char.role === 'hero' ? 'bg-green-600' :
                                    char.role === 'villain' ? 'bg-red-600' :
                                    char.role === 'love-interest' ? 'bg-pink-600' :
                                    char.role === 'mother' ? 'bg-purple-600' :
                                    'bg-blue-600'
                                  }`}>
                                    {char.name.charAt(0)}
                                  </div>
                                  <div>
                                    <span className="text-sm text-white">{char.name}</span>
                                    <p className="text-xs text-zinc-500 capitalize">{char.role}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleCopyCharacterRef(char)}
                                  className="flex items-center gap-1 px-2 py-1 bg-purple-600/20 hover:bg-purple-600/30 rounded text-xs text-purple-400"
                                >
                                  {copiedId === `char-${char.id}` ? <Check size={10} /> : <ImageIcon size={10} />}
                                  Image Prompt
                                </button>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-zinc-500 mt-3">
                            Upload these character reference images to Veo 3.1 when generating this scene
                          </p>
                        </div>

                        {/* Scene Details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-xs text-zinc-400 mb-2 flex items-center gap-1">
                              <MessageSquare size={12} />
                              Dialogue ({scene.dialogueLanguage})
                            </h5>
                            <div className="bg-zinc-900 rounded-lg p-3">
                              <p className="text-amber-400 font-medium">&quot;{scene.dialogue}&quot;</p>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-xs text-zinc-400 mb-2">Visual Description</h5>
                            <div className="bg-zinc-900 rounded-lg p-3">
                              <p className="text-sm text-zinc-300">{scene.visualDescription}</p>
                            </div>
                          </div>
                        </div>

                        {/* Technical Suggestions */}
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <h5 className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                              <Camera size={12} />
                              Camera
                            </h5>
                            <p className="text-sm text-zinc-300">{scene.suggestedCamera}</p>
                          </div>
                          <div>
                            <h5 className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                              <Sun size={12} />
                              Lighting
                            </h5>
                            <p className="text-sm text-zinc-300">{scene.suggestedLighting}</p>
                          </div>
                          <div>
                            <h5 className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                              <Volume2 size={12} />
                              Audio
                            </h5>
                            <p className="text-sm text-zinc-300">{scene.suggestedAudio}</p>
                          </div>
                        </div>

                        {/* Platform Prompt */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-xs text-zinc-400 flex items-center gap-1">
                              <Wand2 size={12} />
                              {config?.videoPlatform === 'higgsfield' ? 'Higgsfield Cinema' : 'Veo 3.1'} Prompt (Ready to Use)
                            </h5>
                            <button
                              onClick={() => handleCopyPrompt(scene, index === generatedScenes.length - 1)}
                              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                            >
                              {copiedId === scene.id ? <Check size={12} /> : <Copy size={12} />}
                              Copy Prompt
                            </button>
                          </div>
                          {config?.videoPlatform === 'higgsfield' ? (
                            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-3 border border-purple-600/20">
                              {(() => {
                                const { prompt, settings } = generatedSceneToHiggsfieldPrompt(scene, characters, config?.stylePreset || 'indian-village');
                                return (
                                  <>
                                    <div className="grid grid-cols-5 gap-2 mb-3 text-xs">
                                      <div className="bg-zinc-900/50 rounded p-2">
                                        <span className="text-zinc-500 block">Camera</span>
                                        <span className="text-purple-400">{settings.cameraBody}</span>
                                      </div>
                                      <div className="bg-zinc-900/50 rounded p-2">
                                        <span className="text-zinc-500 block">Lens</span>
                                        <span className="text-purple-400">{settings.lens}</span>
                                      </div>
                                      <div className="bg-zinc-900/50 rounded p-2">
                                        <span className="text-zinc-500 block">Focal/Aperture</span>
                                        <span className="text-purple-400">{settings.focalLength}mm @ {settings.aperture}</span>
                                      </div>
                                      <div className="bg-zinc-900/50 rounded p-2">
                                        <span className="text-zinc-500 block">Movements</span>
                                        <span className="text-purple-400">{settings.movements.length}x</span>
                                      </div>
                                      <div className="bg-zinc-900/50 rounded p-2">
                                        <span className="text-zinc-500 block">Duration</span>
                                        <span className="text-purple-400">{settings.duration}s</span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-zinc-300 leading-relaxed">{prompt}</p>
                                  </>
                                );
                              })()}
                            </div>
                          ) : (
                            <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-lg p-3 border border-amber-600/20">
                              <p className="text-sm text-zinc-300 leading-relaxed">
                                {generatedSceneToVeoPrompt(scene, characters, config?.stylePreset || 'indian-village', index === generatedScenes.length - 1)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
