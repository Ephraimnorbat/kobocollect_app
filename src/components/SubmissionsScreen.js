import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';

const SubmissionsScreen = () => {
  const submissions = [
    { id: 1, surveyName: 'Health Survey', date: '2023-07-01', status: 'Completed' },
    { id: 2, surveyName: 'Education Survey', date: '2023-07-02', status: 'Pending' },
  ];

  const renderSubmissionItem = ({ item }) => (
    <List.Item
      title={item.surveyName}
      description={`Submitted: ${item.date}`}
      right={props => <List.Icon {...props} icon="chevron-right" />}
      left={props => (
        <List.Icon
          {...props}
          icon={item.status === 'Completed' ? 'check-circle' : 'clock'}
        />
      )}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={submissions}
        renderItem={renderSubmissionItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SubmissionsScreen;
