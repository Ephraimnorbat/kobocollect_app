import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, List, Button, Chip, Portal, Dialog, TextInput, SegmentedButtons } from 'react-native-paper';

const CustomReportBuilderScreen = () => {
  const [reportType, setReportType] = useState('survey');
  const [selectedFields, setSelectedFields] = useState([]);
  const [saveDialog, setSaveDialog] = useState(false);

  const availableFields = {
    survey: [
      { id: 1, name: 'Response Count', type: 'numeric' },
      { id: 2, name: 'Completion Rate', type: 'percentage' },
      { id: 3, name: 'Average Time', type: 'time' },
      { id: 4, name: 'Location Data', type: 'geo' }
    ],
    user: [
      { id: 5, name: 'Active Users', type: 'numeric' },
      { id: 6, name: 'User Activity', type: 'chart' },
      { id: 7, name: 'Team Distribution', type: 'pie' }
    ]
  };

  const toggleField = (field) => {
    if (selectedFields.find(f => f.id === field.id)) {
      setSelectedFields(selectedFields.filter(f => f.id !== field.id));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Report Configuration</Title>
            <SegmentedButtons
              value={reportType}
              onValueChange={setReportType}
              buttons={[
                { value: 'survey', label: 'Survey Data' },
                { value: 'user', label: 'User Analytics' }
              ]}
              style={styles.segmentedButtons}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Selected Fields</Title>
            <View style={styles.chipContainer}>
              {selectedFields.map(field => (
                <Chip
                  key={field.id}
                  onClose={() => toggleField(field)}
                  style={styles.chip}
                >
                  {field.name}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Available Fields</Title>
            <List.Section>
              {availableFields[reportType].map(field => (
                <List.Item
                  key={field.id}
                  title={field.name}
                  description={`Type: ${field.type}`}
                  right={() => (
                    <Button
                      mode={selectedFields.find(f => f.id === field.id) ? "contained" : "outlined"}
                      onPress={() => toggleField(field)}
                    >
                      {selectedFields.find(f => f.id === field.id) ? "Selected" : "Add"}
                    </Button>
                  )}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained"
          onPress={() => setSaveDialog(true)}
          style={styles.button}
          disabled={selectedFields.length === 0}
        >
          Generate Report
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={saveDialog}
          onDismiss={() => setSaveDialog(false)}
        >
          <Dialog.Title>Save Report</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Report Name"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Description"
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSaveDialog(false)}>Cancel</Button>
            <Button onPress={() => setSaveDialog(false)}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  segmentedButtons: {
    marginTop: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    margin: 4,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    padding: 8,
  },
  input: {
    marginBottom: 16,
  }
});

export default CustomReportBuilderScreen;
