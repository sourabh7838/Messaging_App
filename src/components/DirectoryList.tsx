import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme/colors';
import {Directory} from '../types/chat';

interface DirectoryListProps {
  directories: Directory[];
  selectedDirectoryId?: string;
  onSelectDirectory: (directoryId?: string) => void;
  onCreateDirectory: (name: string, parentId?: string) => void;
  onDeleteDirectory: (directoryId: string) => void;
}

const DirectoryList: React.FC<DirectoryListProps> = ({
  directories,
  selectedDirectoryId,
  onSelectDirectory,
  onCreateDirectory,
  onDeleteDirectory,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newDirName, setNewDirName] = useState('');

  const handleCreateDirectory = () => {
    if (newDirName.trim()) {
      onCreateDirectory(newDirName.trim(), selectedDirectoryId);
      setNewDirName('');
      setIsCreating(false);
    }
  };

  const handleDeleteDirectory = (directory: Directory) => {
    Alert.alert(
      'Delete Directory',
      `Are you sure you want to delete "${directory.name}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => onDeleteDirectory(directory.id),
          style: 'destructive',
        },
      ],
    );
  };

  const renderDirectory = (directory: Directory) => {
    const isSelected = directory.id === selectedDirectoryId;
    const hasParent = directory.parentId !== undefined;

    return (
      <TouchableOpacity
        key={directory.id}
        style={[
          styles.directoryItem,
          isSelected && styles.selectedDirectory,
          hasParent && styles.subDirectory,
        ]}
        onPress={() => onSelectDirectory(directory.id)}
        activeOpacity={0.7}>
        <View style={styles.directoryContent}>
          <Icon
            name="folder"
            size={22}
            color={directory.color || colors.primary}
            style={styles.folderIcon}
          />
          <Text style={styles.directoryName}>{directory.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDeleteDirectory(directory)}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={styles.deleteButton}>
          <Icon name="delete-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.directoryItem,
          !selectedDirectoryId && styles.selectedDirectory,
        ]}
        onPress={() => onSelectDirectory(undefined)}
        activeOpacity={0.7}>
        <View style={styles.directoryContent}>
          <Icon
            name="inbox"
            size={22}
            color={colors.primary}
            style={styles.folderIcon}
          />
          <Text style={styles.directoryName}>All Chats</Text>
        </View>
      </TouchableOpacity>

      {directories.map(renderDirectory)}

      {isCreating ? (
        <View style={styles.createContainer}>
          <TextInput
            style={styles.input}
            value={newDirName}
            onChangeText={setNewDirName}
            placeholder="Directory name"
            placeholderTextColor={colors.textTertiary}
            autoFocus
            onSubmitEditing={handleCreateDirectory}
            onBlur={() => {
              setIsCreating(false);
              setNewDirName('');
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setIsCreating(true)}
          activeOpacity={0.7}>
          <Icon name="create-new-folder" size={20} color={colors.primary} />
          <Text style={styles.createText}>New Directory</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  directoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingLeft: 16,
    justifyContent: 'space-between',
  },
  directoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedDirectory: {
    backgroundColor: colors.gray6,
  },
  subDirectory: {
    paddingLeft: 32,
  },
  folderIcon: {
    marginRight: 12,
  },
  directoryName: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  createContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    fontSize: 16,
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.gray6,
    borderRadius: 8,
    color: colors.text,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingLeft: 16,
  },
  createText: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 12,
  },
});

export default DirectoryList; 