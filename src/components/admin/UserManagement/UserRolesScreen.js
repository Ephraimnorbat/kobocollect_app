import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, FAB, List, IconButton, Portal, Dialog, TextInput, Button, Chip } from 'react-native-paper';

const UserRolesScreen = () => {
  const [createRoleDialog, setCreateRoleDialog] = useState(false);
  const [editRoleDialog, setEditRoleDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');

  const roles = [
    {
      id: 1,
      name: 'Administrator',
      users: 3,
      permissions: [
        'Full system access',
        'User management',
        'Role management',
        'Survey management'
      ]
    },
    {
      id: 2,
      name: 'Surveyor',
      users: 12,
      permissions: [
        'Create surveys',
        'Collect responses',
        'View reports',
        'Upload media'
      ]
    },
    {
      id: 3,
      name: 'Analyst',
      users: 5,
      permissions: [
        'View surveys',
        'Export data',
        'Generate reports',
        'View responses'
      ]
    }
  ];

  const renderRoleCard = (role) => (
    <Card key={role.id} style={styles.roleCard}>
      <Card.Content>
        <View style={styles.roleHeader}>
          <Title>{role.name}</Title>
          <View style={styles.roleActions}>
            <IconButton 
              icon="pencil" 
              onPress={() => {
                setSelectedRole(role);
                setEditRoleDialog(true);
              }}
            />
            <IconButton 
              icon="delete" 
              onPress={() => {}}
            />
          </View>
        </View>

        <Chip style={styles.userCount}>
          {role.users} Users
        </Chip>

        <List.Section>
          <List.Subheader>Permissions</List.Subheader>
          {role.permissions.map((permission, index) => (
            <List.Item
              key={index}
              title={permission}
              left={() => <List.Icon icon="check" />}
            />
          ))}
        </List.Section>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {roles.map(role => renderRoleCard(role))}
      </ScrollView>

      <Portal>
        <Dialog
          visible={createRoleDialog}
          onDismiss={() => setCreateRoleDialog(false)}
        >
          <Dialog.Title>Create New Role</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Role Name"
              value={newRoleName}
              onChangeText={setNewRoleName}
              mode="outlined"
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setCreateRoleDialog(false)}>Cancel</Button>
            <Button onPress={() => {
              // Create role logic
              setCreateRoleDialog(false);
            }}>Create</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          visible={editRoleDialog}
          onDismiss={() => setEditRoleDialog(false)}
        >
          <Dialog.Title>Edit Role</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Role Name"
              value={selectedRole?.name || ''}
              onChangeText={(text) => setSelectedRole({...selectedRole, name: text})}
              mode="outlined"
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditRoleDialog(false)}>Cancel</Button>
            <Button onPress={() => {
              // Update role logic
              setEditRoleDialog(false);
            }}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        label="Add Role"
        onPress={() => setCreateRoleDialog(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  roleCard: {
    margin: 16,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roleActions: {
    flexDirection: 'row',
  },
  userCount: {
    marginVertical: 8,
    alignSelf: 'flex-start',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  dialogInput: {
    marginTop: 8,
  }
});

export default UserRolesScreen;
