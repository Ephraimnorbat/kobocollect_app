import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Searchbar, List, Chip, Button, Menu } from 'react-native-paper';

const AuditLogsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMenu, setFilterMenu] = useState(false);
  
  const auditLogs = [
    {
      id: 1,
      action: 'Data Export',
      user: 'John Admin',
      details: 'Exported Survey Results',
      timestamp: '2023-07-20 14:30',
      type: 'data'
    },
    {
      id: 2,
      action: 'User Login',
      user: 'Sarah Field',
      details: 'Successful login',
      timestamp: '2023-07-20 14:25',
      type: 'security'
    },
    {
      id: 3,
      action: 'Survey Modified',
      user: 'Mike Team Lead',
      details: 'Updated question set',
      timestamp: '2023-07-20 13:15',
      type: 'content'
    },
    {
      id: 4,
      action: 'Permission Change',
      user: 'Admin System',
      details: 'Updated role permissions',
      timestamp: '2023-07-20 12:45',
      type: 'system'
    }
  ];

  const getIconForType = (type) => {
    switch (type) {
      case 'data': return 'database';
      case 'security': return 'shield-account';
      case 'content': return 'file-document-edit';
      case 'system': return 'cog';
      default: return 'information';
    }
  };

  const getChipColor = (type) => {
    switch (type) {
      case 'data': return '#2196F3';
      case 'security': return '#4CAF50';
      case 'content': return '#FF9800';
      case 'system': return '#9C27B0';
      default: return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search logs..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <Menu
          visible={filterMenu}
          onDismiss={() => setFilterMenu(false)}
          anchor={
            <Button 
              mode="outlined" 
              onPress={() => setFilterMenu(true)}
              icon="filter"
            >
              Filter
            </Button>
          }
        >
          <Menu.Item onPress={() => {}} title="All Logs" />
          <Menu.Item onPress={() => {}} title="Security" />
          <Menu.Item onPress={() => {}} title="Data Access" />
          <Menu.Item onPress={() => {}} title="System Changes" />
        </Menu>
      </View>

      <ScrollView>
        {auditLogs.map(log => (
          <Card key={log.id} style={styles.logCard}>
            <Card.Content>
              <View style={styles.logHeader}>
                <List.Icon icon={getIconForType(log.type)} />
                <Title>{log.action}</Title>
              </View>
              
              <View style={styles.logDetails}>
                <Chip 
                  style={[styles.chip, { backgroundColor: getChipColor(log.type) }]}
                  textStyle={styles.chipText}
                >
                  {log.type}
                </Chip>
                <List.Item
                  title={log.user}
                  description={log.details}
                  right={() => <List.Subheader>{log.timestamp}</List.Subheader>}
                />
              </View>
            </Card.Content>
          </Card>
        ))}
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
  logCard: {
    margin: 8,
    marginHorizontal: 16,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logDetails: {
    marginLeft: 40,
  },
  chip: {
    marginVertical: 8,
    alignSelf: 'flex-start',
  },
  chipText: {
    color: 'white',
  },
  exportButton: {
    margin: 16,
    padding: 8,
  }
});

export default AuditLogsScreen;
