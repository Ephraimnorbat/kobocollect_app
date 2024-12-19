import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Searchbar, FAB, Avatar, Chip, Menu, IconButton, DataTable } from 'react-native-paper';

const UserManagementScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2023-07-20',
      team: 'Field Team'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Surveyor',
      status: 'Active',
      lastActive: '2023-07-19',
      team: 'Analysis Team'
    }
  ];

  const renderUserCard = (user) => (
    <Card key={user.id} style={styles.userCard}>
      <Card.Content>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <Avatar.Text size={40} label={user.name.substring(0, 2)} />
            <View style={styles.userDetails}>
              <Title>{user.name}</Title>
              <Paragraph>{user.email}</Paragraph>
            </View>
          </View>
          <IconButton
            icon="dots-vertical"
            onPress={() => {
              setSelectedUser(user);
              setMenuVisible(true);
            }}
          />
        </View>

        <View style={styles.userMeta}>
          <Chip style={styles.chip}>{user.role}</Chip>
          <Chip 
            style={styles.chip}
            icon={user.status === 'Active' ? 'check-circle' : 'alert-circle'}
          >
            {user.status}
          </Chip>
        </View>

        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>Team</DataTable.Cell>
            <DataTable.Cell>{user.team}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Last Active</DataTable.Cell>
            <DataTable.Cell>{user.lastActive}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>

        <View style={styles.actionButtons}>
          <IconButton
            icon="account-edit"
            onPress={() => navigation.navigate('EditUser', { userId: user.id })}
          />
          <IconButton
            icon="key-variant"
            onPress={() => navigation.navigate('UserPermissions', { userId: user.id })}
          />
          <IconButton
            icon="chart-line"
            onPress={() => navigation.navigate('UserActivity', { userId: user.id })}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search users..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <ScrollView style={styles.content}>
        {users.map(user => renderUserCard(user))}
      </ScrollView>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={<View />}
      >
        <Menu.Item onPress={() => {}} title="Edit Profile" />
        <Menu.Item onPress={() => {}} title="Change Role" />
        <Menu.Item onPress={() => {}} title="Reset Password" />
        <Menu.Item onPress={() => {}} title="Disable Account" />
      </Menu>

      <FAB
        style={styles.fab}
        icon="account-plus"
        label="Add User"
        onPress={() => navigation.navigate('AddUser')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  searchBar: {
    marginBottom: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  userCard: {
    marginBottom: 16,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 12,
  },
  userMeta: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  chip: {
    marginRight: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default UserManagementScreen;
