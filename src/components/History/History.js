import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {gray, secondary} from "../../utils/colors";

class History extends  Component {

    formatDate = time => {
        const date = new Date(time);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    };

    render(){
        const {deck} = this.props;
        const history = deck.history.sort((a,b) => {
             return a.time < b.time ? 1 : -1;
        });

        return (
            <ScrollView style={styles.container}>
                {history.map((data, idx) => (
                    <View key={idx} style={styles.historyContainer}>
                        <Text style={styles.timeText}>{this.formatDate(data.time)}</Text>
                        <Text style={styles.scoreText}>{data.score+"%"}</Text>
                    </View>
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 15
    },
    historyContainer: {
        flex: 1,
        borderRadius: 3,
        borderColor: gray,
        borderWidth: 1,
        borderStyle: "solid",
        paddingTop: 15,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10
    },
    timeText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    scoreText: {
        fontSize: 25,
        color: secondary,
        opacity: 0.8
    }
});

const mapStateToProps = ({deck}) => ({
    deck
});

export default connect(mapStateToProps)(History);