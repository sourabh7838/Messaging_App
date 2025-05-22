import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme/colors';
import Avatar from '../components/Avatar';
import {Chat} from '../types/chat';
import {saveChats, loadChats} from '../utils/storage';

const DUMMY_CONTACTS = [
  {id: '1', name: 'Vinus Bhatie'},
  {id: '2', name: 'Ali'},
  {id: '3', name: 'Professor Sabah'},
  {id: '4', name: 'Sarah Williams'},
  {id: '5', name: 'David Brown'},
  {id: '6', name: 'Mom'},
  {id: '7', name: 'Dad'},
  {id: '8', name: 'Sister'},
  {id: '9', name: 'Amit'},
  {id: '10', name: 'Michael Wilson'},
  {id: '11', name: 'Lisa Anderson'},
];

const NewChatScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = DUMMY_CONTACTS.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const startChat = async (contact: {id: string; name: string}) => {
    // Load existing chats
    const existingChats = await loadChats();
    
    // Check if chat already exists
    const existingChat = existingChats.find(
      chat => !chat.isGroup && chat.members.some(member => member.id === contact.id),
    );

    if (existingChat) {
      navigation.navigate('Chat', {
        chatId: existingChat.id,
        name: existingChat.name,
        isGroup: false,
        members: existingChat.members,
      });
      return;
    }

    // Create new chat
    const newChat: Chat = {
      id: Date.now().toString(),
      name: contact.name,
      lastMessage: '',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isGroup: false,
      members: [
        {id: contact.id, name: contact.name},
        {id: 'current_user', name: 'Me'}, // Replace with actual user info
      ],
    };

    // Save the new chat at the beginning of the list
    await saveChats([newChat, ...existingChats]);

    // Navigate to the chat
    navigation.navigate('Chat', {
      chatId: newChat.id,
      name: newChat.name,
      isGroup: false,
      members: newChat.members,
    });
  };

  const renderContact = ({item}: {item: {id: string; name: string}}) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => startChat(item)}
      activeOpacity={0.7}>
      <Avatar name={item.name} size="medium" />
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon name="search-off" size={48} color={colors.gray2} />
      <Text style={styles.emptyText}>No contacts found</Text>
      <Text style={styles.emptySubtext}>
        Try searching with a different name
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.statusBar} />
      <View style={styles.searchContainer}>
        <Icon name="search" size={22} color={colors.textTertiary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
          autoFocus
          returnKeyType="search"
        />
      </View>
      <FlatList
        data={filteredContacts}
        renderItem={renderContact}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={ListEmptyComponent}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: colors.text,
    paddingVertical: 8,
  },
  listContent: {
    paddingTop: 8,
    flexGrow: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.card,
  },
  contactName: {
    fontSize: 17,
    color: colors.text,
    marginLeft: 12,
    letterSpacing: -0.4,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    marginLeft: 64,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: '30%',
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

export default NewChatScreen; 