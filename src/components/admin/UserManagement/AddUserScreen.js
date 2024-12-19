import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Title, HelperText, List, Checkbox, Divider } from 'react-native-paper';

const AddUserScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'surveyor',
    team: '',
    permissions: {
      createSurveys: false,
      manageSurveys: false,
      viewResponses: true,
      exportData: false,
      manageUsers: false
    }
  });

  const roles = [
    { label: 'Administrator', value: 'admin' },
    { label: 'Surveyor', value: 'surveyor' },
    { label: 'Analyst', value: 'analyst' },
    { label: 'Viewer', value: 'viewer' }
  ];

  const teams = [
    { id: 1, name: 'Field Team' },
    { id: 2, name: 'Analysis Team' },
    { id: 3, name: 'Research Team' }
  ];

  const handleCreateUser = () => {
    // Create user logic here
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Add New User</Title>

      <View style={styles.section}>
        <TextInput
          label="First Name"
          value={userData.firstName}
          onChangeText={text => setUserData({...userData, firstName: text})}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Last Name"
          value={userData.lastName}
          onChangeText={text => setUserData({...userData, lastName: text})}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Email"
          value={userData.email}
          onChangeText={text => setUserData({...userData, email: text})}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          label="Phone Number"
          value={userData.phone}
          onChangeText={text => setUserData({...userData, phone: text})}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Role & Team</Title>
        
        <List.Section>
          {roles.map(role => (
            <List.Item
              key={role.value}
              title={role.label}
              onPress={() => setUserData({...userData, role: role.value})}
              right={() => (
                <Checkbox
                  status={userData.role === role.value ? 'checked' : 'unchecked'}
                />
              )}
            />
          ))}
        </List.Section>

        <List.Section>
          <List.Subheader>Select Team</List.Subheader>
          {teams.map(team => (
            <List.Item
              key={team.id}
              title={team.name}
              onPress={() => setUserData({...userData, team: team.id})}
              right={() => (
                <Checkbox
                  status={userData.team === team.id ? 'checked' : 'unchecked'}
                />
              )}
            />
          ))}
        </List.Section>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Permissions</Title>
        
        <List.Item
          title="Create Surveys"
          right={() => (
            <Checkbox
              status={userData.permissions.createSurveys ? 'checked' : 'unchecked'}
              onPress={() => setUserData({
                ...userData,
                permissions: {
                  ...userData.permissions,
                  createSurveys: !userData.permissions.createSurveys
                }
              })}
            />
          )}
        />
        <List.Item
          title="Manage Surveys"
          right={() => (
            <Checkbox
              status={userData.permissions.manageSurveys ? 'checked' : 'unchecked'}
              onPress={() => setUserData({
                ...userData,
                permissions: {
                  ...userData.permissions,
                  manageSurveys: !userData.permissions.manageSurveys
                }
              })}
            />
          )}
        />
        <List.Item
          title="View Responses"
          right={() => (
            <Checkbox
              status={userData.permissions.viewResponses ? 'checked' : 'unchecked'}
              onPress={() => setUserData({
                ...userData,
                permissions: {
                  ...userData.permissions,
                  viewResponses: !userData.permissions.viewResponses
                }
              })}
            />
          )}
        />
      </View>

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
          onPress={handleCreateUser}
          style={styles.button}
        >
          Create User
        </Button>
      </View>
    </ScrollView>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  divider: {
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    marginBottom: 32,
  },
  button: {
    width: '40%',
  },
});

export default AddUserScreen;
