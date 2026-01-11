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
  // Hindi Viral Character Presets
  // ==========================================

  // GREEN GIANT / HULK STYLE CHARACTERS
  {
    id: 'desi-hulk',
    name: '💚 Desi Hulk (Green Giant)',
    description: 'Viral angry green giant - the OG Hindi shorts character',
    platforms: ['veo-3.1'],
    genres: ['action-thriller', 'family-drama', 'village-drama', 'revenge-saga', 'comedy'],
    character: {
      name: 'Hulk Bhaiya',
      role: 'hero',
      physicalDescription: 'MASSIVE 8-foot tall green-skinned muscular giant with bulging veins visible on arms and neck, thunderous expression, glowing green eyes when angry, incredibly defined muscles, bald head with prominent brow ridge, square jaw clenched in fury',
      clothing: 'Torn purple/brown shorts (dhoti style), thick gold kada on wrists, sacred janeu thread across massive green chest, sometimes kurta torn from transformation',
      voiceStyle: 'THUNDEROUS deep bass voice that shakes the ground. Speaks Hindi with intense emotion. Voice cracks with rage or softens with family love.',
      emotionalTraits: ['explosive anger', 'deeply protective of family', 'simple-hearted', 'unstoppable when Maa is insulted'],
      catchphrases: ['HULK SMASH KARENGE!', 'Meri Maa ko kuch bola?! 😤', 'Ab tumhara kya hoga kaliya!', 'Gaon waalon ko mat chhedo!'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'angry-hulk-variant',
    name: '💚 Rage Mode Hulk',
    description: 'Maximum anger Hulk transformation',
    platforms: ['veo-3.1'],
    genres: ['action-thriller', 'revenge-saga', 'village-drama'],
    character: {
      name: 'Gussa Hulk',
      role: 'hero',
      physicalDescription: 'TERRIFYING green giant at peak rage - veins PULSING green, muscles expanded to maximum size, eyes BLAZING green fire, roaring with mouth wide open showing teeth, ground cracking beneath massive feet',
      clothing: 'Completely shredded shorts barely hanging on, muscles too big for any clothing, green skin glistening with power',
      voiceStyle: 'EARTH-SHAKING ROAR that can be heard across villages. When speaking, voice is pure controlled fury.',
      emotionalTraits: ['UNLIMITED RAGE', 'unstoppable force', 'no mercy for villains', 'protector of innocents'],
      catchphrases: ['RAAAAAAHHHHH! 🔥', 'TUMNE GALTI KI!', 'AB MAARNA PADEGA!', '*ground-shaking roar*'],
      visualStyle: 'hyper-realistic'
    }
  },

  // CLASSIC HINDI DRAMA CHARACTERS
  {
    id: 'thakur-zamindar',
    name: '👑 Thakur Sahab (Village Elder)',
    description: 'Powerful village head/landlord - can be hero or villain',
    platforms: ['veo-3.1'],
    genres: ['village-drama', 'family-drama', 'revenge-saga', 'action-thriller'],
    character: {
      name: 'Thakur Baldev Singh',
      role: 'supporting',
      physicalDescription: '60-year-old imposing man with thick white mustache curled at ends, stern weathered face with deep lines, piercing eyes that command respect, tall proud posture, broad shoulders despite age',
      clothing: 'Crisp white kurta-pajama, Nehru jacket, traditional pagdi (turban), gold pocket watch, walking stick with silver handle, leather juttis',
      voiceStyle: 'Authoritative deep voice with old Hindi dialect. Speaks slowly with weight. Every word is final.',
      emotionalTraits: ['proud', 'traditional values', 'family honor above all', 'respected by village'],
      catchphrases: ['Yeh thakur ka gaon hai!', 'Hamari izzat ka sawaal hai!', 'Beta, zubaan sambhal ke!', 'Hamare khandaan mein...'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'village-mother',
    name: '🙏 Maa (Village Mother)',
    description: 'Loving sacrificing Indian mother - emotional core',
    platforms: ['veo-3.1'],
    genres: ['family-drama', 'village-drama', 'romantic-drama', 'inspirational'],
    character: {
      name: 'Maa',
      role: 'mother',
      physicalDescription: 'Elderly Indian woman with wrinkled caring face full of love and worry, silver-grey hair in simple bun, kind moist eyes that have cried many tears, thin frail body that has worked hard all life, gentle trembling hands',
      clothing: 'Simple white cotton saree with thin colored border, old mangalsutra, small gold nose pin, sindoor in hair parting, worn silver toe rings',
      voiceStyle: 'Soft trembling voice full of love. Breaks when worried. Sings old bhajans. Prays constantly for children.',
      emotionalTraits: ['unconditional love', 'constant worry', 'silent sacrifice', 'praying for family', 'tears of joy and sorrow'],
      catchphrases: ['Mere laal... 🥺', 'Bhagwan tumhe salamat rakhe!', 'Beta, khana kha le!', 'Main tere liye roti banaungi!', 'Meri aankhen bhar aayin...'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'angry-sasur',
    name: '😤 Angry Sasur (Father-in-law)',
    description: 'Strict disapproving father-in-law',
    platforms: ['veo-3.1'],
    genres: ['family-drama', 'comedy', 'romantic-drama'],
    character: {
      name: 'Sharma Ji',
      role: 'supporting',
      physicalDescription: '55-year-old stern man with receding hairline, thick glasses, permanent frown lines, pot belly from sitting in office, moustache always twitching with disapproval, wagging finger',
      clothing: 'Safari suit or formal pants with tucked-in half-sleeve shirt, leather belt, chappal at home, watch that he checks often',
      voiceStyle: 'Loud complaining voice. Expert at taunts. Sighs dramatically. Compares everyone to Sharmaji ka beta.',
      emotionalTraits: ['perpetually disappointed', 'traditional mindset', 'status conscious', 'secretly caring'],
      catchphrases: ['Aaj kal ke bacche!', 'Hamare zamane mein...', 'Sharmaji ka beta toh...', 'Kya bana rakha hai zindagi ko!', 'Izzat ka sawaal hai!'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'gossip-aunty',
    name: '🗣️ Gossip Aunty',
    description: 'Nosy neighborhood aunty who knows everything',
    platforms: ['veo-3.1'],
    genres: ['comedy', 'family-drama', 'romantic-drama', 'village-drama'],
    character: {
      name: 'Pammi Aunty',
      role: 'supporting',
      physicalDescription: '50-year-old plump woman with overly curious expressions, eyes always darting around for gossip, fake sweet smile, heavy makeup, dyed black hair, loud jewelry that jingles when she walks',
      clothing: 'Bright colored synthetic saree, too much gold jewelry, large bindi, flashy designer purse, chappals with small heels',
      voiceStyle: 'Loud whisper that everyone can hear. Expert at "maine suna hai..." Fake concern voice. Dramatic gasps.',
      emotionalTraits: ['extremely nosy', 'fake sympathy', 'loves drama', 'spreads rumors', 'secretly jealous'],
      catchphrases: ['Arey maine suna hai ki...', 'Chalo koi baat nahi... 👀', 'Unke ghar mein kuch chal raha hai!', 'Main toh bas bol rahi thi...', 'Suno suno! Breaking news!'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'village-pehlwan',
    name: '💪 Pehlwan (Village Strongman)',
    description: 'Traditional Indian wrestler - loyal hero or henchman',
    platforms: ['veo-3.1'],
    genres: ['action-thriller', 'village-drama', 'comedy', 'revenge-saga'],
    character: {
      name: 'Dara Pehlwan',
      role: 'sidekick',
      physicalDescription: 'HUGE barrel-chested man with thick neck, cauliflower ears from wrestling, massive forearms covered in thick hair, friendly simple face, shaved head or short hair, handlebar moustache',
      clothing: 'Traditional langot (wrestling underwear) for akhada, or simple kurta-dhoti that struggles to contain muscles, kada on biceps, janeu thread',
      voiceStyle: 'Booming friendly voice. Simple Hindi. Laughs from belly. Loyal to death.',
      emotionalTraits: ['loyal like dog', 'simple-minded', 'incredible strength', 'gentle giant', 'loves food'],
      catchphrases: ['Bhaiya ne bola toh ho gaya!', 'KUSHTI KAROGE?!', 'Doodh piyo takat aayegi!', 'Main hoon na!', '*cracks knuckles*'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'chotu-kid',
    name: '👦 Chotu (Innocent Kid)',
    description: 'Cute innocent child - emotional trigger',
    platforms: ['veo-3.1'],
    genres: ['family-drama', 'village-drama', 'comedy', 'inspirational'],
    character: {
      name: 'Chotu',
      role: 'sidekick',
      physicalDescription: '8-year-old innocent village boy with big curious eyes, messy hair, missing front tooth, dirt on cheeks from playing, skinny build, always running around barefoot',
      clothing: 'Oversized hand-me-down shorts, faded t-shirt too big for him, sometimes school uniform that\'s seen better days, no shoes or old chappals',
      voiceStyle: 'High-pitched innocent voice full of wonder. Asks too many questions. Cries easily but also laughs easily.',
      emotionalTraits: ['pure innocence', 'curious about everything', 'attached to hero', 'easily scared', 'brave when needed'],
      catchphrases: ['Bhaiya! Bhaiya!', 'Mujhe bhi le chalo!', 'Kyun bhaiya?', 'Main bhi bada ho ke Hulk banunga!', 'Maa ko mat darao!'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'chai-wala',
    name: '☕ Chai Wala (Tea Vendor)',
    description: 'Wise tea seller who knows village secrets',
    platforms: ['veo-3.1'],
    genres: ['village-drama', 'comedy', 'mystery', 'family-drama'],
    character: {
      name: 'Ramu Chaiwala',
      role: 'supporting',
      physicalDescription: '45-year-old thin wiry man with knowing smile, squinting eyes from smoke, stained hands from tea-making, cloth over shoulder, balding with few grey hairs, always has a beedi behind ear',
      clothing: 'Worn vest over faded shirt, lungi, rubber chappals, dirty apron, towel on shoulder',
      voiceStyle: 'Philosophical tone. Drops wisdom between chai orders. Knows everyone\'s secrets but pretends not to.',
      emotionalTraits: ['secretly wise', 'observant', 'neutral to all', 'keeper of secrets', 'subtle humor'],
      catchphrases: ['Chai peelo, sab theek ho jayega!', 'Maine bahut dekha hai sahab...', 'Cutting chai! Ekdum kadak!', 'Is gaon mein sab pata hai mujhe...', 'Chai aur zindagi - dono ka taste time se aata hai'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'drunk-comic',
    name: '🍺 Bewda (Town Drunk)',
    description: 'Comic relief drunk character',
    platforms: ['veo-3.1'],
    genres: ['comedy', 'village-drama', 'family-drama'],
    character: {
      name: 'Phukni Kaka',
      role: 'sidekick',
      physicalDescription: 'Middle-aged man always swaying, red nose, bleary unfocused eyes, patchy stubble, disheveled hair going in all directions, skinny with pot belly, always holding onto something for balance',
      clothing: 'Crumpled dirty shirt half-tucked, pants held up by rope, one chappal missing, vest visible',
      voiceStyle: 'Slurred speech with occasional clarity. Hiccups between words. Sometimes surprisingly profound. Sings off-key.',
      emotionalTraits: ['accidentally wise', 'comic timing', 'loyal friend', 'tragic backstory', 'heart of gold'],
      catchphrases: ['*hic* Main... main batata hoon...', 'Ek aur peg se sab clear!', 'Shaadi se pehle aisa nahi tha main...', 'Oye! Main sab dekh raha hoon! *falls*', 'Zindagi... *hic*... kya cheez hai!'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'local-goon',
    name: '😈 Local Goon (Gunda)',
    description: 'Village bully/henchman',
    platforms: ['veo-3.1'],
    genres: ['action-thriller', 'village-drama', 'revenge-saga'],
    character: {
      name: 'Bablu Gunda',
      role: 'villain',
      physicalDescription: 'Muscular intimidating man with permanent sneer, gold chain visible, scarred eyebrow, stubble, dark circles from late nights, always cracking knuckles, walks with swagger',
      clothing: 'Tight black t-shirt showing muscles, jeans, sports shoes, gold bracelet, sometimes leather jacket even in heat',
      voiceStyle: 'Threatening low voice. Laughs before violence. Talks with hand gestures. Spits when angry.',
      emotionalTraits: ['enjoys intimidation', 'loyal to boss', 'cowardly alone', 'bullying nature'],
      catchphrases: ['Paise de warna...', 'Boss ne bheja hai!', 'Bahut attitude hai tujhme!', '*cracks knuckles* Samjha?', 'Bada aadmi ban raha hai!'],
      visualStyle: 'hyper-realistic'
    }
  },
  {
    id: 'drama-queen',
    name: '😭 Drama Queen (Overacting Aunty)',
    description: 'Over-dramatic woman who cries at everything',
    platforms: ['veo-3.1'],
    genres: ['comedy', 'family-drama', 'romantic-drama'],
    character: {
      name: 'Kamini Bua',
      role: 'supporting',
      physicalDescription: '55-year-old woman with theatrical expressions, hand always on forehead or heart, eyes that can produce tears instantly, loud gasping mouth, heavy frame that heaves with sobs',
      clothing: 'Simple saree but always holding pallu to dab eyes, minimal jewelry, bindi slightly smudged from crying',
      voiceStyle: 'EXTREMELY dramatic with voice cracks. Can go from zero to wailing in seconds. Talks to god directly.',
      emotionalTraits: ['extreme overreaction', 'attention-seeking', 'genuinely caring underneath', 'creates drama'],
      catchphrases: ['HAI RAAM! 😭', 'Main mar jaungi!', 'Meri kismat hi phooti hai!', 'Bhagwan! Yeh kya dekh liya!', '*dramatic faint* Paani... paani do!'],
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
