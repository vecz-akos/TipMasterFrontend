import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { expo } from './app.json';
import App from './src/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AxiosProvider } from './src/context/AxiosContext';
import { AuthProvider } from './src/context/AuthContext';

const appName = expo.name;

export default function Main() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <App />
          </PaperProvider>
        </SafeAreaProvider>
      </AxiosProvider>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
