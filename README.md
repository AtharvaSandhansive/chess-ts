# Chess-TS ♟️

A fast, zero-dependency, fully-typed Chess Engine and AI bot built from scratch in TypeScript and Vite. 

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

🎮 **Live Demo:** [chess-ts-teal.vercel.app](https://chess-ts-teal.vercel.app)

---

## ⚡ Features

- **Full Chess Rules Engine:** Complete move generation including En Passant, Castling, Pawn Promotion, and strict Check/Pin validation.
- **Minimax AI Engine:** Custom decision-making module using Minimax search and positional evaluation heuristics.
- **Decoupled Architecture:** Clean separation between core engine logic, state management, and the UI layout.
- **Responsive Web Interface:** Mobile-optimized CSS Grid UI (`min(90vw, 80vh)`) supporting both touch and click controls.
- **Zero Heavy Dependencies:** Engine logic written entirely in pure TypeScript without external chess libraries.

---

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Modular CSS3 (Grid & Flexbox)
- **Deployment:** Vercel CI/CD

---

## 🚀 Local Development

Clone the repository and start the local development server:

```bash
git clone [https://github.com/AtharvaSandhansive/chess-ts.git](https://github.com/AtharvaSandhansive/chess-ts.git)
cd chess-ts
npm install
npm run dev
