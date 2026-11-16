# Neon Drift: Pixel Car Racer

Neon Drift is an original JavaScript pixel racing game created for CSC317. The game runs in a web browser using the HTML `<canvas>` element and the Canvas 2D context. It is served through a Node.js and Express server.

The player controls a neon race car driving through a futuristic city. The goal is to avoid enemy cars, collect energy cells, earn points, and complete three increasingly difficult levels.

## How to Run

Clone the repository:

```bash
git clone https://github.com/abdullahk-786/PixelCarRacer.git

Open the project folder:
cd PixelCarRacer

Install the required package:
npm install

Start the Express server:
node server.js

Open the game in a web browser:
http://localhost:3000


Controls
- Enter — Start the game
- Left Arrow — Move left
- Right Arrow — Move right
- Up Arrow — Use boost
- P — Pause or resume the game
- R — Restart after game over or victory


Game Rules
The player begins with 100 health points. Enemy cars appear on the road and must be avoided.
- Hitting an enemy car removes 25 health points.
- Crashing also removes points from the score.
- Collecting a cyan energy cell adds 150 points.
- Energy cells also restore some boost power.
- The boost meter decreases while the Up Arrow is held.
- The boost meter slowly refills when it is not being used.
- The player must complete all three levels to win.
- The game ends when the player's health reaches zero.


Levels
The game contains three levels:
1. Level 1 — The starting level with slower traffic.
2. Level 2 — Faster traffic and increased difficulty.
3. Level 3 — The final level with the fastest traffic.

Each level lasts for a set amount of time. The player must survive long enough to reach the next level.
Gameplay States

Neon Drift includes several gameplay states:
- Title screen
- Racing state
- Paused state
- Level-clear state
- Game-over state
- Victory state

These states allow the player to start the game, pause during gameplay, progress through levels, and receive different results at the end.
Scoring and Health

The score increases while the player is driving. Collecting energy cells provides bonus points. Collisions with enemy cars reduce the score and health.

The health bar and boost bar are displayed on the game screen so the player can see the current status during the race.

Technologies Used
- JavaScript
- HTML5 Canvas
- Canvas 2D context
- Node.js
- Express
- Git and GitHub

No JavaScript frameworks or game engines were used.

Project Structure
PixelCarRacer
├── public
│   ├── index.html
│   ├── style.css
│   └── game.js
├── package.json
├── package-lock.json
└── server.js