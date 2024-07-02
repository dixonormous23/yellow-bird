
# Canary Chat 🐤

A quick little chat app developed for Yellow Bird as a preliminary coding exercise. This project involves building a real-time, two-way chat application using ReactJS, NextJS and integrating PubNub's free Chat SDK API. The application allows users to create or join a chat using a code and provides a standard chat experience with features such as reactions, editing past messages, emoji support, and more.
 

## Live Demo
[https://yellow-bird.vercel.app/chat](https://yellow-bird.vercel.app/chat)

## Getting Started

- Install dependencies:

```bash
npm install
```
- Set up a PubNub account and obtain the necessary keys.
- Configure the PubNub and Firebase keys in the project's `.env` file (see `.env.sample` for all needed env keys).


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

Open the application in your browser: [http://localhost:3000](http://localhost:3000)

- To run E2E and Unit tests, run `yarn test` to open cypress. Ensure development server is running on [http://localhost:3000](http://localhost:3000) if running E2E tests.

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
- `PubNubContext`: Context component that stands up the Chat SDK and provides channel, chat and member data to the app.

- `ChatPageComponent`: This component is the full view of the `/chat` page, mounting necessary components depending on the `activeChannel` state (user selected channel).

- `ChatWindow`: Component that houses all user messages within the select channel. This component also manages all updates to the message, i.e `reactions` and `editText` with the provided `Message.streamUpdatesOn(messages, setMessages);` method from the Chat SDK.

- `ChatMessage`: Component that renders a user's message in a given channel. Key features include `reactions` and `editing text`. Editing text is made possible by switching to `contentEditable`, and is only editable by the author of the original message.


- `Chat input`: To support single and multiline support for user input I opted to use a contentEditable `<div>`. This is mostly because an `<input />` doesn't natively support multiline input, and would avoid any extra calculations on a `<textarea />` with rows, height, etc.

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


## Assumptions During Development
- PubNub React Components
  - After reading through PubNub's docs there was mention of a React SDK, which would have aided in a quicker turn around. Upon further reading this library is [no longer supported](https://www.pubnub.com/docs/sdks/react) and relies on an older version of `@pubnub`. So with this I opted to use the `Chat SDK` which provided cleaner, typed methods than the `JavaScript SDK`. This also allowed me to tailor the fronend experience in a completely customized way.
- User Authentication
  - Upon reading through and considering the stretch goals I decided to go with Firebase to handle user authentication and state, mostly due to fast stand up time to connect authenticated users.
- Project Scope
  - Given the handful of stretch goals, as well as giving a max of 3 days for a feature complete, I opted to implement the previously mentioned stretch goals to keep the overall design in scope. 
