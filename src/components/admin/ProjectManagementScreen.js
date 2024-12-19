import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FAB, Card, Title, Paragraph, Chip, Searchbar, Menu, Divider } from 'react-native-paper';

const ProjectManagementScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Community Health Survey',
      description: 'Healthcare assessment in rural areas',
      status: 'active',
      surveys: 12,
      submissions: 156,
      lastUpdated: '2023-07-15'
    },
    {
      id: 2,
      title: 'Education Monitoring',
      description: 'School facilities and resources tracking',
      status: 'draft',
      surveys: 8,
      submissions: 89,
      lastUpdated: '2023-07-14'
    }
  ];

  const renderProjectCard = (project) => (
    <Card key={project.id} style={styles.projectCard}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Title>{project.title}</Title>
          <Chip 
            mode="outlined" 
            selected={project.status === 'active'}
            selectedColor={project.status === 'active' ? '#4CAF50' : '#FFA000'}
          >
            {project.status.toUpperCase()}
          </Chip>
        </View>
        <Paragraph>{project.description}</Paragraph>
        
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Title>{project.surveys}</Title>
            <Paragraph>Surveys</Paragraph>
          </View>
          <View style={styles.stat}>
            <Title>{project.submissions}</Title>
            <Paragraph>Submissions</Paragraph>
          </View>
          <View style={styles.stat}>
            <Title>{project.lastUpdated}</Title>
            <Paragraph>Last Updated</Paragraph>
          </View>
        </View>
      </Card.Content>
      
      <Card.Actions>
        <Menu.Item onPress={() => {}} title="Edit" />
        <Menu.Item onPress={() => {}} title="View Details" />
        <Menu.Item onPress={() => {}} title="Archive" />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterSection}>
        <Searchbar
          placeholder="Search projects..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <Chip 
            selected={selectedFilter === 'all'} 
            onPress={() => setSelectedFilter('all')}
            style={styles.filterChip}
          >
            All
          </Chip>
          <Chip 
            selected={selectedFilter === 'active'} 
            onPress={() => setSelectedFilter('active')}
            style={styles.filterChip}
          >
            Active
          </Chip>
          <Chip 
            selected={selectedFilter === 'draft'} 
            onPress={() => setSelectedFilter('draft')}
            style={styles.filterChip}
          >
            Draft
          </Chip>
          <Chip 
            selected={selectedFilter === 'archived'} 
            onPress={() => setSelectedFilter('archived')}
            style={styles.filterChip}
          >
            Archived
          </Chip>
        </ScrollView>
      </View>

      <ScrollView style={styles.projectList}>
        {projects.map(project => renderProjectCard(project))}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateProject')}
        label="New Project"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterSection: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  searchBar: {
    marginBottom: 12,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    marginRight: 8,
  },
  projectList: {
    padding: 16,
  },
  projectCard: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ProjectManagementScreen;
