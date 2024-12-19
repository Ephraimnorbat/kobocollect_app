import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Chip, IconButton, Searchbar, Menu, Portal, Modal } from 'react-native-paper';

const SurveyManagementScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const surveys = [
    {
      id: 1,
      title: 'Health Assessment Form',
      type: 'Medical',
      questions: 25,
      responses: 150,
      status: 'active',
      lastModified: '2023-07-20'
    },
    {
      id: 2,
      title: 'School Infrastructure Survey',
      type: 'Education',
      questions: 30,
      responses: 89,
      status: 'draft',
      lastModified: '2023-07-18'
    }
  ];

  const renderSurveyCard = (survey) => (
    <Card key={survey.id} style={styles.surveyCard}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title>{survey.title}</Title>
          <IconButton
            icon="dots-vertical"
            onPress={() => setSelectedSurvey(survey)}
          />
        </View>

        <View style={styles.tagsContainer}>
          <Chip style={styles.tag}>{survey.type}</Chip>
          <Chip 
            style={styles.statusChip}
            mode="outlined"
            selectedColor={survey.status === 'active' ? '#4CAF50' : '#FFA000'}
          >
            {survey.status}
          </Chip>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Title>{survey.questions}</Title>
            <Paragraph>Questions</Paragraph>
          </View>
          <View style={styles.stat}>
            <Title>{survey.responses}</Title>
            <Paragraph>Responses</Paragraph>
          </View>
          <View style={styles.stat}>
            <Title>{survey.lastModified}</Title>
            <Paragraph>Last Modified</Paragraph>
          </View>
        </View>
      </Card.Content>

      <Card.Actions>
        <Button onPress={() => navigation.navigate('EditSurvey', { surveyId: survey.id })}>
          Edit
        </Button>
        <Button onPress={() => navigation.navigate('SurveyResponses', { surveyId: survey.id })}>
          View Responses
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search surveys..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <Button 
          mode="contained" 
          icon="plus" 
          onPress={() => navigation.navigate('CreateSurvey')}
          style={styles.createButton}
        >
          Create Survey
        </Button>
      </View>

      <ScrollView style={styles.surveyList}>
        {surveys.map(survey => renderSurveyCard(survey))}
      </ScrollView>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Title>Survey Templates</Title>
          <Button 
            mode="outlined" 
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('CreateSurvey', { template: 'health' });
            }}
          >
            Health Assessment Template
          </Button>
          <Button 
            mode="outlined" 
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('CreateSurvey', { template: 'education' });
            }}
          >
            Education Survey Template
          </Button>
        </Modal>
      </Portal>
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
    marginBottom: 12,
  },
  createButton: {
    marginTop: 8,
  },
  surveyList: {
    padding: 16,
  },
  surveyCard: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  tag: {
    marginRight: 8,
  },
  statusChip: {
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});

export default SurveyManagementScreen;
