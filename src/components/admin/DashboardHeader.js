import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, IconButton, Menu } from 'react-native-paper';

const DashboardHeader = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Avatar.Image 
          size={40} 
          source={{ uri: 'https://placeholder.com/150' }} 
        />
        <View style={styles.userText}>
          <Text style={styles.userName}>Admin User</Text>
          <Text style={styles.userRole}>Super Admin</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <IconButton icon="bell" onPress={() => navigation.navigate('Notifications')} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton icon="dots-vertical" onPress={() => setMenuVisible(true)} />
          }
        >
          <Menu.Item onPress={() => navigation.navigate('Profile')} title="Profile" />
          <Menu.Item onPress={() => navigation.navigate('Settings')} title="Settings" />
          <Menu.Item onPress={() => navigation.navigate('Login')} title="Logout" />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DashboardHeader;
