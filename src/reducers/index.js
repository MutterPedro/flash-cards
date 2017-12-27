import {GET_DECK, ADD_CARD_TO_DECK, SAVE_DECK_TITLE, GET_DECKS, ADD_HISTORY_TO_DECK} from "../actions/index";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case GET_DECK:
            return {
                ...state,
                deck: action.deck
            };
        case GET_DECKS:
            return {
                ...state,
                decks: action.decks
            };
        case SAVE_DECK_TITLE:
        case ADD_CARD_TO_DECK:
        case ADD_HISTORY_TO_DECK:
        default:
            return state;
    }
}