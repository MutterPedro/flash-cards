import React, {Component} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {addCardToDeck, getDeck, getDecks} from '../../actions';
import {primary, secundary, white, gray} from '../../utils/colors';

class AddCard extends Component {

    state = {
        question: "",
        answer: ""
    };

    submit = () => {
        const {question, answer} = this.state;

        if(question.trim() === "" || answer.trim() === ""){
            alert("Both fields must be filled");
            return;
        }

        const {newCard, navigation, fetchDeck, fetchDecks} = this.props;
        const {id} = navigation.state.params;
        const backAction = NavigationActions.back();

        newCard(id, {question, answer})
            .then(() => fetchDeck(id))
            .then(fetchDecks)
            .then(() => navigation.dispatch(backAction))
            .catch(console.error);
    };

    render() {
        const {question, answer} = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    editable={true}
                    style={styles.input}
                    value={question}
                    onChangeText={question => this.setState({question})}
                    placeholder={"Question"}
                    placeholderTextColor={gray}
                />
                <TextInput
                    editable={true}
                    style={styles.input}
                    value={answer}
                    onChangeText={answer => this.setState({answer})}
                    placeholder={"Answer"}
                    placeholderTextColor={gray}
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => this.submit()} style={styles.submitBtn}>
                        <Text style={styles.submitBtnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        paddingTop: 20
    },
    input: {
        height: 45,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: secundary,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    btnContainer: {
        flex: 1,
        alignItems: "center"
    },
    submitBtn: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 25,
        paddingLeft: 25,
        marginTop: 20,
        backgroundColor: primary,
        borderRadius: 5
    },
    submitBtnText: {
        fontSize: 25,
        color: white
    }
});

const mapDispatchToProps = dispatch => ({
    newCard: (id, {question, answer}) => dispatch(addCardToDeck({question, answer}, id)),
    fetchDeck: (id) => dispatch(getDeck(id)),
    fetchDecks: () => dispatch(getDecks())
});

export default connect(null, mapDispatchToProps)(AddCard);