import React, { Fragment } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Text } from 'react-native';

import { WebView } from 'react-native-webview';
import Swiper from 'react-native-swiper';

const App = () => {
    //return (
    //    <Swiper style={styles.wrapper} showsButtons={false}>
    //        <View style={styles.slide1}>
    //            <Text style={styles.text}>Hello Swiper</Text>
    //        </View>
    //        <View style={styles.slide2}>
    //            <Text style={styles.text}>Beautiful</Text>
    //        </View>
    //        <View style={styles.slide3}>
    //            <Text style={styles.text}>And simple</Text>
    //        </View>
    //    </Swiper>
    //);

    //return (
    //    <SafeAreaView style={{ width: '100%', height: '100%' }}>
    //        <StatusBar backgroundColor="blue" barStyle="dark-content" />
    //        <WebView style={{ width: '100%', height: 500 }} source={{ uri: 'https://google.com.vn' }} />
    //    </SafeAreaView>
    //);

    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <StatusBar backgroundColor="blue" barStyle="dark-content" />

            <Swiper style={styles.wrapper} showsButtons={false}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                    <WebView style={{ width: '100%', height: 500 }} source={{ uri: 'https://google.com.vn' }} />
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                </View>
            </Swiper>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default App;
