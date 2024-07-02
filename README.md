
# Canary Chat 🐤

A quick little chat app developed for Yellow Bird as a preliminary coding exercise. 


## Getting Started

Install dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Stack

- NextJS (Framework)
- Styled Components (Styling)
- PubNub Chat SDK (Chat API)
- Firebase (Authentication, Database and Storage)
- Cypress (E2E and Unit Testing)

## Stretch Goals & Implementations
- Animations ✅
- Typehead Indication ✅
  - This will only reflect when another user is typing
- Handle Network Issues ✅
- Edit Past Messages ✅
- Reactions ✅
- Advanced User Features ✅
  - Auth - Support logged in and logged states
  - Avatars - Support user to choose or upload avatar upon creating account.
- NextJS ✅

## Key Components
- Chat input
  - To support single and multiline support for user input I opted to use a contentEditable `<div>`. This is mostly because an `<input />` doesn't natively support multiline input, and would avoid any extra calculations on a `<textarea />` with rows, height, etc.

```tsx
<StyledChatInput
    contentEditable
    role="textbox"
    ref={inputRef}
    data-cy="channel-input"
    $currentValue={inputRef.current?.innerText}
    onKeyDown={(e) => {
        // Allows for resetting innerText and spacing when submitting the message
        if (e.code === 'Enter' && !e.shiftKey) e.preventDefault();
    }}
/>
  ```
