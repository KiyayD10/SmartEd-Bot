smarted-bot/
├── backend/                # Aplikasi NestJS
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.service.ts  # Logika TF-IDF ada di sini
│   │   └── main.ts         # Entry point (Port 3001)
│   └── package.json
│
├── frontend/               # Aplikasi Next.js
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css # Import Tailwind v4
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx    # Halaman Utama Chat
│   │   │   ├── api/        # (Opsional jika ada route handler)
│   │   ├── components/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── TypingIndicator.tsx
│   │   └── types.d.ts      # Deklarasi TypeScript
│   └── package.json
│
└── README.md
