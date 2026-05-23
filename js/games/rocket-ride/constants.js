export const GRAVITY            = 1.2;
export const BOOST_FORCE        = -6.0;
export const BRAKE_FORCE        = 2.0;
export const HORIZONTAL_FORCE   = 18.0;
export const MAX_HORIZONTAL_VEL = 24.0;
export const MAX_VERTICAL_VEL   = 5.5;
export const HORIZONTAL_DAMPING = 0.91;
export const VERTICAL_DAMPING   = 0.96;
export const BRAKE_DAMPING      = 0.85;
export const MAX_TILT           = 30 * Math.PI / 180;  // 30 degrees in radians
export const TILT_LERP          = 0.18;

// ---- Scroll constants ----
export const BASE_SCROLL_SPEED     = 2.0;
export const SCROLL_ACCELERATION   = 0.001;
export const MAX_SCROLL_SPEED      = 6.0;
export const SCROLL_GRAVITY_FACTOR = 0.3;
export const PIXELS_PER_METER      = 4;

// ---- Collision ----
export const ROCKET_RADIUS  = 24;
export const HITBOX_SCALE   = 0.75;
export const NEAR_MISS_DIST = 18;

// ---- Obstacle spawning ----
export const OBS_SPAWN_START    = 1.4;
export const OBS_SPAWN_MIN      = 0.4;
export const MIN_GAP_Y          = 110;

// ---- Obstacle types ----
export const OBS_ASTEROID_S  = 'asteroid_s';
export const OBS_ASTEROID_M  = 'asteroid_m';
export const OBS_ASTEROID_L  = 'asteroid_l';
export const OBS_SATELLITE   = 'satellite';
export const OBS_JUNK        = 'junk';
export const OBS_UFO         = 'ufo';

// ---- Collectible constants ----
export const STAR_SPAWN_INTERVAL    = 3.0;
export const STAR_SIZE              = 32;
export const STAR_POINTS            = 10;
export const FUEL_SPAWN_INTERVAL    = 30;
export const FUEL_SIZE              = 38;
export const FUEL_DURATION          = 3.0;
export const CLUSTER_SPAWN_INTERVAL = 20;
export const CLUSTER_SIZE           = 5;
export const CLUSTER_BONUS          = 100;

// ---- Scoring ----
export const LS_BEST_KEY = 'tinyhandsplay-rocket-best';
export const LS_ALT_KEY  = 'tinyhandsplay-rocket-altitude';

// ---- Milestones ----
export const MILESTONES = [
  { alt: 500,  text: 'Nice flying!', emoji: '🚀' },
  { alt: 1000, text: 'Space explorer!', emoji: '🌟' },
  { alt: 2000, text: 'To infinity!', emoji: '✨' },
  { alt: 5000, text: 'Legendary pilot!', emoji: '👨‍🚀' },
];