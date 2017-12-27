import React from 'react';
import Home from './src/components/Home/Home'
import {View} from "react-native";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './src/reducers';
import {setLocalNotification} from "./src/utils/LocalNotification";

const store = createStore(reducer,
    compose(applyMiddleware(thunk))
);

export default class App extends React.Component {

    componentDidMount(){
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <Home/>
                </View>
            </Provider>
        );
    }
}
