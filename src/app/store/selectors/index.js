// Cards Reducer
export const selectCards = (state) => state.cards.cards;
export const selectCurrentCard = (state) => state.cards.currentCard;
export const selectModalContent = (state) => state.cards.modalContent;
export const selectModalContentExists = (state) => Object.keys(state.cards.modalContent).length > 0;
export const selectFilter = (state) => state.cards.filter;
export const selectIsLoading = (state) => state.cards.isLoading;
