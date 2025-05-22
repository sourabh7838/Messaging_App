# React Native Messaging App

A modern messaging application built with React Native, featuring real-time chat, user profiles, and persistent storage.

## Features

- 📱 Modern iOS-style UI/UX
- 💬 Real-time messaging
- 👤 User profiles with avatars
- 📝 Chat history persistence
- 🔔 Customizable notifications
- 👥 Group chat support
- 🔄 Pull-to-refresh functionality
- 📱 Responsive design

## Screenshots

### Inbox Screen

<img width="172" alt="image" src="https://github.com/user-attachments/assets/9f707aa5-2408-428d-8e90-0ee08337f956" />


- View all your conversations in a clean, modern interface
- Each chat shows the last message and timestamp
- Unread messages are clearly indicated
- Quick access to profile and new chat creation

### Chat Screen
<img width="148" alt="image" src="https://github.com/user-attachments/assets/3cd491a1-1039-4159-bbe0-164763480c18" />
<img width="166" alt="image" src="https://github.com/user-attachments/assets/3f50b42a-65d7-4fad-a9d3-e62be708e25f" />
<img width="147" alt="image" src="https://github.com/user-attachments/assets/0746414b-b78c-49b9-a250-e3934c07c896" />
<img width="185" alt="image" src="https://github.com/user-attachments/assets/56046e0d-cbef-48a4-b010-9899b640fd2a" />

- Real-time messaging interface
- Message status indicators (sent, delivered, read)
- Typing indicators
- Media sharing capabilities
- Group chat support with member list

### Profile Screen
<img width="195" alt="image" src="https://github.com/user-attachments/assets/d3e600b8-7c83-409c-8cb0-3b2f90cbe4e7" />

- Edit your profile information
- Update profile picture
- Manage notification preferences
- Set custom status message

### New Chat
<img width="172" alt="image" src="https://github.com/user-attachments/assets/e37ce7db-e36a-44ee-98c1-eb4f4673b359" />
<img width="185" alt="image" src="https://github.com/user-attachments/assets/34c93007-acd1-4f07-98d1-f19c82f31c6b" />
<img width="177" alt="image" src="https://github.com/user-attachments/assets/b8d1f6f1-5318-4cd7-ba7d-d8d48b27ad28" />
<img width="216" alt="image" src="https://github.com/user-attachments/assets/66625d32-1289-419e-bc12-e770ca3060dd" />

- Create individual or group chats
- Create Important Directory
- Search through contacts
- Select multiple participants for group chats
- Set group name and photo

### Delete and Undo and Edit Chat Options

<img width="169" alt="image" src="https://github.com/user-attachments/assets/fc6e4b7e-3bf2-4bf6-9251-decb5750c7cd" />
<img width="171" alt="image" src="https://github.com/user-attachments/assets/3b40b475-f46f-4e69-914c-6f5d7f6987d2" />
<img width="148" alt="image" src="https://github.com/user-attachments/assets/ca212733-d05e-47be-9de7-1ad3be1b167a" />


## Project Structure

```
MessagingApp/
├── src/
│   ├── components/     # Reusable UI components
│   │   └── Avatar.tsx # User avatar component
│   │   
│   ├── screens/       # Main application screens
│   │   ├── InboxScreen.tsx    # Messages list
│   │   ├── ChatScreen.tsx     # Individual chat
│   │   ├── NewChatScreen.tsx  # Create new chat
│   │   └── ProfileScreen.tsx  # User profile
│   │   
│   ├── types/         # TypeScript interfaces
│   │   ├── chat.ts    # Chat and message types
│   │   └── user.ts    # User profile types
│   │   
│   ├── utils/         # Utility functions
│   │   └── storage.ts # AsyncStorage handlers
│   │   
│   └── theme/         # App-wide styling
│       └── colors.ts  # Color definitions
└── App.tsx           # Root navigation setup
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or newer)
- npm or Yarn package manager
- Ruby (for iOS development)
- CocoaPods (for iOS development)
- Xcode (for iOS development)
- Android Studio (for Android development)
- React Native CLI

Follow the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide for detailed instructions.

## Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd MessagingApp
   ```

2. Install JavaScript dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Install iOS dependencies (iOS only):
   ```sh
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

## Running the App

### iOS

1. Start Metro bundler:
   ```sh
   npm start
   # or
   yarn start
   ```

2. Run the iOS app:
   ```sh
   npm run ios
   # or
   yarn ios
   ```

### Android

1. Start Metro bundler:
   ```sh
   npm start
   # or
   yarn start
   ```

2. Run the Android app:
   ```sh
   npm run android
   # or
   yarn android
   ```

## Development

### Key Features and Usage

1. **Inbox Screen**
   - View all your conversations
   - Swipe left on a chat to delete
   - Pull to refresh for updates
   - Tap the profile icon to access settings

2. **Chat Screen**
   - Real-time messaging
   - Support for text messages
   - Message persistence
   - Typing indicators
   - Read receipts

3. **Profile Screen**
   - Edit personal information
   - Update avatar
   - Toggle notifications
   - Set status message

4. **New Chat**
   - Create individual or group chats
   - Search and select contacts
   - Set group name and photo

## Troubleshooting

### Common Issues

1. **Build fails on iOS**
   - Ensure CocoaPods is properly installed
   - Run `bundle exec pod install` in the ios directory
   - Clean build folder: `cd ios && xcodebuild clean`

2. **Build fails on Android**
   - Ensure ANDROID_HOME is properly set
   - Clean Android build: `cd android && ./gradlew clean`
   - Ensure Android SDK platforms and build tools are installed

3. **Metro bundler issues**
   - Clear Metro cache: `npm start -- --reset-cache`
   - Ensure all dependencies are properly installed
