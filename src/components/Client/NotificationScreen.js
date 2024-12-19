import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List, Divider, IconButton, Badge, SegmentedButtons } from 'react-native-paper';

const NotificationsScreen = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      title: 'New Survey Assigned',
      message: 'Community Health Survey has been assigned to you',
      time: '2 hours ago',
      type: 'survey',
      read: false
    },
    {
      id: 2,
      title: 'Submission Approved',
      message: 'Your Water Quality Assessment submission was approved',
      time: '1 day ago',
      type: 'submission',
      read: true
    },
    {
      id: 3,
      title: 'Deadline Reminder',
      message: 'Education Access Survey is due in 2 days',
      time: '3 days ago',
      type: 'reminder',
      read: false
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'survey': return 'clipboard-text';
      case 'submission': return 'check-circle';
      case 'reminder': return 'clock-alert';
      default: return 'bell';
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={filter}
        onValueChange={setFilter}
        buttons={[
          { value: 'all', label: 'All' },
          { value: 'unread', label: 'Unread' }
        ]}
        style={styles.filterButtons}
      />

      <ScrollView>
        {filteredNotifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <List.Item
              title={notification.title}
              description={notification.message}
              left={props => (
                <View style={styles.iconContainer}>
                  <List.Icon {...props} icon={getIcon(notification.type)} />
                  {!notification.read && <Badge size={8} style={styles.badge} />}
                </View>
              )}
              right={props => (
                <View style={styles.timeContainer}>
                  <List.Subheader>{notification.time}</List.Subheader>
                  <IconButton icon="dots-vertical" onPress={() => {}} />
                </View>
              )}
            />
            {index < filteredNotifications.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterButtons: {
    margin: 16,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF4081',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default NotificationsScreen;
