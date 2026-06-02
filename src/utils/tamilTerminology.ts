/**
 * Tamil Catholic Terminology Sanitization
 * Converts CSI (Protestant) Tamil terms to RC (Roman Catholic) terms
 */

// Term replacements: [CSI term, RC term]
const TERM_REPLACEMENTS_RAW: [string, string][] = [
  ["அப்போஸ்தலர்கள்", "திருத்தூதர்கள்"],
  ["சீக்கிரத்திலேயே", "விரைவிலேயே"],
  ["வெளிப்படுத்துதல் நூல்", "திருவெளிப்பாடு"],
  ["அவசியமான", "இன்றியமையாத"],
  ["தீர்க்கதரிசனம்", "இறைவாக்கு"],
  ["சத்தியம்", "உண்மை"],
  ["எடுத்துக்காட்டாக", "உதாரணமாக"],
  ["தெய்வம்", "கடவுள்"],
  ["விசுவாசத்தின்", "நம்பிக்கையின்"],
  ["சத்தியங்கள்", "உண்மைகள்"],
  ["பாரம்பரியம்", "மரபு"],
  ["சொத்து", "செல்வம்"],
  ["கடவுளின் பரிசு", "கடவுளின் கொடை"],
  ["கஷ்டங்கள்", "துன்பங்கள்"],
  ["சத்தியங்களை", "உண்மைகளை"],
  ["நித்தியமான", "நிலையான"],
  ["அத்தியாயம்", "அதிகாரம்"],
  ["பரிபூரணமான", "முழுமையான"],
  ["தீர்க்கத்தரிசி", "இறைவாக்கினர்"],
  ["சட்டம்", "ஒழுங்கு"],
  ["தெய்வீக", "இறை"],
  ["பிதாவுடன்", "தந்தையுடன்"],
  ["இராட்ச்சியம்", "அரசு"],
  ["வம்சாவளி", "மூதாதையர்"],
  ["இராயப்பர்", "பேதுரு"],
  ["சின்னப்பர்", "பவுல்"],
  ["விசுவாசம்", "நம்பிக்கை"],
  ["சமாதானம்", "அமைதி"],
  ["சுவிசேஷம்", "நற்செய்தி"],
  ["இரட்சிப்பு", "மீட்பு"],
  ["திருவருட்சாதனங்கள்", "அருள் அடையாளங்கள்"],
  ["சிருஷ்டி", "படைப்பு"],
  ["வசனங்கள்", "வார்த்தைகள்"],
  ["திடப்படுத்தல்", "உறுதிப்பூசுதல்"],
  ["அவஸ்தைப் பூசுதல்", "நோயில் பூசுதல்"],
  ["இறை அன்னை", "தேவதாய்"],
  ["சம்மனசுகளின் அதிபதி", "அதிதூதர்"],
  ["ஆசீர்வாத காலம்", "திருவருகைக் காலம்"],
  ["ஒறுத்தல் காலம்", "தவக்காலம்"],
  ["மெய்யான", "உண்மையான"],
  ["சந்தோஷம்", "மகிழ்ச்சி"],
  ["தூயர்கள்", "புனிதர்கள்"],
  ["தூயர்", "புனிதர்"],
  ["பிதா", "தந்தை"],
  ["பிதாவை", "தந்தையை"],
  ["பிதாவால்", "தந்தையால்"],
  ["பிதாவின்", "தந்தையின்"],
  ["பிதாவுக்கு", "தந்தைக்கு"],
  ["தெய்வத்தை", "கடவுளை"],
  ["தெய்வத்தின்", "கடவுளின்"],
  ["தெய்வத்தால்", "கடவுளால்"],
  ["இராச்சியம்", "அரசு"],
  ["இராச்சியத்தை", "அரசை"],
  ["இராச்சியத்தின்", "அரசின்"],
  ["சுவிசேஷத்தை", "நற்செய்தியை"],
  ["சுவிசேஷத்தின்", "நற்செய்தியின்"],
  ["சுவிசேஷத்தில்", "நற்செய்தியில்"],
  ["இரட்சிப்பை", "மீட்பை"],
  ["இரட்சிப்பின்", "மீட்பின்"],
  ["விசுவாசத்தை", "நம்பிக்கையை"],
  ["விசுவாசத்தில்", "நம்பிக்கையில்"],
  ["விசுவாசத்தால்", "நம்பிக்கையால்"],
  ["சமாதானத்தை", "அமைதியை"],
  ["சமாதானத்தின்", "அமைதியின்"],
  ["திருவருட்சாதனம்", "அருள் அடையாளம்"],
  ["திருவிருந்து", "நற்கருணை"],
  ["தேவநற்கருணை", "நற்கருணை"],
  ["பாவசங்கீர்த்தனம்", "ஒப்புரவு அருட்சாதனம்"],
  ["பலிபீடம்", "பீடம்"],
  ["ஜெபமாலை", "செபமாலை"],
  ["சத்தியவேதம்", "திருவிவிலியம்"],
  ["பிரசங்கம்", "மறையுரை"],
  ["தமத்திரித்துவம்", "மூவொரு இறைவன்"],
  ["இயேசு நாதர்", "இயேசு கிறிஸ்து"],
  ["தேவதூதன்", "வானவர்"],
  ["தேவதூதர்கள்", "வானவர்கள்"],
  ["உயிர்த்தெழுதல்", "உயிர்ப்பு"],
  ["ஸ்தோத்திரம்", "நன்றி"],
  ["சங்கீதம்", "திருப்பாடல்கள்"],
  ["சங்கீதங்கள்", "திருப்பாடல்கள்"],
  ["போதகர்", "குரு"],
  ["போதகர்கள்", "குருக்கள்"],
  ["ஆதியாகமம்", "தொடக்க நூல்"],
  ["யாத்திராகமம்", "விடுதலைப் பயணம்"],
  ["அப்போஸ்தலர் நடபடிகள்", "திருத்தூதர் பணிகள்"],
  ["வெளிப்படுத்துதல்", "திருவெளிப்பாடு"],
];

// Sort by length (longer terms first) to avoid partial replacements
const TERM_REPLACEMENTS = TERM_REPLACEMENTS_RAW.sort((a, b) => b[0].length - a[0].length);

// Build safe RC terms set (terms that shouldn't be replaced)
const SAFE_RC_TERMS: string[] = (() => {
  const safe = new Set<string>();
  for (let i = 0; i < TERM_REPLACEMENTS.length; i++) {
    const rc = TERM_REPLACEMENTS[i][1];
    let isSub = false;
    for (let j = 0; j < TERM_REPLACEMENTS.length; j++) {
      const csi = TERM_REPLACEMENTS[j][0];
      if (csi !== rc && csi.includes(rc)) {
        isSub = true;
        break;
      }
    }
    if (!isSub) safe.add(rc);
  }
  return Array.from(safe).sort((a, b) => b.length - a.length);
})();

/**
 * Sanitize CSI (Protestant) Tamil text to RC (Catholic) terminology
 */
export function sanitizeCsiText(text: string): string {
  if (!text) return text;
  let sanitized = text;
  const placeholders: [string, string][] = [];
  let phCounter = 0;

  // Protect existing RC terms
  for (const rc of SAFE_RC_TERMS) {
    if (sanitized.includes(rc)) {
      const ph = `__PROT_${phCounter++}__`;
      placeholders.push([ph, rc]);
      sanitized = sanitized.split(rc).join(ph);
    }
  }

  // Replace CSI terms with placeholders
  for (let i = 0; i < TERM_REPLACEMENTS.length; i++) {
    const [csi, rc] = TERM_REPLACEMENTS[i];
    if (sanitized.includes(csi)) {
      const ph = `__RC_REP_${phCounter++}__`;
      placeholders.push([ph, rc]);
      sanitized = sanitized.split(csi).join(ph);
    }
  }

  // Restore all placeholders with RC terms
  for (let i = placeholders.length - 1; i >= 0; i--) {
    const [ph, rc] = placeholders[i];
    sanitized = sanitized.split(ph).join(rc);
  }

  return sanitized;
}

/**
 * Strip English text in parentheses from AI responses
 * Matches patterns like (Messianic Secret), (Omnipresent), etc.
 * Preserves Tamil parenthetical like (கி) or (இ)
 */
export function stripEnglishParentheses(text: string): string {
  return text.replace(/\s*\([A-Za-z][A-Za-z\s,.'\"\-]*\)/g, '');
}

/**
 * Clean markdown formatting from text
 * Only removes markdown bold (**text**) and headers (# text)
 */
export function stripMarkdown(text: string): string {
  // Remove markdown bold formatting (**text** or __text__)
  let cleaned = text.replace(/\*\*(.+?)\*\*/g, '$1');
  cleaned = cleaned.replace(/__(.+?)__/g, '$1');
  
  // Remove markdown headers (# at start of line)
  cleaned = cleaned.replace(/^#+\s+/gm, '');
  
  return cleaned.trim();
}
