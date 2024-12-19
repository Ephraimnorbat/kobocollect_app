import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Card, Title, Text, Button, ProgressBar, TextInput, RadioButton, Checkbox, Portal, Dialog, List } from 'react-native-paper';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SurveyResponseScreen = ({ route, navigation }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});
  const [location, setLocation] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);

  const surveyData = {
    id: 'AMS-2023-001',
    title: 'Artisanal Miners Baseline Census',
    sections: [
      {
        id: 1,
        title: 'Introduction and Consent',
        questions: [
          {
            id: 'consent',
            type: 'radio',
            question: 'May we proceed with the survey?',
            options: ['Yes', 'No'],
            required: true
          }
        ]
      },
      {
        id: 2,
        title: 'Enumerator Details',
        questions: [
          {
            id: 'enum_fname',
            type: 'text',
            question: 'Enumerator First Name',
            required: true
          },
          {
            id: 'enum_lname',
            type: 'text',
            question: 'Enumerator Last Name',
            required: true
          },
          {
            id: 'enum_mobile',
            type: 'text',
            question: 'Enumerator Mobile Number',
            required: true
          },
          {
            id: 'enum_office',
            type: 'radio',
            question: 'Regional Office',
            options: ['Nyanza'],
            required: true
          },
          {
            id: 'data_protection',
            type: 'radio',
            question: 'I undertake to carry out the survey in respectful manner and adhere to the requirement of the Data Protection Act, 2019 of the Republic of Kenya',
            options: ['Accept', 'Reject'],
            required: true
          }
        ]
      },
      {
        id: 3,
        title: 'Miner Identification',
        questions: [
          {
            id: 'mining_type',
            type: 'radio',
            question: 'Are you mining as part of a group or as an individual?',
            options: ['Individual', 'In a Group'],
            required: true
          }
        ]
      },
      {
        id: 4,
        title: 'Miner Details',
        questions: [
          {
            id: 'miner_name',
            type: 'text',
            question: 'Miner Name',
            required: true
          },
          {
            id: 'national_id',
            type: 'text',
            question: 'National ID Number',
            required: true
          },
          {
            id: 'mobile',
            type: 'text',
            question: 'Mobile Number',
            required: true
          },
          {
            id: 'education',
            type: 'radio',
            question: 'Highest Education Level',
            options: ['None', 'Primary', 'Secondary', 'Tertiary'],
            required: true
          },
          {
            id: 'gender',
            type: 'radio',
            question: 'Gender',
            options: ['Male', 'Female'],
            required: true
          },
          {
            id: 'household_size',
            type: 'text',
            question: 'Household Size',
            required: true
          },
          {
            id: 'marital_status',
            type: 'radio',
            question: 'Marital Status',
            options: ['Single', 'Married', 'Divorced', 'Widowed'],
            required: true
          },
          {
            id: 'income_source',
            type: 'radio',
            question: 'Main Source of Income',
            options: ['Mining Income', 'Other'],
            required: true
          }
        ]
      },
      {
        id: 5,
        title: 'Location Details',
        questions: [
          {
            id: 'county',
            type: 'radio',
            question: 'County',
            options: ['EMBU'],
            required: true
          }
        ]
      },
      {
        id: 6,
        title: 'Mining Enterprise',
        questions: [
          {
            id: 'mining_enterprise',
            type: 'checkbox',
            question: 'Which of the following mining enterprises are you involved in?',
            options: ['Mercury Washing'],
            required: true
          },
          {
            id: 'minerals',
            type: 'checkbox',
            question: 'Which of the following minerals are you involved in?',
            options: ['POZZOLANA'],
            required: true
          }
        ]
      },
      {
        id: 7,
        title: 'Photo & Coordinates',
        questions: [
          {
            id: 'gps',
            type: 'location',
            question: 'GPS of mine site',
            required: true
          },
          {
            id: 'photo1',
            type: 'photo',
            question: 'Photo 1',
            required: true
          },
          {
            id: 'photo2',
            type: 'photo',
            question: 'Photo 2',
            required: true
          }
        ]
      }
    ]
  };

  useEffect(() => {
    const loadDraft = async () => {
      if (route.params?.draftId) {
        const draftData = await AsyncStorage.getItem(`draft_${route.params.draftId}`);
        if (draftData) {
          setResponses(JSON.parse(draftData).responses);
        }
      }
    };

    loadDraft();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    await Location.requestForegroundPermissionsAsync();
    await ImagePicker.requestCameraPermissionsAsync();
  };

  const handleLocation = async (questionId) => {
    let location = await Location.getCurrentPositionAsync({});
    handleResponse(questionId, {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  };

  const handlePhoto = async (questionId) => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      handleResponse(questionId, result.assets[0].uri);
    }
  };

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const saveDraft = async () => {
    setSavingDraft(true);
    try {
      const draftData = {
        surveyId: surveyData.id,
        responses,
        location,
        lastModified: new Date().toISOString(),
        currentSection
      };
      
      await AsyncStorage.setItem(
        `draft_${Date.now()}`,
        JSON.stringify(draftData)
      );
      
      navigation.navigate('Drafts');
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setSavingDraft(false);
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'text':
        return (
          <TextInput
            mode="outlined"
            label={question.question}
            value={responses[question.id] || ''}
            onChangeText={(text) => handleResponse(question.id, text)}
            style={styles.input}
          />
        );

      case 'radio':
        return (
          <RadioButton.Group
            onValueChange={(value) => handleResponse(question.id, value)}
            value={responses[question.id]}
          >
            {question.options.map((option) => (
              <RadioButton.Item
                key={option}
                label={option}
                value={option}
              />
            ))}
          </RadioButton.Group>
        );

      case 'checkbox':
        return (
          <View>
            {question.options.map((option) => (
              <Checkbox.Item
                key={option}
                label={option}
                status={responses[question.id]?.includes(option) ? 'checked' : 'unchecked'}
                onPress={() => {
                  const currentValues = responses[question.id] || [];
                  const newValues = currentValues.includes(option)
                    ? currentValues.filter(v => v !== option)
                    : [...currentValues, option];
                  handleResponse(question.id, newValues);
                }}
              />
            ))}
          </View>
        );

      case 'location':
        return (
          <View>
            <Button 
              mode="contained" 
              onPress={() => handleLocation(question.id)}
              icon="map-marker"
            >
              Get Location
            </Button>
            {responses[question.id] && (
              <Text style={styles.locationText}>
                Lat: {responses[question.id].latitude}, 
                Long: {responses[question.id].longitude}
              </Text>
            )}
          </View>
        );

      case 'photo':
        return (
          <View>
            <Button 
              mode="contained" 
              onPress={() => handlePhoto(question.id)}
              icon="camera"
              style={styles.photoButton}
            >
              Take Photo
            </Button>
            {responses[question.id] && (
              <Image 
                source={{ uri: responses[question.id] }} 
                style={styles.photoPreview} 
              />
            )}
          </View>
        );

      default:
        return null;
    }
  };

  const validateSection = () => {
    const currentQuestions = surveyData.sections[currentSection].questions;
    return currentQuestions.every(question => 
      !question.required || responses[question.id]
    );
  };

  const handleSubmit = async () => {
    try {
      const submissionData = {
        surveyId: surveyData.id,
        responses,
        location,
        submittedAt: new Date().toISOString()
      };
      
      console.log('Submitting:', submissionData);
      
      navigation.navigate('Submissions');
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const currentSectionData = surveyData.sections[currentSection];
 
  const totalSteps = surveyData.sections.length;
  const currentStep = currentSection + 1;
  const progress = Math.floor((currentStep / totalSteps) * 10) / 10;



  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{surveyData.title}</Title>
            <ProgressBar progress={progress} style={styles.progressBar} />
            <Text style={styles.progressText}>
              Section {currentSection + 1} of {surveyData.sections.length}
            </Text>

            <Title style={styles.sectionTitle}>
              {currentSectionData.title}
            </Title>

            {currentSectionData.questions.map((question) => (
              <View key={question.id} style={styles.questionContainer}>
                <Text style={styles.questionText}>
                  {question.question}
                  {question.required && <Text style={styles.required}> *</Text>}
                </Text>
                {renderQuestion(question)}
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => setCurrentSection(prev => prev - 1)}
          disabled={currentSection === 0}
          style={styles.navigationButton}
        >
          Previous
        </Button>

        <Button
          mode="outlined"
          icon="content-save"
          onPress={saveDraft}
          loading={savingDraft}
          style={styles.navigationButton}
        >
          Save Draft
        </Button>

        {currentSection < surveyData.sections.length - 1 ? (
          <Button
            mode="contained"
            onPress={() => setCurrentSection(prev => prev + 1)}
            disabled={!validateSection()}
            style={styles.navigationButton}
          >
            Next
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={() => setConfirmDialog(true)}
            disabled={!validateSection()}
            style={styles.navigationButton}
          >
            Submit
          </Button>
        )}
      </View>

      <Portal>
        <Dialog visible={confirmDialog} onDismiss={() => setConfirmDialog(false)}>
          <Dialog.Title>Confirm Submission</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to submit this survey?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmDialog(false)}>Cancel</Button>
            <Button onPress={handleSubmit}>Submit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
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
  progressBar: {
    height: 8,
    marginVertical: 8,
  },
  progressText: {
    textAlign: 'right',
    fontSize: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  questionContainer: {
    marginVertical: 12,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    marginVertical: 8,
  },
  photoButton: {
    marginVertical: 8,
  },
  photoPreview: {
    width: '100%',
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
  locationText: {
    marginTop: 8,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    elevation: 4,
  },
  navigationButton: {
    flex: 1,
    marginHorizontal: 4,
  }
});

export default SurveyResponseScreen;
