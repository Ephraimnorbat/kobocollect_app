import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, List, Switch, Card, Button, Divider, Text, Portal, Dialog } from 'react-native-paper';

const UserPermissionsScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);

  const [permissions, setPermissions] = useState({
    surveys: {
      create: true,
      edit: true,
      delete: false,
      publish: true,
      view: true
    },
    responses: {
      view: true,
      export: true,
      delete: false
    },
    users: {
      view: true,
      create: false,
      edit: false,
      delete: false
    },
    media: {
      upload: true,
      download: true,
      delete: false
    },
    reports: {
      view: true,
      create: true,
      share: true
    }
  });

  const handlePermissionChange = (category, permission) => {
    setSelectedPermission({ category, permission });
    setConfirmDialog(true);
  };

  const confirmPermissionChange = () => {
    const { category, permission } = selectedPermission;
    setPermissions({
      ...permissions,
      [category]: {
        ...permissions[category],
        [permission]: !permissions[category][permission]
      }
    });
    setConfirmDialog(false);
  };

  const renderPermissionSection = (title, category, permissionSet) => (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <Title style={styles.sectionTitle}>{title}</Title>
        {Object.entries(permissionSet).map(([permission, value]) => (
          <List.Item
            key={permission}
            title={permission.charAt(0).toUpperCase() + permission.slice(1)}
            right={() => (
              <Switch
                value={value}
                onValueChange={() => handlePermissionChange(category, permission)}
              />
            )}
          />
        ))}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderPermissionSection('Survey Permissions', 'surveys', permissions.surveys)}
        {renderPermissionSection('Response Permissions', 'responses', permissions.responses)}
        {renderPermissionSection('User Management', 'users', permissions.users)}
        {renderPermissionSection('Media Management', 'media', permissions.media)}
        {renderPermissionSection('Report Permissions', 'reports', permissions.reports)}

        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            Save Changes
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Dialog
          visible={confirmDialog}
          onDismiss={() => setConfirmDialog(false)}
        >
          <Dialog.Title>Confirm Permission Change</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to modify this permission?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmDialog(false)}>Cancel</Button>
            <Button onPress={confirmPermissionChange}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionCard: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 16,
  },
  button: {
    padding: 8,
  }
});

export default UserPermissionsScreen;
