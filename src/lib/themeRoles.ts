import { Character, Genre } from '@/types';

// Dynamic role options based on theme
export interface ThemeRoleOption {
  value: Character['role'];
  label: string;
  description: string;
}

// Theme keywords to role mappings
// Each theme maps to thematic role labels while keeping the underlying role type
type ThemeRoleMapping = Record<Character['role'], { label: string; description: string }>;

// Default roles (fallback)
const defaultRoles: ThemeRoleMapping = {
  'hero': { label: 'Hero', description: 'Main protagonist' },
  'villain': { label: 'Villain', description: 'Main antagonist' },
  'love-interest': { label: 'Love Interest', description: 'Romantic partner' },
  'mother': { label: 'Mother Figure', description: 'Maternal figure' },
  'sidekick': { label: 'Sidekick', description: 'Hero\'s ally' },
  'supporting': { label: 'Supporting', description: 'Side character' },
  'crowd': { label: 'Extra', description: 'Background character' }
};

// ==========================================
// SUPERNATURAL / SCI-FI THEMES
// ==========================================

const magicalPowersRoles: ThemeRoleMapping = {
  'hero': { label: 'Chosen One', description: 'Person with awakened magical powers' },
  'villain': { label: 'Dark Sorcerer', description: 'Seeks to corrupt or steal the magic' },
  'love-interest': { label: 'Enchantress', description: 'Magical romantic connection' },
  'mother': { label: 'Oracle', description: 'Keeper of ancient magical secrets' },
  'sidekick': { label: 'Familiar', description: 'Magical companion or apprentice' },
  'supporting': { label: 'Mystical Mentor', description: 'Guides the hero\'s powers' },
  'crowd': { label: 'Villagers', description: 'Those affected by magic' }
};

const demonHunterRoles: ThemeRoleMapping = {
  'hero': { label: 'Demon Hunter', description: 'Warrior against supernatural evil' },
  'villain': { label: 'Demon Lord', description: 'Ancient evil entity' },
  'love-interest': { label: 'Cursed Soul', description: 'Someone bound to the supernatural' },
  'mother': { label: 'Spirit Guide', description: 'Ancestral protector spirit' },
  'sidekick': { label: 'Tech Exorcist', description: 'Modern supernatural tech specialist' },
  'supporting': { label: 'Priest/Shaman', description: 'Religious or spiritual guide' },
  'crowd': { label: 'Possessed', description: 'Innocent victims' }
};

const guardianSpiritRoles: ThemeRoleMapping = {
  'hero': { label: 'Protected One', description: 'Person guarded by the spirit' },
  'villain': { label: 'Shadow Entity', description: 'Dark force threatening the family' },
  'love-interest': { label: 'Spirit Medium', description: 'Can communicate with the guardian' },
  'mother': { label: 'Guardian Spirit', description: 'Protective ancestral presence' },
  'sidekick': { label: 'Sensitive Child', description: 'Young one who can see spirits' },
  'supporting': { label: 'Skeptic', description: 'Doesn\'t believe until they witness' },
  'crowd': { label: 'Family', description: 'Those under protection' }
};

const reincarnationRoles: ThemeRoleMapping = {
  'hero': { label: 'Reborn Soul', description: 'Person discovering past life' },
  'villain': { label: 'Past Enemy', description: 'Adversary from previous life' },
  'love-interest': { label: 'Twin Flame', description: 'Love across lifetimes' },
  'mother': { label: 'Past Life Mother', description: 'Connection through incarnations' },
  'sidekick': { label: 'Memory Keeper', description: 'Helps unlock past memories' },
  'supporting': { label: 'Regression Expert', description: 'Guides through past lives' },
  'crowd': { label: 'Past Connections', description: 'People from previous life' }
};

// ==========================================
// ACTION / THRILLER THEMES
// ==========================================

const oneManArmyRoles: ThemeRoleMapping = {
  'hero': { label: 'Lone Warrior', description: 'One-man army against all odds' },
  'villain': { label: 'Crime Boss', description: 'Ruthless syndicate leader' },
  'love-interest': { label: 'Informant', description: 'Dangerous romantic ally' },
  'mother': { label: 'Hostage', description: 'Family member in danger' },
  'sidekick': { label: 'Arms Dealer', description: 'Weapons and intel supplier' },
  'supporting': { label: 'Corrupt Cop', description: 'Enemy within the system' },
  'crowd': { label: 'Henchmen', description: 'Syndicate soldiers' }
};

const conspiracyRoles: ThemeRoleMapping = {
  'hero': { label: 'Whistleblower', description: 'Exposed to deadly secrets' },
  'villain': { label: 'Shadow Director', description: 'Mastermind behind the conspiracy' },
  'love-interest': { label: 'Double Agent', description: 'Ally with hidden loyalties' },
  'mother': { label: 'Witness', description: 'Innocent caught in the web' },
  'sidekick': { label: 'Hacker', description: 'Digital warfare specialist' },
  'supporting': { label: 'Deep Throat', description: 'Secret informant' },
  'crowd': { label: 'Operatives', description: 'Conspiracy agents' }
};

const raceAgainstTimeRoles: ThemeRoleMapping = {
  'hero': { label: 'Desperate Father', description: 'Racing to save family' },
  'villain': { label: 'Kidnapper', description: 'Holds leverage over the hero' },
  'love-interest': { label: 'Partner', description: 'Spouse working to help' },
  'mother': { label: 'Grandmother', description: 'Wise family elder' },
  'sidekick': { label: 'Tech Expert', description: 'Tracking and communication' },
  'supporting': { label: 'Negotiator', description: 'Trying peaceful resolution' },
  'crowd': { label: 'Hostages', description: 'Those in danger' }
};

const undercoverRoles: ThemeRoleMapping = {
  'hero': { label: 'Undercover Agent', description: 'Deep in enemy territory' },
  'villain': { label: 'Target', description: 'Criminal being investigated' },
  'love-interest': { label: 'Handler', description: 'Agency contact and love' },
  'mother': { label: 'Cover Family', description: 'Fake family for cover' },
  'sidekick': { label: 'Rookie Partner', description: 'New agent learning ropes' },
  'supporting': { label: 'Suspicious Lieutenant', description: 'Starts doubting the mole' },
  'crowd': { label: 'Gang Members', description: 'Criminal organization' }
};

// ==========================================
// HORROR THEMES
// ==========================================

const hauntedHomeRoles: ThemeRoleMapping = {
  'hero': { label: 'New Owner', description: 'Moved into the haunted property' },
  'villain': { label: 'Vengeful Spirit', description: 'Ghost bound to the house' },
  'love-interest': { label: 'Paranormal Expert', description: 'Helps investigate' },
  'mother': { label: 'Previous Victim', description: 'Spirit of former resident' },
  'sidekick': { label: 'Sensitive Child', description: 'Can see and hear spirits' },
  'supporting': { label: 'Local Historian', description: 'Knows the dark history' },
  'crowd': { label: 'Neighborhood', description: 'Locals who warned them' }
};

const villageCurseRoles: ThemeRoleMapping = {
  'hero': { label: 'Outsider', description: 'Newcomer who breaks the curse' },
  'villain': { label: 'Curse Bearer', description: 'Entity enforcing the curse' },
  'love-interest': { label: 'Village Maiden', description: 'Local who helps outsider' },
  'mother': { label: 'Village Elder', description: 'Knows the curse origin' },
  'sidekick': { label: 'Brave Youth', description: 'Young villager who believes' },
  'supporting': { label: 'Priest', description: 'Spiritual protection' },
  'crowd': { label: 'Cursed Villagers', description: 'Those suffering' }
};

const possessedRoles: ThemeRoleMapping = {
  'hero': { label: 'Loving Family Member', description: 'Fighting to save possessed' },
  'villain': { label: 'Demon', description: 'Entity possessing the victim' },
  'love-interest': { label: 'Possessed One', description: 'Victim of possession' },
  'mother': { label: 'Praying Mother', description: 'Faith-driven protector' },
  'sidekick': { label: 'Young Exorcist', description: 'Inexperienced but brave' },
  'supporting': { label: 'Senior Exorcist', description: 'Experienced demon fighter' },
  'crowd': { label: 'Congregation', description: 'Prayer support' }
};

const supernaturalRevengeRoles: ThemeRoleMapping = {
  'hero': { label: 'Innocent Target', description: 'Wrongly targeted by spirit' },
  'villain': { label: 'Avenging Ghost', description: 'Spirit seeking justice' },
  'love-interest': { label: 'Psychic', description: 'Can communicate with spirit' },
  'mother': { label: 'Guilty Ancestor', description: 'Original wrongdoer\'s descendent' },
  'sidekick': { label: 'Believer Friend', description: 'Helps investigate the past' },
  'supporting': { label: 'Occult Expert', description: 'Understands spirit laws' },
  'crowd': { label: 'Other Targets', description: 'Connected to original crime' }
};

// ==========================================
// ROMANTIC DRAMA THEMES
// ==========================================

const tragicLoveRoles: ThemeRoleMapping = {
  'hero': { label: 'Star-Crossed Lover', description: 'Love despite all odds' },
  'villain': { label: 'Obstacle', description: 'Person preventing the union' },
  'love-interest': { label: 'Soulmate', description: 'The forbidden love' },
  'mother': { label: 'Disapproving Mother', description: 'Family opposition' },
  'sidekick': { label: 'Best Friend', description: 'Helps lovers meet secretly' },
  'supporting': { label: 'Wise Elder', description: 'Understands true love' },
  'crowd': { label: 'Society', description: 'Judgmental community' }
};

const childhoodSweetheartsRoles: ThemeRoleMapping = {
  'hero': { label: 'Returning Love', description: 'Back after years apart' },
  'villain': { label: 'Rival Suitor', description: 'Current romantic competition' },
  'love-interest': { label: 'First Love', description: 'Childhood sweetheart' },
  'mother': { label: 'Matchmaker Mom', description: 'Trying to reunite them' },
  'sidekick': { label: 'Childhood Friend', description: 'Remembers their bond' },
  'supporting': { label: 'Ex-Partner', description: 'Current complicated relationship' },
  'crowd': { label: 'School Friends', description: 'From the old days' }
};

const classBarrierRoles: ThemeRoleMapping = {
  'hero': { label: 'Lower Class Hero', description: 'Love beyond social status' },
  'villain': { label: 'Elitist Father', description: 'Guards family status' },
  'love-interest': { label: 'Rich Beloved', description: 'Wealthy but in love' },
  'mother': { label: 'Working Mother', description: 'Proud of humble origins' },
  'sidekick': { label: 'Loyal Friend', description: 'Supports despite differences' },
  'supporting': { label: 'Progressive Elder', description: 'Believes in equality' },
  'crowd': { label: 'High Society', description: 'Judgmental elite' }
};

const secondChanceRoles: ThemeRoleMapping = {
  'hero': { label: 'Divorced/Widowed', description: 'Afraid to love again' },
  'villain': { label: 'Past Trauma', description: 'Memories holding back' },
  'love-interest': { label: 'New Love', description: 'Patient understanding partner' },
  'mother': { label: 'Supportive Parent', description: 'Encourages moving on' },
  'sidekick': { label: 'Child', description: 'Accepts new relationship' },
  'supporting': { label: 'Therapist/Friend', description: 'Helps process past' },
  'crowd': { label: 'Family', description: 'Mixed reactions' }
};

// ==========================================
// REVENGE SAGA THEMES
// ==========================================

const avengeHonorRoles: ThemeRoleMapping = {
  'hero': { label: 'Avenging Brother', description: 'Fighting for family honor' },
  'villain': { label: 'Perpetrator', description: 'One who dishonored the family' },
  'love-interest': { label: 'Victim', description: 'The wronged family member' },
  'mother': { label: 'Grieving Mother', description: 'Demands justice' },
  'sidekick': { label: 'Loyal Cousin', description: 'Helps in the mission' },
  'supporting': { label: 'Corrupt Authority', description: 'Failed to provide justice' },
  'crowd': { label: 'Village Council', description: 'Society that watches' }
};

const returnToDestroyRoles: ThemeRoleMapping = {
  'hero': { label: 'Returning Son', description: 'Back for vengeance' },
  'villain': { label: 'Corrupt Patriarch', description: 'Family head who wronged' },
  'love-interest': { label: 'Ally Within', description: 'Family member who helps' },
  'mother': { label: 'Abandoned Mother', description: 'Was also wronged' },
  'sidekick': { label: 'Childhood Servant', description: 'Loyal since youth' },
  'supporting': { label: 'Evidence Holder', description: 'Has proof of crimes' },
  'crowd': { label: 'Estate Workers', description: 'Oppressed employees' }
};

const wronglyAccusedRoles: ThemeRoleMapping = {
  'hero': { label: 'Innocent Convict', description: 'Falsely imprisoned, now free' },
  'villain': { label: 'True Culprit', description: 'The one who framed hero' },
  'love-interest': { label: 'Faithful Partner', description: 'Never gave up hope' },
  'mother': { label: 'Dying Mother', description: 'Motivation for clearing name' },
  'sidekick': { label: 'Prison Friend', description: 'Met inside, helps outside' },
  'supporting': { label: 'Honest Lawyer', description: 'Fights for justice' },
  'crowd': { label: 'Jury/Public', description: 'Those who judged wrong' }
};

const villageHeroRoles: ThemeRoleMapping = {
  'hero': { label: 'Village Champion', description: 'Stands for the oppressed' },
  'villain': { label: 'Corrupt Landlord', description: 'Exploits the village' },
  'love-interest': { label: 'Landlord\'s Daughter', description: 'Forbidden love' },
  'mother': { label: 'Village Mother', description: 'Represents the people' },
  'sidekick': { label: 'Young Rebel', description: 'Inspired follower' },
  'supporting': { label: 'Wise Panchayat Head', description: 'Neutral authority' },
  'crowd': { label: 'Villagers', description: 'The oppressed masses' }
};

// ==========================================
// MYSTERY THEMES
// ==========================================

const lockedRoomRoles: ThemeRoleMapping = {
  'hero': { label: 'Detective', description: 'Solving the impossible crime' },
  'villain': { label: 'Killer', description: 'Mastermind of locked room' },
  'love-interest': { label: 'Prime Suspect', description: 'Innocent but suspicious' },
  'mother': { label: 'Victim\'s Spouse', description: 'Hiding secrets' },
  'sidekick': { label: 'Assistant', description: 'Helps gather clues' },
  'supporting': { label: 'Forensic Expert', description: 'Provides evidence' },
  'crowd': { label: 'Suspects', description: 'Everyone had motive' }
};

const disappearanceRoles: ThemeRoleMapping = {
  'hero': { label: 'Investigator', description: 'Searching for the missing' },
  'villain': { label: 'Abductor', description: 'Behind the disappearance' },
  'love-interest': { label: 'Missing Person\'s Love', description: 'Desperate to find them' },
  'mother': { label: 'Missing Person', description: 'The vanished one' },
  'sidekick': { label: 'Local Guide', description: 'Knows the area' },
  'supporting': { label: 'Last Witness', description: 'Saw something important' },
  'crowd': { label: 'Search Party', description: 'Community helpers' }
};

const treasureHuntRoles: ThemeRoleMapping = {
  'hero': { label: 'Treasure Hunter', description: 'Seeking the hidden fortune' },
  'villain': { label: 'Rival Hunter', description: 'Competing for the prize' },
  'love-interest': { label: 'Historian', description: 'Decodes the clues' },
  'mother': { label: 'Original Owner\'s Heir', description: 'Rightful claimant' },
  'sidekick': { label: 'Tech Expert', description: 'Modern tools for old mystery' },
  'supporting': { label: 'Museum Curator', description: 'Knows the artifacts' },
  'crowd': { label: 'Expedition Team', description: 'Support crew' }
};

const familySecretsRoles: ThemeRoleMapping = {
  'hero': { label: 'Truth Seeker', description: 'Uncovering family lies' },
  'villain': { label: 'Secret Keeper', description: 'Will kill to hide truth' },
  'love-interest': { label: 'Outsider Ally', description: 'Helps without bias' },
  'mother': { label: 'Matriarch', description: 'Holds the biggest secrets' },
  'sidekick': { label: 'Curious Cousin', description: 'Also wants the truth' },
  'supporting': { label: 'Family Lawyer', description: 'Knows the paperwork' },
  'crowd': { label: 'Extended Family', description: 'All have pieces' }
};

// ==========================================
// COMEDY THEMES
// ==========================================

const mistakenIdentityRoles: ThemeRoleMapping = {
  'hero': { label: 'Wrong Person', description: 'Mistaken for someone else' },
  'villain': { label: 'Real Target', description: 'The actual person being sought' },
  'love-interest': { label: 'Confused Lover', description: 'Attracted to wrong one' },
  'mother': { label: 'Oblivious Mom', description: 'Makes it worse' },
  'sidekick': { label: 'Enabler Friend', description: 'Encourages the deception' },
  'supporting': { label: 'Almost Discoverer', description: 'Keeps almost finding out' },
  'crowd': { label: 'Confused Crowd', description: 'Add to the chaos' }
};

const weddingDisasterRoles: ThemeRoleMapping = {
  'hero': { label: 'Panicking Bride/Groom', description: 'Nothing going right' },
  'villain': { label: 'Ex-Partner', description: 'Trying to stop wedding' },
  'love-interest': { label: 'Patient Partner', description: 'Trying to stay calm' },
  'mother': { label: 'Overbearing MIL', description: 'Making demands' },
  'sidekick': { label: 'Best Man/Maid', description: 'Damage control' },
  'supporting': { label: 'Wedding Planner', description: 'Having a breakdown' },
  'crowd': { label: 'Wedding Guests', description: 'Witnessing chaos' }
};

const officePranksRoles: ThemeRoleMapping = {
  'hero': { label: 'Office Prankster', description: 'Takes it too far' },
  'villain': { label: 'Strict Boss', description: 'Target of pranks' },
  'love-interest': { label: 'HR Person', description: 'Attracted to troublemaker' },
  'mother': { label: 'Office Mom', description: 'Tries to keep peace' },
  'sidekick': { label: 'Accomplice', description: 'Partner in crime' },
  'supporting': { label: 'Snitch Coworker', description: 'Almost tells boss' },
  'crowd': { label: 'Office Staff', description: 'Entertained witnesses' }
};

const familyReunionRoles: ThemeRoleMapping = {
  'hero': { label: 'Peacemaker', description: 'Trying to unite family' },
  'villain': { label: 'Troublemaker Relative', description: 'Stirs up old drama' },
  'love-interest': { label: 'Plus One', description: 'Meeting the chaos family' },
  'mother': { label: 'Dramatic Aunt', description: 'Center of attention seeker' },
  'sidekick': { label: 'Favorite Cousin', description: 'Only sane one' },
  'supporting': { label: 'Eccentric Grandparent', description: 'Says inappropriate things' },
  'crowd': { label: 'Relatives', description: 'Assorted crazy family' }
};

// ==========================================
// FAMILY DRAMA THEMES
// ==========================================

const mothersSacrificeRoles: ThemeRoleMapping = {
  'hero': { label: 'Sacrificing Mother', description: 'Gives everything for children' },
  'villain': { label: 'Ungrateful Child', description: 'Takes mother for granted' },
  'love-interest': { label: 'Supportive Father', description: 'Sees her struggle' },
  'mother': { label: 'Grandmother', description: 'Wisdom from experience' },
  'sidekick': { label: 'Grateful Child', description: 'Appreciates the sacrifice' },
  'supporting': { label: 'Neighbor', description: 'Witnesses the struggle' },
  'crowd': { label: 'Society', description: 'Judges the family' }
};

const brotherBetrayalRoles: ThemeRoleMapping = {
  'hero': { label: 'Betrayed Brother', description: 'Seeking reconciliation' },
  'villain': { label: 'Betrayer Brother', description: 'Chose wrong path' },
  'love-interest': { label: 'Wife Caught Between', description: 'Loves both brothers' },
  'mother': { label: 'Torn Mother', description: 'Loves both sons' },
  'sidekick': { label: 'Loyal Friend', description: 'Supports the wronged' },
  'supporting': { label: 'Mediator Uncle', description: 'Tries to unite' },
  'crowd': { label: 'Family Members', description: 'Taking sides' }
};

const fatherReturnsRoles: ThemeRoleMapping = {
  'hero': { label: 'Returning Father', description: 'Seeking forgiveness' },
  'villain': { label: 'Angry Child', description: 'Can\'t forgive abandonment' },
  'love-interest': { label: 'Ex-Wife', description: 'Complex feelings' },
  'mother': { label: 'Mother', description: 'Raised kids alone' },
  'sidekick': { label: 'Forgiving Child', description: 'Wants family whole' },
  'supporting': { label: 'Family Friend', description: 'Saw the whole history' },
  'crowd': { label: 'Extended Family', description: 'Mixed opinions' }
};

const jointFamilyRoles: ThemeRoleMapping = {
  'hero': { label: 'Peacekeeper', description: 'Trying to hold family together' },
  'villain': { label: 'Greedy Relative', description: 'Wants property split' },
  'love-interest': { label: 'New Bride', description: 'Learning family dynamics' },
  'mother': { label: 'Matriarch', description: 'Head of the household' },
  'sidekick': { label: 'Youngest Sibling', description: 'Caught in middle' },
  'supporting': { label: 'Patriarch', description: 'Fading authority' },
  'crowd': { label: 'Household', description: 'Servants and relatives' }
};

// ==========================================
// INSPIRATIONAL THEMES
// ==========================================

const poorBoyChampionRoles: ThemeRoleMapping = {
  'hero': { label: 'Underdog', description: 'Rising from poverty to glory' },
  'villain': { label: 'Privileged Rival', description: 'Born with advantages' },
  'love-interest': { label: 'Believer', description: 'Sees potential in hero' },
  'mother': { label: 'Struggling Mother', description: 'Works to support dreams' },
  'sidekick': { label: 'Coach/Mentor', description: 'Trains the champion' },
  'supporting': { label: 'Sponsor', description: 'Provides opportunity' },
  'crowd': { label: 'Fans', description: 'Growing supporters' }
};

const singleMotherRoles: ThemeRoleMapping = {
  'hero': { label: 'Single Mother', description: 'Fighting for children\'s future' },
  'villain': { label: 'Corrupt System', description: 'Barriers to success' },
  'love-interest': { label: 'Supportive Partner', description: 'New relationship' },
  'mother': { label: 'Her Mother', description: 'Helps with children' },
  'sidekick': { label: 'Eldest Child', description: 'Mature beyond years' },
  'supporting': { label: 'Kind Employer', description: 'Gives opportunity' },
  'crowd': { label: 'Community', description: 'Mixed support' }
};

const disabledHeroRoles: ThemeRoleMapping = {
  'hero': { label: 'Differently Abled Hero', description: 'Proving doubters wrong' },
  'villain': { label: 'Doubter', description: 'Says they can\'t succeed' },
  'love-interest': { label: 'Equal Partner', description: 'Loves without pity' },
  'mother': { label: 'Protective Mother', description: 'Fears and hopes' },
  'sidekick': { label: 'Supportive Friend', description: 'Treats them normally' },
  'supporting': { label: 'Inspiring Role Model', description: 'Succeeded before' },
  'crowd': { label: 'Society', description: 'Learns to accept' }
};

const villageGirlDreamsRoles: ThemeRoleMapping = {
  'hero': { label: 'Ambitious Girl', description: 'Dreams beyond village' },
  'villain': { label: 'Tradition Enforcer', description: 'Says girls can\'t dream' },
  'love-interest': { label: 'Progressive Partner', description: 'Supports her dreams' },
  'mother': { label: 'Conflicted Mother', description: 'Between tradition and child' },
  'sidekick': { label: 'Best Friend', description: 'Escapes with her' },
  'supporting': { label: 'City Mentor', description: 'Guides in new world' },
  'crowd': { label: 'Village Elders', description: 'Disapproving council' }
};

// ==========================================
// VILLAGE DRAMA THEMES
// ==========================================

const landDisputeRoles: ThemeRoleMapping = {
  'hero': { label: 'Rightful Owner', description: 'Fighting for ancestral land' },
  'villain': { label: 'Land Grabber', description: 'Powerful and corrupt' },
  'love-interest': { label: 'Enemy\'s Child', description: 'Love across conflict' },
  'mother': { label: 'Widow', description: 'Defending family land alone' },
  'sidekick': { label: 'Lawyer', description: 'Fighting legally' },
  'supporting': { label: 'Corrupt Official', description: 'Taking bribes' },
  'crowd': { label: 'Villagers', description: 'Affected by dispute' }
};

const clanLoveRoles: ThemeRoleMapping = {
  'hero': { label: 'Romeo', description: 'Loves across clan lines' },
  'villain': { label: 'Clan Head', description: 'Forbids the union' },
  'love-interest': { label: 'Juliet', description: 'From enemy clan' },
  'mother': { label: 'Sympathetic Mother', description: 'Secretly supports love' },
  'sidekick': { label: 'Messenger', description: 'Carries secret notes' },
  'supporting': { label: 'Village Elder', description: 'Remembers old peace' },
  'crowd': { label: 'Both Clans', description: 'Historical enemies' }
};

const returningSonRoles: ThemeRoleMapping = {
  'hero': { label: 'City-Returned Son', description: 'Brings modern ideas' },
  'villain': { label: 'Tradition Guard', description: 'Resists all change' },
  'love-interest': { label: 'Progressive Woman', description: 'Supports change' },
  'mother': { label: 'Hopeful Mother', description: 'Wants son to stay' },
  'sidekick': { label: 'Young Supporter', description: 'Embraces new ways' },
  'supporting': { label: 'Wise Elder', description: 'Balance old and new' },
  'crowd': { label: 'Villagers', description: 'Divided on change' }
};

const widowRightsRoles: ThemeRoleMapping = {
  'hero': { label: 'Fighting Widow', description: 'Demanding her rights' },
  'villain': { label: 'Greedy In-Laws', description: 'Taking her property' },
  'love-interest': { label: 'Supportive Ally', description: 'Stands with her' },
  'mother': { label: 'Her Mother', description: 'Wants daughter home' },
  'sidekick': { label: 'Woman Lawyer', description: 'Takes her case' },
  'supporting': { label: 'NGO Worker', description: 'Spreads awareness' },
  'crowd': { label: 'Other Widows', description: 'United in struggle' }
};

// ==========================================
// THEME TO ROLES MAPPING
// ==========================================

// Map theme strings to role mappings
const themeToRolesMap: Record<string, ThemeRoleMapping> = {
  // Supernatural
  'magical powers awakened': magicalPowersRoles,
  'demon hunter in modern times': demonHunterRoles,
  'guardian spirit protects family': guardianSpiritRoles,
  'reincarnation and destiny': reincarnationRoles,

  // Action Thriller
  'one man army against a crime syndicate': oneManArmyRoles,
  'escape from a deadly conspiracy': conspiracyRoles,
  'race against time to save family': raceAgainstTimeRoles,
  'undercover mission gone wrong': undercoverRoles,

  // Horror
  'haunted ancestral home': hauntedHomeRoles,
  'village curse awakens': villageCurseRoles,
  'possessed family member': possessedRoles,
  'supernatural revenge': supernaturalRevengeRoles,

  // Romantic Drama
  'a love story with a tragic twist': tragicLoveRoles,
  'childhood sweethearts reunited after years': childhoodSweetheartsRoles,
  'love across social classes': classBarrierRoles,
  'second chance at love': secondChanceRoles,

  // Revenge Saga
  'brother avenges sister\'s honor': avengeHonorRoles,
  'son returns to destroy corrupt family': returnToDestroyRoles,
  'wrongly accused seeks justice': wronglyAccusedRoles,
  'village hero vs corrupt landlord': villageHeroRoles,

  // Mystery
  'murder in a locked room': lockedRoomRoles,
  'disappearance in the village': disappearanceRoles,
  'hidden treasure hunt': treasureHuntRoles,
  'family secrets unveiled': familySecretsRoles,

  // Comedy
  'mistaken identity leads to chaos': mistakenIdentityRoles,
  'wedding disasters': weddingDisasterRoles,
  'office pranks gone too far': officePranksRoles,
  'family reunion mayhem': familyReunionRoles,

  // Family Drama
  'mother\'s sacrifice for children': mothersSacrificeRoles,
  'brother\'s betrayal and redemption': brotherBetrayalRoles,
  'father returns after years': fatherReturnsRoles,
  'joint family conflicts': jointFamilyRoles,

  // Inspirational
  'poor boy becomes champion': poorBoyChampionRoles,
  'single mother\'s struggle to success': singleMotherRoles,
  'disabled hero proves everyone wrong': disabledHeroRoles,
  'village girl achieves dreams': villageGirlDreamsRoles,

  // Village Drama
  'land dispute between families': landDisputeRoles,
  'love across enemy clans': clanLoveRoles,
  'returning son challenges traditions': returningSonRoles,
  'widow fights for rights': widowRightsRoles
};

// Genre-based fallback roles when no specific theme match
const genreDefaultRoles: Record<Genre, ThemeRoleMapping> = {
  'supernatural': magicalPowersRoles,
  'action-thriller': oneManArmyRoles,
  'horror': hauntedHomeRoles,
  'romantic-drama': tragicLoveRoles,
  'revenge-saga': avengeHonorRoles,
  'mystery': lockedRoomRoles,
  'comedy': mistakenIdentityRoles,
  'family-drama': mothersSacrificeRoles,
  'inspirational': poorBoyChampionRoles,
  'village-drama': landDisputeRoles
};

/**
 * Get dynamic role options based on theme and genre
 */
export function getDynamicRoles(theme: string | undefined, genre: Genre): ThemeRoleOption[] {
  // Normalize theme for matching
  const normalizedTheme = theme?.toLowerCase().trim() || '';

  // Try to find exact theme match
  let roleMapping = themeToRolesMap[normalizedTheme];

  // If no exact match, try partial matching for custom themes
  if (!roleMapping && normalizedTheme) {
    // Check for keyword matches
    for (const [themeKey, mapping] of Object.entries(themeToRolesMap)) {
      const keywords = themeKey.split(' ');
      const matchCount = keywords.filter(kw => normalizedTheme.includes(kw)).length;
      if (matchCount >= 2) {
        roleMapping = mapping;
        break;
      }
    }
  }

  // Fallback to genre default, then ultimate default
  if (!roleMapping) {
    roleMapping = genreDefaultRoles[genre] || defaultRoles;
  }

  // Convert mapping to array of options
  return Object.entries(roleMapping).map(([role, info]) => ({
    value: role as Character['role'],
    label: info.label,
    description: info.description
  }));
}

/**
 * Get default selected roles for a theme
 */
export function getDefaultSelectedRoles(theme: string | undefined, genre: Genre): Character['role'][] {
  // Different themes might emphasize different primary roles
  // For most stories, hero, villain, and one more make sense
  const roles = getDynamicRoles(theme, genre);

  // Always include hero and villain if available
  const defaults: Character['role'][] = [];
  const roleValues = roles.map(r => r.value);

  if (roleValues.includes('hero')) defaults.push('hero');
  if (roleValues.includes('villain')) defaults.push('villain');

  // Add a third role based on genre/theme
  const thirdChoice: Record<Genre, Character['role']> = {
    'romantic-drama': 'love-interest',
    'family-drama': 'mother',
    'action-thriller': 'sidekick',
    'horror': 'supporting',
    'comedy': 'sidekick',
    'mystery': 'supporting',
    'revenge-saga': 'mother',
    'supernatural': 'supporting',
    'inspirational': 'mother',
    'village-drama': 'mother'
  };

  const third = thirdChoice[genre];
  if (third && roleValues.includes(third) && !defaults.includes(third)) {
    defaults.push(third);
  }

  return defaults;
}
