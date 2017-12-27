import * as Api from '../utils/api';

export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const ADD_HISTORY_TO_DECK = 'ADD_HISTORY_TO_DECK';

function getDecksAC(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

function getDeckAC(deck) {
    return {
        type: GET_DECK,
        deck
    }
}

function saveDeckTitleAC(deck) {
    return {
        type: SAVE_DECK_TITLE,
        deck
    }
}

function addCardToDeckAC() {
    return {
        type: ADD_CARD_TO_DECK
    }
}

function addHistoryToDeckAC() {
    return {
        type: ADD_HISTORY_TO_DECK
    }
}

export function getDecks() {
    return dispatch => Api.getDecks().then(decks => dispatch(getDecksAC(decks))).catch(console.error)
}

export function getDeck(id) {
    return dispatch => Api.getDeck(id).then(deck => dispatch(getDeckAC(deck))).catch(console.error)
}

export function saveDeckTitle(title) {
    return dispatch => Api.saveDeckTitle(title).then(deck => dispatch(saveDeckTitleAC(deck))).catch(console.error)
}

export function addCardToDeck(card, deckId) {
    return dispatch => Api.addCardToDeck(card, deckId).then(() => dispatch(addCardToDeckAC())).catch(console.error)
}

export function addHistoryToDeck(history, deckId) {
    return dispatch => Api.addHistoryToDeck(history, deckId).then(() => dispatch(addHistoryToDeckAC())).catch(console.error)
}