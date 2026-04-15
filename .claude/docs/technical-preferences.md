# Technical Preferences

<!-- Populated by /setup-engine. Updated as the user makes decisions throughout development. -->
<!-- All agents reference this file for project-specific standards and conventions. -->

## Engine & Language

- **Engine**: Three.js r170+ (Browser / WebGL renderer)
- **Language**: JavaScript (ES2022 modules)
- **Rendering**: WebGL via Three.js; orthographic camera for isometric view
- **Physics**: Custom (no physics library needed for Tetris-style games)

## Input & Platform

<!-- Written by /setup-engine. Read by /ux-design, /ux-review, /test-setup, /team-ui, and /dev-story -->
<!-- to scope interaction specs, test helpers, and implementation to the correct input methods. -->

- **Target Platforms**: Web / Browser
- **Input Methods**: Keyboard (primary), Gamepad (partial)
- **Primary Input**: Keyboard
- **Gamepad Support**: Partial
- **Touch Support**: None (MVP)
- **Platform Notes**: Must run in modern browsers (Chrome, Firefox, Safari). No server required — static HTML deployment.

## Naming Conventions

- **Classes**: PascalCase (e.g., `VoxelBlock`, `GameBoard`, `IsometricCamera`)
- **Variables/functions**: camelCase (e.g., `moveSpeed`, `dropPiece`, `clearLayer`)
- **Events/callbacks**: camelCase with `on` prefix (e.g., `onLayerCleared`, `onGameOver`)
- **Files**: camelCase matching main export (e.g., `gameBoard.js`, `voxelRenderer.js`)
- **Scenes/Prefabs**: N/A — Three.js uses scene graph objects directly
- **Constants**: UPPER_SNAKE_CASE (e.g., `BOARD_WIDTH`, `DROP_INTERVAL_MS`)

## Performance Budgets

- **Target Framerate**: 60fps
- **Frame Budget**: 16.6ms
- **Draw Calls**: <200 per frame (merge static voxels where possible)
- **Memory Ceiling**: <256MB JS heap

## Testing

- **Framework**: Vitest (unit tests), manual browser smoke checks
- **Minimum Coverage**: Core game logic (board state, collision, scoring)
- **Required Tests**: Piece collision, layer clear, score formula, game-over detection

## Forbidden Patterns

- No `var` — use `const`/`let` only
- No direct DOM manipulation outside `src/ui/` — all game rendering via Three.js
- No magic numbers — all tuning values in `src/config/gameConfig.js`
- No `console.log` in production builds

## Allowed Libraries / Addons

- `three` r170+ — 3D rendering engine
- `vite` — build tool and dev server

## Architecture Decisions Log

<!-- Quick reference linking to full ADRs in docs/architecture/ -->
- [No ADRs yet — use /architecture-decision to create one]

## Engine Specialists

<!-- Written by /setup-engine when engine is configured. -->
<!-- Read by /code-review, /architecture-decision, /architecture-review, and team skills -->
<!-- to know which specialist to spawn for engine-specific validation. -->

- **Primary**: lead-programmer (web/JS architecture decisions)
- **Language/Code Specialist**: gameplay-programmer (.js game logic files)
- **Shader Specialist**: technical-artist (.glsl shader files, Three.js materials)
- **UI Specialist**: ui-programmer (DOM UI, HUD overlays)
- **Additional Specialists**: N/A
- **Routing Notes**: For Three.js-specific API questions use WebSearch to verify current r170+ API — LLM training may not cover latest releases.

### File Extension Routing

<!-- Skills use this table to select the right specialist per file type. -->

| File Extension / Type | Specialist to Spawn |
|-----------------------|---------------------|
| Game logic (.js — board, pieces, scoring) | gameplay-programmer |
| Rendering (.js — Three.js scene, camera, lights) | lead-programmer |
| Shader files (.glsl, .vert, .frag) | technical-artist |
| UI / HUD (.js DOM layer, .css) | ui-programmer |
| Config / balance (.js config files) | gameplay-programmer |
| General architecture review | lead-programmer |
