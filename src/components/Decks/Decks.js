import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {secundary, gray} from "../../utils/colors";
import {getDecks} from '../../actions';
import {NavigationActions} from 'react-navigation';

class Decks extends Component {
    componentDidMount() {
        const {fetchDecks} = this.props;

        fetchDecks().catch(console.error)
    }

    deckDetail = (id) => {
        const {navigation, decks} = this.props;
        const navigateAction = NavigationActions.navigate({
            routeName: 'Deck',
            params: {id, title: decks[id].title}
        });

        navigation.dispatch(navigateAction);
    };

    render() {
        const {decks} = this.props;

        const keys = Object.keys(decks);
        return (
            <ScrollView style={{flex: 1}}>
                {keys.length > 0 ? keys.map(id => (
                        <TouchableOpacity key={id} style={[styles.deck, styles.center]} onPress={() => this.deckDetail(id)}>
                            <Text style={styles.deckTitle}>{decks[id].title}</Text>
                            <Text style={styles.deckCardsNumber}>{`${decks[id].questions.length}  card${decks[id].questions.length !== 1 ? "s" : ""}`}</Text>
                        </TouchableOpacity>
                    )) :
                    <View style={styles.center}>
                        <Text style={styles.empty}>No decks created yet, create a new one on the next tab</Text>
                    </View>
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deck: {
        paddingTop: 20,
        paddingBottom: 20,
        borderColor: gray,
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5
    },
    deckTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    deckCardsNumber: {
        color: secundary
    },
    empty: {
        fontSize: 20,
        color: gray,
        padding: 20,
        textAlign: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        decks: state.decks || {}
    }
};

const mapDispatchToProps = dispatch => ({
    fetchDecks: () => dispatch(getDecks())
});

export default connect(mapStateToProps, mapDispatchToProps)(Decks);