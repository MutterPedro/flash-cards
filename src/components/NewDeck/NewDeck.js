import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {saveDeckTitle, getDecks} from "../../actions";
import {primary, secondary, white} from "../../utils/colors";
import {NavigationActions} from 'react-navigation';

class NewDeck extends Component {
    state = {
        title: ''
    };

    createDeck = () => {
        const {title} = this.state;
        const {navigation, newDeck, fetchDecks} = this.props;

        newDeck(title)
            .then(result => {
                this.setState({title: ''});
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Deck',
                    params: {id: Object.keys(result.deck)[0], title}
                });
                navigation.dispatch(navigateAction);
            })
            .then(fetchDecks)
            .catch(console.error)
    };

    render() {
        const {title} = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.text}>What is the title of your deck?</Text>
                <TextInput editable={true} style={styles.input} value={title}
                           onChangeText={(title) => this.setState({title})}/>
                <TouchableOpacity style={styles.btn} onPress={this.createDeck}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: secondary,
        borderWidth: 1,
        maxHeight: 80,
        width: 250,
        marginTop: 15,
        padding: 5
    },
    btn: {
        backgroundColor: primary,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 4,
        marginTop: 10
    },
    btnText: {
        fontSize: 12,
        color: white
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        newDeck: (title) => dispatch(saveDeckTitle(title)),
        fetchDecks: () => dispatch(getDecks())
    }
}


export default connect(null, mapDispatchToProps)(NewDeck);
