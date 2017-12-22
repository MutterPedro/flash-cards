import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {red, primary, secundary, white} from "../../utils/colors";

class Quiz extends Component {
    state = {
        turn: 0,
        score: 0,
        reveal: false
    };

    answer = (correct) => {
        this.setState((state) => ({
            turn: ++state.turn,
            score: state.score + (correct ? 1 : 0),
            reveal: false
        }));
    };

    render(){
        const {turn, reveal, score} = this.state;
        const {deck} = this.props;
        const card = deck.questions[turn];

        if(turn >= deck.questions.length){
            const result = 100*score/deck.questions.length;
            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.question}>👏 👏 👏</Text>
                    <Text style={styles.question}>{`Quiz finished!`}</Text>
                    <Text style={styles.question}>{`Final score: `}</Text>
                    <Text style={styles.finalScore}>{result.toFixed(0)}%</Text>
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
                        <TouchableOpacity style={styles.correctButton} onPress={() => this.answer(true)}>
                            <Text style={styles.buttonText}>{"Correct"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.incorrectButton} onPress={() => this.answer(false)}>
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
        color: secundary,
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
    correctButton: {
        backgroundColor: primary,
        borderRadius: 5,
        marginBottom: 10,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 50,
        paddingRight: 50
    },
    incorrectButton: {
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
        color: secundary,
        opacity: 0.8
    }
});

const mapStateToProps = ({deck}) => ({
    deck
});

export default connect(mapStateToProps)(Quiz);