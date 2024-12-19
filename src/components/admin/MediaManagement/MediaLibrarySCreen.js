import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton, Searchbar, Chip, Menu, FAB, Portal, Modal } from 'react-native-paper';

const MediaLibraryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const mediaFiles = [
    {
      id: 1,
      name: 'Survey Photos Collection',
      type: 'folder',
      items: 24,
      size: '256MB',
      lastModified: '2023-07-20'
    },
    {
      id: 2,
      name: 'field_survey_123.jpg',
      type: 'image',
      size: '2.4MB',
      dimensions: '1920x1080',
      lastModified: '2023-07-19'
    },
    {
      id: 3,
      name: 'survey_responses.pdf',
      type: 'document',
      size: '1.2MB',
      lastModified: '2023-07-18'
    }
  ];

  const renderMediaCard = (media) => (
    <Card key={media.id} style={styles.mediaCard}>
      <Card.Content>
        <View style={styles.mediaHeader}>
          <View style={styles.mediaInfo}>
            <IconButton
              icon={
                media.type === 'folder' ? 'folder' :
                media.type === 'image' ? 'image' :
                'file-document'
              }
              size={24}
            />
            <View>
              <Title>{media.name}</Title>
              <Paragraph>{media.size}</Paragraph>
            </View>
          </View>
          <IconButton
            icon="dots-vertical"
            onPress={() => {
              setSelectedMedia(media);
              setMenuVisible(true);
            }}
          />
        </View>

        <View style={styles.mediaDetails}>
          <Chip style={styles.chip}>{media.type}</Chip>
          <Paragraph>Modified: {media.lastModified}</Paragraph>
          {media.type === 'folder' && (
            <Paragraph>{media.items} items</Paragraph>
          )}
          {media.type === 'image' && (
            <Paragraph>{media.dimensions}</Paragraph>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search media files..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip 
            selected={selectedFilter === 'all'}
            onPress={() => setSelectedFilter('all')}
            style={styles.filterChip}
          >
            All Files
          </Chip>
          <Chip 
            selected={selectedFilter === 'images'}
            onPress={() => setSelectedFilter('images')}
            style={styles.filterChip}
          >
            Images
          </Chip>
          <Chip 
            selected={selectedFilter === 'documents'}
            onPress={() => setSelectedFilter('documents')}
            style={styles.filterChip}
          >
            Documents
          </Chip>
          <Chip 
            selected={selectedFilter === 'folders'}
            onPress={() => setSelectedFilter('folders')}
            style={styles.filterChip}
          >
            Folders
          </Chip>
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {mediaFiles.map(media => renderMediaCard(media))}
      </ScrollView>

      <Portal>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<View />}
        >
          <Menu.Item onPress={() => {}} title="Download" />
          <Menu.Item onPress={() => {}} title="Share" />
          <Menu.Item onPress={() => {}} title="Rename" />
          <Menu.Item onPress={() => {}} title="Move" />
          <Menu.Item onPress={() => {}} title="Delete" />
        </Menu>
      </Portal>

      <FAB.Group
        open={false}
        icon="plus"
        actions={[
          {
            icon: 'folder-plus',
            label: 'New Folder',
            onPress: () => navigation.navigate('CreateFolder'),
          },
          {
            icon: 'upload',
            label: 'Upload Files',
            onPress: () => navigation.navigate('UploadFiles'),
          },
          {
            icon: 'camera',
            label: 'Take Photo',
            onPress: () => navigation.navigate('CameraCapture'),
          },
        ]}
        onStateChange={() => {}}
        style={styles.fab}
      />
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
  filterChip: {
    marginRight: 8,
  },
  content: {
    padding: 16,
  },
  mediaCard: {
    marginBottom: 16,
  },
  mediaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mediaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  chip: {
    marginRight: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default MediaLibraryScreen;
