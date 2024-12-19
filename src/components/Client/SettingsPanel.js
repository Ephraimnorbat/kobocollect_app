import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Switch, Divider } from 'react-native-paper';

const SettingsPanel = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader>General Settings</List.Subheader>
        
        <List.Item
          title="Push Notifications"
          right={() => (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
            />
          )}
        />
        <Divider />
        
        <List.Item
          title="Email Alerts"
          right={() => (
            <Switch
              value={emailAlerts}
              onValueChange={setEmailAlerts}
            />
          )}
        />
        <Divider />
        
        <List.Item
          title="Dark Mode"
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
            />
          )}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Data Management</List.Subheader>
        <List.Item
          title="Storage Usage"
          description="Check storage statistics"
          left={props => <List.Icon {...props} icon="database" />}
          onPress={() => {}}
        />
        <List.Item
          title="Backup Data"
          description="Create data backup"
          left={props => <List.Icon {...props} icon="backup-restore" />}
          onPress={() => {}}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Security</List.Subheader>
        <List.Item
          title="Change Password"
          left={props => <List.Icon {...props} icon="lock" />}
          onPress={() => {}}
        />
        <List.Item
          title="Two-Factor Authentication"
          left={props => <List.Icon {...props} icon="shield-account" />}
          onPress={() => {}}
        />
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default SettingsPanel;
