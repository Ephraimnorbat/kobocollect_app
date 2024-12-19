import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { DataTable, FAB, Searchbar, Chip, Avatar, IconButton, Portal, Modal, Title, Button } from 'react-native-paper';

const UserManagementScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState('all');

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastActive: '2023-07-20'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'surveyor',
      status: 'active',
      lastActive: '2023-07-19'
    }
  ];

  const renderRoleChip = (role) => {
    const roleColors = {
      admin: '#FF5722',
      surveyor: '#4CAF50',
      viewer: '#2196F3'
    };

    return (
      <Chip 
        style={[styles.roleChip, { backgroundColor: roleColors[role] }]}
        textStyle={{ color: '#ffffff' }}
      >
        {role.toUpperCase()}
      </Chip>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search users..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip 
            selected={filterRole === 'all'}
            onPress={() => setFilterRole('all')}
            style={styles.filterChip}
          >
            All Users
          </Chip>
          <Chip 
            selected={filterRole === 'admin'}
            onPress={() => setFilterRole('admin')}
            style={styles.filterChip}
          >
            Admins
          </Chip>
          <Chip 
            selected={filterRole === 'surveyor'}
            onPress={() => setFilterRole('surveyor')}
            style={styles.filterChip}
          >
            Surveyors
          </Chip>
        </ScrollView>
      </View>

      <DataTable style={styles.dataTable}>
        <DataTable.Header>
          <DataTable.Title>User</DataTable.Title>
          <DataTable.Title>Role</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>

        {users.map(user => (
          <DataTable.Row key={user.id}>
            <DataTable.Cell>
              <View style={styles.userCell}>
                <Avatar.Text size={24} label={user.name.substring(0, 2)} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{renderRoleChip(user.role)}</DataTable.Cell>
            <DataTable.Cell>
              <Chip mode="outlined" selected={user.status === 'active'}>
                {user.status}
              </Chip>
            </DataTable.Cell>
            <DataTable.Cell>
              <IconButton icon="dots-vertical" onPress={() => setSelectedUser(user)} />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <Portal>
        <Modal
          visible={selectedUser !== null}
          onDismiss={() => setSelectedUser(null)}
          contentContainerStyle={styles.modal}
        >
          <Title>User Details</Title>
          {selectedUser && (
            <View>
              <Text style={styles.modalText}>Name: {selectedUser.name}</Text>
              <Text style={styles.modalText}>Email: {selectedUser.email}</Text>
              <Text style={styles.modalText}>Role: {selectedUser.role}</Text>
              <Text style={styles.modalText}>Last Active: {selectedUser.lastActive}</Text>
              
              <View style={styles.modalActions}>
                <Button mode="contained" onPress={() => navigation.navigate('EditUser', { userId: selectedUser.id })}>
                  Edit User
                </Button>
                <Button mode="outlined" onPress={() => {}}>
                  Reset Password
                </Button>
                <Button mode="outlined" color="red" onPress={() => {}}>
                  Deactivate User
                </Button>
              </View>
            </View>
          )}
        </Modal>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
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
    marginBottom: 12,
  },
  filterChip: {
    marginRight: 8,
  },
  dataTable: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  userCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 8,
  },
  userName: {
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 12,
    color: '#666666',
  },
  roleChip: {
    borderRadius: 4,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalText: {
    marginVertical: 8,
    fontSize: 16,
  },
  modalActions: {
    marginTop: 16,
    gap: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default UserManagementScreen;
