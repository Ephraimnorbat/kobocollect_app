import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Subheading, Switch } from 'react-native-paper';

const CreateProjectScreen = ({ navigation }) => {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    isPublic: false,
    organizationId: '',
    teamMembers: []
  });

  const handleSubmit = () => {
    // Handle project creation
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Project Title"
        value={projectData.title}
        onChangeText={(text) => setProjectData({...projectData, title: text})}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Description"
        value={projectData.description}
        onChangeText={(text) => setProjectData({...projectData, description: text})}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <TextInput
        label="Start Date"
        value={projectData.startDate}
        onChangeText={(text) => setProjectData({...projectData, startDate: text})}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="End Date"
        value={projectData.endDate}
        onChangeText={(text) => setProjectData({...projectData, endDate: text})}
        mode="outlined"
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Subheading>Make Project Public</Subheading>
        <Switch
          value={projectData.isPublic}
          onValueChange={(value) => setProjectData({...projectData, isPublic: value})}
        />
      </View>

      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Create Project
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  input: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default CreateProjectScreen;
