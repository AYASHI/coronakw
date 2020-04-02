import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview';

const WebViewScreen = props => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <WebView style={{flex: 1}} source={{ uri: props.route.params}}/>
        </SafeAreaView>
    )
}

export default WebViewScreen

const styles = StyleSheet.create({})
