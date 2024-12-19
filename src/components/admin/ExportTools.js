import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Portal, Modal, List } from 'react-native-paper';

const ExportTools = () => {
  const [visible, setVisible] = useState(false);

  const exportData = (format) => {
    // Implementation for different export formats
    setVisible(false);
  };

  return (
    <>
      <Button 
        icon="export" 
        mode="contained" 
        onPress={() => setVisible(true)}
        style={styles.exportButton}
      >
        Export Data
      </Button>

      <Portal>
        <Modal 
          visible={visible} 
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <List.Section>
            <List.Subheader>Choose Export Format</List.Subheader>
            <List.Item 
              title="Export as CSV"
              left={props => <List.Icon {...props} icon="file-delimited" />}
              onPress={() => exportData('csv')}
            />
            <List.Item 
              title="Export as Excel"
              left={props => <List.Icon {...props} icon="microsoft-excel" />}
              onPress={() => exportData('excel')}
            />
            <List.Item 
              title="Export as PDF"
              left={props => <List.Icon {...props} icon="file-pdf" />}
              onPress={() => exportData('pdf')}
            />
          </List.Section>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  exportButton: {
    margin: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});

export default ExportTools;
