import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {red, primary, secondary, white} from '../../utils/colors';
import {NavigationActions} from 'react-navigation';
import {clearLocalNotifications, setLocalNotification} from "../../utils/LocalNotification";
import {addHistoryToDeck, getDeck} from "../../actions";

class Quiz extends Component {
    state = {
        turn: 0,
        score: 0,
        reveal: false,
        saved: false
    };

    answer = (correct) => {
        this.setState((state) => ({
            turn: ++state.turn,
            score: state.score + (correct ? 1 : 0),
            reveal: false
        }));
    };

    back = () => {
        const navAction = NavigationActions.back();
        const {navigation} = this.props;
        navigation.dispatch(navAction);
    };

    restart = () => {
        this.setState({
            turn: 0,
            score: 0,
            reveal: false
        })
    };

    newHistory = score => {
        const {saveHistory, fetchDeck, navigation} = this.props;
        const {id} = navigation.state.params;
        saveHistory({
            time: Date.now(),
            score
        }, id).then(() => {
            this.setState({saved: true});
            fetchDeck(id)
        }).catch(console.error);
    };

    render(){
        const {turn, reveal, score, saved} = this.state;
        const {deck} = this.props;
        const card = deck.questions[turn];

        if(turn >= deck.questions.length){
            clearLocalNotifications()
                .then(setLocalNotification);

            const result = 100*score/deck.questions.length;
            if(!saved)
                this.newHistory(result.toFixed(0));

            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.question}>👏 👏 👏</Text>
                    <Text style={styles.question}>{`Quiz finished!`}</Text>
                    <Text style={styles.question}>{`Final score: `}</Text>
                    <Text style={styles.finalScore}>{result.toFixed(0)}%</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: secondary}]} onPress={() => this.back()}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: primary}]} onPress={() => this.restart()}>
                            <Text style={styles.buttonText}>Restart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.turnNumber}>{(turn+1)+" / "+deck.questions.length}</Text>
                <View style={styles.cardContainer}>
                    <Text style={styles.question}>{reveal ? card.answer : card.question}</Text>
                    <TouchableOpacity onPress={() => this.setState({reveal: !reveal})}>
                        <Text style={styles.answer}>{reveal ? "question" : "answer"}</Text>
                    </TouchableOpacity>
                    {reveal &&
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: primary}]} onPress={() => this.answer(true)}>
                            <Text style={styles.buttonText}>{"Correct"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: red}]} onPress={() => this.answer(false)}>
                            <Text style={styles.buttonText}>{"Incorrect"}</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingLeft: 8,
        paddingRight: 8
    },
    turnNumber: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 20
    },
    cardContainer: {
        flex: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    question: {
        fontSize: 50,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center"
    },
    answer: {
        color: secondary,
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold"
    },
    buttonsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 20
    },
    button: {
        marginBottom: 10,
        backgroundColor: red,
        borderRadius: 5,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 50,
        paddingRight: 50
    },
    buttonText: {
        fontSize: 20,
        color: white
    },
    finalScore: {
        fontSize: 40,
        color: secondary,
        opacity: 0.8
    }
});

const mapStateToProps = ({deck}) => ({
    deck
});

const mapDispatchToProps = (dispatch) => ({
    saveHistory: (history, id) => dispatch(addHistoryToDeck(history, id)),
    fetchDeck: (id) => dispatch(getDeck(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);