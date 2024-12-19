import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List, Card, Title, Paragraph, Button, FAB, Searchbar, Avatar, Chip, IconButton } from 'react-native-paper';

const TeamManagementScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { orgId } = route.params;

  const teams = [
    {
      id: 1,
      name: 'Field Survey Team',
      members: 12,
      projects: 5,
      lead: 'Sarah Johnson',
      status: 'active'
    },
    {
      id: 2,
      name: 'Data Analysis Team',
      members: 8,
      projects: 3,
      lead: 'Mike Chen',
      status: 'active'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search teams..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <ScrollView style={styles.content}>
        {teams.map(team => (
          <Card key={team.id} style={styles.teamCard}>
            <Card.Content>
              <View style={styles.teamHeader}>
                <Title>{team.name}</Title>
                <Chip mode="outlined" selected={team.status === 'active'}>
                  {team.status}
                </Chip>
              </View>

              <View style={styles.teamStats}>
                <View style={styles.stat}>
                  <Title>{team.members}</Title>
                  <Paragraph>Members</Paragraph>
                </View>
                <View style={styles.stat}>
                  <Title>{team.projects}</Title>
                  <Paragraph>Projects</Paragraph>
                </View>
              </View>

              <List.Item
                title="Team Lead"
                description={team.lead}
                left={props => <Avatar.Text {...props} size={40} label={team.lead.substring(0, 2)} />}
                right={props => <IconButton {...props} icon="pencil" onPress={() => {}} />}
              />

              <View style={styles.actionButtons}>
                <Button mode="outlined" onPress={() => navigation.navigate('TeamMembers', { teamId: team.id })}>
                  Manage Members
                </Button>
                <Button mode="outlined" onPress={() => navigation.navigate('TeamProjects', { teamId: team.id })}>
                  View Projects
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        label="Create Team"
        onPress={() => navigation.navigate('CreateTeam', { orgId })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  searchBar: {
    marginBottom: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  teamCard: {
    marginBottom: 16,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TeamManagementScreen;
