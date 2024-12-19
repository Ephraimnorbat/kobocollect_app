import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, Menu, Portal, Modal } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

const FilePreviewScreen = ({ route, navigation }) => {
  const { file } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const renderPreview = () => {
    switch (file.type) {
      case 'image':
        return (
          <Card style={styles.previewCard}>
            <Card.Cover source={{ uri: file.uri }} style={styles.imagePreview} />
          </Card>
        );
      case 'pdf':
        return (
          <WebView
            source={{ uri: file.uri }}
            style={styles.documentPreview}
          />
        );
      default:
        return (
          <Card style={styles.previewCard}>
            <Card.Content>
              <Title>Preview not available</Title>
              <Paragraph>This file type cannot be previewed</Paragraph>
            </Card.Content>
          </Card>
        );
    }
  };

  const renderFileDetails = () => (
    <Card style={styles.detailsCard}>
      <Card.Content>
        <Title>File Details</Title>
        <View style={styles.detailRow}>
          <Paragraph style={styles.detailLabel}>Name:</Paragraph>
          <Paragraph>{file.name}</Paragraph>
        </View>
        <View style={styles.detailRow}>
          <Paragraph style={styles.detailLabel}>Type:</Paragraph>
          <Paragraph>{file.type}</Paragraph>
        </View>
        <View style={styles.detailRow}>
          <Paragraph style={styles.detailLabel}>Size:</Paragraph>
          <Paragraph>{(file.size / 1024 / 1024).toFixed(2)} MB</Paragraph>
        </View>
        <View style={styles.detailRow}>
          <Paragraph style={styles.detailLabel}>Modified:</Paragraph>
          <Paragraph>{file.lastModified}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={file.name} />
        <Appbar.Action icon="share" onPress={() => setShareModal(true)} />
        <Appbar.Action icon="dots-vertical" onPress={() => setMenuVisible(true)} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        {renderPreview()}
        {renderFileDetails()}
      </ScrollView>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={<View />}
      >
        <Menu.Item onPress={() => {}} title="Download" />
        <Menu.Item onPress={() => {}} title="Move" />
        <Menu.Item onPress={() => {}} title="Rename" />
        <Menu.Item onPress={() => {}} title="Delete" />
      </Menu>

      <Portal>
        <Modal
          visible={shareModal}
          onDismiss={() => setShareModal(false)}
          contentContainerStyle={styles.modal}
        >
          <Title>Share File</Title>
          <View style={styles.shareOptions}>
            <Button icon="email" mode="outlined" onPress={() => {}}>
              Email
            </Button>
            <Button icon="link" mode="outlined" onPress={() => {}}>
              Copy Link
            </Button>
            <Button icon="qrcode" mode="outlined" onPress={() => {}}>
              QR Code
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  previewCard: {
    margin: 16,
  },
  imagePreview: {
    height: 300,
    resizeMode: 'contain',
  },
  documentPreview: {
    height: Dimensions.get('window').height * 0.6,
    margin: 16,
  },
  detailsCard: {
    margin: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 8,
    width: 80,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  shareOptions: {
    marginTop: 16,
    gap: 12,
  },
});

export default FilePreviewScreen;
