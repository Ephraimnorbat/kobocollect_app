import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, SegmentedButtons, List, DataTable } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';

const MediaAnalyticsScreen = () => {
  const [timeRange, setTimeRange] = useState('week');

  const usageData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43, 50]
    }]
  };

  const fileTypeData = [
    { name: 'Images', count: 450, color: '#FF6384' },
    { name: 'Documents', count: 280, color: '#36A2EB' },
    { name: 'Videos', count: 120, color: '#FFCE56' }
  ];

  return (
    <ScrollView style={styles.container}>
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

      <Card style={styles.card}>
        <Card.Content>
          <Title>Storage Usage Trends</Title>
          <LineChart
            data={usageData}
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
          <Title>File Type Distribution</Title>
          <PieChart
            data={fileTypeData}
            width={350}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
            }}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Top Accessed Files</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>File Name</DataTable.Title>
              <DataTable.Title numeric>Views</DataTable.Title>
              <DataTable.Title numeric>Downloads</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>survey_form.pdf</DataTable.Cell>
              <DataTable.Cell numeric>245</DataTable.Cell>
              <DataTable.Cell numeric>123</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>field_photos.zip</DataTable.Cell>
              <DataTable.Cell numeric>180</DataTable.Cell>
              <DataTable.Cell numeric>95</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Performance Metrics</Title>
          <List.Item
            title="Average Upload Speed"
            description="2.5 MB/s"
            left={props => <List.Icon {...props} icon="upload" />}
          />
          <List.Item
            title="Average Download Speed"
            description="4.8 MB/s"
            left={props => <List.Icon {...props} icon="download" />}
          />
          <List.Item
            title="Cache Hit Rate"
            description="85%"
            left={props => <List.Icon {...props} icon="database" />}
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
  timeSelector: {
    margin: 16,
  },
  card: {
    margin: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});

export default MediaAnalyticsScreen;
