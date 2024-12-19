import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const QuickActions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('CreateSurvey')}
        style={styles.button}
      >
        Create Survey
      </Button>
      
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('AddUser')}
        style={styles.button}
      >
        Add User
      </Button>
      
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('NewProject')}
        style={styles.button}
      >
        New Project
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  button: {
    marginHorizontal: 4,
  },
});

export default QuickActions;
