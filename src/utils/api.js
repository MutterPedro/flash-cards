import {AsyncStorage} from 'react-native'

const STORAGE_KEY = 'flashcards:decks';

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
            questions: []
        }
    })).then(JSON.parse);
}

export function addCardToDeck(card, deckId) {
    return getDeck(deckId).then(({title, questions = []}) => AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [deckId]: {
            title,
            questions: [...questions, card]
        }
    }))).then(JSON.parse);
}