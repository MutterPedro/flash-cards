import {Platform} from "react-native";
import {TabNavigator} from "react-navigation";
import {primary, quintenarian, white} from "../../utils/colors";

import Decks from "../Decks/Decks";
import NewDeck from "../NewDeck/NewDeck";

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
        activeTintColor: Platform.OS === 'ios' ? primary : quintenarian,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : primary,
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

export default Tabs;