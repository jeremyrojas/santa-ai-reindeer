export const INTRO_TEXT = {
  title: "Which of Santa's AI Coding Reindeer Are You?",
  description: "Find out which of Santa's AI Coding reindeer matches your style!",
  startButton: "Start the Quiz",
  preQuizText: "Answer honestly - the workshop's most advanced matchmaking magic will reveal your true reindeer spirit..."
};

export const QUESTIONS = [
  {
    id: 1,
    text: "When you get an amazing app idea\nat 3 AM, you:",
    options: [
      { id: "A", text: "Start building immediately - sleep is for January" },
      { id: "B", text: "Add it to your color-coded Notion with 17 subpages" },
      { id: "C", text: "Message your builder friends: 'OK THIS IS THE ONE!! No but fr this time!'" },
      { id: "D", text: "Create a master plan while questioning your life choices" }
    ]
  },
  {
    id: 2,
    text: "Your AI tool gives you an error. You:",
    options: [
      { id: "A", text: "Here's the error you just gave me. Please analyze STEP BY STEP why your last 3 attempts didn't work 🙃" },
      { id: "B", text: "Time to investigate like a code detective on Christmas Eve" },
      { id: "C", text: "Ask your AI builder community: 'Anyone else? (asking for a friend)'" },
      { id: "D", text: "Calmly pull out your backup plan (you knew this would happen)" }
    ]
  },
  {
    id: 3,
    text: "Your AI-built project is almost ready to launch. You're:",
    options: [
      { id: "A", text: "Already tweeting 'Some AI magic coming soon 👀'" },
      { id: "B", text: "Still testing in case someone tries to break it (you know they will)" },
      { id: "C", text: "Sharing your launch in every community: 'Looking for alpha testers! 🚀'" },
      { id: "D", text: "Adding that one last feature (narrator: it wasn't the last feature)" }
    ]
  },
  {
    id: 4,
    text: "Your secret AI building superpower is:",
    options: [
      { id: "A", text: "Turning caffeine into MVPs" },
      { id: "B", text: "Finding solutions in Stack Overflow posts from 2012" },
      { id: "C", text: "Making AI tools make sense for normal humans" },
      { id: "D", text: "Keeping calm while juggling 5 AI tools at once" }
    ]
  },
  {
    id: 5,
    text: "What's in your AI builder toolkit?",
    options: [
      { id: "A", text: "Everything. All of them. (Is there a new one? Already signed up!)" },
      { id: "B", text: "The one with the best free trial (or cheapest subscription if we're being honest)" },
      { id: "C", text: "Whatever Twitter called 'game-changing' this week" },
      { id: "D", text: "Tools that actually do what you tell them to (most of the time)" }
    ]
  },
  {
    id: 6,
    text: "After launching a successful project, you:",
    options: [
      { id: "A", text: "Already deployed three new features to the next project (sleep is overrated)" },
      { id: "B", text: "Write the world's most detailed documentation (future you will thank you)" },
      { id: "C", text: "Make a celebratory thread: 'How We Built This (1/42) 🎉'" },
      { id: "D", text: "Start planning v2.0 (so much for that break you promised yourself)" }
    ]
  },
  {
    id: 7,
    text: "Your coding style is best described as:",
    options: [
      { id: "A", text: "Sprint mode: coffee in, code out ⚡" },
      { id: "B", text: "Methodical: every line has its place" },
      { id: "C", text: "Social: turning pair programming into party programming! 💃" },
      { id: "D", text: "Structured: following the master plan" }
    ]
  }
];

export const RESULTS = {
  DASHER: {
    id: "DASHER",
    title: "Dasher - The Rapid Prototyper",
    description: "While others are still watching tutorials, you've built three MVPs and a Chrome extension. Your GitHub commit history looks like morse code for 'SLEEP IS OPTIONAL.' You've probably used more API credits this week than Santa has cookies on Christmas Eve.",
    traits: ["Lightning-fast builder", "MVP machine", "Speed demon"],
    shareText: "I'm Dasher, the speed demon of AI builders! 🚀 Discover your AI reindeer personality!"
  },
  BLITZEN: {
    id: "BLITZEN",
    title: "Blitzen - The Energetic Innovator",
    description: "More ongoing projects than Santa has reindeer! Your browser has so many AI tool tabs open that your laptop fans sound like a sleigh taking off. You probably dream in Python and wake up with fully formed GitHub repos.",
    traits: ["Multi-project juggler", "Innovation enthusiast", "Endless energy"],
    shareText: "I'm Blitzen, the energetic innovator! ⚡ Discover your AI reindeer personality!"
  },
  PRANCER: {
    id: "PRANCER",
    title: "Prancer - The Polished Professional",
    description: "Your code isn't just clean - it's runway ready! You treat AI prompts like fine wine, and your Git commits are better documented than most wedding vows. No bug survives your elegant debugging sessions.",
    traits: ["Quality focused", "Detail oriented", "Perfectionist"],
    shareText: "I'm Prancer, the perfectionist of AI builders! ✨ Discover your AI reindeer personality!"
  },
  DONNER: {
    id: "DONNER",
    title: "Donner - The Strategic Leader",
    description: "Playing 4D chess while others play Pong! Your project roadmap is so organized it makes Marie Kondo look messy. You have backup plans for your backup plans' backup plans.",
    traits: ["Strategic thinker", "Natural leader", "Master planner"],
    shareText: "I'm Donner, the strategic leader! 🎯 Discover your AI reindeer personality!"
  },
  CUPID: {
    id: "CUPID",
    title: "Cupid - The Community Catalyst",
    description: "Spreading AI love faster than viral TikToks! Your DMs are flooded with 'quick questions,' and you've helped more people debug than Stack Overflow (well, almost).",
    traits: ["Community builder", "Helper", "Knowledge sharer"],
    shareText: "I'm Cupid, the community champion! ❤️ Discover your AI reindeer personality!"
  },
  RUDOLPH: {
    id: "RUDOLPH",
    title: "Rudolph - The Problem Solver",
    description: "When AI tools go dark, your debugging nose lights the way! You speak fluent error message and your rubber duck debugger probably needs a vacation.",
    traits: ["Debug expert", "Solution finder", "Path lighter"],
    shareText: "I'm Rudolph, the problem solver! 🔦 Discover your AI reindeer personality!"
  },
  VIXEN: {
    id: "VIXEN",
    title: "Vixen - The Creative Visionary",
    description: "Making AI projects so pretty that designers get jealous! While others debate functionality, you're perfecting that micro-animation nobody else noticed. Your design sense deserves its own API.",
    traits: ["Design wizard", "Creative force", "Beauty maker"],
    shareText: "I'm Vixen, the creative visionary! 💫 Discover your AI reindeer personality!"
  },
  COMET: {
    id: "COMET",
    title: "Comet - The Versatile Maven",
    description: "Switching between AI tools faster than Santa does chimneys! You're fluent in every framework (even the ones that launch tomorrow). Your brain is like GPT-4, but with better uptime.",
    traits: ["Tool master", "Quick learner", "Adaptable builder"],
    shareText: "I'm Comet, the versatile maven! 🌠 Discover your AI reindeer personality!"
  },
  DANCER: {
    id: "DANCER",
    title: "Dancer - The Social Developer",
    description: "You turn debugging sessions into dance parties and hackathons into celebration marathons! Your IDE has a built-in party mode, and your commit messages deserve their own DJ set. You're proof that even AI development can be a social celebration!",
    traits: ["Celebration master", "Team energizer", "Social coder"],
    shareText: "I'm Dancer, the party starter of AI builders! 💃 Discover your AI reindeer personality!"
  }
};

export const QUIZ_CONFIG = {
  totalQuestions: 7,
  showProgressBar: true,
  showQuestionNumber: true,
  allowBack: false,
  shareBaseUrl: "https://your-quiz-url.com",
  shareHashtag: "SantasAIReindeer"
};

export const END_TEXT = {
  preResult: "Now for the magic... 🎩✨",
  sharePrompt: "Share your reindeer spirit with the world!",
  retakeButton: "Take the Quiz Again",
  footerText: "Remember: Every reindeer has their perfect project - find yours!"
}; 