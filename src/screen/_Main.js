import React, { Fragment } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';

import { WebView } from 'react-native-webview';

const App = () => {
    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <StatusBar backgroundColor="blue" barStyle="dark-content" />
            <WebView style={{ width: '100%', height: 500 }} source={{ uri: 'https://google.com.vn' }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
});

export default App;
