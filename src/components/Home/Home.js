import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {TabNavigator} from 'react-navigation';
import {Constants} from 'expo';
import Decks from '../Decks/Decks';
import NewDeck from '../NewDeck/NewDeck';
import {fiveth, primary} from "../../utils/colors";

function FlashCardsStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks'
        }
    },

    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck'
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? primary : fiveth,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? fiveth : primary,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <FlashCardsStatusBar backgroundColor={primary} barStyle="light-content"/>
                <Tabs/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default Home

