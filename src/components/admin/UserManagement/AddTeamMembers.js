import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, List, Avatar, Searchbar, Chip } from 'react-native-paper';

const AddTeamMemberScreen = ({ route, navigation }) => {
  const { teamId } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const availableUsers = [
    { id: 1, name: 'Alex Thompson', role: 'Surveyor' },
    { id: 2, name: 'Maria Garcia', role: 'Data Analyst' },
    { id: 3, name: 'James Wilson', role: 'Field Agent' },
    { id: 4, name: 'Lisa Chen', role: 'Researcher' }
  ];

  const handleUserSelect = (user) => {
    if (selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleAddMembers = () => {
    // Add members logic here
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search users..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.selectedSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {selectedUsers.map(user => (
            <Chip
              key={user.id}
              onClose={() => handleUserSelect(user)}
              style={styles.chip}
            >
              {user.name}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.userList}>
        {availableUsers.map(user => (
          <List.Item
            key={user.id}
            title={user.name}
            description={user.role}
            left={() => (
              <Avatar.Text 
                size={40} 
                label={user.name.split(' ').map(n => n[0]).join('')}
              />
            )}
            right={() => (
              <Button
                mode={selectedUsers.find(u => u.id === user.id) ? "contained" : "outlined"}
                onPress={() => handleUserSelect(user)}
              >
                {selectedUsers.find(u => u.id === user.id) ? "Selected" : "Select"}
              </Button>
            )}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleAddMembers}
          disabled={selectedUsers.length === 0}
          style={styles.button}
        >
          Add Selected Members ({selectedUsers.length})
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    margin: 16,
  },
  selectedSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chip: {
    marginRight: 8,
  },
  userList: {
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    padding: 8,
  }
});

export default AddTeamMemberScreen;
