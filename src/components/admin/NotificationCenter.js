import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, List, IconButton, SegmentedButtons, FAB } from 'react-native-paper';

const NotificationCenterScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('system');

  const notifications = {
    system: [
      {
        id: 1,
        title: 'System Update',
        message: 'New version 2.0 available',
        time: '2h ago',
        type: 'update'
      },
      {
        id: 2,
        title: 'Backup Complete',
        message: 'System backup completed successfully',
        time: '5h ago',
        type: 'backup'
      }
    ],
    email: [
      {
        id: 3,
        title: 'Survey Completion',
        template: 'survey_complete',
        lastUsed: '1 day ago'
      }
    ],
    push: [
      {
        id: 4,
        title: 'New Response Alert',
        enabled: true,
        recipients: 'All Admins'
      }
    ]
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'system':
        return notifications.system.map(notification => (
          <List.Item
            key={notification.id}
            title={notification.title}
            description={notification.message}
            left={props => <List.Icon {...props} icon="bell" />}
            right={props => <List.Subheader>{notification.time}</List.Subheader>}
          />
        ));
      case 'email':
        return notifications.email.map(template => (
          <List.Item
            key={template.id}
            title={template.title}
            description={`Last used: ${template.lastUsed}`}
            left={props => <List.Icon {...props} icon="email" />}
            right={props => (
              <IconButton icon="pencil" onPress={() => navigation.navigate('EditEmailTemplate', { id: template.id })} />
            )}
          />
        ));
      case 'push':
        return notifications.push.map(config => (
          <List.Item
            key={config.id}
            title={config.title}
            description={`Recipients: ${config.recipients}`}
            left={props => <List.Icon {...props} icon="bell-ring" />}
            right={props => (
              <IconButton icon="cog" onPress={() => navigation.navigate('PushNotificationSettings', { id: config.id })} />
            )}
          />
        ));
    }
  };

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={selectedTab}
        onValueChange={setSelectedTab}
        buttons={[
          { value: 'system', label: 'System' },
          { value: 'email', label: 'Email' },
          { value: 'push', label: 'Push' }
        ]}
        style={styles.segmentedButtons}
      />

      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Notifications</Title>
            {renderContent()}
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        label={`New ${selectedTab === 'system' ? 'Alert' : selectedTab === 'email' ? 'Template' : 'Configuration'}`}
        onPress={() => navigation.navigate(`Create${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}Notification`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  segmentedButtons: {
    margin: 16,
  },
  card: {
    margin: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

export default NotificationCenterScreen;
