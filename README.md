# 🐃 QurbaniHat – Livestock Booking Platform

A modern livestock marketplace where users can explore and book animals for Qurbani such as cows and goats.

## 🌐 Live URL

[https://qurbanihat-ej.vercel.app](https://qurbanihat-ej.vercel.app)

## ✨ Key Features

- 🐄 Browse 8+ cows and goats with full details
- 🔃 Sort animals by price (Low to High / High to Low)
- 📋 Booking form with toast notification on submit
- 🔐 Email/password authentication (stored in localStorage)
- 🌐 Google social login (mock)
- 👤 My Profile page – view name, email, photo
- ✏️ Update profile – change name and photo URL
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔔 Toast notifications throughout
- ⏳ Loading states on data fetch
- ❌ 404 Not Found page
- 🎬 Lottie animation on Qurbani Tips section

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: pnpm

## 📦 npm Packages Used

| Package          | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `next`           | React framework with App Router          |
| `react-toastify` | Toast notifications                      |
| `lottie-react`   | Lottie animation in Qurbani Tips section |

## 🗺️ Routes

| Route                | Access      | Description                                 |
| -------------------- | ----------- | ------------------------------------------- |
| `/`                  | Public      | Home page with hero, featured animals, tips |
| `/animals`           | Public      | All animals with sort by price              |
| `/login`             | Public      | Login with email or Google                  |
| `/register`          | Public      | Register new account                        |
| `/details/:id`       | **Private** | Animal details + booking form               |
| `/my-profile`        | **Private** | View logged-in user profile                 |
| `/my-profile/update` | **Private** | Update name and photo                       |

## 🚀 Getting Started

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
  app/              # Next.js App Router pages
    animals/        # All animals page
    details/[id]/   # Animal details (private)
    login/          # Login page
    register/       # Register page
    my-profile/     # Profile + update (private)
  components/       # Reusable components
    Navbar.tsx
    Footer.tsx
    AnimalCard.tsx
    PrivateRoute.tsx
  context/
    AuthContext.tsx  # Authentication state
  data/
    animals.json    # Animal data (8 animals)
```
