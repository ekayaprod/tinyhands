import { getAudioCtx } from '../../audio.js';
export const MAP_W = 6000, MAP_H = 4500;
export const PLAYER_SIZE = 68, PLAYER_SPEED = 5;
export const EMOJI_CURSOR = `url("assets/emoji/cursors/hand-point-32.png") 16 4, pointer`;
export const AREA_RADIUS = 80, NODE_STOP = 6;
export const CAM_LERP = 0.08, CAM_AHEAD = 60;
export const DEST_ORDER = ['garden','pets','forest','pond','orchard','farm','airport','beach','bakery'];
export const DELIVERY_ORDER = ['hilltop','castle','ranger','icecream','cottage','restaurant','camp','lighthouse','townhall'];

export const C = {
  grass: '#8FBF6F', grass2: '#7DB362',
  road: '#A0A0A0', sidewalk: '#C8C0B0', roadLine: '#C0C0C0',
  subRoad: '#B8B0A0', dirtPath: '#C4B099',
  sand: '#F4D799', ocean: '#4A90C4', oceanLight: '#7EC8E3', oceanDeep: '#2B6B9E',
  sky: '#87CEEB',
  farmSoil: '#D4B876', pasture: '#95C97E', meadow: '#A5D48E',
  forestDark: '#4A7A3E', hillGreen: '#7A9A6A',
  boardwalk: '#B8956A',
  runway: '#606060', terminal: '#C0C0C0',
};

// === AUDIO ===
function ctx() { return getAudioCtx(); }
function synth(type, freq, dur, sweep, vol) {
  const c = ctx(); if (!c) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (sweep) o.frequency.exponentialRampToValueAtTime(sweep, t + dur);
  g.gain.setValueAtTime(vol || 0.12, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t); o.stop(t + dur);
}
function playChime() { synth('sine',880,0.3,1320,0.1); setTimeout(()=>synth('sine',1100,0.3,1320,0.08),120); }
function playChaChing() { synth('square',440,0.05,880,0.08); setTimeout(()=>synth('square',660,0.2,1000,0.1),60); }
function playChord() { synth('sine',523,0.4,523,0.08); synth('sine',659,0.4,659,0.06); synth('sine',784,0.4,784,0.05); }
function playSparkle() { [880,1100,1320,1760].forEach((f,i)=>setTimeout(()=>synth('sine',f,0.15,f*1.2,0.07),i*70)); }
function playBark() { synth('square',220,0.08,110,0.1); setTimeout(()=>synth('square',180,0.06,90,0.08),100); }
function playRustle() { synth('sawtooth',200,0.3,100,0.04); synth('sawtooth',250,0.25,120,0.03); }
function playSplash() { synth('triangle',300,0.4,80,0.08); setTimeout(()=>synth('sine',600,0.2,200,0.05),50); }
function playShake() { synth('sawtooth',150,0.25,200,0.06); setTimeout(()=>synth('sawtooth',180,0.2,150,0.05),80); }
function playMoo() { synth('sawtooth',120,0.5,90,0.12); setTimeout(()=>synth('sawtooth',100,0.4,80,0.1),200); }
function playJet() { synth('sawtooth',80,1.2,400,0.15); synth('sawtooth',100,1.0,300,0.1); }
function playWave() { synth('sine',200,0.6,60,0.08); setTimeout(()=>synth('sine',150,0.5,50,0.06),200); }
function playStep() { synth('triangle',300,0.05,200,0.04); }

export const SOUND_MAP = {
  chime: playChime, chaChing: playChaChing, chord: playChord,
  sparkle: playSparkle, bark: playBark, rustle: playRustle,
  splash: playSplash, shake: playShake, moo: playMoo,
  jet: playJet, wave: playWave,
};

// === NODE/EDGE GRAPH ===
export const nodeMap = {
  // City grid intersections: cCOL_ROW
  c00: { x:2000, y:2000 }, c10: { x:2600, y:2000 }, c20: { x:3200, y:2000 }, c30: { x:3800, y:2000 },
  c01: { x:2000, y:2400 }, c11: { x:2600, y:2400 }, c21: { x:3200, y:2400 }, c31: { x:3800, y:2400 },
  c02: { x:2000, y:2800 }, c12: { x:2600, y:2800 }, c22: { x:3200, y:2800 }, c32: { x:3800, y:2800 },
  // North suburbs
  s_nw:    { x:1100, y:1400 },
  s_n1:    { x:2000, y:1400 },
  s_n2:    { x:2600, y:1400 },
  s_n3:    { x:3200, y:1400 },
  s_ne:    { x:3800, y:1400 },
  // West/East suburbs
  s_w1:    { x:1100, y:2000 },
  s_w2:    { x:1100, y:2600 },
  s_e1:    { x:4600, y:2000 },
  s_e2:    { x:4600, y:2600 },
  // South suburbs
  s_sw:    { x:1100, y:3000 },
  s_s1:    { x:2000, y:3000 },
  s_s2:    { x:3200, y:3000 },
  s_se:    { x:4000, y:3000 },
  // Suburb destinations
  garden:  { x:700,  y:2000 },
  pets:    { x:1100, y:3200 },
  // Countryside junctions
  cnt_nw:  { x:900,  y:1100 },
  cnt_n1:  { x:1800, y:800  },
  cnt_n2:  { x:2600, y:700  },
  cnt_n3:  { x:3600, y:900  },
  cnt_ne:  { x:4800, y:1000 },
  cnt_w:   { x:400,  y:1700 },
  // Countryside destinations
  forest:  { x:700,  y:700  },
  pond:    { x:2000, y:1000 },
  orchard: { x:3800, y:600  },
  farm:    { x:4400, y:1100 },
  // Airport
  ap_entry:{ x:4800, y:1600 },
  airport: { x:5200, y:1600 },
  // Beach town
  bt_w:    { x:1100, y:3400 },
  bt_c:    { x:2400, y:3400 },
  bt_e:    { x:3800, y:3400 },
  beach:   { x:2400, y:3800 },
  // City destination
  bakery:  { x:2300, y:2100 },
  // Elbow nodes (orthogonal routing)
  elb_ne1: { x:4600, y:1400 },
  elb_ne2: { x:4800, y:1400 },
  elb_se:  { x:4000, y:2600 },
  elb_btc: { x:2400, y:3000 },
  elb_bte: { x:3800, y:3000 },
  elb_cnw: { x:900,  y:1400 },
  elb_cn1: { x:1800, y:1400 },
  elb_cn3: { x:3600, y:1400 },
  elb_cw:  { x:400,  y:2000 },
  elb_nw1: { x:1800, y:1100 },
  elb_n12: { x:2600, y:800  },
  elb_n23: { x:3600, y:700  },
  elb_n3e: { x:4800, y:900  },
  elb_nww: { x:400,  y:1100 },
  elb_for: { x:700,  y:1100 },
  elb_pond:{ x:2000, y:800  },
  elb_orch:{ x:3800, y:900  },
  elb_farm:{ x:4400, y:1000 },
  elb_bak: { x:2300, y:2000 },
  // Delivery destination nodes
  hilltop:    { x:400,  y:2400 },
  castle:     { x:3050, y:2200 },
  ranger:     { x:5000, y:2400 },
  icecream:   { x:1800, y:3400 },
  cottage:    { x:1500, y:1700 },
  restaurant: { x:3600, y:2600 },
  camp:       { x:500,  y:3200 },
  lighthouse: { x:4200, y:3600 },
  townhall:   { x:2900, y:2000 },
  // Delivery elbow nodes
  elb_ranger: { x:5000, y:2600 },
  elb_camp:   { x:500,  y:3000 },
  elb_castle: { x:3050, y:2000 },
  elb_cottage:{ x:1500, y:1400 },
  elb_rest:   { x:3600, y:2400 },
  elb_lh:     { x:4200, y:3400 },
};

export const edges = [
  // City horizontal (c00→c10 routed through elb_bak, see bakery section)
  { a:'c10',b:'townhall',type:'city' }, { a:'townhall',b:'elb_castle',type:'city' }, { a:'elb_castle',b:'c20',type:'city' }, { a:'c20',b:'c30',type:'city' },
  { a:'c01',b:'c11',type:'city' }, { a:'c11',b:'c21',type:'city' }, { a:'c21',b:'elb_rest',type:'city' }, { a:'elb_rest',b:'c31',type:'city' },
  { a:'c02',b:'c12',type:'city' }, { a:'c12',b:'c22',type:'city' }, { a:'c22',b:'c32',type:'city' },
  // City vertical
  { a:'c00',b:'c01',type:'city' }, { a:'c01',b:'c02',type:'city' },
  { a:'c10',b:'c11',type:'city' }, { a:'c11',b:'c12',type:'city' },
  { a:'c20',b:'c21',type:'city' }, { a:'c21',b:'c22',type:'city' },
  { a:'c30',b:'c31',type:'city' }, { a:'c31',b:'c32',type:'city' },
  // City to north suburbs (vertical)
  { a:'c00',b:'s_n1',type:'suburban' }, { a:'c10',b:'s_n2',type:'suburban' },
  { a:'c20',b:'s_n3',type:'suburban' }, { a:'c30',b:'s_ne',type:'suburban' },
  // City to west/east (horizontal)
  { a:'c00',b:'s_w1',type:'suburban' },
  { a:'c30',b:'s_e1',type:'suburban' },
  // City to south (vertical)
  { a:'c02',b:'s_s1',type:'suburban' }, { a:'c22',b:'s_s2',type:'suburban' },
  // North suburb ring (horizontal, routed through countryside elbows)
  { a:'s_nw',b:'elb_cottage',type:'suburban' }, { a:'elb_cottage',b:'elb_cn1',type:'suburban' }, { a:'elb_cn1',b:'s_n1',type:'suburban' },
  { a:'s_n1',b:'s_n2',type:'suburban' },
  { a:'s_n2',b:'s_n3',type:'suburban' }, { a:'s_n3',b:'elb_cn3',type:'suburban' },
  { a:'elb_cn3',b:'s_ne',type:'suburban' },
  // West suburbs (vertical)
  { a:'s_nw',b:'s_w1',type:'suburban' }, { a:'s_w1',b:'s_w2',type:'suburban' },
  { a:'s_w2',b:'s_sw',type:'suburban' },
  // East suburbs via elbows
  { a:'s_ne',b:'elb_ne1',type:'suburban' }, { a:'elb_ne1',b:'s_e1',type:'suburban' },
  { a:'s_e1',b:'s_e2',type:'suburban' },
  { a:'s_e2',b:'elb_se',type:'suburban' }, { a:'elb_se',b:'s_se',type:'suburban' },
  // South suburb ring (horizontal, routed through beach elbows)
  { a:'s_sw',b:'s_s1',type:'suburban' },
  { a:'elb_btc',b:'s_s2',type:'suburban' },
  { a:'elb_bte',b:'s_se',type:'suburban' },
  // Suburb destination spurs
  { a:'s_w1',b:'garden',type:'suburban' },
  { a:'s_sw',b:'pets',type:'suburban' },
  // Suburb to countryside via elbows (elbows now shared with suburb ring)
  { a:'s_nw',b:'elb_cnw',type:'dirt' }, { a:'elb_cnw',b:'cnt_nw',type:'dirt' },
  { a:'elb_nw1',b:'elb_cn1',type:'dirt' },
  { a:'elb_cn3',b:'cnt_n3',type:'dirt' },
  { a:'elb_ne1',b:'elb_ne2',type:'suburban' },
  { a:'elb_ne2',b:'cnt_ne',type:'dirt' },
  { a:'garden',b:'elb_cw',type:'dirt' }, { a:'elb_cw',b:'cnt_w',type:'dirt' },
  // Countryside connections (chained through destination elbows to avoid direction collisions)
  { a:'cnt_nw',b:'elb_nw1',type:'dirt' }, { a:'elb_nw1',b:'cnt_n1',type:'dirt' },
  { a:'cnt_n1',b:'elb_pond',type:'dirt' }, { a:'elb_pond',b:'elb_n12',type:'dirt' },
  { a:'elb_n12',b:'cnt_n2',type:'dirt' }, { a:'elb_n12',b:'s_n2',type:'dirt' },
  { a:'cnt_n2',b:'elb_n23',type:'dirt' }, { a:'elb_n23',b:'cnt_n3',type:'dirt' },
  { a:'cnt_n3',b:'elb_orch',type:'dirt' }, { a:'elb_orch',b:'elb_n3e',type:'dirt' },
  { a:'elb_n3e',b:'cnt_ne',type:'dirt' },
  { a:'cnt_nw',b:'elb_for',type:'dirt' }, { a:'elb_for',b:'elb_nww',type:'dirt' },
  { a:'elb_nww',b:'cnt_w',type:'dirt' },
  // Countryside destinations
  { a:'elb_for',b:'forest',type:'dirt' },
  { a:'elb_pond',b:'pond',type:'dirt' },
  { a:'elb_orch',b:'orchard',type:'dirt' },
  { a:'cnt_ne',b:'elb_farm',type:'dirt' }, { a:'elb_farm',b:'farm',type:'dirt' },
  // Airport via elbow chain
  { a:'elb_ne2',b:'ap_entry',type:'airport' },
  { a:'ap_entry',b:'airport',type:'airport' },
  // South suburb to beach town via elbows
  { a:'pets',b:'bt_w',type:'suburban' },
  { a:'s_s1',b:'elb_btc',type:'suburban' }, { a:'elb_btc',b:'bt_c',type:'suburban' },
  { a:'s_s2',b:'elb_bte',type:'suburban' }, { a:'elb_bte',b:'bt_e',type:'suburban' },
  // Beach town
  { a:'bt_w',b:'icecream',type:'boardwalk' }, { a:'icecream',b:'bt_c',type:'boardwalk' }, { a:'bt_c',b:'bt_e',type:'boardwalk' },
  { a:'bt_c',b:'beach',type:'boardwalk' },
  // City destination via elbow (also chains c00→c10 through elb_bak)
  { a:'c00',b:'elb_bak',type:'city' }, { a:'elb_bak',b:'c10',type:'city' },
  { a:'elb_bak',b:'bakery',type:'city' },
  // Delivery destination spurs (all 90° L-shaped via elbows)
  { a:'elb_cw',b:'hilltop',type:'dirt' },
  { a:'elb_castle',b:'castle',type:'city' },
  { a:'s_e2',b:'elb_ranger',type:'suburban' }, { a:'elb_ranger',b:'ranger',type:'suburban' },
  { a:'elb_cottage',b:'cottage',type:'suburban' },
  { a:'elb_rest',b:'restaurant',type:'city' },
  { a:'s_sw',b:'elb_camp',type:'suburban' }, { a:'elb_camp',b:'camp',type:'dirt' },
  { a:'bt_e',b:'elb_lh',type:'boardwalk' }, { a:'elb_lh',b:'lighthouse',type:'boardwalk' },
];

// Build adjacency
export const adjacency = {};
for (const id of Object.keys(nodeMap)) adjacency[id] = [];
for (const e of edges) {
  adjacency[e.a].push({ node: e.b, edge: e });
  adjacency[e.b].push({ node: e.a, edge: e });
}
function getNodeEdges(nodeId) { return adjacency[nodeId].map(x => x.edge); }
function getOtherNode(nodeId, edge) { return edge.a === nodeId ? edge.b : edge.a; }

// BFS pathfinding
function bfsPath(start, end) {
  if (start === end) return [];
  const queue = [[start]];
  const visited = new Set([start]);
  while (queue.length) {
    const path = queue.shift();
    const cur = path[path.length - 1];
    for (const nb of adjacency[cur]) {
      const n = nb.node;
      if (!visited.has(n)) {
        const np = [...path, n];
        if (n === end) return np.slice(1);
        visited.add(n);
        queue.push(np);
      }
    }
  }
  return [];
}

function nearestNode(wx, wy) {
  let best = null, bestD = Infinity;
  for (const [id, n] of Object.entries(nodeMap)) {
    const d = Math.hypot(n.x - wx, n.y - wy);
    if (d < bestD) { bestD = d; best = id; }
  }
  return best;
}

// === DESTINATIONS ===
export const DESTINATIONS = {
  garden:  { emoji:'👩🏻‍🌾', label:'Garden',  reward:'🌹', sound:'sparkle' },
  pets:    { emoji:'👱‍♀️', label:'Pets',    reward:'🐕', sound:'sparkle' },
  forest:  { emoji:'🧙‍♂️', label:'Forest',  reward:'🍄', sound:'sparkle' },
  pond:    { emoji:'🐸',  label:'Pond',    reward:'🐟', sound:'sparkle' },
  orchard: { emoji:'👩‍🦳', label:'Orchard', reward:'🍎', sound:'sparkle' },
  farm:    { emoji:'👨🏻‍🌾', label:'Farm',    reward:'🥚', sound:'sparkle' },
  airport: { emoji:'👨‍✈️', label:'Airport', reward:'🎫', sound:'sparkle' },
  beach:   { emoji:'🧘‍♀️', label:'Beach',   reward:'🐚', sound:'sparkle' },
  bakery:  { emoji:'🧑‍🍳', label:'Bakery',  reward:'🎂', sound:'sparkle' },
};

// Delivery recipients — each paired with a sender destination
export const DELIVERY_DESTINATIONS = {
  hilltop:    { emoji:'🧝‍♀️', label:"Elf's Clearing",   sourceId:'forest',  reward:'🍄', sound:'sparkle' },
  castle:     { emoji:'👩‍🎨',    label:'Castle Park',      sourceId:'garden',  reward:'🌹', sound:'sparkle' },
  ranger:     { emoji:'🧔',    label:'Ranger Station',   sourceId:'pets',    reward:'🐕', sound:'sparkle' },
  icecream:   { emoji:'🐧',    label:'Ice Cream Shop',   sourceId:'pond',    reward:'🐟', sound:'sparkle' },
  cottage:    { emoji:'👵',    label:"Grandma's Cottage", sourceId:'orchard', reward:'🍎', sound:'sparkle' },
  restaurant: { emoji:'👨‍🍳', label:'Restaurant',       sourceId:'farm',    reward:'🥚', sound:'sparkle' },
  camp:       { emoji:'👲🏽',    label:"Explorer's Camp",  sourceId:'airport', reward:'🎫', sound:'sparkle' },
  lighthouse: { emoji:'🧜‍♀️', label:'Lighthouse',       sourceId:'beach',   reward:'🐚', sound:'sparkle' },
  townhall:   { emoji:'👩🏻',    label:'Town Hall',        sourceId:'bakery',  reward:'🎂', sound:'sparkle' },
};

// Sender → delivery recipient mapping
export const DELIVERY_MAP = {
  forest:'hilltop', garden:'castle', pets:'ranger', pond:'icecream',
  orchard:'cottage', farm:'restaurant', airport:'camp', beach:'lighthouse', bakery:'townhall',
};

// Sender dialogs (shown after collecting an item)
export const SENDER_DIALOGS = {
  forest:  "Here's a magic mushroom! Please bring it to the Elf in the western woods, she needs it for the Festival potion!",
  garden:  "This rose is for the Artist at Castle Park in the city. She's decorating for the Festival!",
  pets:    "My puppy wants to meet the Ranger at the station out east! Can you take him there?",
  pond:    "This fish is a gift for the Penguin at the ice cream shop on the boardwalk!",
  orchard: "Take this apple to Grandma at her cottage up north. She's baking a Festival pie!",
  farm:    "A fresh egg for the Chef at the restaurant in the city! He's cooking a Festival feast!",
  airport: "A ticket for the Explorer camped out southwest, he's been waiting to fly to the Festival!",
  beach:   "This shell is for the Mermaid at the lighthouse. She'll use it to call the Festival music!",
  bakery:  "A special cake for the Mayor at Town Hall! It's needed for the big festival celebration.",
};

// Recipient dialogs (shown when item is delivered)
export const RECIPIENT_DIALOGS = {
  hilltop:    "A magic mushroom! Now I can brew the Potion of Kindness. The Festival grows closer...",
  castle:     "A beautiful rose! The castle garden will bloom for the Festival! Thank you, little hero!",
  ranger:     "A new friend! This pup will help me guard the forest for the Festival. Woof!",
  icecream:   "A fish?! Yum! Now I have energy to make Festival ice cream for everyone!",
  cottage:    "An apple from the orchard! My Festival pie will be the best one yet!",
  restaurant: "A farm-fresh egg! My Festival feast will be magnificent! Merci!",
  camp:       "A plane ticket! I can finally join the Festival! Adventure awaits!",
  lighthouse: "A sea shell! Listen... can you hear the Festival song beginning?",
  townhall:   "Wonderful! As Mayor, I'll share this cake with everyone when the festival begins!",
};

// Hint dialogs (shown when visiting a recipient WITHOUT the item)
export const HINT_DIALOGS = {
  hilltop:    "I need a magic mushroom for my potion! Please visit the Wizard in the forest.",
  castle:     "I'm looking for a rose for the Festival! The Gardener might have one.",
  ranger:     "I could use a furry companion! There's a girl with pets in the south.",
  icecream:   "I'm so hungry! The Frog at the pond might have a fish for me.",
  cottage:    "I need an apple for my pie! Try the Elder at the orchard.",
  restaurant: "I need a fresh egg for the feast! Visit the Farmer up north.",
  camp:       "I need a plane ticket to join the Festival! Ask the Pilot at the airport.",
  lighthouse: "I need a sea shell for the Festival music! The Yoga Lady at the beach has one.",
  townhall:   "The Festival awaits a special cake! Speak to the Baker in the city.",
};

export const FINAL_DELIVERY_LINE = "That's the last gift! The Festival of Kindness can finally BEGIN! Thank you, little hero!";
