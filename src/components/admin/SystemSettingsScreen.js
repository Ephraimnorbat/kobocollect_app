import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, List, Switch, Button, TextInput, Divider } from 'react-native-paper';

const SystemSettingsScreen = () => {
  const [settings, setSettings] = useState({
    general: {
      appName: 'KoboCollect',
      defaultLanguage: 'English',
      autoBackup: true,
      offlineMode: true
    },
    security: {
      requireAuth: true,
      twoFactorAuth: false,
      sessionTimeout: '30'
    },
    data: {
      autoSync: true,
      retentionDays: '90',
      compressionEnabled: true
    }
  });

  const handleSave = () => {
    // Save system settings logic
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>General Settings</Title>
          <TextInput
            label="Application Name"
            value={settings.general.appName}
            onChangeText={(text) => 
              setSettings({
                ...settings,
                general: {...settings.general, appName: text}
              })
            }
            mode="outlined"
            style={styles.input}
          />
          <List.Item
            title="Auto Backup"
            description="Automatically backup system data"
            right={() => (
              <Switch
                value={settings.general.autoBackup}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    general: {...settings.general, autoBackup: value}
                  })
                }
              />
            )}
          />
          <List.Item
            title="Offline Mode"
            description="Enable offline functionality"
            right={() => (
              <Switch
                value={settings.general.offlineMode}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    general: {...settings.general, offlineMode: value}
                  })
                }
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Security Settings</Title>
          <List.Item
            title="Require Authentication"
            description="Users must login to access the app"
            right={() => (
              <Switch
                value={settings.security.requireAuth}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    security: {...settings.security, requireAuth: value}
                  })
                }
              />
            )}
          />
          <List.Item
            title="Two-Factor Authentication"
            description="Enable 2FA for added security"
            right={() => (
              <Switch
                value={settings.security.twoFactorAuth}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    security: {...settings.security, twoFactorAuth: value}
                  })
                }
              />
            )}
          />
          <TextInput
            label="Session Timeout (minutes)"
            value={settings.security.sessionTimeout}
            onChangeText={(text) =>
              setSettings({
                ...settings,
                security: {...settings.security, sessionTimeout: text}
              })
            }
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Data Management</Title>
          <List.Item
            title="Auto Sync"
            description="Automatically sync data when online"
            right={() => (
              <Switch
                value={settings.data.autoSync}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    data: {...settings.data, autoSync: value}
                  })
                }
              />
            )}
          />
          <TextInput
            label="Data Retention (days)"
            value={settings.data.retentionDays}
            onChangeText={(text) =>
              setSettings({
                ...settings,
                data: {...settings.data, retentionDays: text}
              })
            }
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleSave}
          style={styles.button}
        >
          Save Settings
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
  },
  input: {
    marginVertical: 8,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 16,
  },
  button: {
    padding: 8,
  }
});

export default SystemSettingsScreen;
