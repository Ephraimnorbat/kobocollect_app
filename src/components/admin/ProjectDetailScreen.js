import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, List, Button, Portal, Dialog, TextInput, Chip, ProgressBar, Menu, Divider } from 'react-native-paper';

const ProjectDetailScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [teamDialog, setTeamDialog] = useState(false);

  const projectData = {
    id: 'PRJ-2023-001',
    title: 'Community Health Assessment',
    description: 'Comprehensive health survey across rural communities',
    status: 'active',
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    progress: 0.65,
    team: [
      { id: 1, name: 'John Doe', role: 'Project Lead' },
      { id: 2, name: 'Sarah Smith', role: 'Field Coordinator' },
      { id: 3, name: 'Mike Johnson', role: 'Data Analyst' }
    ],
    surveys: [
      { id: 1, title: 'Health Access Survey', responses: 245, status: 'active' },
      { id: 2, title: 'Medical Facilities Assessment', responses: 120, status: 'completed' }
    ],
    stats: {
      totalSurveys: 5,
      completedSurveys: 2,
      totalResponses: 365,
      activeUsers: 12
    }
  };

  const renderTeamList = () => (
    <List.Section>
      <List.Subheader>Project Team</List.Subheader>
      {projectData.team.map((member) => (
        <List.Item
          key={member.id}
          title={member.name}
          description={member.role}
          left={props => <List.Icon {...props} icon="account" />}
          right={props => <Button>Message</Button>}
        />
      ))}
    </List.Section>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Title>{projectData.title}</Title>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button onPress={() => setMenuVisible(true)} icon="dots-vertical">
                </Button>
              }
            >
              <Menu.Item onPress={() => {}} title="Export Data" />
              <Menu.Item onPress={() => {}} title="Generate Report" />
              <Menu.Item onPress={() => {}} title="Archive Project" />
            </Menu>
          </View>

          <Chip 
            style={[styles.statusChip, 
              { backgroundColor: projectData.status === 'active' ? '#4CAF50' : '#FF9800' }
            ]}
          >
            {projectData.status.toUpperCase()}
          </Chip>

          <List.Item
            title="Project Timeline"
            description={`${projectData.startDate} - ${projectData.endDate}`}
            left={props => <List.Icon {...props} icon="calendar" />}
          />

          <Title style={styles.progressTitle}>Overall Progress</Title>
          <ProgressBar progress={projectData.progress} style={styles.progressBar} />
          <Text style={styles.progressText}>{`${Math.round(projectData.progress * 100)}%`}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Project Statistics</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Title>{projectData.stats.totalSurveys}</Title>
              <List.Subheader>Total Surveys</List.Subheader>
            </View>
            <View style={styles.statItem}>
              <Title>{projectData.stats.completedSurveys}</Title>
              <List.Subheader>Completed</List.Subheader>
            </View>
            <View style={styles.statItem}>
              <Title>{projectData.stats.totalResponses}</Title>
              <List.Subheader>Responses</List.Subheader>
            </View>
            <View style={styles.statItem}>
              <Title>{projectData.stats.activeUsers}</Title>
              <List.Subheader>Active Users</List.Subheader>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Surveys</Title>
          {projectData.surveys.map((survey) => (
            <List.Item
              key={survey.id}
              title={survey.title}
              description={`${survey.responses} responses`}
              left={props => <List.Icon {...props} icon="file-document" />}
              right={() => (
                <Chip mode="outlined">
                  {survey.status}
                </Chip>
              )}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          {renderTeamList()}
          <Button 
            mode="outlined" 
            onPress={() => setTeamDialog(true)}
            style={styles.button}
          >
            Manage Team
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.actionButtons}>
        <Button 
          mode="contained" 
          onPress={() => setEditDialog(true)}
          style={styles.button}
        >
          Edit Project
        </Button>
        <Button 
          mode="outlined" 
          icon="plus"
          onPress={() => navigation.navigate('CreateSurvey')}
          style={styles.button}
        >
          Add New Survey
        </Button>
      </View>

      <Portal>
        <Dialog visible={editDialog} onDismiss={() => setEditDialog(false)}>
          <Dialog.Title>Edit Project</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Project Title"
              mode="outlined"
              value={projectData.title}
              style={styles.input}
            />
            <TextInput
              label="Description"
              mode="outlined"
              value={projectData.description}
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditDialog(false)}>Cancel</Button>
            <Button onPress={() => setEditDialog(false)}>Save</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={teamDialog} onDismiss={() => setTeamDialog(false)}>
          <Dialog.Title>Manage Team</Dialog.Title>
          <Dialog.Content>
            {renderTeamList()}
            <Button 
              mode="outlined" 
              icon="plus"
              onPress={() => {}}
              style={styles.button}
            >
              Add Team Member
            </Button>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setTeamDialog(false)}>Close</Button>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusChip: {
    marginVertical: 8,
    alignSelf: 'flex-start',
  },
  progressTitle: {
    fontSize: 16,
    marginTop: 16,
  },
  progressBar: {
    height: 8,
    marginVertical: 8,
  },
  progressText: {
    textAlign: 'right',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    minWidth: '25%',
    marginBottom: 16,
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

export default ProjectDetailScreen;
