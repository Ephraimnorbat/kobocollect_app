import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, FAB, List, Avatar, IconButton, Portal, Dialog, TextInput, Button } from 'react-native-paper';

const TeamManagementScreen = ({ navigation }) => {
  const [createTeamDialog, setCreateTeamDialog] = useState(false);
  const [teamName, setTeamName] = useState('');

  const teams = [
    {
      id: 1,
      name: 'Field Team',
      members: [
        { id: 1, name: 'John Doe', role: 'Team Lead' },
        { id: 2, name: 'Jane Smith', role: 'Surveyor' }
      ]
    },
    {
      id: 2,
      name: 'Analysis Team',
      members: [
        { id: 3, name: 'Mike Johnson', role: 'Data Analyst' },
        { id: 4, name: 'Sarah Wilson', role: 'Researcher' }
      ]
    }
  ];

  const renderTeamCard = (team) => (
    <Card key={team.id} style={styles.teamCard}>
      <Card.Content>
        <View style={styles.teamHeader}>
          <Title>{team.name}</Title>
          <IconButton 
            icon="account-plus" 
            onPress={() => navigation.navigate('AddTeamMember', { teamId: team.id })}
          />
        </View>

        <List.Section>
          {team.members.map(member => (
            <List.Item
              key={member.id}
              title={member.name}
              description={member.role}
              left={() => (
                <Avatar.Text 
                  size={40} 
                  label={member.name.split(' ').map(n => n[0]).join('')} 
                />
              )}
              right={() => (
                <IconButton icon="dots-vertical" onPress={() => {}} />
              )}
            />
          ))}
        </List.Section>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {teams.map(team => renderTeamCard(team))}
      </ScrollView>

      <Portal>
        <Dialog
          visible={createTeamDialog}
          onDismiss={() => setCreateTeamDialog(false)}
        >
          <Dialog.Title>Create New Team</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Team Name"
              value={teamName}
              onChangeText={setTeamName}
              mode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setCreateTeamDialog(false)}>Cancel</Button>
            <Button onPress={() => {
              setCreateTeamDialog(false);
              setTeamName('');
            }}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        label="New Team"
        onPress={() => setCreateTeamDialog(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  teamCard: {
    margin: 16,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

export default TeamManagementScreen;
