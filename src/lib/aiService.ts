import {
  Character,
  Genre,
  StylePreset,
  GeneratedScene,
  StoryGenerationResponse,
  VideoPlatform,
  HiggsfieldCameraBody,
  HiggsfieldLens,
  HiggsfieldAperture,
  HiggsfieldCameraMovement,
  HiggsfieldSettings,
  Veo31CameraAngle,
  Veo31CameraMovement,
  Veo31LensEffect,
  Veo31LightingStyle
} from '@/types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// ==========================================
// HIGGSFIELD CINEMA STUDIO DATA
// ==========================================

export const higgsfieldCameraBodies: Record<HiggsfieldCameraBody, { name: string; description: string; bestFor: string }> = {
  'arri-alexa-35': {
    name: 'ARRI Alexa 35',
    description: 'Industry-standard digital cinema camera with organic skin tones',
    bestFor: 'Drama, dialogue scenes, cinematic look'
  },
  'red-v-raptor': {
    name: 'RED V-Raptor',
    description: '8K sensor, high dynamic range, sharp detail',
    bestFor: 'Action, high detail, modern look'
  },
  'sony-venice': {
    name: 'Sony Venice',
    description: 'Full-frame sensor, excellent low-light, cinematic color science',
    bestFor: 'Night scenes, moody atmosphere, low-light'
  },
  'imax-film': {
    name: 'IMAX Film Camera',
    description: 'Maximum resolution, epic scale footage',
    bestFor: 'Epic wide shots, landscapes, grand scale'
  },
  'arriflex-16sr': {
    name: 'Arriflex 16SR',
    description: '16mm film aesthetic, vintage documentary look',
    bestFor: 'Vintage, documentary, nostalgic feel'
  },
  'panavision-dxl2': {
    name: 'Panavision Millennium DXL2',
    description: 'Large format, Hollywood blockbuster look',
    bestFor: 'Blockbuster cinematography, premium look'
  }
};

export const higgsfieldLenses: Record<HiggsfieldLens, { name: string; description: string; bestFor: string; character: string }> = {
  'arri-signature-prime': {
    name: 'ARRI Signature Prime',
    description: 'Clean, modern, subtle character',
    bestFor: 'Modern drama, clean visuals',
    character: 'Neutral, sharp, minimal distortion'
  },
  'cooke-s4': {
    name: 'Cooke S4',
    description: 'Warm, organic, famous "Cooke Look" bokeh',
    bestFor: 'Emotional scenes, portraits, skin tones',
    character: 'Warm, creamy bokeh, organic'
  },
  'zeiss-ultra-prime': {
    name: 'Zeiss Ultra Prime',
    description: 'Sharp, clinical, high contrast',
    bestFor: 'Technical precision, modern thrillers',
    character: 'Sharp, high contrast, clinical'
  },
  'panavision-c-series': {
    name: 'Panavision C-Series',
    description: 'Classic anamorphic flares',
    bestFor: 'Epic cinema, horizontal flares, wide aspect',
    character: 'Anamorphic bokeh, blue flares'
  },
  'canon-k35': {
    name: 'Canon K-35',
    description: 'Vintage 70s film look, soft roll-off',
    bestFor: 'Period pieces, vintage aesthetic',
    character: 'Soft, vintage, warm roll-off'
  },
  'hawk-v-lite': {
    name: 'Hawk V-Lite',
    description: 'Anamorphic, dramatic flares',
    bestFor: 'Cinematic widescreen, dramatic shots',
    character: 'Strong flares, oval bokeh'
  },
  'laowa-macro': {
    name: 'Laowa Macro',
    description: 'Extreme close-up capability',
    bestFor: 'Product shots, detail shots, macro',
    character: 'Extreme sharpness, close focus'
  },
  'petzval': {
    name: 'Petzval',
    description: 'Swirly bokeh, artistic portrait look',
    bestFor: 'Artistic portraits, dreamy aesthetic',
    character: 'Swirly bokeh, center sharp, edge soft'
  },
  'soviet-vintage': {
    name: 'Soviet Vintage (Helios)',
    description: 'Unique character, nostalgic imperfections',
    bestFor: 'Indie films, character, imperfection',
    character: 'Swirly bokeh, flares, character'
  },
  'jdc-xtal-xpress': {
    name: 'JDC Xtal Xpress',
    description: 'Premium anamorphic, crystal clear',
    bestFor: 'High-end cinema, clean anamorphic',
    character: 'Clean anamorphic, minimal distortion'
  },
  'lensbaby': {
    name: 'Lensbaby',
    description: 'Creative blur, selective focus',
    bestFor: 'Creative shots, dream sequences',
    character: 'Selective focus, creative blur'
  }
};

export const higgsfieldApertures: Record<HiggsfieldAperture, { description: string; dofEffect: string; bestFor: string }> = {
  'f/1.4': { description: 'Wide open - maximum light', dofEffect: 'Extremely shallow DOF, creamy bokeh', bestFor: 'Low light, portraits, isolation' },
  'f/2': { description: 'Very wide - excellent bokeh', dofEffect: 'Very shallow DOF, soft background', bestFor: 'Portraits, emotional close-ups' },
  'f/2.8': { description: 'Wide - classic portrait aperture', dofEffect: 'Shallow DOF, subject isolation', bestFor: 'Portraits, product, interviews' },
  'f/4': { description: 'Moderate - balanced', dofEffect: 'Moderate DOF, some background detail', bestFor: 'Two-shots, medium scenes' },
  'f/5.6': { description: 'Standard - good sharpness', dofEffect: 'Moderate-deep DOF', bestFor: 'Group shots, general scenes' },
  'f/8': { description: 'Sharp - landscape standard', dofEffect: 'Deep DOF, most in focus', bestFor: 'Landscapes, establishing shots' },
  'f/11': { description: 'Very sharp - maximum detail', dofEffect: 'Very deep DOF', bestFor: 'Architecture, wide scenes' },
  'f/16': { description: 'Maximum depth', dofEffect: 'Everything in focus', bestFor: 'Epic landscapes, deep scenes' }
};

export const higgsfieldMovements: Record<HiggsfieldCameraMovement, { name: string; description: string; emotional: string }> = {
  // Dolly
  'dolly-in': { name: 'Dolly In', description: 'Camera moves toward subject', emotional: 'Increasing intimacy, tension' },
  'dolly-out': { name: 'Dolly Out', description: 'Camera moves away from subject', emotional: 'Revealing context, isolation' },
  'dolly-left': { name: 'Dolly Left', description: 'Camera moves left', emotional: 'Following action, dynamic' },
  'dolly-right': { name: 'Dolly Right', description: 'Camera moves right', emotional: 'Following action, dynamic' },
  'super-dolly-in': { name: 'Super Dolly In', description: 'Fast dramatic push toward subject', emotional: 'High impact, revelation' },
  'super-dolly-out': { name: 'Super Dolly Out', description: 'Fast dramatic pull away', emotional: 'Shocking reveal, scale' },
  'double-dolly': { name: 'Double Dolly', description: 'Combined dolly movements', emotional: 'Complex choreography' },
  'dolly-zoom-in': { name: 'Dolly Zoom In (Vertigo)', description: 'Dolly out while zooming in', emotional: 'Disorientation, realization' },
  'dolly-zoom-out': { name: 'Dolly Zoom Out', description: 'Dolly in while zooming out', emotional: 'Surreal, unsettling' },
  // Pan & Tilt
  'pan-left': { name: 'Pan Left', description: 'Camera rotates left', emotional: 'Following gaze, reveal' },
  'pan-right': { name: 'Pan Right', description: 'Camera rotates right', emotional: 'Following gaze, reveal' },
  'tilt-up': { name: 'Tilt Up', description: 'Camera tilts upward', emotional: 'Awe, power, scale' },
  'tilt-down': { name: 'Tilt Down', description: 'Camera tilts downward', emotional: 'Submission, discovery' },
  'whip-pan': { name: 'Whip Pan', description: 'Very fast pan creating motion blur', emotional: 'Sudden shift, energy' },
  // Crane & Jib
  'crane-up': { name: 'Crane Up', description: 'Camera rises vertically', emotional: 'Liberation, triumph, scale' },
  'jib-up': { name: 'Jib Up', description: 'Smooth vertical rise', emotional: 'Elevation, grandeur' },
  'jib-down': { name: 'Jib Down', description: 'Smooth descent', emotional: 'Grounding, approach' },
  // Zoom
  'zoom-in': { name: 'Zoom In', description: 'Optical zoom toward subject', emotional: 'Focus, emphasis' },
  'zoom-out': { name: 'Zoom Out', description: 'Optical zoom away', emotional: 'Context, reveal' },
  'crash-zoom-in': { name: 'Crash Zoom In', description: 'Extremely fast zoom in', emotional: 'Shock, impact, dramatic' },
  'crash-zoom-out': { name: 'Crash Zoom Out', description: 'Extremely fast zoom out', emotional: 'Sudden reveal, panic' },
  'rapid-zoom-in': { name: 'Rapid Zoom In', description: 'Quick zoom toward subject', emotional: 'Attention, urgency' },
  'rapid-zoom-out': { name: 'Rapid Zoom Out', description: 'Quick zoom away', emotional: 'Quick reveal' },
  'eating-zoom': { name: 'Eating Zoom', description: 'Aggressive consuming zoom', emotional: 'Intensity, consumption' },
  'yoyo-zoom': { name: 'YoYo Zoom', description: 'Zoom in and out repeatedly', emotional: 'Playful, surreal' },
  // Orbit & Rotation
  '360-orbit': { name: '360 Orbit', description: 'Full circle around subject', emotional: 'Power, centerpiece, hero moment' },
  'arc-right': { name: 'Arc Right', description: 'Curved movement to right', emotional: 'Dynamic reveal, elegance' },
  'arc-left': { name: 'Arc Left', description: 'Curved movement to left', emotional: 'Dynamic reveal, elegance' },
  '3d-rotation': { name: '3D Rotation', description: 'Complex 3D camera rotation', emotional: 'Disorientation, spectacle' },
  'lazy-susan': { name: 'Lazy Susan', description: 'Slow rotation around subject', emotional: 'Examination, 360 view' },
  // Specialty
  'dutch-angle': { name: 'Dutch Angle', description: 'Tilted horizon', emotional: 'Unease, tension, instability' },
  'fisheye': { name: 'Fisheye', description: 'Ultra-wide distorted view', emotional: 'Surreal, exaggerated' },
  'fpv-drone': { name: 'FPV Drone', description: 'First-person drone flight', emotional: 'Immersive, dynamic, action' },
  'handheld': { name: 'Handheld', description: 'Natural shake and movement', emotional: 'Documentary, urgency, realism' },
  'bullet-time': { name: 'Bullet Time', description: 'Frozen moment with rotating camera', emotional: 'Epic, iconic, frozen action' },
  'snorricam': { name: 'Snorricam', description: 'Camera mounted on actor', emotional: 'Disorientation, subjective' },
  'hero-cam': { name: 'Hero Cam', description: 'Low angle empowering shot', emotional: 'Power, dominance, heroic' },
  'car-grip': { name: 'Car Grip', description: 'Car-mounted perspective', emotional: 'Speed, chase, driving' },
  'hyperlapse': { name: 'Hyperlapse', description: 'Moving timelapse', emotional: 'Time passage, journey' },
  'low-shutter': { name: 'Low Shutter', description: 'Motion blur effect', emotional: 'Dreamy, chaotic, disorienting' },
  'flying-cam': { name: 'Flying Cam', description: 'Floating camera movement', emotional: 'Ethereal, supernatural' },
  'focus-change': { name: 'Focus Change', description: 'Rack focus between subjects', emotional: 'Shift attention, connection' },
  'head-tracking': { name: 'Head Tracking', description: 'Following head movement', emotional: 'Intimate, following gaze' },
  'glam': { name: 'Glam', description: 'Beauty/glamour shot movement', emotional: 'Elegance, beauty, allure' },
  'incline': { name: 'Incline', description: 'Angled upward movement', emotional: 'Rising, aspiration' },
  'robo-arm': { name: 'Robo Arm', description: 'Mechanical precision movement', emotional: 'Technical, precise' },
  'road-rush': { name: 'Road Rush', description: 'Fast forward movement', emotional: 'Speed, urgency, chase' },
  'wiggle': { name: 'Wiggle', description: 'Subtle shake/vibration', emotional: 'Tension, anticipation' },
  'static': { name: 'Static', description: 'No movement, locked shot', emotional: 'Stability, observation, tension' },
  // POV & Through
  'object-pov': { name: 'Object POV', description: 'View from object perspective', emotional: 'Unique perspective, voyeuristic' },
  'eyes-in': { name: 'Eyes In', description: 'Camera moves into eyes', emotional: 'Surreal, psychological, entering mind' },
  'mouth-in': { name: 'Mouth In', description: 'Camera moves into mouth', emotional: 'Surreal, consuming' },
  'overhead': { name: 'Overhead', description: 'Bird\' eye view straight down', emotional: 'God view, vulnerability' },
  'through-object-in': { name: 'Through Object In', description: 'Moving through obstacle', emotional: 'Immersive, breaking barrier' },
  'through-object-out': { name: 'Through Object Out', description: 'Emerging from object', emotional: 'Reveal, birth, emergence' },
  // Timelapse
  'timelapse-glam': { name: 'Timelapse Glam', description: 'Glamour timelapse', emotional: 'Transformation, beauty' },
  'timelapse-human': { name: 'Timelapse Human', description: 'Human activity timelapse', emotional: 'Passage of time, routine' },
  'timelapse-landscape': { name: 'Timelapse Landscape', description: 'Nature/environment timelapse', emotional: 'Grand scale, time passage' }
};

// Focal length recommendations based on scene type
export const focalLengthGuide: Record<string, { range: string; mm: number; description: string }> = {
  'epic-landscape': { range: '12-24mm', mm: 18, description: 'Epic landscapes, dynamic action, establishing shots' },
  'environmental-portrait': { range: '24-35mm', mm: 28, description: 'Environmental portraits, room context' },
  'balanced': { range: '35-50mm', mm: 50, description: 'Natural human perspective, interviews, dialogue' },
  'portrait': { range: '50-85mm', mm: 75, description: 'Portrait compression, intimate moments' },
  'close-up': { range: '85-135mm', mm: 100, description: 'Close-ups, detail shots, dramatic compression' }
};

// ==========================================
// VEO 3.1 DATA
// ==========================================

export const veo31CameraAngles: Record<Veo31CameraAngle, { name: string; description: string; emotional: string }> = {
  'eye-level': { name: 'Eye Level', description: 'Camera at subject eye height', emotional: 'Neutral, relatable' },
  'low-angle': { name: 'Low Angle', description: 'Camera below subject looking up', emotional: 'Power, dominance, heroic' },
  'high-angle': { name: 'High Angle', description: 'Camera above subject looking down', emotional: 'Vulnerability, weakness, overview' },
  'dutch-angle': { name: 'Dutch Angle', description: 'Tilted horizon line', emotional: 'Unease, tension, disorientation' },
  'birds-eye': { name: 'Bird\'s Eye View', description: 'Directly overhead', emotional: 'Omniscience, insignificance' },
  'worms-eye': { name: 'Worm\'s Eye View', description: 'From ground looking up', emotional: 'Extreme power, towering' },
  'close-up': { name: 'Close-Up', description: 'Tight framing on face', emotional: 'Intimacy, emotion, detail' },
  'extreme-close-up': { name: 'Extreme Close-Up', description: 'Very tight on feature', emotional: 'Intensity, focus, revelation' },
  'medium-shot': { name: 'Medium Shot', description: 'Waist up framing', emotional: 'Conversational, balanced' },
  'full-shot': { name: 'Full Shot', description: 'Full body visible', emotional: 'Character in environment' },
  'wide-shot': { name: 'Wide Shot', description: 'Environment prominent', emotional: 'Context, scale, isolation' },
  'over-shoulder': { name: 'Over the Shoulder', description: 'From behind one character', emotional: 'Conversation, connection' },
  'pov': { name: 'POV', description: 'Character\'s viewpoint', emotional: 'Immersion, subjective experience' }
};

export const veo31CameraMovements: Record<Veo31CameraMovement, { name: string; description: string }> = {
  'static': { name: 'Static', description: 'Locked, no movement' },
  'pan-left': { name: 'Pan Left', description: 'Rotate camera left' },
  'pan-right': { name: 'Pan Right', description: 'Rotate camera right' },
  'tilt-up': { name: 'Tilt Up', description: 'Rotate camera up' },
  'tilt-down': { name: 'Tilt Down', description: 'Rotate camera down' },
  'dolly-in': { name: 'Dolly In', description: 'Move camera toward subject' },
  'dolly-out': { name: 'Dolly Out', description: 'Move camera away from subject' },
  'truck-left': { name: 'Truck Left', description: 'Move camera left' },
  'truck-right': { name: 'Truck Right', description: 'Move camera right' },
  'pedestal-up': { name: 'Pedestal Up', description: 'Move camera up vertically' },
  'pedestal-down': { name: 'Pedestal Down', description: 'Move camera down vertically' },
  'zoom-in': { name: 'Zoom In', description: 'Optical zoom toward subject' },
  'zoom-out': { name: 'Zoom Out', description: 'Optical zoom away' },
  'crane-up': { name: 'Crane Up', description: 'Rise on crane' },
  'crane-down': { name: 'Crane Down', description: 'Descend on crane' },
  'aerial': { name: 'Aerial', description: 'High overhead movement' },
  'drone': { name: 'Drone', description: 'Drone-style flight' },
  'handheld': { name: 'Handheld', description: 'Natural shake' },
  'whip-pan': { name: 'Whip Pan', description: 'Very fast pan' },
  'arc-left': { name: 'Arc Left', description: 'Curved movement left' },
  'arc-right': { name: 'Arc Right', description: 'Curved movement right' }
};

export const veo31LensEffects: Record<Veo31LensEffect, { name: string; description: string }> = {
  'wide-angle': { name: 'Wide Angle', description: 'Expanded field of view' },
  'telephoto': { name: 'Telephoto', description: 'Compressed perspective' },
  'shallow-dof': { name: 'Shallow DOF', description: 'Blurred background' },
  'deep-focus': { name: 'Deep Focus', description: 'Everything sharp' },
  'lens-flare': { name: 'Lens Flare', description: 'Light artifacts' },
  'rack-focus': { name: 'Rack Focus', description: 'Focus shift between subjects' },
  'fisheye': { name: 'Fisheye', description: 'Ultra-wide distorted' },
  'dolly-zoom': { name: 'Dolly Zoom', description: 'Vertigo effect' },
  'soft-focus': { name: 'Soft Focus', description: 'Dreamy softness' },
  'macro': { name: 'Macro', description: 'Extreme close-up detail' }
};

export const veo31LightingStyles: Record<Veo31LightingStyle, { name: string; description: string; mood: string }> = {
  'natural-sunlight': { name: 'Natural Sunlight', description: 'Direct sun illumination', mood: 'Bright, optimistic, clear' },
  'golden-hour': { name: 'Golden Hour', description: 'Warm sunset/sunrise light', mood: 'Romantic, nostalgic, warm' },
  'blue-hour': { name: 'Blue Hour', description: 'Cool twilight tones', mood: 'Melancholic, mysterious, calm' },
  'moonlight': { name: 'Moonlight', description: 'Cool night illumination', mood: 'Mysterious, romantic, quiet' },
  'overcast': { name: 'Overcast', description: 'Soft diffused daylight', mood: 'Neutral, natural, even' },
  'neon': { name: 'Neon', description: 'Colored artificial lights', mood: 'Urban, energetic, vibrant' },
  'fluorescent': { name: 'Fluorescent', description: 'Harsh institutional lighting', mood: 'Sterile, uncomfortable, clinical' },
  'fireplace-glow': { name: 'Fireplace Glow', description: 'Warm flickering orange', mood: 'Intimate, cozy, warm' },
  'candlelight': { name: 'Candlelight', description: 'Soft flickering warm light', mood: 'Romantic, intimate, historical' },
  'rembrandt': { name: 'Rembrandt', description: 'Classic portrait lighting', mood: 'Dramatic, artistic, classic' },
  'film-noir': { name: 'Film Noir', description: 'High contrast shadows', mood: 'Mysterious, dramatic, dark' },
  'high-key': { name: 'High Key', description: 'Bright, minimal shadows', mood: 'Happy, clean, positive' },
  'low-key': { name: 'Low Key', description: 'Dark, dramatic shadows', mood: 'Dramatic, mysterious, intense' },
  'volumetric': { name: 'Volumetric', description: 'Visible light rays', mood: 'Atmospheric, ethereal, dramatic' },
  'backlit': { name: 'Backlit', description: 'Light from behind subject', mood: 'Halo effect, ethereal, separation' },
  'silhouette': { name: 'Silhouette', description: 'Subject as dark shape', mood: 'Mysterious, iconic, dramatic' },
  'rim-light': { name: 'Rim Light', description: 'Edge lighting on subject', mood: 'Separation, dramatic, defined' }
};

interface AIServiceConfig {
  apiKey: string;
  model: string;
}

// Get stored API settings
export function getAPISettings(): AIServiceConfig | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('veo-api-settings');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// Save API settings
export function saveAPISettings(settings: AIServiceConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('veo-api-settings', JSON.stringify(settings));
}

// Generic OpenAI API call
async function callOpenAI(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 8000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Genre descriptions for better AI understanding
const genreDescriptions: Record<Genre, string> = {
  'romantic-drama': 'Emotional love story with dramatic twists, heart-wrenching moments, and passionate dialogues',
  'action-thriller': 'High-octane action sequences, suspense, chase scenes, and intense confrontations',
  'comedy': 'Humorous situations, witty dialogues, slapstick moments, and light-hearted fun',
  'horror': 'Scary atmosphere, supernatural elements, tension-building, and terrifying revelations',
  'family-drama': 'Emotional family bonds, generational conflicts, sacrifice, and reconciliation',
  'revenge-saga': 'Justice-seeking protagonist, wronged hero, powerful villains, and ultimate retribution',
  'mystery': 'Suspenseful investigation, hidden secrets, plot twists, and surprising revelations',
  'inspirational': 'Underdog story, overcoming obstacles, motivational journey, and triumphant victory',
  'village-drama': 'Rural Indian setting, traditional values, community dynamics, and cultural richness',
  'supernatural': 'Magical elements, otherworldly powers, mystical beings, and fantastical events'
};

// Detailed style preset descriptions for Veo prompts
const styleDescriptions: Record<StylePreset, string> = {
  'bollywood-drama': 'Bollywood cinematic style with vibrant saturated colors, dramatic expressions, emotional music swells, filmy dialogues with dramatic pauses, high contrast lighting, glamorous cinematography',
  'hollywood-action': 'Hollywood blockbuster style with slick cinematography, fast cuts, explosive visuals, intense close-ups, high production value, cinematic color grading',
  'indian-village': 'Authentic Indian rural aesthetic with earthy brown and green tones, natural golden sunlight, rustic mud houses, traditional clothing, dusty village paths, wheat fields, authentic village atmosphere',
  'film-noir': 'Classic film noir style with high contrast black and white, dramatic shadows, moody low-key lighting, mysterious atmosphere, dramatic silhouettes, venetian blind shadows',
  'colorful-vibrant': 'Hyper-saturated vibrant colors, bright pop lighting, energetic visuals, lively festive atmosphere, high color contrast',
  'dark-moody': 'Desaturated muted colors, low-key dramatic lighting, somber atmosphere, emotional depth, shadow-heavy cinematography',
  'realistic-documentary': 'Photorealistic documentary style with natural available lighting, handheld camera feel, authentic locations, grounded realistic visuals',
  'anime-style': 'Stylized anime-inspired visuals with expressive exaggerated emotions, dynamic dramatic angles, vibrant bold aesthetics, speed lines, dramatic lighting effects'
};

// Generate characters using AI
export async function generateCharacters(
  apiKey: string,
  model: string,
  genre: Genre,
  numberOfCharacters: number,
  stylePreset: StylePreset,
  language: 'hindi' | 'english' | 'hinglish',
  videoPlatform: VideoPlatform = 'veo-3.1',
  theme?: string
): Promise<Character[]> {
  // Platform-specific character design focus
  const platformFocus = videoPlatform === 'higgsfield'
    ? `
PLATFORM: Higgsfield Cinema Studio (PHOTOREALISTIC FOCUS)
Character designs MUST be:
- PHOTOREALISTIC and visually striking - designed for real cinema camera simulation
- Modern, globally appealing - suitable for international audiences
- Action-ready with dynamic physical presence - strong, athletic, capable
- Focus on REALISTIC clothing, modern fashion, tactical gear, or sci-fi aesthetics
- NO traditional/ethnic clothing unless specifically requested - favor modern/futuristic looks
- Characters should look like they belong in Hollywood action movies, sci-fi thrillers, or high-end drama
- Strong visual contrast and memorable silhouettes
- Physical descriptions must be EXTREMELY detailed for photorealistic AI generation`
    : `
PLATFORM: Google Veo 3.1 (DIALOGUE & EMOTION FOCUS)
Character designs should be:
- Emotionally expressive and relatable
- Suited for dialogue-heavy scenes
- Can include traditional/cultural clothing as appropriate
- Focus on facial expressiveness and body language`;

  // Theme context for character creation
  const themeContext = theme
    ? `\nSTORY THEME: "${theme}"\nCreate characters that fit this specific story theme. Their backgrounds, motivations, and designs should align with this theme.`
    : '';

  const systemPrompt = `You are a master storyteller and character designer specializing in ${genreDescriptions[genre]}.
Your task is to create compelling, memorable characters for a viral video series.

Visual Style: ${styleDescriptions[stylePreset]}
Language for dialogues: ${language === 'hindi' ? 'Hindi (Devanagari acceptable)' : language === 'hinglish' ? 'Hinglish (Hindi-English mix)' : 'English'}
${platformFocus}${themeContext}

IMPORTANT: Return ONLY valid JSON array, no markdown, no explanations.`;

  // Platform-specific character style guidance
  const characterStyleGuidance = videoPlatform === 'higgsfield'
    ? `
CRITICAL HIGGSFIELD REQUIREMENTS:
- Create characters suitable for PHOTOREALISTIC video generation
- Names should be modern/international (unless genre requires otherwise)
- Clothing should be modern, tactical, or sci-fi - NOT traditional ethnic wear
- Focus on action-hero physiques, striking appearances, cinematic presence
- Think Hollywood blockbuster casting - visually memorable and camera-ready`
    : '';

  // Include theme in user prompt
  const themeInstruction = theme
    ? `\nSTORY THEME: "${theme}"\nDesign characters specifically for this story. Their names, appearances, clothing, and personalities should fit this theme perfectly.`
    : '';

  const userPrompt = `Create ${numberOfCharacters} unique characters for a ${genre.replace('-', ' ')} story.
${characterStyleGuidance}${themeInstruction}

For each character, provide EXTREMELY DETAILED descriptions:
- name: A memorable name fitting the genre${videoPlatform === 'higgsfield' ? ' (modern/international names preferred)' : ''}
- role: One of "hero", "villain", "supporting", "mother", "love-interest", "sidekick"
- physicalDescription: VERY DETAILED physical appearance including:
  * Exact age (e.g., "35-year-old")
  * Skin tone and complexion
  * Face shape, facial features (eyes, nose, lips, jawline)
  * Hair style, color, length
  * Body build (muscular, slim, stocky, etc.)
  * Height (tall, medium, short)
  * Any distinctive features (scars, tattoos, moles, wrinkles)
  * Facial hair for men (beard, mustache style)
- clothing: Extremely specific outfit description including:
  * Exact garment types (kurta, dhoti, saree, shirt, etc.)
  * Colors and patterns
  * Fabric types (cotton, silk, etc.)
  * Accessories (jewelry, watch, turban, dupatta)
  * Footwear
- voiceStyle: How they speak (tone, accent, mannerisms, speech patterns)
- emotionalTraits: Array of 3-4 personality traits
- catchphrases: Array of 2-3 DRAMATIC signature dialogues in ${language} (filmy one-liners)
- visualStyle: "hyper-realistic"
- referenceImagePrompt: A VERY DETAILED prompt (100+ words) to generate a consistent reference image of this character for AI image generation including all physical details, clothing, pose, expression, and background
- backstory: 2-3 sentences about their background

Return as JSON array: [{ name, role, physicalDescription, clothing, voiceStyle, emotionalTraits, catchphrases, visualStyle, referenceImagePrompt, backstory }]`;

  const response = await callOpenAI(apiKey, model, systemPrompt, userPrompt);

  // Parse JSON from response
  const jsonMatch = response.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('Failed to parse character data from AI response');
  }

  const rawCharacters = JSON.parse(jsonMatch[0]) as Omit<Character, 'id'>[];

  // Normalize character data - ensure string fields are actually strings
  // Sometimes AI returns objects instead of strings for description fields
  const normalizeToString = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') {
      // If it's an object, convert to readable string
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${val}`)
        .join(', ');
    }
    return String(value);
  };

  // Add IDs and normalize all string fields
  return rawCharacters.map((char, index) => ({
    ...char,
    id: `ai-char-${Date.now()}-${index}`,
    name: normalizeToString(char.name),
    physicalDescription: normalizeToString(char.physicalDescription),
    clothing: normalizeToString(char.clothing),
    voiceStyle: normalizeToString(char.voiceStyle),
    backstory: normalizeToString(char.backstory),
    referenceImagePrompt: normalizeToString(char.referenceImagePrompt),
    // Ensure arrays are actually arrays of strings
    emotionalTraits: Array.isArray(char.emotionalTraits)
      ? char.emotionalTraits.map(t => normalizeToString(t))
      : [normalizeToString(char.emotionalTraits)],
    catchphrases: Array.isArray(char.catchphrases)
      ? char.catchphrases.map(c => normalizeToString(c))
      : [normalizeToString(char.catchphrases)]
  }));
}

// Generate complete story with scenes
export async function generateStory(
  apiKey: string,
  model: string,
  genre: Genre,
  theme: string,
  characters: Character[],
  numberOfScenes: number,
  language: 'hindi' | 'english' | 'hinglish',
  stylePreset: StylePreset,
  videoPlatform: VideoPlatform = 'veo-3.1',
  higgsfieldSettings?: HiggsfieldSettings
): Promise<StoryGenerationResponse> {
  const characterDescriptions = characters.map(c =>
    `${c.name} (${c.role}): ${c.physicalDescription}. Clothing: ${c.clothing}. Traits: ${c.emotionalTraits.join(', ')}`
  ).join('\n');

  // Platform-specific camera/lens data for AI reference
  const higgsfieldCameraList = Object.keys(higgsfieldCameraBodies).join(', ');
  const higgsfieldLensList = Object.keys(higgsfieldLenses).join(', ');
  const higgsfieldMovementList = 'dolly-in, dolly-out, super-dolly-in, super-dolly-out, pan-left, pan-right, tilt-up, tilt-down, whip-pan, crane-up, jib-up, jib-down, zoom-in, zoom-out, crash-zoom-in, crash-zoom-out, 360-orbit, arc-right, arc-left, dutch-angle, fisheye, fpv-drone, handheld, bullet-time, snorricam, hero-cam, car-grip, hyperlapse, static, overhead, focus-change';
  const higgsfieldApertureList = 'f/1.4, f/2, f/2.8, f/4, f/5.6, f/8, f/11, f/16';

  const veo31AnglesList = Object.keys(veo31CameraAngles).join(', ');
  const veo31MovementsList = Object.keys(veo31CameraMovements).join(', ');
  const veo31LensEffectsList = Object.keys(veo31LensEffects).join(', ');
  const veo31LightingList = Object.keys(veo31LightingStyles).join(', ');

  const platformInstructions = videoPlatform === 'higgsfield'
    ? `
VIDEO PLATFORM: Higgsfield Cinema Studio (PHOTOREALISTIC & ACTION-FOCUSED)
You are generating parameters for Higgsfield Cinema Studio which has REAL cinema camera equipment simulation.

HIGGSFIELD CONTENT FOCUS:
- PHOTOREALISTIC visuals - think Hollywood blockbuster quality
- ACTION-PACKED sequences with dynamic camera work (bullet time, FPV drone, crash zooms)
- SCI-FI/THRILLER aesthetics - modern, sleek, visually striking
- REALISTIC environments - urban, industrial, futuristic, natural landscapes
- HIGH-ENERGY scenes with dramatic camera movements
- NO dialogue generation (Higgsfield is visual-only) - focus on VISUAL STORYTELLING
- English prompts ONLY - avoid non-English text in visual descriptions

AVAILABLE CAMERA BODIES: ${higgsfieldCameraList}
AVAILABLE LENSES: ${higgsfieldLensList}
AVAILABLE APERTURES: ${higgsfieldApertureList}
AVAILABLE CAMERA MOVEMENTS (can stack up to 3): ${higgsfieldMovementList}

CAMERA SELECTION GUIDELINES:
- red-v-raptor: ACTION scenes, high detail, modern look (8K sharp) - PREFERRED for action
- arri-alexa-35: Drama, emotional scenes (organic skin tones)
- sony-venice: Night scenes, moody atmosphere (excellent low-light)
- arriflex-16sr: Vintage, documentary feel (16mm film grain)
- panavision-dxl2: Blockbuster epic shots (Hollywood premium)
- imax-film: Epic wide establishing shots (maximum scale)

LENS SELECTION GUIDELINES:
- zeiss-ultra-prime: Thrillers, action (sharp clinical look) - PREFERRED for action/sci-fi
- cooke-s4: Emotional scenes, portraits (warm organic bokeh)
- panavision-c-series: Epic cinema (anamorphic flares)
- hawk-v-lite: Dramatic cinematic widescreen
- canon-k35: Period/vintage scenes (70s soft look)

RECOMMENDED MOVEMENTS FOR ACTION/SCI-FI:
- bullet-time: Frozen action moments
- fpv-drone: Immersive flying through action
- crash-zoom-in/out: Dramatic impact moments
- 360-orbit: Hero/power moments
- whip-pan: Fast transitions
- super-dolly-in/out: Dramatic reveals
- handheld: Urgency, realism

FOCAL LENGTH GUIDELINES (12-135mm):
- 12-24mm: Epic landscapes, establishing shots, action
- 35-50mm: Dialogue, interviews, natural perspective
- 75-100mm: Portraits, emotional close-ups, compression

APERTURE GUIDELINES:
- f/1.4-f/2: Portraits, isolation, low light, creamy bokeh
- f/2.8-f/4: Two-shots, moderate DOF
- f/8-f/16: Landscapes, deep focus, everything sharp`
    : `
VIDEO PLATFORM: Google Veo 3.1
You are generating parameters for Veo 3.1 which uses text-based cinematography descriptions.

AVAILABLE CAMERA ANGLES: ${veo31AnglesList}
AVAILABLE CAMERA MOVEMENTS: ${veo31MovementsList}
AVAILABLE LENS EFFECTS: ${veo31LensEffectsList}
AVAILABLE LIGHTING STYLES: ${veo31LightingList}

CAMERA ANGLE GUIDELINES:
- low-angle: Power, dominance, heroic moments
- high-angle: Vulnerability, weakness
- dutch-angle: Tension, unease, disorientation
- close-up/extreme-close-up: Emotion, intensity
- wide-shot: Context, scale, isolation

LIGHTING GUIDELINES:
- golden-hour: Romance, nostalgia
- film-noir: Mystery, drama, shadows
- low-key: Intense, dramatic
- volumetric: Atmospheric, ethereal`;

  const systemPrompt = `You are a master screenwriter AND cinematographer specializing in viral short-form video content.
You create compelling ${genreDescriptions[genre]} stories with FILMY, dramatic dialogues.
You are also an expert in camera selection, lens choice, and cinematography for AI video generation.

Visual Style: ${styleDescriptions[stylePreset]}
Language: ${language === 'hindi' ? 'Hindi (write dialogues in Hindi/Romanized Hindi)' : language === 'hinglish' ? 'Hinglish mix' : 'English'}
${platformInstructions}

Your dialogues should be:
- EXTREMELY dramatic and memorable (think iconic Bollywood one-liners)
- Emotionally impactful and quotable
- Perfect for 8-second video clips
- Easy to lip-sync

IMPORTANT: Return ONLY valid JSON, no markdown, no explanations.`;

  const platformSpecificFields = videoPlatform === 'higgsfield'
    ? `
- higgsfieldParams: Object containing:
  * cameraBody: Select from available cameras based on scene mood (e.g., "arri-alexa-35")
  * lens: Select lens based on scene emotion (e.g., "cooke-s4")
  * focalLength: Number 12-135 based on shot type
  * aperture: Select from f/1.4 to f/16 based on DOF needs (e.g., "f/2.8")
  * primaryMovement: Main camera movement (e.g., "dolly-in")
  * secondaryMovement: Optional second movement to stack (e.g., "tilt-up")
  * tertiaryMovement: Optional third movement (e.g., "zoom-in")
  * colorPalette: Describe color mood (e.g., "warm earth tones, golden highlights")
  * filmGrain: "none", "subtle", or "heavy"
  * mood: Emotional atmosphere description
  * duration: 5 or 10 (ONLY these values - Higgsfield limitation)`
    : `
- veoParams: Object containing:
  * cameraAngle: Select from available angles (e.g., "low-angle")
  * cameraMovement: Select from available movements (e.g., "dolly-in")
  * lensEffect: Select from available effects (e.g., "shallow-dof")
  * lightingStyle: Select from available styles (e.g., "golden-hour")
  * dialogue: The spoken dialogue with emotion
  * soundEffects: Array of specific sound effects (e.g., ["footsteps on gravel", "door creaking"])
  * ambientSound: Background audio (e.g., "quiet village morning, distant roosters")
  * duration: 4, 6, or 8 seconds (Veo 3.1 supported durations)`;

  // Use user-selected duration for Higgsfield, or allow AI to choose from valid options
  const userSelectedDuration = higgsfieldSettings?.sceneDuration || 5;
  const durationInstruction = videoPlatform === 'higgsfield'
    ? `- duration: ${userSelectedDuration} (USER SELECTED - use exactly ${userSelectedDuration} seconds for ALL scenes, this is the user's chosen duration)`
    : '- duration: 4, 6, or 8 seconds (Veo 3.1 supported durations - use 4s for quick cuts, 6s for dialogue, 8s for emotional moments)';

  // Additional Higgsfield settings info for the prompt
  const higgsfieldExtraInfo = videoPlatform === 'higgsfield' && higgsfieldSettings
    ? `
HIGGSFIELD USER SETTINGS (apply to ALL scenes):
- Scene Duration: ${higgsfieldSettings.sceneDuration}s (MANDATORY - use this exact duration)
- Resolution: ${higgsfieldSettings.resolution} (${higgsfieldSettings.resolution === '480p' ? 'preview/testing mode' : 'final delivery mode'})
- Upscale: ${higgsfieldSettings.upscale !== 'none' ? higgsfieldSettings.upscale.toUpperCase() + ' upscale enabled' : 'no upscale'}
- Slow Motion: ${higgsfieldSettings.slowMotion ? 'ENABLED - consider dramatic slow-mo moments' : 'disabled'}
- Keyframe Interpolation: ${higgsfieldSettings.keyframeInterpolation ? 'ENABLED - use start/end keyframe transitions' : 'disabled'}`
    : '';

  const userPrompt = `Create a ${numberOfScenes}-scene story for a viral video series.

THEME: "${theme}"
GENRE: ${genre.replace('-', ' ')}
VIDEO PLATFORM: ${videoPlatform === 'higgsfield' ? 'Higgsfield Cinema Studio' : 'Veo 3.1'}${higgsfieldExtraInfo}

CHARACTERS (use EXACTLY these names in characterIds):
${characterDescriptions}

For each scene, provide EXTREMELY DETAILED information:
- sceneNumber: Sequential number (1 to ${numberOfScenes})
- title: Short catchy scene title
- description: Detailed description of what happens (3-4 sentences)
- characterIds: Array of character NAMES involved (use exact names from above)
- dialogue: The MAIN dialogue in ${language} - make it DRAMATIC, FILMY, MEMORABLE (like iconic movie dialogues)
- dialogueLanguage: "${language}"
- emotion: Primary emotion (angry, sad, determined, fearful, joyful, menacing, romantic, triumphant)
- visualDescription: VERY DETAILED visual description (100+ words) including:
  * Exact setting/location with details
  * Character positions and actions
  * Character expressions and body language
  * Lighting conditions (time of day, light quality, shadows)
  * Weather/atmosphere
  * Background elements
  * Camera perspective description
  * Motion and movement details
- suggestedCamera: Specific camera direction description
- suggestedLighting: Detailed lighting description
- suggestedAudio: Audio/music suggestion
${durationInstruction}
${platformSpecificFields}

CINEMATOGRAPHY GUIDELINES:
- HOOK scenes (1-2): Use dynamic camera movements, wide establishing shots
- EMOTIONAL scenes: Use close-ups, shallow DOF, warm lenses (cooke-s4 or shallow-dof)
- ACTION scenes: Use tracking shots, wide angles, crash zooms, handheld
- CONFRONTATION scenes: Use low angles for power, dutch angles for tension
- CLIMAX scenes: Use dramatic movements (360-orbit, crane-up, bullet-time)
- Match camera/lens choices to emotional beats

Story structure should follow:
- Scenes 1-2: HOOK - Grab attention immediately, introduce conflict
- Scenes 3-4: RISING TENSION - Build emotional investment
- Scenes 5-7: CONFLICT/CONFRONTATION - Peak drama
- Scenes 8-9: CLIMAX - Maximum emotional impact
- Scene ${numberOfScenes}: RESOLUTION/TWIST - Satisfying or shocking ending

Return as JSON:
{
  "title": "Story title",
  "synopsis": "2-3 sentence synopsis",
  "scenes": [{ sceneNumber, title, description, characterIds, dialogue, dialogueLanguage, emotion, visualDescription, suggestedCamera, suggestedLighting, suggestedAudio, duration, ${videoPlatform === 'higgsfield' ? 'higgsfieldParams' : 'veoParams'} }]
}`;

  const response = await callOpenAI(apiKey, model, systemPrompt, userPrompt);

  // Parse JSON from response
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse story data from AI response');
  }

  const storyData = JSON.parse(jsonMatch[0]) as {
    title: string;
    synopsis: string;
    scenes: Omit<GeneratedScene, 'id'>[];
  };

  // Add IDs to scenes
  return {
    title: storyData.title,
    synopsis: storyData.synopsis,
    scenes: storyData.scenes.map((scene, index) => ({
      ...scene,
      id: `ai-scene-${Date.now()}-${index}`
    }))
  };
}

// Generate detailed reference image prompt for a character
export function generateReferenceImagePrompt(character: Character, stylePreset: StylePreset): string {
  const styleModifiers: Record<StylePreset, string> = {
    'bollywood-drama': 'cinematic Bollywood portrait style, dramatic studio lighting, glamorous high-fashion look, rich saturated colors, professional photography',
    'hollywood-action': 'Hollywood movie poster style, dramatic cinematic lighting, high contrast, professional studio photography, blockbuster film aesthetic',
    'indian-village': 'authentic Indian rural setting, natural golden hour sunlight, earthy warm tones, village background with mud houses, traditional authentic look',
    'film-noir': 'classic film noir black and white, high contrast dramatic shadows, mysterious moody lighting, venetian blind shadow patterns',
    'colorful-vibrant': 'vibrant pop art colors, bright energetic lighting, saturated colorful background, festive atmosphere',
    'dark-moody': 'moody atmospheric portrait, desaturated colors, dramatic shadows, emotional depth, low-key lighting',
    'realistic-documentary': 'photorealistic natural portrait, available ambient lighting, authentic real-world setting, documentary photography style',
    'anime-style': 'anime character portrait style, stylized expressive features, vibrant anime colors, dynamic pose, manga-inspired aesthetic'
  };

  return `Hyper-realistic portrait photograph of ${character.name}, a ${character.role} character.

PHYSICAL APPEARANCE:
${character.physicalDescription}

CLOTHING & ACCESSORIES:
${character.clothing}

EXPRESSION & POSE:
${character.emotionalTraits[0]} expression, confident pose, looking directly at camera with intense eyes.

STYLE:
${styleModifiers[stylePreset]}

TECHNICAL REQUIREMENTS:
- 8K ultra high resolution
- Sharp detailed facial features
- Full upper body visible (head to waist)
- Consistent character design suitable for video generation reference
- Clean uncluttered background
- Professional studio quality
- Photorealistic skin texture and details
- Natural realistic proportions

This image will be used as a character reference for AI video generation, so maintain exact consistency in all features.`;
}

// Convert generated scene to detailed Veo 3.1 prompt
export function generatedSceneToVeoPrompt(
  scene: GeneratedScene,
  characters: Character[],
  stylePreset: StylePreset
): string {
  const sceneCharacters = characters.filter(c =>
    scene.characterIds.includes(c.name) || scene.characterIds.includes(c.id)
  );

  // Helper to ensure value is string (safety net for corrupted data)
  const ensureString = (val: unknown): string => {
    if (typeof val === 'string') return val;
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') {
      return Object.entries(val).map(([k, v]) => `${k}: ${v}`).join(', ');
    }
    return String(val);
  };

  // Build detailed character descriptions for the scene
  const characterDescriptions = sceneCharacters.map(c => {
    const name = ensureString(c.name);
    const physicalDesc = ensureString(c.physicalDescription);
    const clothing = ensureString(c.clothing);
    return `${name} (${physicalDesc}, wearing ${clothing})`;
  }).join('; ');

  const styleModifiers: Record<StylePreset, string> = {
    'bollywood-drama': 'Bollywood cinematic style, vibrant saturated colors, dramatic glamorous cinematography, high production value, filmy aesthetic',
    'hollywood-action': 'Hollywood blockbuster cinematography, slick professional lighting, high budget production value, cinematic color grading',
    'indian-village': 'Authentic Indian rural village aesthetic, earthy warm brown and green tones, natural golden sunlight, rustic traditional atmosphere, dusty village paths',
    'film-noir': 'Classic film noir style, high contrast shadows, black and white or desaturated, moody mysterious atmosphere',
    'colorful-vibrant': 'Hyper-vibrant saturated colors, bright energetic lighting, festive lively atmosphere',
    'dark-moody': 'Dark moody atmospheric, desaturated muted colors, dramatic shadow-heavy lighting, emotional depth',
    'realistic-documentary': 'Photorealistic documentary style, natural available lighting, authentic grounded visuals',
    'anime-style': 'Anime-inspired visual style, stylized expressive aesthetics, vibrant dynamic colors, dramatic anime lighting'
  };

  // Use veoParams if available for more precise control
  const veoParams = scene.veoParams;
  const cameraAngle = veoParams?.cameraAngle ? veo31CameraAngles[veoParams.cameraAngle]?.name : '';
  const cameraMovement = veoParams?.cameraMovement ? veo31CameraMovements[veoParams.cameraMovement]?.name : '';
  const lensEffect = veoParams?.lensEffect ? veo31LensEffects[veoParams.lensEffect]?.name : '';
  const lightingStyle = veoParams?.lightingStyle ? veo31LightingStyles[veoParams.lightingStyle]?.name : '';

  // Build the comprehensive Veo prompt with structured format
  let prompt = `${cameraAngle ? `${cameraAngle}, ` : ''}${cameraMovement ? `${cameraMovement}, ` : ''}${scene.suggestedCamera}

${scene.visualDescription}

CHARACTERS: ${characterDescriptions}

ACTION: ${scene.description}

LIGHTING: ${lightingStyle ? `${lightingStyle} lighting. ` : ''}${scene.suggestedLighting}

STYLE: ${styleModifiers[stylePreset]}${lensEffect ? `, ${lensEffect}` : ''}, hyper-realistic photorealistic quality, cinematic 8K resolution.

EMOTION: ${scene.emotion} mood and atmosphere.`;

  // Add dialogue with Veo 3.1 format
  if (scene.dialogue) {
    const dialogueSpeaker = sceneCharacters[0]?.name || 'Character';
    prompt += `

${dialogueSpeaker} says with ${scene.emotion} emotion, "${scene.dialogue}"`;
  }

  // Add audio with Veo 3.1 format
  if (veoParams?.soundEffects && veoParams.soundEffects.length > 0) {
    prompt += `

SFX: ${veoParams.soundEffects.join(', ')}`;
  }

  if (veoParams?.ambientSound) {
    prompt += `
Ambient: ${veoParams.ambientSound}`;
  } else if (scene.suggestedAudio) {
    prompt += `

Audio: ${scene.suggestedAudio}`;
  }

  return prompt;
}

// Convert generated scene to Higgsfield Cinema Studio prompt
export function generatedSceneToHiggsfieldPrompt(
  scene: GeneratedScene,
  characters: Character[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stylePreset: StylePreset // Kept for API consistency with Veo prompt function
): { prompt: string; settings: HiggsfieldSceneSettings } {
  const sceneCharacters = characters.filter(c =>
    scene.characterIds.includes(c.name) || scene.characterIds.includes(c.id)
  );

  // Helper to ensure value is string (safety net for corrupted data)
  const ensureString = (val: unknown): string => {
    if (typeof val === 'string') return val;
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') {
      return Object.entries(val).map(([k, v]) => `${k}: ${v}`).join(', ');
    }
    return String(val);
  };

  const characterDescriptions = sceneCharacters.map(c => {
    const name = ensureString(c.name);
    const physicalDesc = ensureString(c.physicalDescription);
    const clothing = ensureString(c.clothing);
    return `${name} (${physicalDesc}, wearing ${clothing})`;
  }).join('; ');

  const params = scene.higgsfieldParams;

  // Get readable names for settings
  const cameraName = params?.cameraBody ? higgsfieldCameraBodies[params.cameraBody]?.name : 'ARRI Alexa 35';
  const lensName = params?.lens ? higgsfieldLenses[params.lens]?.name : 'Cooke S4';
  const primaryMove = params?.primaryMovement ? higgsfieldMovements[params.primaryMovement]?.name : 'Static';
  const secondaryMove = params?.secondaryMovement ? higgsfieldMovements[params.secondaryMovement]?.name : undefined;
  const tertiaryMove = params?.tertiaryMovement ? higgsfieldMovements[params.tertiaryMovement]?.name : undefined;

  // Build movement stack description
  const movements = [primaryMove, secondaryMove, tertiaryMove].filter(Boolean).join(' + ');

  // Build the Higgsfield-optimized prompt
  const prompt = `${scene.visualDescription}

CHARACTERS: ${characterDescriptions}

ACTION: ${scene.description}

CAMERA: ${cameraName} with ${lensName} at ${params?.focalLength || 50}mm, ${params?.aperture || 'f/2.8'}
MOVEMENT: ${movements}
LIGHTING: ${scene.suggestedLighting}
COLOR: ${params?.colorPalette || 'Natural cinematic tones'}
FILM GRAIN: ${params?.filmGrain || 'subtle'}
MOOD: ${params?.mood || scene.emotion}

${scene.emotion} atmosphere, cinematic quality, photorealistic.`;

  // Return both prompt and structured settings for Higgsfield UI
  // Duration defaults to 5s, but uses params if available (5 or 10 only)
  const higgsfieldDuration = params?.duration && (params.duration === 5 || params.duration === 10)
    ? params.duration
    : (scene.duration >= 8 ? 10 : 5);

  const settings: HiggsfieldSceneSettings = {
    cameraBody: params?.cameraBody || 'arri-alexa-35',
    lens: params?.lens || 'cooke-s4',
    focalLength: params?.focalLength || 50,
    aperture: params?.aperture || 'f/2.8',
    movements: [
      params?.primaryMovement || 'static',
      ...(params?.secondaryMovement ? [params.secondaryMovement] : []),
      ...(params?.tertiaryMovement ? [params.tertiaryMovement] : [])
    ] as HiggsfieldCameraMovement[],
    colorPalette: params?.colorPalette || 'Natural cinematic tones',
    filmGrain: params?.filmGrain || 'subtle',
    mood: params?.mood || scene.emotion,
    duration: higgsfieldDuration as 5 | 10
  };

  return { prompt, settings };
}

// Higgsfield scene settings interface for export
export interface HiggsfieldSceneSettings {
  cameraBody: HiggsfieldCameraBody;
  lens: HiggsfieldLens;
  focalLength: number;
  aperture: HiggsfieldAperture;
  movements: HiggsfieldCameraMovement[];
  colorPalette: string;
  filmGrain: 'none' | 'subtle' | 'heavy';
  mood: string;
  duration: 5 | 10;
}

// Generate a single custom character from user description
export async function generateCustomCharacter(
  apiKey: string,
  model: string,
  userDescription: string,
  genre: Genre,
  stylePreset: StylePreset,
  language: 'hindi' | 'english' | 'hinglish',
  videoPlatform: VideoPlatform = 'veo-3.1'
): Promise<Character> {
  const platformFocus = videoPlatform === 'higgsfield'
    ? `PLATFORM: Higgsfield Cinema Studio (PHOTOREALISTIC)
Design a photorealistic character suitable for Hollywood-style action/sci-fi visuals.`
    : `PLATFORM: Google Veo 3.1 (DIALOGUE-FOCUSED)
Design a character suitable for emotional, dialogue-heavy Indian content.`;

  const systemPrompt = `You are a master character designer. Create ONE detailed character based on user instructions.

Visual Style: ${styleDescriptions[stylePreset]}
Genre: ${genreDescriptions[genre]}
${platformFocus}

IMPORTANT: Return ONLY valid JSON object (not array), no markdown.`;

  const userPrompt = `Create a character based on this description:
"${userDescription}"

Provide EXTREMELY DETAILED character data:
- name: A memorable name fitting the description
- role: One of "hero", "villain", "supporting", "mother", "love-interest", "sidekick"
- physicalDescription: VERY DETAILED (age, skin tone, face, hair, build, distinctive features)
- clothing: Specific outfit with colors, fabrics, accessories
- voiceStyle: How they speak
- emotionalTraits: Array of 3-4 personality traits
- catchphrases: Array of 2-3 signature dialogues in ${language}
- visualStyle: "hyper-realistic"
- referenceImagePrompt: DETAILED 100+ word prompt for AI image generation
- backstory: 2-3 sentences background

Return as JSON object: { name, role, physicalDescription, clothing, voiceStyle, emotionalTraits, catchphrases, visualStyle, referenceImagePrompt, backstory }`;

  const response = await callOpenAI(apiKey, model, systemPrompt, userPrompt);

  // Parse JSON from response
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse character data from AI response');
  }

  const rawCharacter = JSON.parse(jsonMatch[0]) as Omit<Character, 'id'>;

  // Normalize
  const normalizeToString = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') {
      return Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ');
    }
    return String(value);
  };

  return {
    ...rawCharacter,
    id: `custom-char-${Date.now()}`,
    name: normalizeToString(rawCharacter.name),
    physicalDescription: normalizeToString(rawCharacter.physicalDescription),
    clothing: normalizeToString(rawCharacter.clothing),
    voiceStyle: normalizeToString(rawCharacter.voiceStyle),
    backstory: normalizeToString(rawCharacter.backstory),
    referenceImagePrompt: normalizeToString(rawCharacter.referenceImagePrompt),
    emotionalTraits: Array.isArray(rawCharacter.emotionalTraits)
      ? rawCharacter.emotionalTraits.map(t => normalizeToString(t))
      : [normalizeToString(rawCharacter.emotionalTraits)],
    catchphrases: Array.isArray(rawCharacter.catchphrases)
      ? rawCharacter.catchphrases.map(c => normalizeToString(c))
      : [normalizeToString(rawCharacter.catchphrases)]
  };
}

// Regenerate reference image prompt for an edited character
export async function regenerateReferencePrompt(
  apiKey: string,
  model: string,
  character: Character,
  stylePreset: StylePreset
): Promise<string> {
  const systemPrompt = `You are an expert at creating prompts for AI image generation.
Create a detailed, consistent reference image prompt for character generation.`;

  const userPrompt = `Create a reference image prompt for this character:

NAME: ${character.name}
ROLE: ${character.role}
PHYSICAL: ${character.physicalDescription}
CLOTHING: ${character.clothing}
PERSONALITY: ${character.emotionalTraits.join(', ')}

Create a VERY DETAILED prompt (100+ words) for generating a consistent reference image including:
- All physical details exactly as described
- Exact clothing and accessories
- Appropriate expression and pose
- ${stylePreset} visual style
- 8K hyper-realistic quality
- Professional studio lighting
- Clean background
- Suitable for video generation reference

Return ONLY the prompt text, no explanations or JSON.`;

  const response = await callOpenAI(apiKey, model, systemPrompt, userPrompt);
  return response.trim();
}

// Test API connection
export async function testAPIConnection(apiKey: string, model: string): Promise<boolean> {
  try {
    await callOpenAI(
      apiKey,
      model,
      'You are a helpful assistant.',
      'Say "API connection successful" in exactly those words.'
    );
    return true;
  } catch {
    return false;
  }
}
