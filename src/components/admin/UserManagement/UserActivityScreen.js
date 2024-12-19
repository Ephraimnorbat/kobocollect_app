import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Chip, DataTable, SegmentedButtons } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const UserActivityScreen = ({ route }) => {
  const { userId } = route.params;
  const [timeRange, setTimeRange] = useState('week');

  const activityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      data: [5, 8, 12, 3, 9, 2, 7]
    }]
  };

  const recentActivities = [
    {
      id: 1,
      type: 'survey',
      action: 'Created new survey',
      target: 'Field Survey 2023',
      timestamp: '2023-07-20 14:30'
    },
    {
      id: 2,
      type: 'response',
      action: 'Exported responses',
      target: 'Monthly Report',
      timestamp: '2023-07-20 11:15'
    },
    {
      id: 3,
      type: 'media',
      action: 'Uploaded files',
      target: 'Survey Photos',
      timestamp: '2023-07-19 16:45'
    }
  ];

  const stats = {
    surveysCreated: 15,
    responsesCollected: 234,
    filesUploaded: 45,
    reportsGenerated: 8
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Activity Overview</Title>
          <SegmentedButtons
            value={timeRange}
            onValueChange={setTimeRange}
            buttons={[
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'year', label: 'Year' }
            ]}
            style={styles.timeSelector}
          />
          <LineChart
            data={activityData}
            width={350}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Activity Stats</Title>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Title>{stats.surveysCreated}</Title>
              <Paragraph>Surveys Created</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title>{stats.responsesCollected}</Title>
              <Paragraph>Responses</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title>{stats.filesUploaded}</Title>
              <Paragraph>Files Uploaded</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title>{stats.reportsGenerated}</Title>
              <Paragraph>Reports</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Recent Activities</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Action</DataTable.Title>
              <DataTable.Title>Target</DataTable.Title>
              <DataTable.Title>Time</DataTable.Title>
            </DataTable.Header>

            {recentActivities.map(activity => (
              <DataTable.Row key={activity.id}>
                <DataTable.Cell>
                  <Chip icon={
                    activity.type === 'survey' ? 'file-document' :
                    activity.type === 'response' ? 'database' : 'folder'
                  }>
                    {activity.action}
                  </Chip>
                </DataTable.Cell>
                <DataTable.Cell>{activity.target}</DataTable.Cell>
                <DataTable.Cell>{activity.timestamp}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
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
  },
  timeSelector: {
    marginVertical: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  }
});

export default UserActivityScreen;
