import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, List, Button, Chip, Portal, Dialog, DataTable } from 'react-native-paper';

const SubmissionDetailScreen = ({ navigation }) => {
  const [exportDialog, setExportDialog] = useState(false);

  const submissionData = {
    id: 'SUB-2023-001',
    surveyTitle: 'Artisanal Mining Survey 2023',
    submittedBy: 'John Doe',
    submissionDate: '2023-07-20 14:30',
    status: 'completed',
    location: {
      district: 'District A',
      coordinates: '34.0522° N, 118.2437° W'
    },
    responses: [
      {
        question: 'How many households were surveyed?',
        answer: '25',
        type: 'numeric'
      },
      {
        question: 'What is the primary health concern?',
        answer: 'Access to clean water',
        type: 'text'
      },
      {
        question: 'Are medical facilities easily accessible?',
        answer: 'No',
        type: 'boolean'
      }
    ],
    attachments: [
      { id: 1, name: 'site_photo.jpg', type: 'image' },
      { id: 2, name: 'field_notes.pdf', type: 'document' }
    ],
    validationStatus: {
      dataQuality: 'high',
      completeness: '100%',
      accuracy: '95%'
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: '#4CAF50',
      pending: '#FFC107',
      rejected: '#FF5252'
    };
    return colors[status] || '#757575';
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Title>{submissionData.surveyTitle}</Title>
            <Chip 
              style={[styles.statusChip, { backgroundColor: getStatusColor(submissionData.status) }]}
            >
              {submissionData.status.toUpperCase()}
            </Chip>
          </View>

          <List.Section>
            <List.Item
              title="Submitted By"
              description={submissionData.submittedBy}
              left={props => <List.Icon {...props} icon="account" />}
            />
            <List.Item
              title="Submission Date"
              description={submissionData.submissionDate}
              left={props => <List.Icon {...props} icon="calendar" />}
            />
            <List.Item
              title="Location"
              description={`${submissionData.location.district}\n${submissionData.location.coordinates}`}
              left={props => <List.Icon {...props} icon="map-marker" />}
            />
          </List.Section>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Validation Status</Title>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>Data Quality</DataTable.Cell>
              <DataTable.Cell>{submissionData.validationStatus.dataQuality}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Completeness</DataTable.Cell>
              <DataTable.Cell>{submissionData.validationStatus.completeness}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Accuracy</DataTable.Cell>
              <DataTable.Cell>{submissionData.validationStatus.accuracy}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Responses</Title>
          {submissionData.responses.map((response, index) => (
            <List.Item
              key={index}
              title={response.question}
              description={response.answer}
              right={() => (
                <Chip mode="outlined">{response.type}</Chip>
              )}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Attachments</Title>
          {submissionData.attachments.map((attachment) => (
            <List.Item
              key={attachment.id}
              title={attachment.name}
              left={props => (
                <List.Icon 
                  {...props} 
                  icon={attachment.type === 'image' ? 'image' : 'file-document'} 
                />
              )}
              right={() => (
                <Button mode="text" icon="download">Download</Button>
              )}
            />
          ))}
        </Card.Content>
      </Card>

      <View style={styles.actionButtons}>
        <Button 
          mode="contained"
          icon="export"
          onPress={() => setExportDialog(true)}
          style={styles.button}
        >
          Export Data
        </Button>
        <Button 
          mode="outlined"
          icon="printer"
          onPress={() => {}}
          style={styles.button}
        >
          Generate Report
        </Button>
      </View>

      <Portal>
        <Dialog visible={exportDialog} onDismiss={() => setExportDialog(false)}>
          <Dialog.Title>Export Submission Data</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title="Export as CSV"
              left={props => <List.Icon {...props} icon="file-delimited" />}
              onPress={() => {}}
            />
            <List.Item
              title="Export as PDF"
              left={props => <List.Icon {...props} icon="file-pdf-box" />}
              onPress={() => {}}
            />
            <List.Item
              title="Export as Excel"
              left={props => <List.Icon {...props} icon="microsoft-excel" />}
              onPress={() => {}}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setExportDialog(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusChip: {
    marginLeft: 8,
  },
  actionButtons: {
    padding: 16,
  },
  button: {
    marginVertical: 8,
  }
});

export default SubmissionDetailScreen;
