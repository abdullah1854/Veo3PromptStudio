import { CharacterPreset, ScenePreset, Genre, VideoPlatform } from '@/types';

// Extended CharacterPreset with platform and genre targeting
export interface ExtendedCharacterPreset extends CharacterPreset {
  platforms: VideoPlatform[];
  genres: Genre[];
}

// Platform and genre-specific character presets
export const characterPresets: ExtendedCharacterPreset[] = [
  // ==========================================
  // HIGGSFIELD PRESETS (Action/Sci-Fi/Thriller)
  // ==========================================
  {
    id: 'action-hero',
    name: 'Action Hero',
    description: 'Elite operative, combat specialist',
    platforms: ['higgsfield'],
    genres: ['action-thriller', 'mystery', 'revenge-saga'],
    character: {
      name: 'Marcus Kane',
      role: 'hero',
      physicalDescription: '35-year-old athletic male with chiseled jawline, intense grey eyes, short military-cut dark hair with grey temples, faint scar across left eyebrow, muscular but lean build like a special forces operator',
      clothing: 'Black tactical jacket over grey henley, dark cargo pants, combat boots, utility watch, subtle earpiece',
      voiceStyle: 'Deep, controlled, speaks with measured intensity',
      emotionalTraits: ['determined', 'protective', 'strategic', 'relentless'],
      catchphrases: ['No one gets left behind.', 'End of the line.', 'You picked the wrong fight.'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'sci-fi-hero',
    name: 'Sci-Fi Protagonist',
    description: 'Futuristic soldier or space operative',
    platforms: ['higgsfield'],
    genres: ['supernatural', 'action-thriller', 'mystery'],
    character: {
      name: 'Commander Reyes',
      role: 'hero',
      physicalDescription: '32-year-old woman with sharp features, cybernetic eye implant glowing blue, athletic build, short asymmetric platinum hair, determined expression, small port behind ear',
      clothing: 'Sleek black and silver bodysuit with armored plating, holographic wrist interface, magnetic boots, utility belt with energy cells',
      voiceStyle: 'Confident, authoritative, slight digital distortion',
      emotionalTraits: ['brave', 'analytical', 'compassionate', 'adaptive'],
      catchphrases: ['Systems online.', 'I\'ve calculated the odds.', 'This ends now.'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'corporate-villain',
    name: 'Corporate Villain',
    description: 'Ruthless tech mogul or crime boss',
    platforms: ['higgsfield'],
    genres: ['action-thriller', 'mystery', 'revenge-saga'],
    character: {
      name: 'Victor Sterling',
      role: 'villain',
      physicalDescription: '50-year-old distinguished man with silver swept-back hair, cold blue eyes, sharp cheekbones, thin cruel lips, tall imposing frame, always impeccably groomed',
      clothing: 'Tailored charcoal three-piece suit, platinum cufflinks, expensive watch, silk tie, polished oxford shoes',
      voiceStyle: 'Smooth, cultured, menacing calm that never raises',
      emotionalTraits: ['calculating', 'ruthless', 'controlled', 'narcissistic'],
      catchphrases: ['Everyone has a price.', 'How... disappointing.', 'You\'re already too late.'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'femme-fatale',
    name: 'Femme Fatale',
    description: 'Mysterious double agent',
    platforms: ['higgsfield'],
    genres: ['action-thriller', 'mystery', 'revenge-saga'],
    character: {
      name: 'Elena Voss',
      role: 'love-interest',
      physicalDescription: '28-year-old stunning woman with sharp green eyes, high cheekbones, full lips, sleek black hair in a low bun, athletic dancer build, mysterious aura',
      clothing: 'Form-fitting black dress or tactical catsuit depending on mission, minimal jewelry, hidden weapons',
      voiceStyle: 'Sultry, intelligent, switches between warmth and ice cold',
      emotionalTraits: ['mysterious', 'intelligent', 'seductive', 'deadly'],
      catchphrases: ['Trust is earned.', 'Surprise.', 'You never saw me coming.'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'hacker-sidekick',
    name: 'Tech Specialist',
    description: 'Genius hacker and support',
    platforms: ['higgsfield'],
    genres: ['action-thriller', 'supernatural', 'mystery'],
    character: {
      name: 'Dev',
      role: 'sidekick',
      physicalDescription: '24-year-old tech genius with messy dark curly hair, thick-rimmed glasses, friendly face, slight build, always typing on multiple devices, coffee-stained fingers',
      clothing: 'Graphic tee under unzipped hoodie, cargo shorts or jeans, sneakers, multiple smart watches, noise-canceling headphones around neck',
      voiceStyle: 'Fast-talking, enthusiastic, prone to technical jargon',
      emotionalTraits: ['brilliant', 'anxious', 'loyal', 'sarcastic'],
      catchphrases: ['I\'m in.', 'Give me sixty seconds.', 'That\'s not supposed to happen...'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'monster-creature',
    name: 'Creature/Monster',
    description: 'Horror or sci-fi creature',
    platforms: ['higgsfield'],
    genres: ['horror', 'supernatural'],
    character: {
      name: 'The Entity',
      role: 'villain',
      physicalDescription: 'Towering humanoid figure with elongated limbs, pitch-black skin that absorbs light, no visible eyes but sensing presence, mouth that opens impossibly wide, moves in unnatural jerky motions',
      clothing: 'None - appears as shifting darkness, sometimes tendrils of shadow',
      voiceStyle: 'Multiple overlapping whispers, creates dread',
      emotionalTraits: ['ancient', 'predatory', 'unknowable', 'patient'],
      catchphrases: ['[Inhuman screech]', '[Whispered] Found you...', '[Silence]'],
      visualStyle: 'hyper-realistic'
    }
  },

  // ==========================================
  // VEO 3.1 PRESETS (Dialogue-heavy, Emotional)
  // ==========================================
  {
    id: 'hulk-hero',
    name: 'Hulk Hero (Indian Style)',
    description: 'Muscular green hero with traditional Indian elements',
    platforms: ['veo-3.1'],
    genres: ['action-thriller', 'family-drama', 'village-drama', 'revenge-saga'],
    character: {
      name: 'Hulk',
      role: 'hero',
      physicalDescription: 'Extremely muscular green-skinned giant with bulging veins, massive arms, and intense eyes. Weathered face showing both strength and emotion.',
      clothing: 'Traditional Indian dhoti or torn purple shorts, gold armlets, sacred thread across chest',
      voiceStyle: 'Deep, thunderous voice with Hindi accent. Speaks with emotional intensity.',
      emotionalTraits: ['protective', 'emotional', 'righteous anger', 'loves family'],
      catchphrases: ['Main tumhe nahi chodunga!', 'Yeh meri maa ka apmaan hai!', 'Ab bahut ho gaya!'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'village-mother',
    name: 'Maa (Village Mother)',
    description: 'Loving Indian village mother figure',
    platforms: ['veo-3.1'],
    genres: ['family-drama', 'village-drama', 'romantic-drama', 'inspirational'],
    character: {
      name: 'Maa',
      role: 'mother',
      physicalDescription: 'Elderly Indian woman with wrinkled caring face, silver hair in bun, kind eyes filled with wisdom and love',
      clothing: 'Simple white cotton saree with thin border, mangalsutra, small gold earrings',
      voiceStyle: 'Soft, loving, trembling with emotion when worried',
      emotionalTraits: ['loving', 'worried', 'supportive', 'sacrificing'],
      catchphrases: ['Beta, sambhal ke!', 'Mera bacha...', 'Bhagwan tumhe rakhe'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'village-villain',
    name: 'Randu Baba (Villain)',
    description: 'Menacing village antagonist',
    platforms: ['veo-3.1'],
    genres: ['village-drama', 'revenge-saga', 'action-thriller'],
    character: {
      name: 'Randu Baba',
      role: 'villain',
      physicalDescription: 'Tall, intimidating man with scarred face, crooked nose, menacing smile revealing gold teeth, dark circles under cruel eyes',
      clothing: 'Black kurta, gold chains, red tilak on forehead, rings on fingers',
      voiceStyle: 'Gravelly, mocking, sinister laughter',
      emotionalTraits: ['cruel', 'greedy', 'power-hungry', 'arrogant'],
      catchphrases: ['Tum mujhse jeetoge?', 'Yeh gaon mera hai!', 'Dekho kaun aaya hai!'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'romantic-lead',
    name: 'Romantic Lead',
    description: 'Charming love interest',
    platforms: ['veo-3.1'],
    genres: ['romantic-drama', 'comedy', 'family-drama'],
    character: {
      name: 'Priya',
      role: 'love-interest',
      physicalDescription: '25-year-old beautiful woman with expressive dark eyes, long flowing black hair, radiant smile, graceful movements',
      clothing: 'Colorful salwar kameez or modern ethnic fusion wear, delicate jewelry, bindis',
      voiceStyle: 'Melodious, playful, emotionally expressive',
      emotionalTraits: ['caring', 'spirited', 'romantic', 'independent'],
      catchphrases: ['Tum samajhte kyun nahi?', 'Dil se bolo...', 'Pyaar mein sab kuch fair hai'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'comedy-sidekick',
    name: 'Comic Relief',
    description: 'Funny best friend character',
    platforms: ['veo-3.1'],
    genres: ['comedy', 'romantic-drama', 'action-thriller'],
    character: {
      name: 'Pappu',
      role: 'sidekick',
      physicalDescription: 'Chubby, friendly-faced young man with curly hair, expressive eyebrows, always smiling, animated gestures',
      clothing: 'Colorful shirt, jeans or dhoti, sneakers, always something slightly mismatched',
      voiceStyle: 'Loud, animated, prone to funny one-liners',
      emotionalTraits: ['funny', 'loyal', 'clumsy', 'brave when needed'],
      catchphrases: ['Bhai bhai bhai!', 'Tension mat le yaar!', 'Kya scene hai!'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'horror-villain',
    name: 'Supernatural Entity',
    description: 'Ghost or demonic presence',
    platforms: ['veo-3.1'],
    genres: ['horror', 'supernatural', 'mystery'],
    character: {
      name: 'Chudail',
      role: 'villain',
      physicalDescription: 'Pale woman with long black hair covering face, unnaturally bent limbs, white saree stained with blood, feet turned backwards, hollow dark eyes',
      clothing: 'Torn white saree, rusted anklets, no shoes - feet backwards',
      voiceStyle: 'Whispered, sometimes shrieking, speaks in riddles',
      emotionalTraits: ['vengeful', 'tragic', 'terrifying', 'ancient'],
      catchphrases: ['Aa... jao...', '[Haunting laughter]', 'Tumne mujhe bhulaya?'],
      visualStyle: 'hyper-realistic'
    }
  },

  // ==========================================
  // UNIVERSAL PRESETS (Work for both platforms)
  // ==========================================
  {
    id: 'detective',
    name: 'Detective',
    description: 'Sharp investigator',
    platforms: ['higgsfield', 'veo-3.1'],
    genres: ['mystery', 'action-thriller', 'horror'],
    character: {
      name: 'Inspector Ray',
      role: 'hero',
      physicalDescription: '40-year-old with weathered face showing years of investigation, sharp observant eyes, slightly disheveled appearance, medium build',
      clothing: 'Worn leather jacket over button-up shirt, dark trousers, comfortable shoes for chasing',
      voiceStyle: 'Measured, analytical, occasionally sarcastic',
      emotionalTraits: ['perceptive', 'persistent', 'troubled', 'just'],
      catchphrases: ['Something doesn\'t add up.', 'The truth always surfaces.', 'I\'ve seen this before.'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'mentor-figure',
    name: 'Wise Mentor',
    description: 'Experienced guide figure',
    platforms: ['higgsfield', 'veo-3.1'],
    genres: ['supernatural', 'action-thriller', 'inspirational', 'family-drama'],
    character: {
      name: 'The Elder',
      role: 'supporting',
      physicalDescription: '65-year-old with silver beard, wise weathered face, calm piercing eyes that have seen much, tall dignified posture despite age',
      clothing: 'Simple but quality clothing appropriate to setting, often carries meaningful object',
      voiceStyle: 'Deep, calming, speaks with weight and wisdom',
      emotionalTraits: ['wise', 'patient', 'mysterious', 'protective'],
      catchphrases: ['When the student is ready...', 'There is more to learn.', 'Trust in yourself.'],
      visualStyle: 'hyper-realistic'
    }
  }
];

// Helper function to get presets filtered by platform and genre
export function getFilteredPresets(platform: VideoPlatform, genre: Genre): ExtendedCharacterPreset[] {
  return characterPresets.filter(preset =>
    preset.platforms.includes(platform) &&
    preset.genres.includes(genre)
  );
}

// Scene presets (kept for reference but can be expanded similarly)
export const scenePresets: ScenePreset[] = [
  {
    id: 'emotional-despair',
    name: 'Emotional Despair',
    description: 'Character in deep emotional pain',
    category: 'emotional',
    template: {
      action: 'sitting alone, head in hands, shoulders shaking with silent sobs',
      camera: {
        shotType: 'medium',
        cameraMovement: 'static',
        angle: 'eye-level',
        lensType: 'normal',
        focusStyle: 'shallow-dof'
      },
      lighting: {
        timeOfDay: 'dusk',
        lightQuality: 'soft',
        lightSource: 'natural',
        mood: 'moody'
      },
      audio: {
        dialogue: '',
        dialogueEmotion: 'sad',
        sfx: ['distant wind', 'leaves rustling'],
        ambientSound: 'quiet evening',
        musicMood: 'melancholic'
      },
      setting: 'isolated space with dramatic lighting',
      duration: 8
    }
  },
  {
    id: 'rage-building',
    name: 'Rage Building',
    description: 'Anger intensifying moment',
    category: 'action',
    template: {
      action: 'clenching fists, veins bulging, eyes glowing with fury, muscles tensing',
      camera: {
        shotType: 'close-up',
        cameraMovement: 'dolly',
        angle: 'low-angle',
        lensType: 'normal',
        focusStyle: 'deep-focus'
      },
      lighting: {
        timeOfDay: 'noon',
        lightQuality: 'hard',
        lightSource: 'natural',
        mood: 'warm'
      },
      audio: {
        dialogue: '',
        dialogueEmotion: 'angry',
        sfx: ['rumbling ground', 'crackling energy'],
        ambientSound: 'tension building',
        musicMood: 'tense'
      },
      setting: 'open ground',
      duration: 8
    }
  },
  {
    id: 'heroic-entrance',
    name: 'Heroic Entrance',
    description: 'Dramatic hero arrival',
    category: 'action',
    template: {
      action: 'walking forward with powerful strides, dust swirling around feet, determined expression',
      camera: {
        shotType: 'wide',
        cameraMovement: 'tracking',
        angle: 'low-angle',
        lensType: 'wide-angle',
        focusStyle: 'deep-focus'
      },
      lighting: {
        timeOfDay: 'golden-hour',
        lightQuality: 'dramatic',
        lightSource: 'backlit',
        mood: 'warm'
      },
      audio: {
        dialogue: '',
        dialogueEmotion: 'determined',
        sfx: ['heavy footsteps', 'wind whooshing'],
        ambientSound: 'crowd murmuring in anticipation',
        musicMood: 'epic'
      },
      setting: 'dramatic arena or open space',
      duration: 8
    }
  },
  {
    id: 'confrontation',
    name: 'Face-to-Face Confrontation',
    description: 'Tense standoff between hero and villain',
    category: 'confrontation',
    template: {
      action: 'standing face to face, inches apart, both refusing to back down',
      camera: {
        shotType: 'two-shot',
        cameraMovement: 'static',
        angle: 'eye-level',
        lensType: 'normal',
        focusStyle: 'deep-focus'
      },
      lighting: {
        timeOfDay: 'noon',
        lightQuality: 'hard',
        lightSource: 'natural',
        mood: 'neutral'
      },
      audio: {
        dialogue: '',
        dialogueEmotion: 'menacing',
        sfx: ['tense silence'],
        ambientSound: 'holding breath',
        musicMood: 'tense'
      },
      setting: 'center of conflict zone',
      duration: 8
    }
  },
  {
    id: 'victory-celebration',
    name: 'Victory Celebration',
    description: 'Triumphant victory moment',
    category: 'victory',
    template: {
      action: 'raising fist in triumph, tears of joy streaming down face',
      camera: {
        shotType: 'wide',
        cameraMovement: 'crane',
        angle: 'low-angle',
        lensType: 'wide-angle',
        focusStyle: 'deep-focus'
      },
      lighting: {
        timeOfDay: 'golden-hour',
        lightQuality: 'soft',
        lightSource: 'natural',
        mood: 'warm'
      },
      audio: {
        dialogue: '',
        dialogueEmotion: 'joyful',
        sfx: ['crowd roaring', 'triumphant drums'],
        ambientSound: 'celebration',
        musicMood: 'triumphant'
      },
      setting: 'arena with celebrating crowd',
      duration: 8
    }
  },
  {
    id: 'emotional-dialogue',
    name: 'Emotional Dialogue',
    description: 'Heartfelt conversation moment',
    category: 'dialogue',
    template: {
      action: 'speaking with trembling voice, eyes glistening with unshed tears',
      camera: {
        shotType: 'close-up',
        cameraMovement: 'static',
        angle: 'eye-level',
        lensType: 'normal',
        focusStyle: 'shallow-dof'
      },
      lighting: {
        timeOfDay: 'dusk',
        lightQuality: 'soft',
        lightSource: 'natural',
        mood: 'warm'
      },
      audio: {
        dialogue: '',
        dialogueEmotion: 'soft',
        sfx: [],
        ambientSound: 'quiet evening',
        musicMood: 'emotional'
      },
      setting: 'intimate indoor space',
      duration: 8
    }
  }
];

export const storyThemes = [
  { id: 'family-honor', name: 'Family Honor', description: 'Protecting family dignity' },
  { id: 'village-justice', name: 'Village Justice', description: 'Fighting corruption in village' },
  { id: 'mothers-love', name: "Mother's Love", description: 'Bond between hero and mother' },
  { id: 'redemption', name: 'Redemption', description: 'Hero overcoming past mistakes' },
  { id: 'underdog-victory', name: 'Underdog Victory', description: 'David vs Goliath story' },
  { id: 'sacrifice', name: 'Sacrifice', description: 'Hero sacrificing for loved ones' }
];

export const settings = [
  'dusty Indian village square',
  'traditional wrestling arena (akhada)',
  'small mud house with thatched roof',
  'village temple courtyard',
  'banyan tree at village center',
  'village well area',
  'narrow village lanes',
  'open fields with mustard crops',
  'riverside ghat',
  'village market'
];

export const sfxOptions = [
  'thunder crack', 'ground rumbling', 'crowd cheering', 'crowd gasping',
  'wind howling', 'temple bells', 'drums beating', 'birds flying away',
  'bones cracking', 'heavy footsteps', 'fabric tearing', 'metal clashing',
  'fire crackling', 'water splashing', 'leaves rustling', 'distant storm'
];
