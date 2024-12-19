import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const SurveysScreen = () => {
  const surveys = [
    { id: 1, title: 'Health Survey', description: 'Community health assessment' },
    { id: 2, title: 'Education Survey', description: 'School facilities evaluation' },
  ];

  const renderSurveyItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {}}>Start Survey</Button>
        <Button onPress={() => {}}>View Details</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={surveys}
        renderItem={renderSurveyItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default SurveysScreen;
