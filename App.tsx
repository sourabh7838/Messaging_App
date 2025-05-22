import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InboxScreen from './src/screens/InboxScreen';
import ChatScreen from './src/screens/ChatScreen';
import NewChatScreen from './src/screens/NewChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {colors} from './src/theme/colors';

type RootStackParamList = {
  Inbox: undefined;
  Chat: {chatId: string; name: string; isGroup: boolean; members: any[]};
  NewChat: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inbox"
          component={InboxScreen}
          options={({navigation}) => ({
            title: 'Messages',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={{marginLeft: 16}}>
                <Icon name="account-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({route}) => ({
            title: route.params.name,
          })}
        />
        <Stack.Screen
          name="NewChat"
          component={NewChatScreen}
          options={{
            title: 'New Chat',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
