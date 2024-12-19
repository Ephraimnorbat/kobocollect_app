import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { IconButton, FAB, Portal, Modal, Title, Text, Button } from 'react-native-paper';

const CameraCaptureScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
        exif: true
      });
      setCapturedImage(photo);
      setPreviewVisible(true);
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const savePhoto = () => {
    navigation.navigate('MediaLibrary', { newImage: capturedImage });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!previewVisible ? (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          flashMode={flash}
        >
          <View style={styles.controlsContainer}>
            <IconButton
              icon="camera-flip"
              size={30}
              color="white"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
            <IconButton
              icon={flash === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'}
              size={30}
              color="white"
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>

          <FAB
            style={styles.captureButton}
            icon="camera"
            onPress={takePicture}
          />
        </Camera>
      ) : (
        <Portal>
          <Modal
            visible={previewVisible}
            onDismiss={retakePicture}
            contentContainerStyle={styles.previewModal}
          >
            <Title>Preview Photo</Title>
            <Image
              source={{ uri: capturedImage?.uri }}
              style={styles.previewImage}
            />
            <View style={styles.previewButtons}>
              <Button mode="outlined" onPress={retakePicture}>
                Retake
              </Button>
              <Button mode="contained" onPress={savePhoto}>
                Save Photo
              </Button>
            </View>
          </Modal>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  previewModal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  previewImage: {
    width: '100%',
    height: 300,
    marginVertical: 20,
    borderRadius: 8,
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default CameraCaptureScreen;
