import React from 'react';
import {StyleSheet, View} from 'react-native';
import {primary} from '../../utils/colors';
import MainNavigator from "../MainNavigator/MainNavigator";
import FlashCardsStatusBar from "../FlashCardsStatusBar/FlashCardsStatusBar";

const Home = () => (
    <View style={styles.container}>
        <FlashCardsStatusBar backgroundColor={primary} barStyle="light-content"/>
        <MainNavigator/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default Home

