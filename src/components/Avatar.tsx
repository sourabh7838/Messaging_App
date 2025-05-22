import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme/colors';

interface AvatarProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  isGroup?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'medium',
  backgroundColor = colors.primary,
  isGroup = false,
}) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getDimensions = () => {
    switch (size) {
      case 'small':
        return {size: 36, borderRadius: 18, fontSize: 14, iconSize: 20};
      case 'medium':
        return {size: 40, borderRadius: 20, fontSize: 16, iconSize: 24};
      case 'large':
        return {size: 50, borderRadius: 25, fontSize: 20, iconSize: 28};
    }
  };

  const dimensions = getDimensions();
  const styles = StyleSheet.create({
    avatar: {
      width: dimensions.size,
      height: dimensions.size,
      borderRadius: dimensions.borderRadius,
      backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.card,
      fontSize: dimensions.fontSize,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.avatar}>
      {isGroup ? (
        <Icon name="group" size={dimensions.iconSize} color={colors.card} />
      ) : (
        <Text style={styles.text}>{getInitials(name)}</Text>
      )}
    </View>
  );
};

export default Avatar; 