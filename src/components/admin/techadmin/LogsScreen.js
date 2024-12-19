import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Searchbar, List, Chip, Button, SegmentedButtons, Menu } from 'react-native-paper';

const LogsScreen = () => {
  const [logType, setLogType] = useState('user');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMenu, setFilterMenu] = useState(false);

  const logs = {
    user: [
      {
        id: 1,
        action: 'Data Export',
        user: 'John Admin',
        details: 'Exported Survey Results',
        timestamp: '2023-07-20 14:30',
        category: 'data'
      },
      {
        id: 2,
        action: 'Permission Change',
        user: 'Sarah Manager',
        details: 'Updated role access',
        timestamp: '2023-07-20 13:15',
        category: 'security'
      }
    ],
    system: [
      {
        id: 3,
        type: 'error',
        message: 'Database connection timeout',
        timestamp: '2023-07-20 12:30',
        severity: 'high'
      },
      {
        id: 4,
        type: 'warning',
        message: 'High memory usage detected',
        timestamp: '2023-07-20 11:25',
        severity: 'medium'
      }
    ]
  };

  const getChipColor = (type) => {
    const colors = {
      data: '#2196F3',
      security: '#4CAF50',
      high: '#FF5252',
      medium: '#FFC107',
      low: '#4CAF50'
    };
    return colors[type] || '#757575';
  };

  const renderUserLog = (log) => (
    <Card key={log.id} style={styles.logCard}>
      <Card.Content>
        <View style={styles.logHeader}>
          <Title>{log.action}</Title>
          <Chip style={[styles.chip, { backgroundColor: getChipColor(log.category) }]}>
            {log.category}
          </Chip>
        </View>
        <List.Item
          title={log.user}
          description={log.details}
          right={() => <List.Subheader>{log.timestamp}</List.Subheader>}
        />
      </Card.Content>
    </Card>
  );

  const renderSystemLog = (log) => (
    <Card key={log.id} style={styles.logCard}>
      <Card.Content>
        <View style={styles.logHeader}>
          <Title>{log.type.toUpperCase()}</Title>
          <Chip style={[styles.chip, { backgroundColor: getChipColor(log.severity) }]}>
            {log.severity}
          </Chip>
        </View>
        <List.Item
          title={log.message}
          description={log.timestamp}
          left={props => <List.Icon {...props} icon="alert-circle" />}
        />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search logs..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <Button 
          mode="outlined" 
          onPress={() => setFilterMenu(true)}
          icon="filter"
        >
          Filter
        </Button>
      </View>

      <SegmentedButtons
        value={logType}
        onValueChange={setLogType}
        buttons={[
          { value: 'user', label: 'User Activity' },
          { value: 'system', label: 'System Events' }
        ]}
        style={styles.segmentedButtons}
      />

      <ScrollView>
        {logType === 'user' 
          ? logs.user.map(log => renderUserLog(log))
          : logs.system.map(log => renderSystemLog(log))
        }
      </ScrollView>

      <Button 
        mode="contained"
        icon="download"
        onPress={() => {}}
        style={styles.exportButton}
      >
        Export Logs
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
  },
  segmentedButtons: {
    margin: 16,
  },
  logCard: {
    margin: 8,
    marginHorizontal: 16,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    marginLeft: 8,
  },
  exportButton: {
    margin: 16,
    padding: 8,
  }
});

export default LogsScreen;
