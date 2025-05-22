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

![All_Chats_Screenshot](https://github.com/user-attachments/assets/7e4414d5-93ae-47ad-9ec5-011a1a7553ba)

- View all your conversations in a clean, modern interface
- Each chat shows the last message and timestamp
- Unread messages are clearly indicated
- Quick access to profile and new chat creation

### Chat Screen
![Empty_Chat_screenshot](https://github.com/user-attachments/assets/58255fc4-95a0-443d-905b-c47180930849)
![Friends_Directory_Screenshot](https://github.com/user-attachments/assets/2cf65cbe-5199-48a9-b025-14fcc8202c30)
![Lakehead_Group_Screenshot](https://github.com/user-attachments/assets/daf627fd-2365-45ec-b4bc-8b72bb9d6c12)
![Message_screenshot](https://github.com/user-attachments/assets/c66b7d29-75ed-4a41-82ad-10190ae0bc13)
![Group_Screenshot](https://github.com/user-attachments/assets/f04ab681-5d50-41c1-8c59-2e9b268f9f70)

- Real-time messaging interface
- Message status indicators (sent, delivered, read)
- Typing indicators
- Media sharing capabilities
- Group chat support with member list

### Profile Screen
![User_Profile_Screenshot](https://github.com/user-attachments/assets/26e546a2-68c6-42e8-8ab9-ef1097e0ed02)

- Edit your profile information
- Update profile picture
- Manage notification preferences
- Set custom status message

### New Chat
![All_Chats_Screenshot](https://github.com/user-attachments/assets/d55d80af-e6a2-419f-85c8-80a6ad352b21)
![Create_New_Group_Screenshot](https://github.com/user-attachments/assets/933b6a84-bc02-4af2-a583-d480940bea85)
![Contacts_Searching_Screeshot](https://github.com/user-attachments/assets/3b841411-c2ec-4903-ab7a-85e773b1c725)
![Side_Bar_Screenshot](https://github.com/user-attachments/assets/265a7b07-7974-4c0b-b089-b0e07e15de58)


- Create individual or group chats
- Create Important Directory
- Search through contacts
- Select multiple participants for group chats
- Set group name and photo

### Delete and Undo and Edit Chat Options

![Undo_delete_message_screenshot](https://github.com/user-attachments/assets/a8e0d395-194b-4525-a075-b57a60d9cc9e)
![Delete_Chats_Grourpscreenshot](https://github.com/user-attachments/assets/34917f2d-0a9e-49de-ba34-5b58e8e300b7)
![Chat_delete_screenshot](https://github.com/user-attachments/assets/88ff23cd-c71e-416f-8603-d4571d0d9ac7)
![Lakehead_Group_Screenshot](https://github.com/user-attachments/assets/6c0aa762-0363-41b6-93e0-77356ca89365)


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
