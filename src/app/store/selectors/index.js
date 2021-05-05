// Cards Reducer
export const selectCards = (state) => state.cards.cards;
export const selectMessage = (state) => state.cards.message;
export const selectCurrentCard = (state) => state.cards.currentCard;
export const selectModalContent = (state) => state.cards.modalContent;
export const selectModalContentExists = (state) => state.cards.modalContent !== null;
