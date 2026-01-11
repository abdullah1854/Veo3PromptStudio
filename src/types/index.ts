// ==========================================
// VIDEO PLATFORM TYPES
// ==========================================

export type VideoPlatform = 'veo-3.1' | 'higgsfield';

// Higgsfield Camera Bodies
export type HiggsfieldCameraBody =
  | 'arri-alexa-35'
  | 'red-v-raptor'
  | 'sony-venice'
  | 'imax-film'
  | 'arriflex-16sr'
  | 'panavision-dxl2';

// Higgsfield Lens Options
export type HiggsfieldLens =
  | 'arri-signature-prime'
  | 'cooke-s4'
  | 'zeiss-ultra-prime'
  | 'panavision-c-series'
  | 'canon-k35'
  | 'hawk-v-lite'
  | 'laowa-macro'
  | 'petzval'
  | 'soviet-vintage'
  | 'jdc-xtal-xpress'
  | 'lensbaby';

// Higgsfield Aperture Values
export type HiggsfieldAperture = 'f/1.4' | 'f/2' | 'f/2.8' | 'f/4' | 'f/5.6' | 'f/8' | 'f/11' | 'f/16';

// Higgsfield Camera Movements (70+ presets)
export type HiggsfieldCameraMovement =
  // Dolly
  | 'dolly-in' | 'dolly-out' | 'dolly-left' | 'dolly-right'
  | 'super-dolly-in' | 'super-dolly-out' | 'double-dolly'
  | 'dolly-zoom-in' | 'dolly-zoom-out'
  // Pan & Tilt
  | 'pan-left' | 'pan-right' | 'tilt-up' | 'tilt-down' | 'whip-pan'
  // Crane & Jib
  | 'crane-up' | 'jib-up' | 'jib-down'
  // Zoom
  | 'zoom-in' | 'zoom-out' | 'crash-zoom-in' | 'crash-zoom-out'
  | 'rapid-zoom-in' | 'rapid-zoom-out' | 'eating-zoom' | 'yoyo-zoom'
  // Orbit & Rotation
  | '360-orbit' | 'arc-right' | 'arc-left' | '3d-rotation' | 'lazy-susan'
  // Specialty
  | 'dutch-angle' | 'fisheye' | 'fpv-drone' | 'handheld' | 'bullet-time'
  | 'snorricam' | 'hero-cam' | 'car-grip' | 'hyperlapse' | 'low-shutter'
  | 'flying-cam' | 'focus-change' | 'head-tracking' | 'glam' | 'incline'
  | 'robo-arm' | 'road-rush' | 'wiggle' | 'static'
  // POV & Through
  | 'object-pov' | 'eyes-in' | 'mouth-in' | 'overhead'
  | 'through-object-in' | 'through-object-out'
  // Timelapse
  | 'timelapse-glam' | 'timelapse-human' | 'timelapse-landscape';

// Veo 3.1 Camera Angles
export type Veo31CameraAngle =
  | 'eye-level' | 'low-angle' | 'high-angle' | 'dutch-angle'
  | 'birds-eye' | 'worms-eye' | 'close-up' | 'extreme-close-up'
  | 'medium-shot' | 'full-shot' | 'wide-shot' | 'over-shoulder' | 'pov';

// Veo 3.1 Camera Movements
export type Veo31CameraMovement =
  | 'static' | 'pan-left' | 'pan-right' | 'tilt-up' | 'tilt-down'
  | 'dolly-in' | 'dolly-out' | 'truck-left' | 'truck-right'
  | 'pedestal-up' | 'pedestal-down' | 'zoom-in' | 'zoom-out'
  | 'crane-up' | 'crane-down' | 'aerial' | 'drone'
  | 'handheld' | 'whip-pan' | 'arc-left' | 'arc-right';

// Veo 3.1 Lens Effects
export type Veo31LensEffect =
  | 'wide-angle' | 'telephoto' | 'shallow-dof' | 'deep-focus'
  | 'lens-flare' | 'rack-focus' | 'fisheye' | 'dolly-zoom'
  | 'soft-focus' | 'macro';

// Veo 3.1 Lighting Styles
export type Veo31LightingStyle =
  | 'natural-sunlight' | 'golden-hour' | 'blue-hour' | 'moonlight' | 'overcast'
  | 'neon' | 'fluorescent' | 'fireplace-glow' | 'candlelight'
  | 'rembrandt' | 'film-noir' | 'high-key' | 'low-key'
  | 'volumetric' | 'backlit' | 'silhouette' | 'rim-light';

// ==========================================
// PLATFORM-SPECIFIC SCENE PARAMETERS
// ==========================================

export interface Veo31SceneParams {
  cameraAngle: Veo31CameraAngle;
  cameraMovement: Veo31CameraMovement;
  lensEffect: Veo31LensEffect;
  lightingStyle: Veo31LightingStyle;
  dialogue: string;
  soundEffects: string[];
  ambientSound: string;
  duration: 4 | 6 | 8;
  timestamps?: { start: string; end: string; description: string }[];
}

export interface HiggsfieldSceneParams {
  cameraBody: HiggsfieldCameraBody;
  lens: HiggsfieldLens;
  focalLength: number; // 12-135mm
  aperture: HiggsfieldAperture;
  primaryMovement: HiggsfieldCameraMovement;
  secondaryMovement?: HiggsfieldCameraMovement;
  tertiaryMovement?: HiggsfieldCameraMovement;
  cinematographerStyle?: string;
  colorPalette: string;
  filmGrain: 'none' | 'subtle' | 'heavy';
  mood: string;
  duration: 5 | 10; // Higgsfield only supports 5s and 10s
}

// ==========================================
// CHARACTER TYPES
// ==========================================

// Character types
export interface Character {
  id: string;
  name: string;
  role: 'hero' | 'villain' | 'supporting' | 'mother' | 'love-interest' | 'sidekick' | 'crowd';
  physicalDescription: string;
  clothing: string;
  voiceStyle: string;
  emotionalTraits: string[];
  catchphrases: string[];
  visualStyle: '3d-realistic' | 'hyper-realistic' | 'cinematic' | 'anime' | 'stylized';
  referenceImagePrompt?: string; // For generating consistent character images
  backstory?: string;
}

// Story structure types
export interface StoryBeat {
  id: string;
  beatType: 'hook' | 'emotional' | 'conflict' | 'resolution';
  description: string;
  dialogue: string;
  duration: number;
}

export interface Story {
  id: string;
  title: string;
  theme: string;
  setting: string;
  beats: StoryBeat[];
  language: 'hindi' | 'english' | 'hinglish';
}

// Enhanced Scene with AI-generated content
export interface GeneratedScene {
  id: string;
  sceneNumber: number;
  title: string;
  description: string;
  characterIds: string[];
  dialogue: string;
  dialogueLanguage: 'hindi' | 'english' | 'hinglish';
  emotion: string;
  visualDescription: string;
  suggestedCamera: string;
  suggestedLighting: string;
  suggestedAudio: string;
  duration: number;
  // Platform-specific parameters
  veoParams?: Veo31SceneParams;
  higgsfieldParams?: HiggsfieldSceneParams;
}

// Camera settings
export interface CameraSettings {
  shotType: 'wide' | 'medium' | 'close-up' | 'extreme-close-up' | 'pov' | 'two-shot';
  cameraMovement: 'static' | 'dolly' | 'tracking' | 'crane' | 'pan' | 'tilt' | 'handheld' | 'aerial';
  angle: 'eye-level' | 'low-angle' | 'high-angle' | 'dutch-angle' | 'birds-eye';
  lensType: 'normal' | 'wide-angle' | 'telephoto' | 'macro';
  focusStyle: 'deep-focus' | 'shallow-dof' | 'rack-focus' | 'soft-focus';
}

export interface LightingSettings {
  timeOfDay: 'dawn' | 'morning' | 'noon' | 'golden-hour' | 'dusk' | 'night' | 'blue-hour';
  lightQuality: 'soft' | 'hard' | 'diffused' | 'dramatic' | 'natural';
  lightSource: 'natural' | 'practical' | 'rim' | 'backlit' | 'silhouette';
  mood: 'warm' | 'cool' | 'neutral' | 'moody' | 'vibrant';
}

export interface AudioSettings {
  dialogue: string;
  dialogueEmotion: 'angry' | 'sad' | 'determined' | 'fearful' | 'joyful' | 'menacing' | 'soft' | 'roaring';
  sfx: string[];
  ambientSound: string;
  musicMood: 'epic' | 'emotional' | 'tense' | 'triumphant' | 'melancholic' | 'none';
}

export interface Scene {
  id: string;
  sceneNumber: number;
  title?: string;
  characterIds: string[];
  action: string;
  camera: CameraSettings;
  lighting: LightingSettings;
  audio: AudioSettings;
  setting: string;
  duration: number;
  negativePrompts: string[];
  timestamp?: { start: number; end: number };
  generatedFromAI?: boolean;
}

// Higgsfield-specific settings
export type HiggsfieldResolution = '480p' | '1080p';
export type HiggsfieldUpscale = 'none' | '2k' | '4k' | '8k';
export type HiggsfieldSceneDuration = 5 | 10;

export interface HiggsfieldSettings {
  sceneDuration: HiggsfieldSceneDuration; // 5s or 10s per scene
  resolution: HiggsfieldResolution; // 480p for testing, 1080p for final
  upscale: HiggsfieldUpscale; // Upscale option
  slowMotion: boolean; // Slow motion toggle
  keyframeInterpolation: boolean; // Use start/end keyframes
}

// Project Configuration
export interface ProjectConfig {
  id: string;
  name: string;
  genre: Genre;
  theme: string;
  customTheme?: string;
  numberOfScenes: number;
  aspectRatio: '9:16' | '16:9' | '1:1' | '21:9';
  stylePreset: StylePreset;
  language: 'hindi' | 'english' | 'hinglish';
  targetDuration: number; // total seconds
  // Video Platform Selection
  videoPlatform: VideoPlatform;
  // Higgsfield-specific settings (only used when videoPlatform === 'higgsfield')
  higgsfieldSettings?: HiggsfieldSettings;
}

export type Genre =
  | 'romantic-drama'
  | 'action-thriller'
  | 'comedy'
  | 'horror'
  | 'family-drama'
  | 'revenge-saga'
  | 'mystery'
  | 'inspirational'
  | 'village-drama'
  | 'supernatural';

export type StylePreset =
  | 'bollywood-drama'
  | 'hollywood-action'
  | 'indian-village'
  | 'film-noir'
  | 'colorful-vibrant'
  | 'dark-moody'
  | 'realistic-documentary'
  | 'anime-style';

// Project types
export interface Project {
  id: string;
  name: string;
  config: ProjectConfig;
  characters: Character[];
  story: Story;
  generatedScenes: GeneratedScene[];
  scenes: Scene[];
  createdAt: Date;
  updatedAt: Date;
}

// Prompt output types
export interface GeneratedPrompt {
  sceneId: string;
  prompt: string;
  timestamp?: string;
  characterReferences?: string[];
}

// Preset types
export interface CharacterPreset {
  id: string;
  name: string;
  description: string;
  character: Omit<Character, 'id'>;
}

export interface ScenePreset {
  id: string;
  name: string;
  description: string;
  category: 'emotional' | 'action' | 'victory' | 'confrontation' | 'dialogue';
  template: Partial<Scene>;
}

// API Settings
export interface APISettings {
  openaiApiKey: string;
  model: 'gpt-4o-mini' | 'gpt-4o' | 'gpt-4-turbo';
}

// AI Generation types
export interface CharacterGenerationRequest {
  genre: Genre;
  numberOfCharacters: number;
  includeRoles: Character['role'][];
  stylePreset: StylePreset;
  language: 'hindi' | 'english' | 'hinglish';
}

export interface StoryGenerationRequest {
  genre: Genre;
  theme: string;
  characters: Character[];
  numberOfScenes: number;
  language: 'hindi' | 'english' | 'hinglish';
  stylePreset: StylePreset;
  includeFilmyDialogues: boolean;
}

export interface StoryGenerationResponse {
  title: string;
  synopsis: string;
  scenes: GeneratedScene[];
}
