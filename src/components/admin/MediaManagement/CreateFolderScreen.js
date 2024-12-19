import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, HelperText, List } from 'react-native-paper';

const CreateFolderScreen = ({ navigation }) => {
  const [folderName, setFolderName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('root');

  const locations = [
    { id: 'root', name: 'Root Directory' },
    { id: 'surveys', name: 'Surveys' },
    { id: 'documents', name: 'Documents' },
    { id: 'images', name: 'Images' }
  ];

  const handleCreate = () => {
    // Create folder logic here
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Create New Folder</Title>

      <TextInput
        label="Folder Name"
        value={folderName}
        onChangeText={setFolderName}
        mode="outlined"
        style={styles.input}
      />
      <HelperText type="info">
        Use a clear, descriptive name for your folder
      </HelperText>

      <TextInput
        label="Description (Optional)"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <Title style={styles.sectionTitle}>Location</Title>
      <List.Section>
        {locations.map(location => (
          <List.Item
            key={location.id}
            title={location.name}
            left={props => <List.Icon {...props} icon="folder" />}
            onPress={() => setSelectedLocation(location.id)}
            right={props => 
              selectedLocation === location.id && 
              <List.Icon {...props} icon="check" />
            }
          />
        ))}
      </List.Section>

      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button 
          mode="contained" 
          onPress={handleCreate}
          style={styles.button}
          disabled={!folderName.trim()}
        >
          Create Folder
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  button: {
    width: '40%',
  },
});

export default CreateFolderScreen;
