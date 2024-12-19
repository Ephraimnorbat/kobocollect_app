import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Switch, List, Button, Divider, Snackbar } from 'react-native-paper';

const RolePermissionsScreen = ({ route, navigation }) => {
  const { roleId } = route.params;
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  const [permissions, setPermissions] = useState({
    surveys: {
      create: {
        enabled: true,
        description: 'Create new surveys and templates'
      },
      edit: {
        enabled: true,
        description: 'Modify existing surveys'
      },
      delete: {
        enabled: false,
        description: 'Remove surveys from the system'
      },
      publish: {
        enabled: true,
        description: 'Make surveys available for collection'
      }
    },
    data: {
      view: {
        enabled: true,
        description: 'View collected responses'
      },
      export: {
        enabled: true,
        description: 'Export data in various formats'
      },
      delete: {
        enabled: false,
        description: 'Remove collected data'
      }
    },
    users: {
      manage: {
        enabled: false,
        description: 'Add and modify user accounts'
      },
      assign: {
        enabled: true,
        description: 'Assign users to surveys'
      }
    },
    system: {
      settings: {
        enabled: false,
        description: 'Modify system configuration'
      },
      backup: {
        enabled: true,
        description: 'Create and restore backups'
      }
    }
  });

  const renderPermissionSection = (title, section, sectionKey) => (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <Title style={styles.sectionTitle}>{title}</Title>
        {Object.entries(section).map(([key, value]) => (
          <List.Item
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            description={value.description}
            right={() => (
              <Switch
                value={value.enabled}
                onValueChange={() => {
                  setPermissions({
                    ...permissions,
                    [sectionKey]: {
                      ...permissions[sectionKey],
                      [key]: {
                        ...value,
                        enabled: !value.enabled
                      }
                    }
                  });
                }}
              />
            )}
          />
        ))}
      </Card.Content>
    </Card>
  );

  const handleSave = () => {
    // Save permissions logic here
    setShowSnackbar(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderPermissionSection('Survey Management', permissions.surveys, 'surveys')}
        {renderPermissionSection('Data Management', permissions.data, 'data')}
        {renderPermissionSection('User Management', permissions.users, 'users')}
        {renderPermissionSection('System Management', permissions.system, 'system')}

        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            onPress={handleSave}
            style={styles.saveButton}
          >
            Save Permissions
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => setShowSnackbar(false),
        }}
      >
        Permissions updated successfully
      </Snackbar>
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
    marginBottom: 16,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 16,
  },
  saveButton: {
    padding: 8,
  }
});

export default RolePermissionsScreen;
