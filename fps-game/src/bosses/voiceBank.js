// Pre-generated TTS manifest. Audio files live in /public/audio/bosses/<handle>/
// Keep file names stable — build script writes here, runtime loads by name.
export const VOICE_MANIFEST = {
  cursor_ai: {
    voice: 'echo',
    lines: {
      spawn_1: 'I am the tab completion.',
      spawn_2: 'Predict this, duck.',
      death_1: 'Command Z failed.',
      death_2: 'Uncaught exception.',
    },
  },
  boltdotnew: {
    voice: 'fable',
    lines: {
      spawn_1: 'Deploy to prod, die to duck.',
      spawn_2: 'One shot, one build.',
      death_1: 'Rollback in progress.',
      death_2: 'Build failed.',
    },
  },
  s13k_: {
    voice: 'nova',
    lines: {
      spawn_1: "I'm judging your code right now.",
      spawn_2: 'Let me see your commits.',
      death_1: 'Passing score, barely.',
      death_2: 'Ship it.',
    },
  },
  timsoret: {
    voice: 'alloy',
    lines: {
      spawn_1: 'Cinematic kill incoming.',
      spawn_2: 'Camera is rolling.',
      death_1: 'Cut. That was a wrap.',
      death_2: 'Final shot.',
    },
  },
  nicolamanzini: {
    voice: 'shimmer',
    lines: {
      spawn_1: 'Well engineered.',
      spawn_2: 'Structure matters.',
      death_1: 'Nice architecture.',
      death_2: 'Refactored.',
    },
  },
  levelsio: {
    voice: 'onyx',
    lines: {
      spawn_1: 'Welcome to the jam, duck.',
      spawn_2: 'Build in public. Die in public.',
      death_1: 'Ship it... quack...',
      death_2: 'This is your jam now.',
    },
  },
};

export function audioUrlFor(handle, key) {
  return `/escape-from-duckkov/audio/bosses/${handle}/${key}.ogg`;
}
