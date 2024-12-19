import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List, Searchbar, Card, Title, Button, Portal, Dialog, Paragraph } from 'react-native-paper';

const HelpScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactDialog, setContactDialog] = useState(false);

  const faqCategories = [
    {
      title: 'Getting Started',
      items: [
        {
          question: 'How do I start a new survey?',
          answer: 'Navigate to the Surveys tab, select an available survey, and tap "Start Survey". Follow the on-screen instructions to complete each question.'
        },
        {
          question: 'How do I save my progress?',
          answer: 'Your progress is automatically saved as you complete each question. You can resume from where you left off at any time.'
        }
      ]
    },
    {
      title: 'Survey Submissions',
      items: [
        {
          question: 'How do I check my submission status?',
          answer: 'Go to the Submissions tab to view all your submitted surveys and their current status.'
        },
        {
          question: 'Can I edit a submitted survey?',
          answer: 'Once submitted, surveys cannot be edited. Contact your supervisor if changes are needed.'
        }
      ]
    },
    {
      title: 'Technical Support',
      items: [
        {
          question: 'How do I update the app?',
          answer: 'Updates are automatically downloaded. Just ensure you have a stable internet connection.'
        },
        {
          question: 'What do I do if the app crashes?',
          answer: 'Close the app completely and restart it. If the issue persists, contact technical support.'
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search help topics..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <ScrollView>
        <Card style={styles.contactCard}>
          <Card.Content>
            <Title>Need Direct Support?</Title>
            <Button 
              mode="contained"
              icon="headset"
              onPress={() => setContactDialog(true)}
              style={styles.contactButton}
            >
              Contact Support Team
            </Button>
          </Card.Content>
        </Card>

        {faqCategories.map((category, index) => (
          <List.Accordion
            key={index}
            title={category.title}
            left={props => <List.Icon {...props} icon="help-circle" />}
          >
            {category.items.map((item, itemIndex) => (
              <List.Item
                key={itemIndex}
                title={item.question}
                description={item.answer}
                descriptionNumberOfLines={3}
                descriptionStyle={styles.answer}
              />
            ))}
          </List.Accordion>
        ))}

        <Card style={styles.resourcesCard}>
          <Card.Content>
            <Title>Additional Resources</Title>
            <Button 
              mode="outlined"
              icon="book-open-variant"
              onPress={() => {}}
              style={styles.resourceButton}
            >
              User Guide
            </Button>
            <Button 
              mode="outlined"
              icon="video"
              onPress={() => {}}
              style={styles.resourceButton}
            >
              Video Tutorials
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Portal>
        <Dialog
          visible={contactDialog}
          onDismiss={() => setContactDialog(false)}
        >
          <Dialog.Title>Contact Support</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Support Hours: 24/7</Paragraph>
            <Paragraph>Email: support@surveyapp.com</Paragraph>
            <Paragraph>Phone: +1 (555) 123-4567</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setContactDialog(false)}>Close</Button>
            <Button onPress={() => {}}>Send Email</Button>
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
  searchBar: {
    margin: 16,
  },
  contactCard: {
    margin: 16,
    marginTop: 8,
  },
  contactButton: {
    marginTop: 8,
  },
  answer: {
    fontSize: 14,
    marginTop: 4,
  },
  resourcesCard: {
    margin: 16,
  },
  resourceButton: {
    marginTop: 8,
  }
});

export default HelpScreen;
