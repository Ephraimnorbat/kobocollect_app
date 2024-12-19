import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, List, Button, Portal, Dialog, TextInput, Avatar, Chip, Divider } from 'react-native-paper';

const UserDetailScreen = ({ route, navigation }) => {
  const [editDialog, setEditDialog] = useState(false);
  const [permissionDialog, setPermissionDialog] = useState(false);

  const userData = {
    id: '1234',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Field Researcher',
    organization: 'Research Corp',
    status: 'active',
    joinDate: '2023-01-15',
    lastActive: '2023-07-20 14:30',
    permissions: ['survey.create', 'survey.submit', 'data.view'],
    stats: {
      surveysCompleted: 45,
      activeProjects: 3,
      submissionRate: '95%'
    }
  };

  const renderPermissionChips = () => (
    <View style={styles.chipContainer}>
      {userData.permissions.map((permission, index) => (
        <Chip key={index} style={styles.chip}>{permission}</Chip>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerContainer}>
            <Avatar.Text 
              size={80} 
              label={userData.name.split(' ').map(n => n[0]).join('')} 
            />
            <View style={styles.headerInfo}>
              <Title>{userData.name}</Title>
              <Chip 
                mode="outlined" 
                style={[styles.statusChip, 
                  { borderColor: userData.status === 'active' ? '#4CAF50' : '#FF5252' }
                ]}
              >
                {userData.status.toUpperCase()}
              </Chip>
            </View>
          </View>

          <List.Section>
            <List.Item
              title="Email"
              description={userData.email}
              left={props => <List.Icon {...props} icon="email" />}
            />
            <Divider />
            <List.Item
              title="Role"
              description={userData.role}
              left={props => <List.Icon {...props} icon="badge-account" />}
            />
            <Divider />
            <List.Item
              title="Organization"
              description={userData.organization}
              left={props => <List.Icon {...props} icon="domain" />}
            />
          </List.Section>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Activity Statistics</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Title>{userData.stats.surveysCompleted}</Title>
              <List.Subheader>Surveys Completed</List.Subheader>
            </View>
            <View style={styles.statItem}>
              <Title>{userData.stats.activeProjects}</Title>
              <List.Subheader>Active Projects</List.Subheader>
            </View>
            <View style={styles.statItem}>
              <Title>{userData.stats.submissionRate}</Title>
              <List.Subheader>Submission Rate</List.Subheader>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Permissions</Title>
          {renderPermissionChips()}
          <Button 
            mode="outlined" 
            onPress={() => setPermissionDialog(true)}
            style={styles.button}
          >
            Manage Permissions
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.actionButtons}>
        <Button 
          mode="contained" 
          onPress={() => setEditDialog(true)}
          style={styles.button}
        >
          Edit User
        </Button>
        <Button 
          mode="outlined" 
          onPress={() => {}}
          style={styles.button}
          textColor="#FF5252"
        >
          Deactivate User
        </Button>
      </View>

      <Portal>
        <Dialog visible={editDialog} onDismiss={() => setEditDialog(false)}>
          <Dialog.Title>Edit User Details</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Name"
              mode="outlined"
              value={userData.name}
              style={styles.input}
            />
            <TextInput
              label="Email"
              mode="outlined"
              value={userData.email}
              style={styles.input}
            />
            <TextInput
              label="Role"
              mode="outlined"
              value={userData.role}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditDialog(false)}>Cancel</Button>
            <Button onPress={() => setEditDialog(false)}>Save</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={permissionDialog} onDismiss={() => setPermissionDialog(false)}>
          <Dialog.Title>Manage Permissions</Dialog.Title>
          <Dialog.Content>
            {renderPermissionChips()}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPermissionDialog(false)}>Close</Button>
            <Button onPress={() => setPermissionDialog(false)}>Update</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    marginBottom: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerInfo: {
    marginLeft: 16,
    flex: 1,
  },
  statusChip: {
    marginTop: 8,
    width: 100,
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  chip: {
    margin: 4,
  },
  actionButtons: {
    padding: 16,
  },
  button: {
    marginVertical: 8,
  },
  input: {
    marginBottom: 16,
  }
});

export default UserDetailScreen;
