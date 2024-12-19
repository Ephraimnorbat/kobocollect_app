import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card, Title, List, Button, Divider } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Field Researcher',
    organization: 'Research Corp',
    completedSurveys: 45,
    activeProjects: 3
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Avatar.Text 
            size={80} 
            label={userProfile.name.split(' ').map(n => n[0]).join('')} 
          />
          <Title style={styles.name}>{userProfile.name}</Title>
        </View>

        <List.Section>
          <List.Item
            title="Email"
            description={userProfile.email}
            left={props => <List.Icon {...props} icon="email" />}
          />
          <Divider />
          <List.Item
            title="Role"
            description={userProfile.role}
            left={props => <List.Icon {...props} icon="badge-account" />}
          />
          <Divider />
          <List.Item
            title="Organization"
            description={userProfile.organization}
            left={props => <List.Icon {...props} icon="domain" />}
          />
        </List.Section>
      </Card>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Title>Statistics</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Title>{userProfile.completedSurveys}</Title>
              <List.Subheader>Completed Surveys</List.Subheader>
            </View>
            <View style={styles.statItem}>
              <Title>{userProfile.activeProjects}</Title>
              <List.Subheader>Active Projects</List.Subheader>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.actionsCard}>
        <Card.Content>
          <Button 
            mode="contained" 
            icon="cog" 
            onPress={() => navigation.navigate('Settings')}
            style={styles.button}
          >
            Settings
          </Button>
          <Button 
            mode="outlined" 
            icon="help-circle" 
            onPress={() => navigation.navigate('Help')}
            style={styles.button}
          >
            Help & Support
          </Button>
          <Button 
            mode="outlined" 
            icon="logout" 
            onPress={() => {}}
            style={styles.button}
          >
            Logout
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    margin: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    padding: 16,
  },
  name: {
    marginTop: 8,
  },
  statsCard: {
    margin: 16,
    marginTop: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  actionsCard: {
    margin: 16,
    marginTop: 0,
  },
  button: {
    marginVertical: 8,
  }
});

export default ProfileScreen;
