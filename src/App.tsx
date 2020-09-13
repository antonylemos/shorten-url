import React from 'react';
import { StatusBar, View } from 'react-native';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#222831" />
    <View style={{ flex: 1, backgroundColor: '#222831' }} />
  </>
);

export default App;
