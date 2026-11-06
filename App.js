import './global.css';
import './src/config/nativewindInterop';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DarkCameraScreen } from './src/screens/camera/DarkCameraScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <DarkCameraScreen />
    </SafeAreaProvider>
  );
}
