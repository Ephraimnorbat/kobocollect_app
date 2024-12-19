import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, List, IconButton, Portal, Modal, Title, Divider } from 'react-native-paper';

const SurveyBuilderScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: '',
    question: '',
    options: [],
    required: true
  });

  const questionTypes = [
    { label: 'Multiple Choice', value: 'multiple_choice' },
    { label: 'Text Input', value: 'text' },
    { label: 'Number', value: 'number' },
    { label: 'Date', value: 'date' },
    { label: 'Location', value: 'location' }
  ];

  const addQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      type: '',
      question: '',
      options: [],
      required: true
    });
    setShowQuestionModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.questionList}>
        {questions.map((question, index) => (
          <List.Item
            key={index}
            title={question.question}
            description={`Type: ${question.type}`}
            left={props => <List.Icon {...props} icon="help-circle" />}
            right={props => (
              <View style={styles.questionActions}>
                <IconButton icon="pencil" onPress={() => {}} />
                <IconButton icon="delete" onPress={() => {}} />
              </View>
            )}
          />
        ))}
      </ScrollView>

      <Button 
        mode="contained" 
        icon="plus"
        onPress={() => setShowQuestionModal(true)}
        style={styles.addButton}
      >
        Add Question
      </Button>

      <Portal>
        <Modal
          visible={showQuestionModal}
          onDismiss={() => setShowQuestionModal(false)}
          contentContainerStyle={styles.modal}
        >
          <Title>Add New Question</Title>
          <Divider style={styles.divider} />
          
          <TextInput
            label="Question Text"
            value={currentQuestion.question}
            onChangeText={text => setCurrentQuestion({...currentQuestion, question: text})}
            mode="outlined"
            style={styles.input}
          />

          <List.Section>
            <List.Subheader>Question Type</List.Subheader>
            {questionTypes.map(type => (
              <List.Item
                key={type.value}
                title={type.label}
                onPress={() => setCurrentQuestion({...currentQuestion, type: type.value})}
                right={() => currentQuestion.type === type.value && <List.Icon icon="check" />}
              />
            ))}
          </List.Section>

          <Button mode="contained" onPress={addQuestion}>
            Add Question
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  questionList: {
    flex: 1,
    padding: 16,
  },
  questionActions: {
    flexDirection: 'row',
  },
  addButton: {
    margin: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
});

export default SurveyBuilderScreen;
