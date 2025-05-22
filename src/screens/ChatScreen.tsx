import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme/colors';
import {Message} from '../types/chat';
import {saveMessages, loadMessages, loadChats, saveChats} from '../utils/storage';

const ChatScreen = ({route, navigation}: any) => {
  const {chatId, name, isGroup} = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [deletedMessage, setDeletedMessage] = useState<Message | null>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    loadChatMessages();
  }, [chatId]);

  const loadChatMessages = async () => {
    const savedMessages = await loadMessages(chatId);
    setMessages(savedMessages);
  };

  const updateLastMessage = async (text: string) => {
    try {
      const chats = await loadChats();
      const updatedChats = chats.map(chat => 
        chat.id === chatId 
          ? {
              ...chat,
              lastMessage: text,
              timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            }
          : chat
      );
      await saveChats(updatedChats);
    } catch (error) {
      console.error('Error updating last message:', error);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim()) {
      try {
        let updatedMessages = [...messages];
        let messageText = inputText.trim();
        
        if (editingMessage) {
          // Edit existing message
          updatedMessages = messages.map(msg =>
            msg.id === editingMessage.id
              ? {...msg, text: messageText, isEdited: true}
              : msg,
          );
          setEditingMessage(null);
        } else {
          // Send new message
          const newMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            isEdited: false,
            senderId: 'current_user',
            senderName: 'Me',
          };
          updatedMessages = [newMessage, ...messages];
        }
        
        setMessages(updatedMessages);
        await saveMessages(chatId, updatedMessages);
        
        // Always update last message with the most recent one
        if (!editingMessage) {
          await updateLastMessage(messageText);
        }
        
        setInputText('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const deleteMessage = (message: Message) => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setDeletedMessage(message);
            const updatedMessages = messages.filter(msg => msg.id !== message.id);
            setMessages(updatedMessages);
            await saveMessages(chatId, updatedMessages);
            
            // Update last message if the deleted message was the last one
            if (messages[0]?.id === message.id && updatedMessages.length > 0) {
              await updateLastMessage(updatedMessages[0].text);
            } else if (updatedMessages.length === 0) {
              await updateLastMessage('');
            }
            
            setTimeout(() => {
              setDeletedMessage(null);
            }, 5000);
          },
          style: 'destructive',
        },
      ],
    );
  };

  const editMessage = (message: Message) => {
    setEditingMessage(message);
    setInputText(message.text);
    inputRef.current?.focus();
  };

  const undoDelete = async () => {
    if (deletedMessage) {
      const updatedMessages = [deletedMessage, ...messages];
      setMessages(updatedMessages);
      await saveMessages(chatId, updatedMessages);
      await updateLastMessage(deletedMessage.text);
      setDeletedMessage(null);
    }
  };

  const renderMessage = ({item}: {item: Message}) => (
    <View style={[styles.messageContainer, styles.messageBox]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <View style={styles.messageFooter}>
        <Text style={styles.timestamp}>
          {item.timestamp}
          {item.isEdited && ' · edited'}
        </Text>
        <View style={styles.messageActions}>
          <TouchableOpacity
            onPress={() => editMessage(item)}
            style={styles.actionButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            activeOpacity={0.6}>
            <Icon name="edit" size={18} color={colors.messageBubbleTextSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteMessage(item)}
            style={styles.actionButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            activeOpacity={0.6}>
            <Icon
              name="delete-outline"
              size={18}
              color={colors.messageBubbleTextSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.statusBar} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        {messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="chat-bubble-outline" size={48} color={colors.gray2} />
            <Text style={styles.emptyText}>No messages yet</Text>
            <Text style={styles.emptySubtext}>
              Start the conversation by sending a message
            </Text>
          </View>
        ) : (
          <FlatList
            inverted
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            style={styles.messageList}
            contentContainerStyle={styles.messageListContent}
          />
        )}

        {deletedMessage && (
          <TouchableOpacity
            style={styles.undoContainer}
            onPress={undoDelete}
            activeOpacity={0.8}>
            <Text style={styles.undoText}>Message deleted</Text>
            <Text style={styles.undoButton}>UNDO</Text>
          </TouchableOpacity>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={editingMessage ? 'Edit message...' : 'Message'}
            placeholderTextColor={colors.textTertiary}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim().length === 0 && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={inputText.trim().length === 0}
            activeOpacity={0.7}>
            <Icon
              name={editingMessage ? 'check' : 'send'}
              size={22}
              color={
                inputText.trim().length === 0
                  ? colors.textTertiary
                  : colors.messageBubbleText
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 10,
    paddingBottom: 20,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  messageBox: {
    backgroundColor: colors.messageBubble,
    borderRadius: 18,
    padding: 12,
    paddingBottom: 8,
  },
  messageText: {
    color: colors.messageBubbleText,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  timestamp: {
    color: colors.messageBubbleTextSecondary,
    fontSize: 12,
  },
  messageActions: {
    flexDirection: 'row',
    opacity: 0.7,
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 36,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 18,
    backgroundColor: colors.gray6,
    color: colors.text,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 0 : 6,
  },
  sendButtonDisabled: {
    backgroundColor: colors.gray5,
  },
  undoContainer: {
    flexDirection: 'row',
    backgroundColor: colors.text,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  undoText: {
    color: colors.card,
    marginRight: 8,
  },
  undoButton: {
    color: colors.primary,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ChatScreen; 