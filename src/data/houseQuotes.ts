export type AccuracyRange = 'none' | 'terrible' | 'poor' | 'average' | 'good' | 'excellent';

export const houseQuotes: Record<AccuracyRange, string[]> = {
  none: [
    "You haven't started. Even I need a patient to diagnose. Get to work.",
    "No data. Even a broken thermometer is more useful than you right now.",
    "A blank chart. The only diagnosis I can make is a severe case of inaction.",
    "Zero cases. Either you're new, or you're avoiding the hard ones. Either way: start.",
    "Nothing. You've contributed nothing. The parking meters outside are more productive.",
  ],
  terrible: [
    "Have you considered a career in interpretive dance? Medicine clearly isn't calling.",
    "Wrong. Repeatedly, impressively wrong. There's almost an artistry to it.",
    "I've seen better diagnostic reasoning from a Magic 8-Ball. And it's cheaper.",
    "You're not eliminating possibilities. You're just guessing badly and with confidence.",
    "A coin flip gives you 50%. You're managing to do significantly worse.",
    "You diagnosed a cold as rabies. I'm almost impressed by the distance from reality.",
    "The differential is supposed to narrow down the options, not eliminate the correct ones.",
    "If incompetence were a diagnosis, you'd finally have a correct answer.",
    "You have a gift. Most people have to work to be this wrong.",
    "I've had patients guess their own diagnosis more accurately. They were delirious at the time.",
    "Your medical reasoning is a fascinating study in how not to do medical reasoning.",
    "Even Foreman in his first week was better than this. I almost fired Foreman.",
  ],
  poor: [
    "You're wrong more than you're right. That's almost a philosophy.",
    "Flip a coin. You'd have better odds and require considerably less oxygen.",
    "Adequate incompetence. Consistent in its own bleak way.",
    "You're not terrible. But you're not good. You're the lukewarm water of medicine.",
    "You'd make a fine accountant. Unfortunately you're attempting to be a doctor.",
    "Half right. In medicine, half right is a different word for wrong.",
    "I've seen better from first-year med students. In sleep deprivation trials.",
    "You're eliminating some possibilities. Unfortunately, not always the wrong ones.",
    "Progress. Slow, painful, occasionally embarrassing progress.",
    "You're getting warmer. The way Antarctica is getting warmer — technically true, not useful.",
    "I've worked with worse. They're in dermatology now.",
    "You're not a lost cause. You're just... misplaced.",
  ],
  average: [
    "Not entirely useless. Mostly useless, but not entirely.",
    "Adequate. The safe harbour of the unambitious.",
    "More right than wrong. In theory that works. In practice it still kills people.",
    "I've had better fellows. I've also had worse. Some of them are still alive.",
    "Cameron was more right than you. I never liked Cameron.",
    "You're passing. Not thriving. Just passing. Like a kidney stone.",
    "Solid B-minus work. Gets you through med school and into a comfortable, soul-crushing practice.",
    "You're functioning. Like a hospital cafeteria — technically serving a purpose, nobody's thrilled.",
    "More right than wrong. That's medicine. It's also a depressingly low bar.",
    "You remind me of Chase in year two. He turned out fine. Mostly.",
  ],
  good: [
    "Don't get cocky. It's probably still lupus.",
    "You're good. Not good enough to be annoying, but good.",
    "Almost impressive. I'd say well done but I don't believe in positive reinforcement.",
    "You're thinking like a diagnostician. That's either excellent news or a warning sign.",
    "You're catching things I'd expect a second-year fellow to catch. That's not an insult.",
    "You eliminated the right options for the right reasons. Don't let it become self-satisfaction.",
    "Good. Keep going. And try not to ruin it by being pleased with yourself.",
    "You're operating in the range where you'd survive my department. Low bar, but there it is.",
    "You have instincts. Raw, occasionally misguided instincts, but they're there.",
    "I'm not not impressed. Parse that carefully.",
  ],
  excellent: [
    "...I'm mildly disgusted by how right you are.",
    "Either you're brilliant or you've been cheating. Either way, I respect the outcome.",
    "Fine. You're good. I'll never say that again. Savour it.",
    "You're right so often it's becoming uninteresting. Almost.",
    "This is exactly the diagnostic thinking that makes other people feel bad about themselves. Well done.",
    "I'd almost hire you. Almost.",
    "You think like me. I'm genuinely unsure if that's good for you.",
    "If this were my department, you'd be the one I argue with the most. That's the highest compliment I give.",
  ],
};

export function getAccuracyRange(pct: number, casesAttempted: number): AccuracyRange {
  if (casesAttempted === 0) return 'none';
  if (pct <= 30) return 'terrible';
  if (pct <= 50) return 'poor';
  if (pct <= 70) return 'average';
  if (pct <= 85) return 'good';
  return 'excellent';
}
