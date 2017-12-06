import {AsyncStorage} from 'react-native'

const STORAGE_KEY = 'flashcards:decks';

export function init() {
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({}));
}

export function getDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(JSON.parse).catch(console.error);
}

export function getDeck(id) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(JSON.parse).then(results => results[id]);
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [Math.random().toString(36).substr(-8)]: {
            title,
            cards: []
        }
    })).then(JSON.parse);
}

export function addCardToDeck(card, deckId) {
    return getDeck(deckId).then(({title, cards = []}) => AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [deckId]: {
            title,
            cards: cards.push(card)
        }
    }))).then(JSON.parse);
}