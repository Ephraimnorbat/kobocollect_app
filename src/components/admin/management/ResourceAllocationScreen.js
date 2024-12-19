import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, Button, List, Divider } from 'react-native-paper';

const ResourceAllocationScreen = ({ route }) => {
  const { orgId } = route.params;

  const resources = {
    storage: {
      used: 75,
      total: 100,
      unit: 'GB'
    },
    users: {
      active: 45,
      limit: 50
    },
    projects: {
      active: 8,
      limit: 10
    },
    surveys: {
      monthly: 156,
      limit: 200
    }
  };

  const renderResourceCard = (title, used, total, unit = '') => (
    <Card style={styles.resourceCard}>
      <Card.Content>
        <Title>{title}</Title>
        <ProgressBar
          progress={used / total}
          color={used / total > 0.9 ? '#FF5252' : '#4CAF50'}
          style={styles.progressBar}
        />
        <Paragraph style={styles.resourceText}>
          {used} / {total} {unit}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Resource Usage</Title>
        {renderResourceCard('Storage', resources.storage.used, resources.storage.total, 'GB')}
        {renderResourceCard('Active Users', resources.users.active, resources.users.limit)}
        {renderResourceCard('Active Projects', resources.projects.active, resources.projects.limit)}
        {renderResourceCard('Monthly Surveys', resources.surveys.monthly, resources.surveys.limit)}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Resource Management</Title>
        <List.Section>
          <List.Item
            title="Storage Management"
            description="Manage storage allocation and cleanup"
            left={props => <List.Icon {...props} icon="folder" />}
            right={props => <Button mode="outlined">Manage</Button>}
          />
          <Divider />
          <List.Item
            title="User Licenses"
            description="Manage user license allocation"
            left={props => <List.Icon {...props} icon="account-group" />}
            right={props => <Button mode="outlined">Manage</Button>}
          />
          <Divider />
          <List.Item
            title="Project Quotas"
            description="Configure project limits and quotas"
            left={props => <List.Icon {...props} icon="clipboard-list" />}
            right={props => <Button mode="outlined">Manage</Button>}
          />
        </List.Section>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Usage Analytics</Title>
        <Card style={styles.analyticsCard}>
          <Card.Content>
            <List.Item
              title="Download Usage Report"
              left={props => <List.Icon {...props} icon="file-download" />}
              right={props => <Button mode="contained">Download</Button>}
            />
            <List.Item
              title="Configure Alerts"
              left={props => <List.Icon {...props} icon="bell" />}
              right={props => <Button mode="outlined">Configure</Button>}
            />
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  resourceCard: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    marginVertical: 8,
  },
  resourceText: {
    textAlign: 'right',
    marginTop: 4,
  },
  analyticsCard: {
    marginTop: 8,
  },
});

export default ResourceAllocationScreen;
