import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Chip, List } from 'react-native-paper';

const SurveysScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const surveys = [
    {
      id: 1,
      title: 'Artisanal Mining Survey 2023',
      description: 'A comprehensive survey examining the practices, challenges, and impacts of artisanal mining in 2023',
      deadline: '2023-08-30',
      status: 'active',
      progress: '0/25'
    },
    {
      id: 2,
      title: 'Education Access Survey',
      description: 'Evaluate access to educational resources',
      deadline: '2023-09-15',
      status: 'pending',
      progress: '0/30'
    },
    {
      id: 3,
      title: 'Water Quality Assessment',
      description: 'Monitor local water sources',
      deadline: '2023-08-25',
      status: 'active',
      progress: '15/40'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'pending': return '#FFC107';
      case 'completed': return '#2196F3';
      default: return '#757575';
    }
  };

  return (
    <View style={styles.container}>
     <Title style={styles.pageTitle}>State Department Of Mining</Title>
      <Searchbar
        placeholder="Search surveys..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <ScrollView>
        {surveys.map(survey => (
          <Card key={survey.id} style={styles.card}>
            <Card.Content>
              <View style={styles.headerRow}>
                <Title>{survey.title}</Title>
                <Chip 
                  style={[styles.statusChip, { backgroundColor: getStatusColor(survey.status) }]}
                >
                  {survey.status}
                </Chip>
              </View>
              
              <Paragraph>{survey.description}</Paragraph>
              
              <List.Item
                title="Deadline"
                description={survey.deadline}
                left={props => <List.Icon {...props} icon="calendar" />}
              />
              
              <List.Item
                title="Progress"
                description={survey.progress}
                left={props => <List.Icon {...props} icon="progress-check" />}
              />

              <View style={styles.buttonRow}>
                <Button 
                  mode="contained" 
                  onPress={() => navigation.navigate('SurveyDetail', { surveyId: survey.id })}
                  style={styles.button}
                >
                  Start Survey
                </Button>
                <Button 
                  mode="outlined"
                  onPress={() => navigation.navigate('SurveyInfo', { surveyId: survey.id })}
                  style={styles.button}
                >
                  View Details
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
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  }
});

export default SurveysScreen;
