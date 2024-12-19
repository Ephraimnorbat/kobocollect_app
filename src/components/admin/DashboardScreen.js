import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import DashboardHeader from '../../components/admin/DashboardHeader';
import QuickActions from '../../components/admin/QuickActions';
import DataFilter from '../../components/admin/DataFilter';
import ExportTools from '../../components/admin/ExportTools';
import SettingsPanel from '../../components/admin/SettingsPanel';
import { Card, Title, Surface, Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const DashboardScreen = ({ navigation }) => {
  const [showSettings, setShowSettings] = React.useState(false);

  const metrics = {
    totalSurveys: 156,
    activeProjects: 12,
    pendingSubmissions: 45,
    totalUsers: 234
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43]
    }]
  };

  if (showSettings) {
    return <SettingsPanel onClose={() => setShowSettings(false)} />;
  }

  return (
    <View style={styles.mainContainer}>
      <DashboardHeader 
        navigation={navigation} 
        onSettingsPress={() => setShowSettings(true)}
      />
      
      <ScrollView style={styles.container}>
        <QuickActions navigation={navigation} />
        <DataFilter onFilter={(filters) => console.log(filters)} />
        
        {/* Stats Overview */}
        <View style={styles.statsGrid}>
          <Surface style={styles.statCard}>
            <Title style={styles.statNumber}>{metrics.totalSurveys}</Title>
            <Text style={styles.statLabel}>Total Surveys</Text>
          </Surface>
          
          <Surface style={styles.statCard}>
            <Title style={styles.statNumber}>{metrics.activeProjects}</Title>
            <Text style={styles.statLabel}>Active Projects</Text>
          </Surface>
          
          <Surface style={styles.statCard}>
            <Title style={styles.statNumber}>{metrics.pendingSubmissions}</Title>
            <Text style={styles.statLabel}>Pending</Text>
          </Surface>
          
          <Surface style={styles.statCard}>
            <Title style={styles.statNumber}>{metrics.totalUsers}</Title>
            <Text style={styles.statLabel}>Users</Text>
          </Surface>
        </View>

        {/* Submissions Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title>Submissions Overview</Title>
            <LineChart
              data={chartData}
              width={340}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              }}
              bezier
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        <ExportTools />

        {/* Recent Activity */}
        <Card style={styles.activityCard}>
          <Card.Content>
            <Title>Recent Activity</Title>
            <View style={styles.activityItem}>
              <Text>New survey submission - Health Survey</Text>
              <Text style={styles.timeStamp}>2 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Text>Project "Education Assessment" created</Text>
              <Text style={styles.timeStamp}>5 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Text>New user registration: John Doe</Text>
              <Text style={styles.timeStamp}>1 day ago</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  statLabel: {
    color: '#666666',
    marginTop: 4,
  },
  chartCard: {
    margin: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  activityCard: {
    margin: 16,
  },
  activityItem: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: 8,
  },
  timeStamp: {
    color: '#666666',
    fontSize: 12,
    marginTop: 4,
  },
});

export default DashboardScreen;
