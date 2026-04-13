# Escape from Duckkov

A top-down extraction shooter built with Three.js — a cute, cartoonish take on hardcore tactical gameplay.

**[Play Now](https://suzyeth.github.io/escape-from-duckkov/)**

## About

Escape from Duckkov is a browser-based extraction shooter where you spawn into a hostile map, loot supplies, fight AI enemies ("ducklings"), and extract before the timer runs out. Die and you lose everything.

Inspired by Escape from Tarkov, but with a Q-version cartoon art style — round characters, warm lighting, and a playful aesthetic contrasted with punishing mechanics.

## Features

- **5 Weapons** — AK-74, Glock 17, MP-133 Shotgun, VSS Vintorez, MP5
- **5 Enemy Types** — Scav, Elite, Rusher, Tank, Boss
- **Body Part Damage** — Head, torso, arms, legs with fracture & bleeding
- **Armor System** — Light vest, heavy vest, helmet with durability
- **Inventory** — Grid-based backpack (8×10), weight limits, item stacking
- **Extraction** — 3 extract points, 45-min raid timer, hold E for 10s
- **Talent System** — 12 permanent upgrades (HP, speed, accuracy, armor)
- **Crafting** — 8 recipes with blueprint requirements
- **Fog of War** — 120° vision cone, enemies hidden outside view
- **Wave System** — New enemies spawn every 90 seconds
- **Difficulty** — Easy / Normal / Hard scaling
- **Full HUD** — Health bars, ammo, quickbar, minimap, boss HP, damage direction

## Controls

| Key | Action |
|-----|--------|
| WASD | Move |
| Mouse | Aim |
| Left Click | Shoot |
| Shift | Sprint |
| Ctrl | Crouch |
| 1-5 | Switch weapon |
| R | Reload |
| H | Use healing item |
| E | Pick up / Extract |
| F | Open/close door |
| Tab | Inventory |
| ESC | Pause menu |
| G | Art debug panel |

## Tech Stack

- **Three.js** — 3D rendering, PBR materials, shadow maps, bloom
- **Vite** — Build tooling
- **lil-gui** — Real-time art tuning
- Procedural geometry — all assets built from Three.js primitives (no external models)
- ACES Filmic tone mapping, vertex-colored terrain, particle effects

## Development

```bash
cd fps-game
npm install
npm run dev     # http://localhost:5173/escape-from-duckkov/
npm run build   # outputs to dist/
```

## Architecture

```
fps-game/src/
├── main.js              # Game loop, input, shooting, UI wiring
├── core/                # Renderer, GameLoop, InputManager
├── entities/            # Player, Enemy, RemotePlayer
├── systems/             # WeaponSystem, BulletSystem, AISystem,
│                        # HealthSystem, InventorySystem, LootSystem,
│                        # FogOfWar, DoorSystem, SoundSystem,
│                        # TalentSystem, CraftingSystem, NetworkSystem
├── props/               # Procedural 3D models (28 loot items,
│                        # trees, rocks, fences, buildings, vehicles)
├── ui/                  # HUD, InventoryUI, MinimapUI, StashScreen
└── world/               # Level (map geometry, zones, lighting)
```

## Screenshots

*Coming soon*

## License

MIT
