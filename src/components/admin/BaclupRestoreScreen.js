import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Button, List, Text, Portal, Dialog, ActivityIndicator } from 'react-native-paper';

const BackupRestoreScreen = () => {
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [action, setAction] = useState(null);

  const backups = [
    {
      id: 1,
      date: '2023-07-20 14:30',
      size: '156 MB',
      type: 'Auto'
    },
    {
      id: 2,
      date: '2023-07-19 10:15',
      size: '148 MB',
      type: 'Manual'
    }
  ];

  const handleBackup = () => {
    setAction('backup');
    setConfirmDialog(true);
  };

  const handleRestore = (backupId) => {
    setAction('restore');
    setConfirmDialog(true);
  };

  const executeAction = () => {
    setConfirmDialog(false);
    setLoading(true);
    // Placeholder for backend integration
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Create Backup</Title>
            <Text style={styles.description}>
              Create a backup of all surveys, responses, and media files
            </Text>
            <Button 
              mode="contained" 
              onPress={handleBackup}
              style={styles.actionButton}
            >
              Create New Backup
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Available Backups</Title>
            {backups.map(backup => (
              <List.Item
                key={backup.id}
                title={backup.date}
                description={`Size: ${backup.size} • Type: ${backup.type}`}
                right={props => (
                  <Button 
                    mode="outlined" 
                    onPress={() => handleRestore(backup.id)}
                  >
                    Restore
                  </Button>
                )}
              />
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      <Portal>
        <Dialog visible={confirmDialog} onDismiss={() => setConfirmDialog(false)}>
          <Dialog.Title>Confirm {action}</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to {action} the data?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmDialog(false)}>Cancel</Button>
            <Button onPress={executeAction}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={loading}>
          <Dialog.Content>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>
                {action === 'backup' ? 'Creating backup...' : 'Restoring data...'}
              </Text>
            </View>
          </Dialog.Content>
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
  card: {
    margin: 16,
  },
  description: {
    marginVertical: 12,
  },
  actionButton: {
    marginTop: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
  }
});

export default BackupRestoreScreen;
