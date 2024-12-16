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

const store = configureStore({
  reducer: {
    user: userSlice , // Add each slice reducer here
  },
});

export default store;
