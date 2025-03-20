// // src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;



// store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice   from './reducers/userSlice'; // Import your slice

import updateSlice from './reducers/updateSlice';

import averageRatingSlice from './reducers/averageRatingSlice';

const store = configureStore({
  reducer: {
    user: userSlice , // Add each slice reducer here
    averageRating: averageRatingSlice, 
    updateSlice: updateSlice,
  },
});

export default store;
