import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, List, Switch, Button, TextInput, Portal, Dialog } from 'react-native-paper';

const AlertConfigurationsScreen = () => {
  const [createDialog, setCreateDialog] = useState(false);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: 'Low Response Rate',
      type: 'survey',
      condition: 'responses < 10 in 24h',
      enabled: true,
      priority: 'high'
    },
    {
      id: 2,
      name: 'Data Sync Failed',
      type: 'system',
      condition: 'sync failure > 3 attempts',
      enabled: true,
      priority: 'critical'
    },
    {
      id: 3,
      name: 'Storage Warning',
      type: 'system',
      condition: 'storage > 90%',
      enabled: false,
      priority: 'medium'
    }
  ]);

  const renderAlertCard = (alert) => (
    <Card key={alert.id} style={styles.card}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Title>{alert.name}</Title>
          <Switch
            value={alert.enabled}
            onValueChange={(value) => {
              const updatedAlerts = alerts.map(a => 
                a.id === alert.id ? {...a, enabled: value} : a
              );
              setAlerts(updatedAlerts);
            }}
          />
        </View>

        <List.Item
          title="Type"
          description={alert.type}
          left={props => <List.Icon {...props} icon={alert.type === 'system' ? 'cog' : 'file-document'} />}
        />
        
        <List.Item
          title="Condition"
          description={alert.condition}
          left={props => <List.Icon {...props} icon="alert-circle" />}
        />

        <List.Item
          title="Priority"
          description={alert.priority}
          left={props => <List.Icon {...props} icon="flag" />}
        />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {alerts.map(alert => renderAlertCard(alert))}
      </ScrollView>

      <Button 
        mode="contained"
        icon="plus"
        onPress={() => setCreateDialog(true)}
        style={styles.addButton}
      >
        Create New Alert
      </Button>

      <Portal>
        <Dialog
          visible={createDialog}
          onDismiss={() => setCreateDialog(false)}
        >
          <Dialog.Title>Create New Alert</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Alert Name"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Condition"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Priority"
              mode="outlined"
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setCreateDialog(false)}>Cancel</Button>
            <Button onPress={() => setCreateDialog(false)}>Create</Button>
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
  card: {
    margin: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  addButton: {
    margin: 16,
    padding: 8,
  }
});

export default AlertConfigurationsScreen;
