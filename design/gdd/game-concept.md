# Game Concept: Voxel Tetris RTX

## Core Identity

| Field | Value |
|-------|-------|
| **Working Title** | Voxel Tetris RTX |
| **Genre** | Puzzle / Arcade |
| **Platform** | Web / Browser (HTML, Three.js) |
| **Engine** | Three.js r170+ |
| **Estimated Scope** | Small (2–4 weeks, solo) |
| **Primary MDA Aesthetic** | Sensation + Challenge |

## Elevator Pitch

Classic Tetris — but every block is a glowing voxel rendered with fake raytracing.
Reflective floor, bloom, ambient occlusion, soft shadows. The game board looks like
a CGI render. Every move is beautiful.

## Core Fantasy

The player feels like an architect placing glowing crystals in a dark void.
Precision is rewarded not just with points — but with a visual explosion of light
and reflection when a line clears.

## Unique Hook

Like Tetris, AND ALSO every action has a cinematic visual payoff — rotations,
drops, and clears all trigger real-time lighting effects that make the board
feel alive.

## Game Pillars

### 1. Visual Payoff (Primary)
**Definition**: Every player action must look beautiful. Falling, rotating, clearing — all with effects.

**Design test**: If we're choosing between a simpler effect that ships faster vs. a
polished effect that feels satisfying — this pillar says we invest in the polish.

### 2. Readable Depth
**Definition**: The isometric view must never confuse the player. Depth is immediately readable.

**Design test**: If a visual effect obscures block position or makes the grid harder to read — cut it, even if it looks cool.

### 3. Pure Tetris Core
**Definition**: The mechanics are classic Tetris, unchanged. Only the visual layer is elevated.

**Design test**: If a mechanic change feels tempting but isn't in standard Tetris — it belongs in a sequel, not here.

## Anti-Pillars (What This Game Is NOT)

- NOT a Tetris variant with new mechanics (no 3D rotation of pieces, no new piece types)
- NOT a narrative game — there is no story
- NOT a multiplayer game in MVP scope
- NOT a mobile game — keyboard controls only in MVP

## Core Loop

### 30-Second Loop (moment-to-moment)
1. Piece spawns at top — player sees the voxel geometry form with a subtle glow
2. Player rotates / moves piece — smooth voxel animation, shadow updates in real time
3. Piece locks into place — satisfying thud + AO bakes between touching blocks
4. If line complete → **Visual Payoff moment**: row flashes, bloom spikes, reflection on floor pulses, blocks dissolve upward
5. Next piece spawns

### 5-Minute Loop
- Score accumulates, level increases, drop speed rises
- Visual intensity scales with level: higher levels = more bloom, deeper shadows
- "One more piece" psychology: the board looks too good to let die

### Session Loop (5–20 min)
- Single session = one game, natural stopping point at game over
- High score as the meta-goal
- Game over triggers a slow dramatic voxel collapse animation

## Visual Identity Anchor

**Direction**: Dark void studio — neon-lit voxels in a black space with a mirror floor.

**Visual rule**: Everything glows. Nothing is matte.

**Supporting principles**:
1. **High contrast** — dark background, bright emissive blocks. No mid-tones on the playing field.
2. **Reflection as ground truth** — the floor reflection is always visible and reacts to every event.
3. **Bloom as feedback** — bloom intensity communicates game state (calm during play, explosive on clear).

**Color philosophy**: Each tetromino type has a unique emissive color (classic Tetris mapping).
Cleared rows pulse white before dissolving. Game over turns everything deep red.

**Color palette**:
| Piece | Color |
|-------|-------|
| I | Cyan `#00ffff` |
| O | Yellow `#ffff00` |
| T | Magenta `#ff00ff` |
| S | Green `#00ff88` |
| Z | Red `#ff4444` |
| J | Blue `#4488ff` |
| L | Orange `#ff8800` |

## Fake Raytracing Stack

| Effect | Three.js Technique | Priority |
|--------|-------------------|----------|
| Reflective floor | `THREE.Reflector` | P0 |
| Bloom / glow | `UnrealBloomPass` | P0 |
| Soft shadows | PCF shadow maps | P0 |
| Block surface shine | `MeshStandardMaterial` + env map | P1 |
| Ambient Occlusion | `SSAOPass` | P1 |
| Line clear flash | Emissive spike + bloom burst | P0 |
| Game over collapse | Voxel scatter animation | P2 |

## MVP Definition

A playable Tetris game in the browser with:
- Isometric orthographic camera
- All 7 tetrominoes as voxel geometry
- Reflective floor + bloom active
- Line clear visual payoff
- Score display
- Keyboard controls (arrows + Z rotate)
- Game over screen

**Does NOT need for MVP**: sound, high score persistence, mobile controls, settings menu.

## Scope Tiers

**MVP (2 weeks)**:
Core Tetris loop + fake RT visual stack. Playable and beautiful.

**V1.0 (4 weeks)**:
+ Sound design (procedural audio on events)
+ High score (localStorage)
+ Level system with visual intensity scaling
+ Particle effects on line clear

**V1.5 (optional)**:
+ Ghost piece (translucent voxel preview)
+ Hold piece
+ Mobile touch controls
+ Multiple visual themes (neon, crystal, lava)

## Player Type

**Primary**: Achievers + Sensation-seekers — players who want to get better AND be
visually rewarded for skill.

**Secondary**: Casual browsers — people who stumble on it and can't stop watching
the reflections.

**Not for**: Players who want narrative, multiplayer, or mechanical novelty.

## Biggest Risks

| Risk | Type | Mitigation |
|------|------|------------|
| Isometric depth reading confusing | Design | Strong grid lines + ghost shadow on floor |
| Bloom too heavy → unreadable | Visual | Tune bloom threshold, readable > pretty |
| Three.js postprocessing performance | Technical | Test on mid-range hardware early |
| `SSAOPass` too expensive for 60fps | Technical | Make AO optional / lower quality setting |
