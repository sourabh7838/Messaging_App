import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme/colors';
import Avatar from '../components/Avatar';
import DirectoryList from '../components/DirectoryList';
import {Chat, Directory} from '../types/chat';
import {saveChats, loadChats, deleteChat as deleteStoredChat} from '../utils/storage';
import {useFocusEffect} from '@react-navigation/native';

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

const SIDEBAR_WIDTH = 250;
const WINDOW_WIDTH = Dimensions.get('window').width;

const InboxScreen = ({navigation}: any) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [directories, setDirectories] = useState<Directory[]>([
    {id: '1', name: 'Work', color: '#4CAF50'},
    {id: '2', name: 'Family', color: '#2196F3'},
    {id: '3', name: 'Friends', color: '#9C27B0'},
  ]);

  const [selectedDirectoryId, setSelectedDirectoryId] = useState<string>();
  const [isCreateGroupVisible, setIsCreateGroupVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const filteredChats = selectedDirectoryId
    ? chats.filter(chat => chat.directoryId === selectedDirectoryId)
    : chats;

  const loadStoredChats = async () => {
    try {
      setIsLoading(true);
      const savedChats = await loadChats();
      setChats(savedChats);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load chats when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadStoredChats();
    }, [])
  );

  // Initial load
  useEffect(() => {
    loadStoredChats();
  }, []);

  const deleteChat = (chatId: string) => {
    Alert.alert('Delete Chat', 'Are you sure you want to delete this chat?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: async () => {
          const updatedChats = chats.filter(chat => chat.id !== chatId);
          setChats(updatedChats);
          await saveChats(updatedChats);
          await deleteStoredChat(chatId);
        },
        style: 'destructive',
      },
    ]);
  };

  const createDirectory = (name: string, parentId?: string) => {
    const newDirectory: Directory = {
      id: Date.now().toString(),
      name,
      color: [
        '#4CAF50',
        '#2196F3',
        '#9C27B0',
        '#FF9800',
        '#F44336',
      ][Math.floor(Math.random() * 5)],
      parentId,
    };
    setDirectories([...directories, newDirectory]);
  };

  const deleteDirectory = (directoryId: string) => {
    setDirectories(directories.filter(dir => dir.id !== directoryId));
    if (selectedDirectoryId === directoryId) {
      setSelectedDirectoryId(undefined);
    }
  };

  const createGroup = async () => {
    if (newGroupName.trim() && selectedMembers.length > 0) {
      const newGroup: Chat = {
        id: Date.now().toString(),
        name: newGroupName.trim(),
        lastMessage: 'Group created',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isGroup: true,
        members: selectedMembers.map(id => {
          const contact = DUMMY_CONTACTS.find(c => c.id === id);
          return {
            id,
            name: contact?.name || '',
            isAdmin: id === DUMMY_CONTACTS[0].id,
          };
        }),
        directoryId: selectedDirectoryId,
      };
      const updatedChats = [newGroup, ...chats];
      setChats(updatedChats);
      await saveChats(updatedChats);
      setIsCreateGroupVisible(false);
      setNewGroupName('');
      setSelectedMembers([]);
    }
  };

  const toggleMember = (memberId: string) => {
    setSelectedMembers(
      selectedMembers.includes(memberId)
        ? selectedMembers.filter(id => id !== memberId)
        : [...selectedMembers, memberId],
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => setIsSidebarVisible(!isSidebarVisible)}
          style={styles.headerButton}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon
            name={isSidebarVisible ? 'menu-open' : 'menu'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isSidebarVisible]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isSidebarVisible ? 0 : -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: isSidebarVisible ? 0.5 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSidebarVisible, slideAnim, overlayAnim]);

  const handleOverlayPress = () => {
    setIsSidebarVisible(false);
  };

  const renderChatItem = ({item}: {item: Chat}) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('Chat', {
          chatId: item.id,
          name: item.name,
          isGroup: item.isGroup,
          members: item.members,
        })
      }
      activeOpacity={0.7}>
      <Avatar
        name={item.name}
        size="large"
        isGroup={item.isGroup}
      />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName} numberOfLines={1}>
            {item.name}
          </Text>
          {item.timestamp && (
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          )}
        </View>
        <View style={styles.chatFooter}>
          <Text style={[
            styles.lastMessage,
            !item.lastMessage && styles.lastMessageEmpty
          ]} numberOfLines={1}>
            {item.lastMessage || 'No messages yet'}
          </Text>
          <TouchableOpacity
            onPress={() => deleteChat(item.id)}
            style={styles.deleteButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="delete-outline" size={22} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.statusBar} />
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayAnim,
              display: isSidebarVisible ? 'flex' : 'none',
            },
          ]}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={handleOverlayPress}
            activeOpacity={1}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.sidebar,
            {
              transform: [{translateX: slideAnim}],
              position: 'absolute',
              zIndex: 2,
              height: '100%',
            },
          ]}>
          <DirectoryList
            directories={directories}
            selectedDirectoryId={selectedDirectoryId}
            onSelectDirectory={(dirId) => {
              setSelectedDirectoryId(dirId);
              if (WINDOW_WIDTH < 768) {
                setIsSidebarVisible(false);
              }
            }}
            onCreateDirectory={createDirectory}
            onDeleteDirectory={deleteDirectory}
          />
        </Animated.View>
        <View style={styles.chatList}>
          <FlatList
            data={filteredChats}
            renderItem={renderChatItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={[
              styles.listContent,
              filteredChats.length === 0 && styles.emptyListContent,
            ]}
            refreshing={isLoading}
            onRefresh={loadStoredChats}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                {isLoading ? (
                  <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                  <>
                    <Icon name="chat-bubble-outline" size={48} color={colors.gray2} />
                    <Text style={styles.emptyText}>No conversations yet</Text>
                    <Text style={styles.emptySubtext}>
                      Start a new chat by tapping the button below
                    </Text>
                  </>
                )}
              </View>
            )}
          />
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('NewChat')}
              activeOpacity={0.8}>
              <Icon name="chat" size={26} color={colors.card} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, {marginLeft: 12}]}
              onPress={() => setIsCreateGroupVisible(true)}
              activeOpacity={0.8}>
              <Icon name="group-add" size={26} color={colors.card} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={isCreateGroupVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCreateGroupVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Group</Text>
              <TouchableOpacity
                onPress={() => setIsCreateGroupVisible(false)}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.groupNameInput}
              value={newGroupName}
              onChangeText={setNewGroupName}
              placeholder="Group name"
              placeholderTextColor={colors.textTertiary}
            />
            <Text style={styles.sectionTitle}>Select Members</Text>
            <FlatList
              data={DUMMY_CONTACTS}
              renderItem={({item: contact}) => (
                <TouchableOpacity
                  key={contact.id}
                  style={styles.memberItem}
                  onPress={() => toggleMember(contact.id)}
                  activeOpacity={0.7}>
                  <View style={styles.memberInfo}>
                    <Avatar name={contact.name} size="small" />
                    <Text style={styles.memberName}>{contact.name}</Text>
                  </View>
                  <Icon
                    name={
                      selectedMembers.includes(contact.id)
                        ? 'check-circle'
                        : 'radio-button-unchecked'
                    }
                    size={24}
                    color={
                      selectedMembers.includes(contact.id)
                        ? colors.primary
                        : colors.textTertiary
                    }
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              style={styles.membersList}
              contentContainerStyle={styles.membersListContent}
            />
            <View style={styles.createGroupButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.createGroupButton,
                  (!newGroupName.trim() || selectedMembers.length === 0) &&
                    styles.createGroupButtonDisabled,
                ]}
                onPress={createGroup}
                disabled={!newGroupName.trim() || selectedMembers.length === 0}>
                <Text style={styles.createGroupButtonText}>Create Group</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.separator,
    backgroundColor: colors.card,
    shadowColor: colors.text,
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  chatList: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.4,
    flex: 1,
    marginRight: 8,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 15,
    color: colors.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  lastMessageEmpty: {
    color: colors.textTertiary,
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  deleteButton: {
    padding: 4,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    marginLeft: 74,
  },
  actionButtons: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.text,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 100,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  groupNameInput: {
    fontSize: 16,
    padding: 12,
    backgroundColor: colors.gray6,
    borderRadius: 8,
    color: colors.text,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  membersList: {
    flexGrow: 0,
  },
  membersListContent: {
    paddingBottom: 16,
  },
  createGroupButtonContainer: {
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
    backgroundColor: colors.card,
  },
  createGroupButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  createGroupButtonDisabled: {
    backgroundColor: colors.gray5,
  },
  createGroupButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  headerButton: {
    marginLeft: 8,
    padding: 4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 1,
  },
  overlayTouchable: {
    flex: 1,
  },
  emptyListContent: {
    flexGrow: 1,
  },
});

export default InboxScreen; 