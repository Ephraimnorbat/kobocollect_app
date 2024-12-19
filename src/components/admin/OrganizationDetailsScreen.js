import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Button } from 'react-native-paper';

const OrganizationDetailsScreen = () => {
  const orgDetails = {
    name: 'Field Research Corp',
    role: 'Member',
    teams: ['Survey Team A', 'Data Analysis'],
    activeSurveys: 5
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{orgDetails.name}</Title>
          <Paragraph>Role: {orgDetails.role}</Paragraph>
          
          <List.Section>
            <List.Subheader>Your Teams</List.Subheader>
            {orgDetails.teams.map((team, index) => (
              <List.Item
                key={index}
                title={team}
                left={props => <List.Icon {...props} icon="account-group" />}
              />
            ))}
          </List.Section>

          <List.Item
            title="Active Surveys"
            description={`${orgDetails.activeSurveys} surveys in progress`}
            left={props => <List.Icon {...props} icon="clipboard-list" />}
          />
        </Card.Content>
      </Card>
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
  }
});

export default OrganizationDetailsScreen;
