import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, List, Switch, Button, TextInput, Divider } from 'react-native-paper';

const TeamSettingsScreen = ({ route, navigation }) => {
  const { teamId } = route.params;
  const [teamSettings, setTeamSettings] = useState({
    name: 'Field Team',
    description: 'Main survey collection team',
    settings: {
      allowMemberInvites: true,
      requireApproval: true,
      shareResources: true
    }
  });

  const handleSave = () => {
    // Save team settings logic
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Basic Information</Title>
          <TextInput
            label="Team Name"
            value={teamSettings.name}
            onChangeText={(text) => setTeamSettings({...teamSettings, name: text})}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={teamSettings.description}
            onChangeText={(text) => setTeamSettings({...teamSettings, description: text})}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Team Permissions</Title>
          <List.Item
            title="Allow Member Invites"
            description="Team members can invite others"
            right={() => (
              <Switch
                value={teamSettings.settings.allowMemberInvites}
                onValueChange={(value) => 
                  setTeamSettings({
                    ...teamSettings,
                    settings: {...teamSettings.settings, allowMemberInvites: value}
                  })
                }
              />
            )}
          />
          <Divider />
          <List.Item
            title="Require Approval"
            description="New members need admin approval"
            right={() => (
              <Switch
                value={teamSettings.settings.requireApproval}
                onValueChange={(value) => 
                  setTeamSettings({
                    ...teamSettings,
                    settings: {...teamSettings.settings, requireApproval: value}
                  })
                }
              />
            )}
          />
          <Divider />
          <List.Item
            title="Share Resources"
            description="Allow resource sharing between members"
            right={() => (
              <Switch
                value={teamSettings.settings.shareResources}
                onValueChange={(value) => 
                  setTeamSettings({
                    ...teamSettings,
                    settings: {...teamSettings.settings, shareResources: value}
                  })
                }
              />
            )}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleSave}
          style={styles.button}
        >
          Save Changes
        </Button>
      </View>
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
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 16,
  },
  button: {
    padding: 8,
  }
});

export default TeamSettingsScreen;
