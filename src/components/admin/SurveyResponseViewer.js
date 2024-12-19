import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, DataTable, Button, Searchbar, Menu, Text, Portal, Modal } from 'react-native-paper';
import { BarChart, PieChart } from 'react-native-chart-kit';

const SurveyResponseViewer = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const responses = [
    {
      id: 1,
      respondent: "John Doe",
      date: "2023-07-20",
      completionTime: "15 mins",
      status: "complete"
    },
    {
      id: 2,
      respondent: "Jane Smith",
      date: "2023-07-19",
      completionTime: "12 mins",
      status: "complete"
    }
  ];

  const analyticsData = {
    responseRate: {
      labels: ["Complete", "Incomplete"],
      data: [85, 15]
    },
    completionTime: {
      labels: ["0-5min", "5-10min", "10-15min", "15+min"],
      datasets: [{
        data: [20, 45, 28, 7]
      }]
    }
  };

  const renderAnalytics = () => (
    <Card style={styles.analyticsCard}>
      <Card.Content>
        <Title>Response Analytics</Title>
        
        <View style={styles.chartContainer}>
          <Title style={styles.chartTitle}>Response Rate</Title>
          <PieChart
            data={[
              {
                name: 'Complete',
                population: 85,
                color: '#4CAF50',
                legendFontColor: '#7F7F7F',
              },
              {
                name: 'Incomplete',
                population: 15,
                color: '#FFA000',
                legendFontColor: '#7F7F7F',
              },
            ]}
            width={300}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
          />
        </View>

        <View style={styles.chartContainer}>
          <Title style={styles.chartTitle}>Completion Time Distribution</Title>
          <BarChart
            data={analyticsData.completionTime}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            }}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search responses..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <Button 
          mode="contained" 
          icon="chart-bar" 
          onPress={() => setShowAnalytics(!showAnalytics)}
          style={styles.analyticsButton}
        >
          {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
        </Button>
      </View>

      <ScrollView style={styles.content}>
        {showAnalytics && renderAnalytics()}

        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>Respondent</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Time</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
          </DataTable.Header>

          {responses.map(response => (
            <DataTable.Row 
              key={response.id}
              onPress={() => setSelectedResponse(response)}
            >
              <DataTable.Cell>{response.respondent}</DataTable.Cell>
              <DataTable.Cell>{response.date}</DataTable.Cell>
              <DataTable.Cell>{response.completionTime}</DataTable.Cell>
              <DataTable.Cell>{response.status}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

      <Portal>
        <Modal
          visible={selectedResponse !== null}
          onDismiss={() => setSelectedResponse(null)}
          contentContainerStyle={styles.modal}
        >
          <Title>Response Details</Title>
          {selectedResponse && (
            <View>
              <Text style={styles.modalText}>Respondent: {selectedResponse.respondent}</Text>
              <Text style={styles.modalText}>Date: {selectedResponse.date}</Text>
              <Text style={styles.modalText}>Completion Time: {selectedResponse.completionTime}</Text>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('ResponseDetail', { responseId: selectedResponse.id })}
              >
                View Full Response
              </Button>
            </View>
          )}
        </Modal>
      </Portal>

      <View style={styles.footer}>
        <Button 
          mode="contained" 
          icon="export" 
          onPress={() => {}}
          style={styles.exportButton}
        >
          Export Responses
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  searchBar: {
    marginBottom: 12,
  },
  analyticsButton: {
    marginTop: 8,
  },
  content: {
    flex: 1,
  },
  analyticsCard: {
    margin: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  chartTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  dataTable: {
    backgroundColor: '#ffffff',
    margin: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalText: {
    marginVertical: 8,
    fontSize: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  exportButton: {
    marginTop: 8,
  },
});

export default SurveyResponseViewer;
