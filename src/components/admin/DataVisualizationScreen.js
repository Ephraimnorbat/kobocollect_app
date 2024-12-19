import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, SegmentedButtons, Button, Menu, List } from 'react-native-paper';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const DataVisualizationScreen = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [dataType, setDataType] = useState('responses');
  const [menuVisible, setMenuVisible] = useState(false);

  const chartData = {
    responses: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{ data: [20, 45, 28, 80, 99, 43, 50] }]
    },
    completion: {
      data: [
        { name: 'Completed', population: 75, color: 'green' },
        { name: 'Pending', population: 25, color: 'orange' }
      ]
    },
    performance: {
      labels: ["Team A", "Team B", "Team C", "Team D"],
      datasets: [{ data: [85, 66, 78, 90] }]
    }
  };

  const exportData = (format) => {
    setMenuVisible(false);
    // Export logic here
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.headerRow}>
              <Title>Analytics Dashboard</Title>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Button onPress={() => setMenuVisible(true)}>Export</Button>
                }
              >
                <Menu.Item onPress={() => exportData('pdf')} title="PDF" />
                <Menu.Item onPress={() => exportData('csv')} title="CSV" />
                <Menu.Item onPress={() => exportData('excel')} title="Excel" />
              </Menu>
            </View>

            <SegmentedButtons
              value={timeRange}
              onValueChange={setTimeRange}
              buttons={[
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
                { value: 'year', label: 'Year' }
              ]}
              style={styles.segmentedButtons}
            />

            {dataType === 'responses' && (
              <LineChart
                data={chartData.responses}
                width={Dimensions.get('window').width - 64}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 100, 200, ${opacity})`
                }}
                bezier
                style={styles.chart}
              />
            )}

            {dataType === 'completion' && (
              <PieChart
                data={chartData.completion}
                width={Dimensions.get('window').width - 64}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            )}

            {dataType === 'performance' && (
              <BarChart
                data={chartData.performance}
                width={Dimensions.get('window').width - 64}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 150, 100, ${opacity})`
                }}
                style={styles.chart}
              />
            )}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <List.Section>
              <List.Subheader>Quick Metrics</List.Subheader>
              <List.Item
                title="Total Responses"
                description="1,234"
                left={props => <List.Icon {...props} icon="poll" />}
              />
              <List.Item
                title="Completion Rate"
                description="75%"
                left={props => <List.Icon {...props} icon="check-circle" />}
              />
              <List.Item
                title="Active Teams"
                description="4"
                left={props => <List.Icon {...props} icon="account-group" />}
              />
            </List.Section>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  segmentedButtons: {
    marginVertical: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});

export default DataVisualizationScreen;
