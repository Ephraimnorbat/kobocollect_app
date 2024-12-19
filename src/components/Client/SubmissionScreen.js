import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Searchbar, List, Chip, Button } from 'react-native-paper';

const SubmissionsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const submissions = [
    {
      id: 1,
      surveyTitle: 'Artisanal Mining Survey 2023',
      submittedDate: '2024-07-20',
      status: 'completed',
      responses: 25,
      location: 'District A'
    },
    {
      id: 2,
      surveyTitle: 'Water Quality Assessment',
      submittedDate: '2023-07-18',
      status: 'pending_review',
      responses: 15,
      location: 'District B'
    },
    {
      id: 3,
      surveyTitle: 'Education Access Survey',
      submittedDate: '2023-07-15',
      status: 'approved',
      responses: 30,
      location: 'District C'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'pending_review': return '#FFC107';
      case 'approved': return '#2196F3';
      default: return '#757575';
    }
  };

  const getStatusLabel = (status) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search submissions..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <ScrollView>
        {submissions.map(submission => (
          <Card key={submission.id} style={styles.card}>
            <Card.Content>
              <View style={styles.headerRow}>
                <Title>{submission.surveyTitle}</Title>
                <Chip 
                  style={[styles.statusChip, { backgroundColor: getStatusColor(submission.status) }]}
                >
                  {getStatusLabel(submission.status)}
                </Chip>
              </View>

              <List.Item
                title="Submitted Date"
                description={submission.submittedDate}
                left={props => <List.Icon {...props} icon="calendar" />}
              />

              <List.Item
                title="Responses"
                description={`${submission.responses} responses`}
                left={props => <List.Icon {...props} icon="format-list-bulleted" />}
              />

              <List.Item
                title="Location"
                description={submission.location}
                left={props => <List.Icon {...props} icon="map-marker" />}
              />

              <View style={styles.buttonRow}>
                <Button 
                  mode="contained"
                  onPress={() => navigation.navigate('SubmissionDetail', { submissionId: submission.id })}
                  style={styles.button}
                >
                  View Details
                </Button>
                <Button 
                  mode="outlined"
                  icon="download"
                  onPress={() => {}}
                  style={styles.button}
                >
                  Export
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
  },
  card: {
    margin: 16,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusChip: {
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  }
});

export default SubmissionsScreen;
