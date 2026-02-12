
import { StrengthLevel } from './types';

export const STRENGTH_LABELS: Record<StrengthLevel, string> = {
  'very-weak': 'Very Weak',
  'weak': 'Weak',
  'medium': 'Medium',
  'strong': 'Strong',
  'very-strong': 'Very Strong',
};

export const STRENGTH_COLORS: Record<StrengthLevel, string> = {
  'very-weak': 'bg-red-600',
  'weak': 'bg-orange-500',
  'medium': 'bg-yellow-500',
  'strong': 'bg-lime-500',
  'very-strong': 'bg-green-500',
};

// Attack speeds (guesses per second)
export const ATTACK_SCENARIOS = {
  basic: 1e9,      // 1 billion
  gpu: 1e11,       // 100 billion
  botnet: 1e13     // 10 trillion
};

export const COMMON_PASSWORDS = [
  "123456", "password", "12345678", "qwerty", "123456789", "12345", "1234", "111111", 
  "1234567", "dragon", "baseball", "football", "sunshine", "letmein", "princess", "iloveyou"
]; 

// A curated list of friendly, distinct words for passphrases
export const WORD_LIST = [
  "acorn", "acre", "acts", "afar", "affix", "aged", "agent", "agile", "aging", "agony", 
  "ahead", "aide", "aids", "aim", "ajar", "alarm", "album", "alert", "alien", "alike", 
  "alive", "allay", "alley", "allot", "allow", "alloy", "aloft", "alone", "aloof", "aloud", 
  "alpha", "altar", "alter", "amass", "amaze", "amber", "amble", "amend", "amiss", "amity",
  "apple", "apron", "aqua", "arch", "area", "arena", "argue", "arise", "arm", "army", 
  "aroma", "array", "arrow", "art", "ash", "aside", "ask", "asleep", "asset", "atlas", 
  "atom", "audio", "audit", "aura", "auto", "avid", "avoid", "await", "awake", "award", 
  "aware", "awoke", "axis", "babe", "baby", "back", "badge", "bag", "bait", "bake", 
  "balance", "bald", "ball", "balm", "ban", "band", "bang", "bank", "bar", "bark", 
  "barn", "base", "bash", "basic", "basil", "basin", "basis", "bat", "batch", "bath", 
  "baton", "battle", "bay", "beach", "beam", "bean", "bear", "beard", "beast", "beat", 
  "beauty", "become", "bed", "beef", "beep", "beer", "beet", "before", "began", "begin", 
  "behave", "behind", "being", "bell", "belt", "bench", "bend", "best", "bet", "beta", 
  "better", "bias", "bid", "big", "bike", "bill", "bind", "bingo", "biology", "bird", 
  "birth", "bit", "bite", "black", "blade", "blame", "blank", "blast", "blaze", "blend", 
  "bless", "blind", "blink", "bliss", "block", "blog", "blond", "blood", "bloom", "blot", 
  "blue", "blur", "blush", "board", "boat", "body", "boil", "bold", "bolt", "bomb", 
  "bond", "bone", "book", "boost", "boot", "border", "bore", "born", "boss", "both", 
  "bother", "bottle", "bottom", "bounce", "bound", "bow", "bowl", "box", "boy", "brain", 
  "brake", "branch", "brand", "brass", "brave", "bread", "break", "breath", "breeze", "brew", 
  "brick", "bride", "brief", "bright", "bring", "brisk", "broad", "broil", "broken", "bronze", 
  "broom", "brother", "brown", "brush", "bubble", "buck", "bud", "budget", "buff", "buffer", 
  "bug", "build", "bulb", "bulk", "bull", "bump", "bunch", "bundle", "bunk", "bunny", 
  "burden", "bureau", "burn", "burst", "bury", "bus", "bush", "bust", "busy", "but", 
  "butter", "button", "buy", "buzz", "cabin", "cable", "cactus", "cage", "cake", "call", 
  "calm", "camera", "camp", "can", "canal", "cancel", "candy", "cane", "cannon", "canoe", 
  "canvas", "canyon", "cap", "cape", "capital", "car", "carbon", "card", "care", "cargo", 
  "carpet", "carry", "cart", "case", "cash", "cast", "castle", "cat", "catch", "cater", 
  "cattle", "cause", "cave", "cease", "cedar", "ceiling", "cell", "cement", "census", "cent",
  "cheese", "chef", "cherry", "chess", "chest", "chew", "chic", "chicken", "chief", "child",
  "chill", "chime", "chin", "chip", "chirp", "choice", "choir", "choose", "chop", "chorus",
  "chunk", "churn", "cider", "cigar", "cinema", "circle", "civic", "civil", "claim", "clam",
  "clamp", "clap", "clarity", "clash", "clasp", "class", "claw", "clay", "clean", "clear",
  "clever", "click", "client", "cliff", "climb", "cling", "clinic", "clip", "clock", "clone",
  "close", "cloth", "cloud", "clown", "club", "clue", "clump", "coach", "coal", "coast",
  "coat", "cobra", "cocoa", "code", "coffee", "coil", "coin", "coke", "cold", "collar",
  "colony", "color", "column", "comb", "combat", "come", "comedy", "comfort", "comic", "common",
  "compact", "company", "complex", "comply", "compose", "concept", "concert", "condo", "conduct", "confide"
];
