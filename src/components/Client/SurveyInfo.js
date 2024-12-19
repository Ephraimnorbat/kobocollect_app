import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Button } from 'react-native-paper';

const SurveyInfo = ({ route, navigation }) => {
  const { surveyId } = route.params;
  
  // Mock data - replace with actual API call later
  const surveyDetails = {
    id: surveyId,
    title: 'Artisanal Mining Survey 2023',
    description: 'A comprehensive survey examining the practices, challenges, and impacts of artisanal mining in 2023',
    deadline: '2023-08-30',
    totalQuestions: 25,
    estimatedTime: '30 minutes',
    category: 'Mining',
    instructions: 'Please complete all sections. Ensure GPS is enabled for location-based questions.',
    requirements: [
      'GPS enabled device',
      'Camera access',
      'Internet connection'
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{surveyDetails.title}</Title>
          <Paragraph style={styles.description}>{surveyDetails.description}</Paragraph>

          <List.Section>
            <List.Item
              title="Deadline"
              description={surveyDetails.deadline}
              left={props => <List.Icon {...props} icon="calendar" />}
            />
            <List.Item
              title="Total Questions"
              description={surveyDetails.totalQuestions.toString()}
              left={props => <List.Icon {...props} icon="format-list-numbered" />}
            />
            <List.Item
              title="Estimated Time"
              description={surveyDetails.estimatedTime}
              left={props => <List.Icon {...props} icon="clock-outline" />}
            />
            <List.Item
              title="Category"
              description={surveyDetails.category}
              left={props => <List.Icon {...props} icon="folder" />}
            />
          </List.Section>

          <Title style={styles.sectionTitle}>Instructions</Title>
          <Paragraph>{surveyDetails.instructions}</Paragraph>

          <Title style={styles.sectionTitle}>Requirements</Title>
          {surveyDetails.requirements.map((req, index) => (
            <List.Item
              key={index}
              title={req}
              left={props => <List.Icon {...props} icon="check-circle" />}
            />
          ))}

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('SurveyDetail', { surveyId })}
              style={styles.button}
            >
              Start Survey
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.button}
            >
              Go Back
            </Button>
          </View>
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
  card: {
    margin: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  }
});

export default SurveyInfo;
