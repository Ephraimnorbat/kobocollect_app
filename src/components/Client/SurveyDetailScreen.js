import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Text, Button, ProgressBar, List, Chip, Portal, Dialog, TextInput } from 'react-native-paper';

const SurveyDetailScreen = ({ navigation }) => {
  const [responseDialog, setResponseDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const surveyData = {
    id: 'SRV-2023-001',
    title: 'Artisanal Mining Survey 2023',
    description: 'A comprehensive survey examining the practices, challenges, and impacts of ASM in 2024.',
    deadline: '2024-08-30',
    status: 'active',
    progress: 0.4,
    estimatedTime: '30 minutes',
    organization: 'Mining Department',
    sections: [
      {
        id: 1,
        title: 'Enumerator details',
        completed: true,
        questions: [
          {
            id: 101,
            type: 'multiple_choice',
            question: 'Age Group',
            options: ['18-25', '26-35', '36-45', '46+'],
            required: true
          }
        ]
      },
      {
        id: 2,
        title: 'Miner Identification',
        completed: false,
        questions: [
          {
            id: 201,
            type: 'rating',
            question: 'Rate your access to healthcare facilities',
            scale: '1-5',
            required: true
          }
        ]
      },
      {
        id: 3,
        title: 'Mining enterprise',
        completed: false,
        questions: [
          {
            id: 303,
            type: 'rating',
            question: 'Rate your access to healthcare facilities',
            scale: '1-5',
            required: true
          }
        ]
      },
      {
        id: 4,
        title: 'Photo and coordinates',
        completed: false,
        questions: [
          {
            id: 301,
            type: 'rating',
            question: 'Rate your access to healthcare facilities',
            scale: '1-5',
            required: true
          }
        ]
      },
      
    ],
    requirements: [
      'GPS Location Access',
      'Camera Permission',
      'Internet Connection'
    ]
  };

  const renderSectionProgress = () => (
    <View style={styles.progressContainer}>
      <Title>Progress</Title>
      <ProgressBar progress={surveyData.progress} style={styles.progressBar} />
      <Text style={styles.progressText}>
        {`${Math.round(surveyData.progress * 100)}% Complete`}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{surveyData.title}</Title>
          <Text style={styles.description}>{surveyData.description}</Text>
          
          <View style={styles.infoRow}>
            <Chip icon="clock" style={styles.chip}>
              {surveyData.estimatedTime}
            </Chip>
            <Chip icon="calendar" style={styles.chip}>
              Due: {surveyData.deadline}
            </Chip>
          </View>

          {renderSectionProgress()}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Sections</Title>
          {surveyData.sections.map((section) => (
            <List.Accordion
              key={section.id}
              title={section.title}
              left={props => <List.Icon {...props} icon={section.completed ? "check-circle" : "circle-outline"} />}
            >
              {section.questions.map((question) => (
                <List.Item
                  key={question.id}
                  title={question.question}
                  description={`Type: ${question.type}`}
                  right={() => (
                    <Button 
                      mode="text"
                      onPress={() => {
                        setCurrentQuestion(question);
                        setResponseDialog(true);
                      }}
                    >
                      Answer
                    </Button>
                  )}
                />
              ))}
            </List.Accordion>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Requirements</Title>
          {surveyData.requirements.map((requirement, index) => (
            <List.Item
              key={index}
              title={requirement}
              left={props => <List.Icon {...props} icon="check" />}
            />
          ))}
        </Card.Content>
      </Card>

      <View style={styles.actionButtons}>
        <Button 
          mode="contained"
          icon="play"
          onPress={() => navigation.navigate('SurveyResponse')}
          style={styles.button}
        >
          Start Survey
        </Button>
        <Button 
          mode="outlined"
          icon="download"
          onPress={() => {}}
          style={styles.button}
        >
          Download Offline
        </Button>
      </View>

      <Portal>
        <Dialog visible={responseDialog} onDismiss={() => setResponseDialog(false)}>
          <Dialog.Title>{currentQuestion?.question}</Dialog.Title>
          <Dialog.Content>
            {currentQuestion?.type === 'multiple_choice' && (
              currentQuestion.options.map((option, index) => (
                <List.Item
                  key={index}
                  title={option}
                  onPress={() => {}}
                  right={props => <List.Icon {...props} icon="radiobox-blank" />}
                />
              ))
            )}
            {currentQuestion?.type === 'rating' && (
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Button
                    key={value}
                    mode="outlined"
                    onPress={() => {}}
                    style={styles.ratingButton}
                  >
                    {value.toString()}
                  </Button>
                ))}
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setResponseDialog(false)}>Cancel</Button>
            <Button onPress={() => setResponseDialog(false)}>Save</Button>
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
  description: {
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  chip: {
    marginRight: 8,
  },
  progressContainer: {
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
  actionButtons: {
    padding: 16,
  },
  button: {
    marginVertical: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  ratingButton: {
    width: 48,
  }
});

export default SurveyDetailScreen;
