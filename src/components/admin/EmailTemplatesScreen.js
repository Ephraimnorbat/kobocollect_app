import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, TextInput, Button, List, IconButton, Portal, Dialog } from 'react-native-paper';

const EmailTemplatesScreen = ({ navigation }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewDialog, setPreviewDialog] = useState(false);

  const templates = [
    {
      id: 1,
      name: 'Survey Completion',
      subject: 'Survey Completed Successfully',
      body: 'Dear {name},\n\nYour survey has been completed successfully.',
      variables: ['name', 'survey_title', 'date']
    },
    {
      id: 2,
      name: 'New User Welcome',
      subject: 'Welcome to KoboCollect',
      body: 'Welcome {name} to our platform!',
      variables: ['name', 'organization']
    }
  ];

  const renderTemplateCard = (template) => (
    <Card key={template.id} style={styles.card}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Title>{template.name}</Title>
          <View style={styles.actionButtons}>
            <IconButton 
              icon="eye" 
              onPress={() => {
                setSelectedTemplate(template);
                setPreviewDialog(true);
              }}
            />
            <IconButton 
              icon="pencil" 
              onPress={() => navigation.navigate('EditEmailTemplate', { templateId: template.id })}
            />
            <IconButton icon="delete" onPress={() => {}} />
          </View>
        </View>

        <TextInput
          label="Subject"
          value={template.subject}
          mode="outlined"
          disabled
          style={styles.input}
        />

        <List.Section>
          <List.Subheader>Available Variables</List.Subheader>
          <View style={styles.variablesContainer}>
            {template.variables.map((variable, index) => (
              <Button 
                key={index}
                mode="outlined" 
                style={styles.variableButton}
              >
                {`{${variable}}`}
              </Button>
            ))}
          </View>
        </List.Section>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {templates.map(template => renderTemplateCard(template))}
      </ScrollView>

      <Button 
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('CreateEmailTemplate')}
        style={styles.addButton}
      >
        Create New Template
      </Button>

      <Portal>
        <Dialog
          visible={previewDialog}
          onDismiss={() => setPreviewDialog(false)}
        >
          <Dialog.Title>Template Preview</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Subject"
              value={selectedTemplate?.subject}
              mode="outlined"
              disabled
              style={styles.previewInput}
            />
            <TextInput
              label="Body"
              value={selectedTemplate?.body}
              mode="outlined"
              multiline
              numberOfLines={6}
              disabled
              style={styles.previewInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPreviewDialog(false)}>Close</Button>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  input: {
    marginVertical: 8,
  },
  variablesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  variableButton: {
    margin: 4,
  },
  addButton: {
    margin: 16,
    padding: 8,
  },
  previewInput: {
    marginBottom: 16,
  }
});

export default EmailTemplatesScreen;
