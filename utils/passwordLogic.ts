
import { StrengthResult, CrackTimeScenarios, StrengthLevel, PasswordGeneratorConfig } from '../types';
import { ATTACK_SCENARIOS, WORD_LIST } from '../constants';

export const calculatePasswordStrength = (password: string): StrengthResult => {
  let poolSize = 0;
  let score = 0;
  
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  // Character pool detection
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSymbol) poolSize += 32;
  
  // Length scoring (Linear + Bonus)
  const length = password.length;
  if (length >= 8) score += 10;
  if (length >= 12) score += 15;
  if (length >= 16) score += 20;
  if (length >= 24) score += 25; // Bonus for passphrases
  
  // Character variety scoring
  let varietyCount = 0;
  if (hasLower) varietyCount++;
  if (hasUpper) varietyCount++;
  if (hasNumber) varietyCount++;
  if (hasSymbol) varietyCount++;

  score += (varietyCount * 10);
  
  // Entropy calculation
  // Avoid log2(0) if empty
  const entropy = length > 0 ? length * Math.log2(Math.max(2, poolSize)) : 0;
  
  // Final strength determination
  let strength: StrengthLevel = 'very-weak';
  
  if (score >= 90 || entropy >= 80) strength = 'very-strong';
  else if (score >= 70 || entropy >= 60) strength = 'strong';
  else if (score >= 50 || entropy >= 40) strength = 'medium';
  else if (score >= 30 || entropy >= 25) strength = 'weak';
  
  // Handle empty or very short edge cases manually to ensure accurate feedback
  if (length === 0) {
      strength = 'very-weak';
      score = 0;
  }

  return {
    strength,
    score: Math.min(100, score),
    entropy,
    poolSize,
    combinations: Math.pow(Math.max(2, poolSize), length),
    length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol
  };
};

const formatTime = (seconds: number): string => {
  if (seconds < 1) return 'Instantly';
  if (seconds < 60) return `${Math.ceil(seconds)} Seconds`;
  if (seconds < 3600) return `${Math.ceil(seconds / 60)} Minutes`;
  if (seconds < 86400) return `${Math.ceil(seconds / 3600)} Hours`;
  if (seconds < 2592000) return `${Math.ceil(seconds / 86400)} Days`;
  if (seconds < 31536000) return `${Math.ceil(seconds / 2592000)} Months`;
  
  const years = Math.floor(seconds / 31536000);
  if (years < 1000) return `${years} Years`;
  if (years < 1000000) return `${(years / 1000).toFixed(0)}k Years`;
  if (years < 1000000000) return `${(years / 1000000).toFixed(0)}m Years`;
  if (years < 1000000000000) return `${(years / 1000000000).toFixed(0)}b Years`;
  return 'Trillions of Years';
};

export const estimateCrackTime = (combinations: number): CrackTimeScenarios => {
  const results: CrackTimeScenarios = {
      basic: 'Instantly',
      gpu: 'Instantly',
      botnet: 'Instantly'
  };
  
  for (const [name, guessesPerSec] of Object.entries(ATTACK_SCENARIOS)) {
    const seconds = combinations / guessesPerSec;
    results[name as keyof CrackTimeScenarios] = formatTime(seconds);
  }
  
  return results;
};

// --- Generators ---

const getRandomInt = (max: number) => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
};

const pickRandomChar = (chars: string) => {
    return chars[getRandomInt(chars.length)];
};

const generateRandomMode = (config: PasswordGeneratorConfig): string => {
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const ambiguousChars = '0O1lI';

  let allowedChars = '';
  const guaranteedChars: string[] = [];

  // Custom Characters override
  if (config.customChars && config.customChars.length > 0) {
      allowedChars = config.customChars;
      // No guaranteed logic for custom sets usually, just picking from it
  } else {
      const addSet = (set: string, use: boolean) => {
          if (!use) return;
          let usable = set;
          if (config.excludeAmbiguous) {
              usable = set.split('').filter(c => !ambiguousChars.includes(c)).join('');
          }
          if (usable.length === 0) return;
          
          allowedChars += usable;
          if (config.requireAllTypes) {
              guaranteedChars.push(pickRandomChar(usable));
          }
      };

      addSet(lowerChars, config.useLower);
      addSet(upperChars, config.useUpper);
      addSet(numberChars, config.useNumbers);
      addSet(symbolChars, config.useSymbols);
  }

  if (allowedChars.length === 0) return ''; 

  // Generate remaining
  let password = '';
  const remainingLength = config.length - guaranteedChars.length;
  
  for (let i = 0; i < remainingLength; i++) {
      password += pickRandomChar(allowedChars);
  }

  // Combine and shuffle guaranteed + remaining
  const finalArray = [...guaranteedChars, ...password.split('')];
  
  // Fisher-Yates Shuffle
  for (let i = finalArray.length - 1; i > 0; i--) {
      const j = getRandomInt(i + 1);
      [finalArray[i], finalArray[j]] = [finalArray[j], finalArray[i]];
  }

  return finalArray.join('');
};

const generatePassphraseMode = (config: PasswordGeneratorConfig): string => {
    const words: string[] = [];
    for (let i = 0; i < config.wordCount; i++) {
        let word = WORD_LIST[getRandomInt(WORD_LIST.length)];
        if (config.capitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        words.push(word);
    }
    
    let password = words.join(config.separator);
    
    if (config.includeNumber) {
        // Append a random 2-digit number for entropy boost
        password += getRandomInt(100).toString();
    }
    
    return password;
};

const generateMemorableMode = (config: PasswordGeneratorConfig): string => {
    // Construct simplified pronounceable "syllables" CVC (Consonant-Vowel-Consonant)
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    
    let password = '';
    const targetLength = config.length; // Approximate
    
    while(password.length < targetLength) {
        const c1 = pickRandomChar(consonants);
        const v = pickRandomChar(vowels);
        const c2 = pickRandomChar(consonants);
        
        let syllable = c1 + v + c2;
        if (config.capitalize) {
            syllable = syllable.charAt(0).toUpperCase() + syllable.slice(1);
        }
        password += syllable;
    }

    // Trim to exact length if needed (though keeping full syllables is usually better for pronounceability)
    // We'll trim to ensure we don't exceed UI expectations too wildly, 
    // but strict length matters less for memorable than 'Random'.
    password = password.slice(0, targetLength);
    
    if (config.includeNumber) {
         // Replace last char with number or append
         password = password.slice(0, -1) + getRandomInt(10).toString();
    }

    return password;
};


export const generateStrongPassword = (config: PasswordGeneratorConfig): string => {
    switch(config.mode) {
        case 'passphrase':
            return generatePassphraseMode(config);
        case 'memorable':
            return generateMemorableMode(config);
        case 'random':
        default:
            return generateRandomMode(config);
    }
};

/**
 * Smartly improves a password without completely changing it.
 * Focuses on appending missing requirements and increasing entropy.
 */
export const improvePassword = (password: string): string => {
  let improved = password.trim(); 

  // If empty, just start with something base
  if (!improved) improved = "Secure";

  const hasUpper = /[A-Z]/.test(improved);
  const hasNumber = /[0-9]/.test(improved);
  const hasSymbol = /[^A-Za-z0-9]/.test(improved);

  // 1. Ensure Uppercase (Capitalize first char if missing)
  if (!hasUpper) {
    // If it starts with a letter, capitalize it
    if (/^[a-z]/.test(improved)) {
        improved = improved.charAt(0).toUpperCase() + improved.slice(1);
    } else {
        // Otherwise append a random uppercase
        improved += 'A'; 
    }
  }

  // 2. Ensure Numbers
  if (!hasNumber) {
     improved += Math.floor(Math.random() * 10).toString();
  }

  // 3. Ensure Symbols
  if (!hasSymbol) {
    const symbols = "!@#$%^&*";
    improved += symbols[Math.floor(Math.random() * symbols.length)];
  }

  // 4. Boost Length (Target min 14 chars)
  // We use a mix of chars to ensure high density
  const secureChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  
  while (improved.length < 14) {
     improved += secureChars[Math.floor(Math.random() * secureChars.length)];
  }

  // 5. Anti-Pattern / Entropy Boost
  // If no changes were made (meaning it met criteria but user still clicked improve),
  // OR if it matches common weak patterns found in "improved" state (rare but possible),
  // force add some entropy.
  if (improved === password || improved.length < 14) {
      improved += secureChars[Math.floor(Math.random() * secureChars.length)];
      improved += secureChars[Math.floor(Math.random() * secureChars.length)];
  }

  return improved;
};
