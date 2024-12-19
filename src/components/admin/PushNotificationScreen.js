import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Switch, List, Button, TextInput, Divider } from 'react-native-paper';

const PushNotificationSettingsScreen = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    notifications: {
      surveyCompletion: true,
      newResponse: true,
      systemUpdates: true,
      teamInvites: false
    },
    recipients: {
      allUsers: false,
      admins: true,
      teamLeads: true
    },
    schedule: {
      quietHoursEnabled: true,
      quietHoursStart: '22:00',
      quietHoursEnd: '07:00'
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>General Settings</Title>
          <List.Item
            title="Enable Push Notifications"
            right={() => (
              <Switch
                value={settings.enabled}
                onValueChange={(value) => 
                  setSettings({...settings, enabled: value})
                }
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Notification Types</Title>
          <List.Item
            title="Survey Completion"
            description="Notify when a survey is completed"
            right={() => (
              <Switch
                value={settings.notifications.surveyCompletion}
                onValueChange={(value) => 
                  setSettings({
                    ...settings,
                    notifications: {...settings.notifications, surveyCompletion: value}
                  })
                }
              />
            )}
          />
          <Divider />
          <List.Item
            title="New Response"
            description="Notify on new survey responses"
            right={() => (
              <Switch
                value={settings.notifications.newResponse}
                onValueChange={(value) => 
                  setSettings({
                    ...settings,
                    notifications: {...settings.notifications, newResponse: value}
                  })
                }
              />
            )}
          />
          <Divider />
          <List.Item
            title="System Updates"
            description="Important system notifications"
            right={() => (
              <Switch
                value={settings.notifications.systemUpdates}
                onValueChange={(value) => 
                  setSettings({
                    ...settings,
                    notifications: {...settings.notifications, systemUpdates: value}
                  })
                }
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Recipients</Title>
          <List.Item
            title="All Users"
            right={() => (
              <Switch
                value={settings.recipients.allUsers}
                onValueChange={(value) => 
                  setSettings({
                    ...settings,
                    recipients: {...settings.recipients, allUsers: value}
                  })
                }
              />
            )}
          />
          <List.Item
            title="Administrators"
            right={() => (
              <Switch
                value={settings.recipients.admins}
                onValueChange={(value) => 
                  setSettings({
                    ...settings,
                    recipients: {...settings.recipients, admins: value}
                  })
                }
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Quiet Hours</Title>
          <List.Item
            title="Enable Quiet Hours"
            right={() => (
              <Switch
                value={settings.schedule.quietHoursEnabled}
                onValueChange={(value) => 
                  setSettings({
                    ...settings,
                    schedule: {...settings.schedule, quietHoursEnabled: value}
                  })
                }
              />
            )}
          />
          <View style={styles.timeInputs}>
            <TextInput
              label="Start Time"
              value={settings.schedule.quietHoursStart}
              mode="outlined"
              style={styles.timeInput}
            />
            <TextInput
              label="End Time"
              value={settings.schedule.quietHoursEnd}
              mode="outlined"
              style={styles.timeInput}
            />
          </View>
        </Card.Content>
      </Card>

      <Button 
        mode="contained"
        onPress={() => {}}
        style={styles.saveButton}
      >
        Save Settings
      </Button>
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
  timeInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  timeInput: {
    width: '48%',
  },
  saveButton: {
    margin: 16,
    padding: 8,
  }
});

export default PushNotificationSettingsScreen;
