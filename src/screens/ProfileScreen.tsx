import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme/colors';
import Avatar from '../components/Avatar';
import {UserProfile} from '../types/user';
import {saveUserProfile, loadUserProfile} from '../utils/storage';

const ProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: 'current_user',
    name: '',
    email: '',
    status: '',
    notificationsEnabled: true,
    phoneNumber: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const savedProfile = await loadUserProfile();
    setProfile(savedProfile);
  };

  const handleSave = async () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      Alert.alert('Error', 'Name and email are required');
      return;
    }

    try {
      await saveUserProfile(profile);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const renderField = (
    label: string,
    value: string,
    field: keyof UserProfile,
    placeholder: string,
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={text => setProfile({...profile, [field]: text})}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
        />
      ) : (
        <Text style={styles.value}>{value || placeholder}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.statusBar} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Avatar name={profile.name} size="large" />
            {isEditing && (
              <TouchableOpacity style={styles.editAvatarButton}>
                <Icon name="camera-alt" size={20} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.content}>
          {renderField('Name', profile.name, 'name', 'Enter your name')}
          {renderField('Email', profile.email, 'email', 'Enter your email')}
          {renderField('Phone', profile.phoneNumber || '', 'phoneNumber', 'Add phone number')}
          {renderField('Status', profile.status || '', 'status', 'Set a status message')}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Notifications</Text>
            <Switch
              value={profile.notificationsEnabled}
              onValueChange={value =>
                setProfile({...profile, notificationsEnabled: value})
              }
              disabled={!isEditing}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, isEditing && styles.saveButton]}
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}>
          <Text style={[styles.buttonText, isEditing && styles.saveButtonText]}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.card,
  },
  avatarContainer: {
    position: 'relative',
  },
  editAvatarButton: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    backgroundColor: colors.card,
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  content: {
    padding: 16,
    backgroundColor: colors.card,
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  value: {
    fontSize: 17,
    color: colors.text,
  },
  input: {
    fontSize: 17,
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingVertical: 4,
  },
  button: {
    margin: 16,
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.card,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  saveButtonText: {
    color: colors.card,
  },
});

export default ProfileScreen; 