import { Scene, Character, GeneratedPrompt } from '@/types';

// Camera movement mappings
const cameraMovementDescriptions: Record<string, string> = {
  'static': 'static shot',
  'dolly': 'smooth dolly shot moving',
  'tracking': 'tracking shot following',
  'crane': 'crane shot ascending',
  'pan': 'slow pan',
  'tilt': 'tilt shot',
  'handheld': 'handheld shot with subtle movement',
  'aerial': 'aerial drone shot'
};

const shotTypeDescriptions: Record<string, string> = {
  'wide': 'Wide shot',
  'medium': 'Medium shot',
  'close-up': 'Close-up',
  'extreme-close-up': 'Extreme close-up',
  'pov': 'POV shot',
  'two-shot': 'Two-shot'
};

const angleDescriptions: Record<string, string> = {
  'eye-level': 'at eye level',
  'low-angle': 'from a low angle looking up',
  'high-angle': 'from a high angle looking down',
  'dutch-angle': 'with a tilted dutch angle',
  'birds-eye': 'from directly above'
};

const focusDescriptions: Record<string, string> = {
  'deep-focus': 'with deep focus keeping everything sharp',
  'shallow-dof': 'with shallow depth of field blurring the background',
  'rack-focus': 'with rack focus shifting between subjects',
  'soft-focus': 'with dreamy soft focus'
};

const lightingDescriptions: Record<string, string> = {
  'dawn': 'at dawn with soft pink and orange light',
  'morning': 'in the morning with fresh natural light',
  'noon': 'at harsh midday with strong overhead sun',
  'golden-hour': 'during golden hour with warm amber light',
  'dusk': 'at dusk with fading purple and orange sky',
  'night': 'at night with moonlight and shadows',
  'blue-hour': 'during blue hour with cool twilight tones'
};

const moodDescriptions: Record<string, string> = {
  'warm': 'warm color tones',
  'cool': 'cool blue tones',
  'neutral': 'balanced natural colors',
  'moody': 'dark moody atmosphere',
  'vibrant': 'vibrant saturated colors'
};

const musicMoodDescriptions: Record<string, string> = {
  'epic': 'swelling epic orchestral score',
  'emotional': 'gentle emotional piano melody',
  'tense': 'tense suspenseful music',
  'triumphant': 'triumphant victory fanfare',
  'melancholic': 'melancholic sad instrumental',
  'none': ''
};

function getCharacterDescription(character: Character): string {
  const parts = [character.physicalDescription];
  if (character.clothing) {
    parts.push(`wearing ${character.clothing}`);
  }
  return parts.join(', ');
}

function buildCinematographySection(scene: Scene): string {
  const { camera } = scene;
  const parts: string[] = [];

  // Shot type
  parts.push(shotTypeDescriptions[camera.shotType] || 'Medium shot');

  // Camera movement
  if (camera.cameraMovement !== 'static') {
    parts.push(cameraMovementDescriptions[camera.cameraMovement]);
  }

  // Angle
  parts.push(angleDescriptions[camera.angle]);

  // Focus
  parts.push(focusDescriptions[camera.focusStyle]);

  return parts.join(', ');
}

function buildSubjectSection(scene: Scene, characters: Character[]): string {
  const sceneCharacters = characters.filter(c => scene.characterIds.includes(c.id));

  if (sceneCharacters.length === 0) {
    return '';
  }

  return sceneCharacters.map(char => {
    return `${char.name} (${getCharacterDescription(char)})`;
  }).join(' and ');
}

function buildActionSection(scene: Scene): string {
  return scene.action;
}

function buildContextSection(scene: Scene): string {
  const { lighting } = scene;
  const parts: string[] = [];

  // Setting
  parts.push(scene.setting);

  // Lighting
  parts.push(lightingDescriptions[lighting.timeOfDay]);

  // Light quality
  parts.push(`${lighting.lightQuality} ${lighting.lightSource} lighting`);

  // Mood
  parts.push(moodDescriptions[lighting.mood]);

  return parts.join(', ');
}

function buildAudioSection(scene: Scene): string {
  const { audio } = scene;
  const parts: string[] = [];

  // Dialogue
  if (audio.dialogue && audio.dialogue.trim()) {
    parts.push(`He says in a ${audio.dialogueEmotion} voice: "${audio.dialogue}"`);
  }

  // SFX
  if (audio.sfx && audio.sfx.length > 0) {
    parts.push(`SFX: ${audio.sfx.join(', ')}`);
  }

  // Ambient
  if (audio.ambientSound) {
    parts.push(`Ambient: ${audio.ambientSound}`);
  }

  // Music
  if (audio.musicMood && audio.musicMood !== 'none') {
    parts.push(`Music: ${musicMoodDescriptions[audio.musicMood]}`);
  }

  return parts.join('. ');
}

function buildNegativePrompts(scene: Scene): string {
  if (!scene.negativePrompts || scene.negativePrompts.length === 0) {
    return '';
  }

  return `\n\nNegative: ${scene.negativePrompts.join(', ')}`;
}

export function generateSinglePrompt(scene: Scene, characters: Character[]): GeneratedPrompt {
  const cinematography = buildCinematographySection(scene);
  const subject = buildSubjectSection(scene, characters);
  const action = buildActionSection(scene);
  const context = buildContextSection(scene);
  const audio = buildAudioSection(scene);
  const negative = buildNegativePrompts(scene);

  // Build the prompt following Veo 3.1 structure
  let prompt = '';

  // [Cinematography] + [Subject] + [Action] + [Context] + [Style]
  prompt += cinematography;

  if (subject) {
    prompt += `, ${subject}`;
  }

  prompt += `, ${action}`;
  prompt += `. ${context}.`;

  // Visual style
  prompt += ` Hyper-realistic, cinematic 8K quality, photorealistic textures.`;

  // Audio section
  if (audio) {
    prompt += ` ${audio}`;
  }

  // Negative prompts
  prompt += negative;

  return {
    sceneId: scene.id,
    prompt: prompt.trim(),
    characterReferences: scene.characterIds
  };
}

export function generateTimestampPrompt(scenes: Scene[], characters: Character[]): string {
  let fullPrompt = '';
  let currentTime = 0;

  scenes.forEach((scene, index) => {
    const startTime = currentTime;
    const endTime = currentTime + scene.duration;

    const timestampPrefix = `[${formatTime(startTime)}-${formatTime(endTime)}] `;
    const singlePrompt = generateSinglePrompt(scene, characters);

    fullPrompt += timestampPrefix + singlePrompt.prompt;

    if (index < scenes.length - 1) {
      fullPrompt += '\n\n';
    }

    currentTime = endTime;
  });

  return fullPrompt;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function generateCharacterReference(character: Character): string {
  return `Character Reference - ${character.name}:
Physical: ${character.physicalDescription}
Clothing: ${character.clothing}
Voice: ${character.voiceStyle}
Emotional Traits: ${character.emotionalTraits.join(', ')}
Visual Style: ${character.visualStyle}`;
}

export function generateChatGPTPrompt(characters: Character[]): string {
  const charDescriptions = characters.map(char => {
    return `"${char.name}": ${getCharacterDescription(char)}. Voice: ${char.voiceStyle}. Traits: ${char.emotionalTraits.join(', ')}.`;
  }).join('\n');

  return `You are a viral YouTube Shorts scriptwriter specializing in dramatic, emotional storytelling with these characters:

${charDescriptions}

When I describe a scene or situation, generate a detailed AI Video Prompt following this structure:

[Cinematography] + [Subject] + [Action] + [Context] + [Style & Audio]

Include:
- Camera shot type, movement, and angle
- Character's exact actions and expressions
- Setting details with lighting
- Dialogue in Hindi (if needed) with emotion tags
- Sound effects and ambient audio
- Visual style: hyper-realistic, cinematic 8K

Duration: 8 seconds per scene
Language: Dialogue in Hindi, technical terms in English

Example output format:
"Close-up, low angle, [Character Name] (physical description), [action], in [setting]. [Lighting]. [Character] says in [emotion] voice: "[Hindi dialogue]". SFX: [sounds]. Ambient: [background]. Music: [mood]. Hyper-realistic, cinematic 8K."`;
}

export function generateStoryPrompt(theme: string, setting: string, language: string): string {
  return `Create a viral YouTube Shorts story (60-90 seconds total, 8 seconds per scene) with this structure:

Theme: ${theme}
Setting: ${setting}
Language: ${language}

Story Structure:
1. HOOK (0-8s): Shocking opening that grabs attention immediately
2. EMOTIONAL (8-16s): Show vulnerability to build empathy
3. CONFLICT (16-24s): Introduce the villain/problem with tension
4. RESOLUTION (24-32s): Satisfying victory or emotional closure

For each beat, provide:
- Scene description
- Character actions
- Dialogue (in ${language})
- Emotional tone
- Visual elements

Make it dramatic, emotional, and memorable. The audience should feel the hero's journey.`;
}
