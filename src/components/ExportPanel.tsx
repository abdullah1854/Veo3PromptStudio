'use client';

import { useState } from 'react';
import { Character, ProjectConfig, GeneratedScene } from '@/types';
import { generatedSceneToVeoPrompt, generatedSceneToHiggsfieldPrompt, generateReferenceImagePrompt, HiggsfieldSceneSettings } from '@/lib/aiService';
import {
  Copy, Download, Check, FileText, Users, Film, Clock,
  Sparkles, Image, Wand2, ArrowLeft, Package
} from 'lucide-react';

interface ExportPanelProps {
  config: ProjectConfig | null;
  characters: Character[];
  generatedScenes: GeneratedScene[];
  onBack: () => void;
}

type ExportFormat = 'video-prompts' | 'reference-images' | 'full-package' | 'production-guide';

export default function ExportPanel({
  config,
  characters,
  generatedScenes,
  onBack
}: ExportPanelProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('video-prompts');

  const isHiggsfield = config?.videoPlatform === 'higgsfield';
  const platformName = isHiggsfield ? 'Higgsfield Cinema Studio' : 'Veo 3.1';
  const platformShort = isHiggsfield ? 'Higgsfield' : 'Veo 3.1';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const getPromptForScene = (scene: GeneratedScene, isLastScene: boolean = false): { text: string; settings?: HiggsfieldSceneSettings } => {
    if (isHiggsfield) {
      const { prompt, settings } = generatedSceneToHiggsfieldPrompt(scene, characters, config?.stylePreset || 'indian-village');
      return { text: prompt, settings };
    }
    return { text: generatedSceneToVeoPrompt(scene, characters, config?.stylePreset || 'indian-village', isLastScene) };
  };

  const formatHiggsfieldSettings = (settings: HiggsfieldSceneSettings): string => {
    return `Camera: ${settings.cameraBody} + ${settings.lens}
Focal: ${settings.focalLength}mm @ ${settings.aperture}
Movements: ${settings.movements.join(' → ')}
Film Grain: ${settings.filmGrain}
Color: ${settings.colorPalette}
Duration: ${settings.duration}s`;
  };

  const generateAllVideoPrompts = () => {
    return generatedScenes.map((scene, index) => {
      const isLastScene = index === generatedScenes.length - 1;
      const { text, settings } = getPromptForScene(scene, isLastScene);
      const duration = isHiggsfield && settings ? settings.duration : scene.duration;

      if (isHiggsfield && settings) {
        return `[SCENE ${index + 1}: ${scene.title}]\nPlatform: HIGGSFIELD CINEMA STUDIO\nDuration: ${duration}s | Emotion: ${scene.emotion}\n\n[SETTINGS]\n${formatHiggsfieldSettings(settings)}\n\n[PROMPT]\n${text}`;
      }
      return `[SCENE ${index + 1}: ${scene.title}]\nPlatform: VEO 3.1\nDuration: ${scene.duration}s | Emotion: ${scene.emotion}\n\n${text}`;
    }).join('\n\n' + '='.repeat(60) + '\n\n');
  };

  const generateCharacterReferencePrompts = () => {
    return characters.map(char => {
      const prompt = char.referenceImagePrompt ||
        generateReferenceImagePrompt(char, config?.stylePreset || 'indian-village');
      return `[${char.name.toUpperCase()} - ${char.role.toUpperCase()}]\n${prompt}`;
    }).join('\n\n' + '-'.repeat(60) + '\n\n');
  };

  const generateFullPackage = () => {
    let output = '';
    const headerTitle = isHiggsfield ? 'HIGGSFIELD CINEMA STUDIO PRODUCTION PACKAGE' : 'VEO 3.1 PRODUCTION PACKAGE';

    // Header
    output += '═'.repeat(70) + '\n';
    output += `                    ${headerTitle}                    \n`;
    output += '═'.repeat(70) + '\n\n';

    // Project Info
    if (config) {
      output += '📋 PROJECT INFO\n';
      output += '─'.repeat(70) + '\n';
      output += `Project Name: ${config.name}\n`;
      output += `Video Platform: ${platformName}\n`;
      output += `Genre: ${config.genre.replace('-', ' ')}\n`;
      output += `Theme: ${config.customTheme || config.theme}\n`;
      output += `Visual Style: ${config.stylePreset.replace('-', ' ')}\n`;
      output += `Language: ${config.language}\n`;
      output += `Aspect Ratio: ${config.aspectRatio}\n`;
      output += `Total Scenes: ${config.numberOfScenes}\n`;
      output += `Est. Duration: ${config.targetDuration}s (~${Math.round(config.targetDuration / 60 * 10) / 10} min)\n`;
      if (isHiggsfield && config.higgsfieldSettings) {
        const hs = config.higgsfieldSettings;
        output += `Scene Duration: ${hs.sceneDuration}s per scene\n`;
        output += `Resolution: ${hs.resolution}\n`;
        if (hs.upscale !== 'none') {
          output += `Upscale: ${hs.upscale.toUpperCase()}\n`;
        }
        if (hs.slowMotion) {
          output += `Slow Motion: Enabled\n`;
        }
        if (hs.keyframeInterpolation) {
          output += `Keyframe Interpolation: Enabled (Start/End frames)\n`;
        }
      }
      output += '\n';
    }

    // Characters
    output += '👥 CHARACTERS\n';
    output += '─'.repeat(70) + '\n\n';
    characters.forEach((char, i) => {
      output += `${i + 1}. ${char.name} (${char.role})\n`;
      output += `   Physical: ${char.physicalDescription}\n`;
      output += `   Clothing: ${char.clothing}\n`;
      output += `   Voice: ${char.voiceStyle}\n`;
      output += `   Traits: ${char.emotionalTraits.join(', ')}\n`;
      output += `   Catchphrases: "${char.catchphrases.join('", "')}"\n\n`;
    });

    // Reference Image Prompts
    output += '\n🎨 CHARACTER REFERENCE IMAGE PROMPTS (For Imagen/DALL-E)\n';
    output += '─'.repeat(70) + '\n\n';
    output += generateCharacterReferencePrompts();
    output += '\n\n';

    // Scene-by-Scene Breakdown with platform-specific info
    output += '🎬 SCENE-BY-SCENE BREAKDOWN\n';
    output += '─'.repeat(70) + '\n\n';
    generatedScenes.forEach((scene, i) => {
      const isLastScene = i === generatedScenes.length - 1;
      const { settings } = getPromptForScene(scene, isLastScene);
      const duration = isHiggsfield && settings ? settings.duration : scene.duration;

      output += `SCENE ${i + 1}: ${scene.title}\n`;
      output += `Duration: ${duration}s | Emotion: ${scene.emotion}\n`;
      output += `Characters: ${scene.characterIds.join(', ')}\n`;
      output += `Description: ${scene.description}\n`;
      output += `Dialogue (${scene.dialogueLanguage}): "${scene.dialogue}"\n`;

      if (isHiggsfield && settings) {
        output += `Camera Body: ${settings.cameraBody}\n`;
        output += `Lens: ${settings.lens} @ ${settings.focalLength}mm, ${settings.aperture}\n`;
        output += `Movements: ${settings.movements.join(' → ')}\n`;
        output += `Film Grain: ${settings.filmGrain}\n`;
        output += `Color Palette: ${settings.colorPalette}\n`;
      } else {
        output += `Camera: ${scene.suggestedCamera}\n`;
        output += `Lighting: ${scene.suggestedLighting}\n`;
      }
      output += `Audio: ${scene.suggestedAudio}\n\n`;
    });

    // Platform Prompts
    output += `\n🎥 ${platformShort.toUpperCase()} PROMPTS (Ready to Use)\n`;
    output += '─'.repeat(70) + '\n\n';
    output += generateAllVideoPrompts();

    return output;
  };

  const generateProductionGuide = () => {
    let output = '';

    output += '═'.repeat(70) + '\n';
    output += `                    ${platformShort.toUpperCase()} PRODUCTION WORKFLOW GUIDE                    \n`;
    output += '═'.repeat(70) + '\n\n';

    output += '📌 STEP 1: GENERATE CHARACTER REFERENCE IMAGES\n';
    output += '─'.repeat(70) + '\n';
    output += 'Use Imagen 3.0 or DALL-E 3 with the prompts below to create\n';
    output += 'consistent character reference images:\n\n';
    characters.forEach((char, i) => {
      const prompt = char.referenceImagePrompt ||
        generateReferenceImagePrompt(char, config?.stylePreset || 'indian-village');
      output += `${i + 1}. ${char.name}:\n${prompt}\n\n`;
    });

    output += `\n📌 STEP 2: GENERATE VIDEOS WITH ${platformShort.toUpperCase()}\n`;
    output += '─'.repeat(70) + '\n';

    if (isHiggsfield) {
      output += 'Use the prompts and settings below in Higgsfield Cinema Studio.\n';
      output += 'Configure camera body, lens, and movements as specified.\n';
      output += 'Note: Higgsfield only supports 5s and 10s clip durations.\n\n';
      generatedScenes.forEach((scene, i) => {
        const isLastScene = i === generatedScenes.length - 1;
        const { text, settings } = getPromptForScene(scene, isLastScene);
        output += `Scene ${i + 1}: ${scene.title}\n`;
        if (settings) {
          output += `[Settings]\n${formatHiggsfieldSettings(settings)}\n\n`;
        }
        output += `[Prompt]\n${text}\n\n`;
      });
    } else {
      output += 'Use the prompts below in Google AI Studio or Veo 3.1 API.\n';
      output += 'Upload character reference images for consistency.\n\n';
      generatedScenes.forEach((scene, i) => {
        const isLastScene = i === generatedScenes.length - 1;
        const { text } = getPromptForScene(scene, isLastScene);
        output += `Scene ${i + 1}: ${scene.title}\n`;
        output += `${text}\n\n`;
      });
    }

    output += '\n📌 STEP 3: POST-PRODUCTION\n';
    output += '─'.repeat(70) + '\n';
    output += '1. Import all generated clips into your editor\n';
    output += '2. Arrange in scene order\n';
    output += '3. Add transitions between scenes\n';
    output += '4. Add background music matching the mood\n';
    output += '5. Add subtitles for dialogues\n';
    const aspectNote = config?.aspectRatio === '21:9' ? '21:9 CinemaScope' :
                       config?.aspectRatio === '9:16' ? '9:16 vertical for Shorts/Reels' :
                       config?.aspectRatio || '9:16';
    output += `6. Export in ${aspectNote} format\n\n`;

    output += '📌 RECOMMENDED TOOLS:\n';
    output += '─'.repeat(70) + '\n';
    output += '• Character Images: Imagen 3.0, DALL-E 3, Midjourney\n';
    if (isHiggsfield) {
      output += '• Video Generation: Higgsfield Cinema Studio, Runway ML, Pika Labs\n';
    } else {
      output += '• Video Generation: Veo 3.1, Runway ML, Pika Labs\n';
    }
    output += '• Video Editing: CapCut, DaVinci Resolve, Premiere Pro\n';
    output += '• Music: Suno AI, ElevenLabs for voice\n';

    return output;
  };

  const handleDownload = () => {
    let content = '';
    let filename = '';

    switch (exportFormat) {
      case 'video-prompts':
        content = generateAllVideoPrompts();
        filename = isHiggsfield ? 'higgsfield-prompts' : 'veo-prompts';
        break;
      case 'reference-images':
        content = generateCharacterReferencePrompts();
        filename = 'character-reference-prompts';
        break;
      case 'full-package':
        content = generateFullPackage();
        filename = 'full-production-package';
        break;
      case 'production-guide':
        content = generateProductionGuide();
        filename = 'production-guide';
        break;
    }

    const projectName = config?.name?.toLowerCase().replace(/\s+/g, '-') || 'project';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}-${filename}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalDuration = generatedScenes.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Package className="text-amber-500" />
            Export Production Package
          </h2>
          <p className="text-zinc-400 mt-1">Download prompts and production guide</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300"
          >
            <ArrowLeft size={16} />
            Back to Story
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium text-white"
          >
            <Download size={16} />
            Download Selected
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className={`rounded-lg p-4 border ${isHiggsfield ? 'bg-purple-900/20 border-purple-700/50' : 'bg-amber-900/20 border-amber-700/50'}`}>
          <div className={`flex items-center gap-2 mb-1 ${isHiggsfield ? 'text-purple-400' : 'text-amber-400'}`}>
            <Wand2 size={16} />
            <span className="text-sm">Platform</span>
          </div>
          <p className={`text-lg font-bold ${isHiggsfield ? 'text-purple-300' : 'text-amber-300'}`}>{platformShort}</p>
          {isHiggsfield && config?.higgsfieldSettings && (
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="text-xs px-1.5 py-0.5 bg-purple-600/30 rounded text-purple-300">
                {config.higgsfieldSettings.sceneDuration}s
              </span>
              <span className="text-xs px-1.5 py-0.5 bg-purple-600/30 rounded text-purple-300">
                {config.higgsfieldSettings.resolution}
              </span>
              {config.higgsfieldSettings.upscale !== 'none' && (
                <span className="text-xs px-1.5 py-0.5 bg-purple-600/30 rounded text-purple-300">
                  {config.higgsfieldSettings.upscale.toUpperCase()}
                </span>
              )}
              {config.higgsfieldSettings.slowMotion && (
                <span className="text-xs px-1.5 py-0.5 bg-purple-600/30 rounded text-purple-300">
                  SloMo
                </span>
              )}
            </div>
          )}
        </div>
        <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
          <div className="flex items-center gap-2 text-zinc-400 mb-1">
            <Users size={16} />
            <span className="text-sm">Characters</span>
          </div>
          <p className="text-2xl font-bold text-white">{characters.length}</p>
        </div>
        <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
          <div className="flex items-center gap-2 text-zinc-400 mb-1">
            <Film size={16} />
            <span className="text-sm">Scenes</span>
          </div>
          <p className="text-2xl font-bold text-white">{generatedScenes.length}</p>
        </div>
        <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
          <div className="flex items-center gap-2 text-zinc-400 mb-1">
            <Clock size={16} />
            <span className="text-sm">Duration</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalDuration}s</p>
        </div>
        <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
          <div className="flex items-center gap-2 text-zinc-400 mb-1">
            <Sparkles size={16} />
            <span className="text-sm">Style</span>
          </div>
          <p className="text-lg font-bold text-white capitalize">{config?.stylePreset?.replace('-', ' ') || 'N/A'}</p>
        </div>
      </div>

      {/* Export Format Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-zinc-400 mb-2">Export Format for {platformName}</label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'video-prompts', label: `${platformShort} Prompts`, icon: Wand2, desc: 'Ready-to-use video prompts' },
            { id: 'reference-images', label: 'Reference Images', icon: Image, desc: 'Imagen/DALL-E prompts' },
            { id: 'full-package', label: 'Full Package', icon: Package, desc: 'Everything in one file' },
            { id: 'production-guide', label: 'Production Guide', icon: FileText, desc: 'Step-by-step workflow' }
          ].map(format => (
            <button
              key={format.id}
              onClick={() => setExportFormat(format.id as ExportFormat)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg text-sm font-medium transition-colors ${
                exportFormat === format.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
              }`}
            >
              <format.icon size={24} />
              <span>{format.label}</span>
              <span className={`text-xs ${exportFormat === format.id ? 'text-amber-100' : 'text-zinc-500'}`}>
                {format.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Export Preview */}
      <div className="space-y-4">
        {exportFormat === 'video-prompts' && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{platformShort} Prompts</h3>
              <button
                onClick={() => handleCopy(generateAllVideoPrompts(), 'all-video')}
                className="flex items-center gap-2 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-zinc-300"
              >
                {copiedItem === 'all-video' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                Copy All
              </button>
            </div>
            {generatedScenes.length === 0 ? (
              <div className="text-center py-12 bg-zinc-800/30 rounded-lg border border-zinc-700 border-dashed">
                <Film size={48} className="mx-auto mb-4 text-zinc-600" />
                <p className="text-zinc-500">No scenes generated yet</p>
                <p className="text-zinc-600 text-sm">Go back and generate your story first</p>
              </div>
            ) : (
              generatedScenes.map((scene, index) => {
                const isLastScene = index === generatedScenes.length - 1;
                const { text, settings } = getPromptForScene(scene, isLastScene);
                const duration = isHiggsfield && settings ? settings.duration : scene.duration;
                const id = `video-${index}`;
                return (
                  <div key={scene.id} className={`rounded-lg border overflow-hidden ${isHiggsfield ? 'bg-purple-900/20 border-purple-700/50' : 'bg-zinc-800/50 border-zinc-700'}`}>
                    <div className={`flex items-center justify-between px-4 py-2 ${isHiggsfield ? 'bg-purple-900/30' : 'bg-zinc-800'}`}>
                      <div>
                        <span className="font-medium text-white">Scene {index + 1}: {scene.title}</span>
                        <span className="ml-3 text-xs text-zinc-400">{duration}s • {scene.emotion}</span>
                      </div>
                      <button
                        onClick={() => {
                          const copyText = isHiggsfield && settings
                            ? `[SETTINGS]\n${formatHiggsfieldSettings(settings)}\n\n[PROMPT]\n${text}`
                            : text;
                          handleCopy(copyText, id);
                        }}
                        className="flex items-center gap-2 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-zinc-300"
                      >
                        {copiedItem === id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        Copy
                      </button>
                    </div>
                    <div className="p-4">
                      {isHiggsfield && settings && (
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
                      )}
                      <p className="text-zinc-300 text-sm leading-relaxed">{text}</p>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {exportFormat === 'reference-images' && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Character Reference Image Prompts</h3>
              <button
                onClick={() => handleCopy(generateCharacterReferencePrompts(), 'all-refs')}
                className="flex items-center gap-2 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-zinc-300"
              >
                {copiedItem === 'all-refs' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                Copy All
              </button>
            </div>
            <p className="text-sm text-zinc-400 mb-4">
              Use these prompts in Imagen 3.0, DALL-E 3, or Midjourney to generate consistent character reference images for {platformName}.
            </p>
            {characters.length === 0 ? (
              <div className="text-center py-12 bg-zinc-800/30 rounded-lg border border-zinc-700 border-dashed">
                <Users size={48} className="mx-auto mb-4 text-zinc-600" />
                <p className="text-zinc-500">No characters created yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {characters.map((char) => {
                  const prompt = char.referenceImagePrompt ||
                    generateReferenceImagePrompt(char, config?.stylePreset || 'indian-village');
                  const id = `ref-${char.id}`;
                  return (
                    <div key={char.id} className="bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                            char.role === 'hero' ? 'bg-green-600' :
                            char.role === 'villain' ? 'bg-red-600' :
                            char.role === 'love-interest' ? 'bg-pink-600' :
                            'bg-blue-600'
                          }`}>
                            {char.name.charAt(0)}
                          </div>
                          <span className="font-medium text-white">{char.name}</span>
                          <span className="text-xs text-zinc-400 capitalize">({char.role})</span>
                        </div>
                        <button
                          onClick={() => handleCopy(prompt, id)}
                          className="flex items-center gap-1 px-2 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-xs text-zinc-300"
                        >
                          {copiedItem === id ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="text-zinc-300 text-xs leading-relaxed">{prompt}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {exportFormat === 'full-package' && (
          <div className="bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800">
              <span className="font-medium text-white">Full Production Package</span>
              <button
                onClick={() => handleCopy(generateFullPackage(), 'full')}
                className="flex items-center gap-2 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-zinc-300"
              >
                {copiedItem === 'full' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                Copy All
              </button>
            </div>
            <div className="p-4 max-h-[500px] overflow-y-auto">
              <pre className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap font-mono">
                {generateFullPackage()}
              </pre>
            </div>
          </div>
        )}

        {exportFormat === 'production-guide' && (
          <div className="bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800">
              <span className="font-medium text-white">Step-by-Step Production Guide</span>
              <button
                onClick={() => handleCopy(generateProductionGuide(), 'guide')}
                className="flex items-center gap-2 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-zinc-300"
              >
                {copiedItem === 'guide' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                Copy All
              </button>
            </div>
            <div className="p-4 max-h-[500px] overflow-y-auto">
              <pre className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap font-mono">
                {generateProductionGuide()}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className={`mt-8 rounded-xl p-6 border ${isHiggsfield ? 'bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-600/20' : 'bg-gradient-to-r from-amber-900/20 to-orange-900/20 border-amber-600/20'}`}>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles className={isHiggsfield ? 'text-purple-500' : 'text-amber-500'} />
          {platformShort} Production Tips
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className={`font-medium mb-2 ${isHiggsfield ? 'text-purple-400' : 'text-amber-400'}`}>For Best Results:</h4>
            <ul className="text-zinc-400 space-y-1">
              <li>• Generate character reference images first</li>
              <li>• Use the same reference for all scenes</li>
              {isHiggsfield ? (
                <>
                  <li>• Your scenes use {config?.higgsfieldSettings?.sceneDuration || 5}s duration</li>
                  <li>• Resolution: {config?.higgsfieldSettings?.resolution || '1080p'} output</li>
                  {config?.higgsfieldSettings?.upscale !== 'none' && (
                    <li>• Upscale to {config?.higgsfieldSettings?.upscale?.toUpperCase()} enabled</li>
                  )}
                  {config?.higgsfieldSettings?.slowMotion && (
                    <li>• Slow motion enabled for dramatic effect</li>
                  )}
                  <li>• Stack up to 3 camera movements per scene</li>
                </>
              ) : (
                <>
                  <li>• Keep scenes at 4-8 seconds for consistency</li>
                  <li>• Match audio mood to scene emotion</li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h4 className={`font-medium mb-2 ${isHiggsfield ? 'text-purple-400' : 'text-amber-400'}`}>Recommended Tools:</h4>
            <ul className="text-zinc-400 space-y-1">
              {isHiggsfield ? (
                <>
                  <li>• <strong>Video:</strong> Higgsfield Cinema Studio</li>
                  <li>• <strong>Images:</strong> Imagen 3.0, DALL-E 3</li>
                  <li>• <strong>Editing:</strong> DaVinci Resolve, Premiere Pro</li>
                  <li>• <strong>Audio:</strong> Suno AI, ElevenLabs</li>
                </>
              ) : (
                <>
                  <li>• <strong>Veo 3.1:</strong> Google AI Studio</li>
                  <li>• <strong>Images:</strong> Imagen 3.0, DALL-E 3</li>
                  <li>• <strong>Editing:</strong> CapCut, DaVinci</li>
                  <li>• <strong>Audio:</strong> Suno AI, ElevenLabs</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
