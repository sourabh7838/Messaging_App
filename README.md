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
![Inbox Screen](docs/screenshots/inbox.png)
- View all your conversations in a clean, modern interface
- Each chat shows the last message and timestamp
- Unread messages are clearly indicated
- Quick access to profile and new chat creation

### Chat Screen
![Chat Screen](docs/screenshots/chat.png)
- Real-time messaging interface
- Message status indicators (sent, delivered, read)
- Typing indicators
- Media sharing capabilities
- Group chat support with member list

### Profile Screen
![Profile Screen](docs/screenshots/profile.png)
- Edit your profile information
- Update profile picture
- Manage notification preferences
- Set custom status message

### New Chat
![New Chat Screen](docs/screenshots/new-chat.png)
- Create individual or group chats
- Search through contacts
- Select multiple participants for group chats
- Set group name and photo

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
