export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  phoneNumber?: string;
  notificationsEnabled: boolean;
}

export const DEFAULT_USER: UserProfile = {
  id: 'current_user',
  name: 'Me',
  email: '',
  status: 'Available',
  notificationsEnabled: true,
}; 