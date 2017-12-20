import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {getDeck} from '../../actions';
import {secundary, primary, white} from '../../utils/colors';

class Deck extends Component {
    state = {
        ready: false
    };
    static navigationOptions = ({navigation}) => {
        return {
            title: `${navigation.state.params.title}`,
        };
    };

    toAddCard = () => {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        const navigationAction = NavigationActions.navigate({
            routeName: "AddCard",
            params: {id}
        })

        navigation.dispatch(navigationAction);
    };

    componentDidMount() {
        const {navigation, fetchDeck} = this.props;
        const {id} = navigation.state.params;

        fetchDeck(id).then(() => this.setState({ready: true})).catch(console.error);
    }

    render() {
        const {ready} = this.state;
        const {deck} = this.props;
        if (!ready) {
            return <View style={styles.center}><ActivityIndicator/></View>
        }

        return (
            <View style={styles.container}>
                <Text style={styles.deckTitle}>{deck.title || "Not Found"}</Text>
                <Text style={styles.deckCards}>{(deck.questions && `${deck.questions.length} cards`) || ""}</Text>
                {Object.keys(deck)[0] && (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.addCardButton} onPress={() => this.toAddCard()}>
                            <Text style={styles.addCardButtonText}>Add Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.startQuizButton}>
                            <Text style={styles.startQuizButtonText}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 100
    },
    buttonsContainer: {
        flex: 3,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    addCardButton: {
        backgroundColor: white,
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 25,
        paddingRight: 25,
        marginBottom: 15,
        borderColor: primary,
        borderWidth: 1,
        borderStyle: "solid"
    },
    addCardButtonText: {
        color: primary,
        fontSize: 25
    },
    startQuizButton: {
        backgroundColor: primary,
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 25,
        paddingRight: 25
    },
    startQuizButtonText: {
        color: white,
        fontSize: 25
    },
    deckTitle: {
        fontSize: 50,
        fontWeight: "bold"
    },
    deckCards: {
        fontSize: 20,
        color: secundary
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

const mapStateToProps = ({deck = {}}) => ({
    deck
});
const mapDispatchToProps = (dispatch) => ({
    fetchDeck: (id) => dispatch(getDeck(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck)