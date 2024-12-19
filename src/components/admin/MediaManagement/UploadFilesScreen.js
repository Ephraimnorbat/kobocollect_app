import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Button, ProgressBar, List, IconButton, Text, Portal, Modal } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

const UploadFilesScreen = ({ navigation }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const pickFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      multiple: true
    });

    if (result.type === 'success') {
      setSelectedFiles([...selectedFiles, result]);
    }
  };

  const startUpload = () => {
    setUploading(true);
    // Simulate upload progress
    selectedFiles.forEach((file, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.1;
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: progress
        }));
        if (progress >= 1) {
          clearInterval(interval);
          if (index === selectedFiles.length - 1) {
            setUploading(false);
            navigation.goBack();
          }
        }
      }, 500);
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.uploadArea}>
        <Card.Content>
          <Title style={styles.title}>Upload Files</Title>
          <Button 
            mode="outlined" 
            icon="file-plus" 
            onPress={pickFiles}
            style={styles.selectButton}
          >
            Select Files
          </Button>
        </Card.Content>
      </Card>

      <ScrollView style={styles.fileList}>
        {selectedFiles.map((file, index) => (
          <Card key={index} style={styles.fileCard}>
            <Card.Content>
              <View style={styles.fileHeader}>
                <View style={styles.fileInfo}>
                  <IconButton icon="file" size={24} />
                  <View>
                    <Text>{file.name}</Text>
                    <Text style={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</Text>
                  </View>
                </View>
                <IconButton 
                  icon="close" 
                  onPress={() => {
                    setSelectedFiles(files => files.filter((_, i) => i !== index));
                  }}
                />
              </View>
              {uploading && uploadProgress[file.name] && (
                <View style={styles.progressContainer}>
                  <ProgressBar 
                    progress={uploadProgress[file.name]} 
                    style={styles.progressBar}
                  />
                  <Text>{Math.round(uploadProgress[file.name] * 100)}%</Text>
                </View>
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {selectedFiles.length > 0 && (
        <View style={styles.footer}>
          <Button 
            mode="contained" 
            onPress={startUpload}
            loading={uploading}
            disabled={uploading}
            style={styles.uploadButton}
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  uploadArea: {
    margin: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  selectButton: {
    marginVertical: 16,
  },
  fileList: {
    flex: 1,
    padding: 16,
  },
  fileCard: {
    marginBottom: 8,
  },
  fileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileSize: {
    fontSize: 12,
    color: '#666666',
  },
  progressContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
  },
  footer: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  uploadButton: {
    marginVertical: 8,
  },
});

export default UploadFilesScreen;
