export const GRAVITY         = 0.12;
export const BUOYANCY        = 0.03;
export const TAP_BOOST       = -3.0;
export const MAX_VY          = 4.0;
export const DAMPING         = 0.98;
export const DRIFT_AMPLITUDE = 30;
export const DRIFT_PERIOD    = 4;
export const BOB_AMPLITUDE   = 2;
export const BOB_FREQUENCY   = 0.03;

// ---- Collision ----
export const BALLOON_RADIUS  = 36;
export const HITBOX_SCALE    = 0.75;
export const NEAR_MISS_DIST  = 22;

// ---- Obstacle spawning ----
export const OBS_BASE_SPEED       = 2.0;
export const SPAWN_INTERVAL_START = 2.5;
export const SPAWN_INTERVAL_MIN   = 0.9;
export const MIN_GAP_Y            = 180;

// ---- Scoring ----
export const LS_KEY = 'tinyhandsplay-balloon-best';

// ---- Obstacle types ----
export const OBS_KITE       = 'kite';
export const OBS_EAGLE      = 'eagle';
export const OBS_PARACHUTE  = 'parachute';
export const OBS_SMALL_PLANE = 'small_plane';
export const OBS_BAT        = 'bat';
export const OBS_METEOR     = 'meteor';
export const OBS_PLANE      = 'plane';

// ---- Star constants ----
export const STAR_SPAWN_INTERVAL = 7.5;
export const STAR_SIZE           = 36;

// ---- Power-up types ----
export const PU_SHIELD  = 'shield';
export const PU_RAINBOW = 'rainbow';
export const PU_MAGNET  = 'magnet';
export const PU_SLOWMO  = 'slowmo';
export const PU_MYSTERY = 'mystery';

// ---- Power-up config ----
export const POWERUP_SPAWN_START = 20;
export const POWERUP_SPAWN_BASE  = 18;
export const POWERUP_SPAWN_VAR   = 8;
export const POWERUP_SIZE        = 44;
export const SHIELD_DURATION     = 8;

export const POWERUP_WEIGHTS = [
  { type: PU_SHIELD,  weight: 15 },
  { type: PU_RAINBOW, weight: 30 },
  { type: PU_MAGNET,  weight: 25 },
  { type: PU_SLOWMO,  weight: 20 },
  { type: PU_MYSTERY, weight: 10 },
];

export const POWERUP_EMOJIS = {
  [PU_SHIELD]:  '\u{1F6E1}\uFE0F',
  [PU_RAINBOW]: '\u{1F308}',
  [PU_MAGNET]:  '\u{1F9F2}',
  [PU_SLOWMO]:  '\u{231B}',
  [PU_MYSTERY]: '\u{1F381}',
};

export const POWERUP_DURATIONS = {
  [PU_RAINBOW]: 5.0,
  [PU_MAGNET]:  40.0,
  [PU_SLOWMO]:  3.0,
};

export const MAGNET_RADIUS   = 360;
export const MAGNET_STRENGTH = 4.0;

// ---- Extra life config ----
export const EXTRALIFE_SPAWN_INTERVAL = 35;
export const EXTRALIFE_CHANCE = 0.4;
