import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, List, IconButton } from 'react-native-paper';

const DraftsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const drafts = [
    {
      id: 1,
      title: 'Community Health Survey',
      lastModified: '2023-07-25 14:30',
      progress: '60%',
      completedSections: 3,
      totalSections: 5
    },
    {
      id: 2,
      title: 'Water Quality Assessment',
      lastModified: '2023-07-24 16:45',
      progress: '40%',
      completedSections: 2,
      totalSections: 5
    }
  ];

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search drafts..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <ScrollView>
        {drafts.map((draft) => (
          <Card key={draft.id} style={styles.card}>
            <Card.Content>
              <View style={styles.headerRow}>
                <Title>{draft.title}</Title>
                <IconButton
                  icon="dots-vertical"
                  onPress={() => {}}
                />
              </View>
              
              <List.Item
                title="Last Modified"
                description={draft.lastModified}
                left={props => <List.Icon {...props} icon="clock-outline" />}
              />
              
              <List.Item
                title="Progress"
                description={`${draft.completedSections}/${draft.totalSections} sections completed`}
                left={props => <List.Icon {...props} icon="progress-check" />}
              />

              <View style={styles.buttonRow}>
                <Button 
                  mode="contained"
                  onPress={() => navigation.navigate('SurveyResponse', { draftId: draft.id })}
                  style={styles.button}
                >
                  Continue
                </Button>
                <Button 
                  mode="outlined"
                  onPress={() => {}}
                  style={styles.button}
                >
                  Delete Draft
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
  },
  card: {
    margin: 16,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  }
});

export default DraftsScreen;
