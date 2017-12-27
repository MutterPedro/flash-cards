import {StackNavigator} from "react-navigation";
import {primary, quintenarian} from "../../utils/colors";

import AddCard from "../AddCard/AddCard";
import Quiz from "../Quiz/Quiz";
import Deck from "../Deck/Deck";
import History from "../History/History";
import Tabs from "../Tabs/Tabs";

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: quintenarian,
            headerStyle: {
                backgroundColor: primary
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: "Add Card",
            headerTintColor: quintenarian,
            headerStyle: {
                backgroundColor: primary
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: "Quiz",
            headerTintColor: quintenarian,
            headerStyle: {
                backgroundColor: primary
            }
        }
    },
    History: {
        screen: History,
        navigationOptions: {
            title: "History",
            headerTintColor: quintenarian,
            headerStyle: {
                backgroundColor: primary
            }
        }
    }
});

export default MainNavigator;