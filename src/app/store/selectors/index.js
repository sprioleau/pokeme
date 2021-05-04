// Posts Reducer
export const selectPosts = (state) => state.posts.posts;
export const selectMessage = (state) => state.posts.message;
export const selectCurrentPost = (state) => state.posts.currentPost;
export const selectModalContent = (state) => state.posts.modalContent;
export const selectModalContentExists = (state) => state.posts.modalContent !== null;

// Cards Reducer
export const selectCards = (state) => state.cards.cards;
