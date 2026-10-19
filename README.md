# CSC317-JavaScript-Game


This is an **individual assignment**. This assignment must be written in **JavaScript** running in a **web browser page** using the HTML `<canvas>` tag and 2d context for rendering a game. It must be served from a Node.js/Express server.  

There are no specific requirements for the type or style of game, other than:

- It must be **your own original work and idea** 
- It must **not** be one of the banned games
- It must implement the **minimum design requirements**

***It is okay to use AI, (AI-OK), but you still have to learn for the exam.***

To run:

```shell
git clone <your_repository_url>
npm init -y
npm install express
node server.js
```
  
## Game

Your game may be **single-player**, **multi-player**, or even **zero-player** (such as a simulation).  

See W3Schools’ tutorials for help getting started:  
- [HTML Canvas Graphics](https://www.w3schools.com/html/html5_canvas.asp)  
- [HTML Canvas Reference](https://www.w3schools.com/tags/ref_canvas.asp)  
- [HTML Game Example](https://www.w3schools.com/graphics/game_intro.asp)  

Avoid using JavaScript frameworks, engines, or stacks — write all code yourself, or potentially with AI, so that you can stay as minimal as possible (be sure to tell your AI this). In addition, if you want to use GenAI on this project, see the "Using Generative AI Responsibly" section below.  

> **VERY IMPORTANT:** Do **not** use `alert()` in the default game state.

When finished:

- Submit the Write-up to **Canvas**
- Tag and push your code, (include write-up in repo)

---

### **Using Generative AI Responsibly**

You may use GenAI tools if you stay guided and transparent: **report and cite how you use it** in your write-up and code documentation.

It's best to use GenAI like a **tutor**, not a **shortcut** so that you gain experience and opportunity to learn.  When you ask, focus on *understanding* and *exploration*:

- **Ask to learn:** “Explain each step of building a canvas game loop.”  
- **Fix by thinking:** “What does this error mean and how do I find it?”  
- **Iterate:** “Help me add collisions after I get one sprite moving.”  
- **Review:** “Check my code for clarity or better structure.”

> **VERY IMPORTANT:** You are responsible for what you turn in.


---

### **Banned Games**

These examples are considered **too simple** or **tutorial-level**, and will receive deductions for creativity if submitted:

- Pong / Breakout / Flappy Bird / Snake
- Tic-Tac-Toe / Memory Match / Hangman
- Whack-a-Mole / Bubble Pop / Accuracy-Clicker / Target-Trainer
- Rock-Paper-Scissors / Guess-the-Number / Slot Machine
- Simon Says / Single-Button Runner
- Any “Catch the Falling Object” or “Pop the Thing” style reflex game
- Any other similar such simplistic or low-effort game

---

### **Minimum Design Requirement**

Your game should include the following:
- Multiple levels or difficulty progression  
- A scoring or health system that updates dynamically  
- At least two distinct gameplay states beyond “start” and “game over”

> Some starter code is provided in public/example.html but you are not required to use it.


---

### **Rubric**

| Grade Item        | Grade Points                                |
|:------------------|--------------------------------------------:|
| Proper name, ID, and GitHub ID in write-up | 2 |
| Layout and appearance of Game | 15 |
| Correctness of JavaScript | 35 |
| Creativity of the Game | 15 |
| Playability of the Game | 15 |
| Code Comments | 10 |
| Write-up | 8 (Description, Game Rules, Sample Output) |

---

Keep it creative, have fun with it, and make something you’d actually want to play!

