import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat, Message } from '../types/chat';
import { UserProfile, DEFAULT_USER } from '../types/user';

const CHATS_STORAGE_KEY = '@messaging_app_chats';
const MESSAGES_STORAGE_KEY = '@messaging_app_messages';
const USER_PROFILE_KEY = '@messaging_app_user';

export const saveChats = async (chats: Chat[]) => {
  try {
    await AsyncStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Error saving chats:', error);
  }
};

export const loadChats = async (): Promise<Chat[]> => {
  try {
    const chatsJson = await AsyncStorage.getItem(CHATS_STORAGE_KEY);
    return chatsJson ? JSON.parse(chatsJson) : [];
  } catch (error) {
    console.error('Error loading chats:', error);
    return [];
  }
};

export const saveMessages = async (chatId: string, messages: Message[]) => {
  try {
    const key = `${MESSAGES_STORAGE_KEY}_${chatId}`;
    await AsyncStorage.setItem(key, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving messages:', error);
  }
};

export const loadMessages = async (chatId: string): Promise<Message[]> => {
  try {
    const key = `${MESSAGES_STORAGE_KEY}_${chatId}`;
    const messagesJson = await AsyncStorage.getItem(key);
    return messagesJson ? JSON.parse(messagesJson) : [];
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
};

export const deleteChat = async (chatId: string) => {
  try {
    const key = `${MESSAGES_STORAGE_KEY}_${chatId}`;
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error deleting chat messages:', error);
  }
};

export const saveUserProfile = async (profile: UserProfile) => {
  try {
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving user profile:', error);
  }
};

export const loadUserProfile = async (): Promise<UserProfile> => {
  try {
    const profileJson = await AsyncStorage.getItem(USER_PROFILE_KEY);
    return profileJson ? JSON.parse(profileJson) : DEFAULT_USER;
  } catch (error) {
    console.error('Error loading user profile:', error);
    return DEFAULT_USER;
  }
}; 