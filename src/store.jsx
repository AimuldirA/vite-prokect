import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your combined reducers
import debounce from 'lodash/debounce';

// Function to save state to local storage (with debouncing to limit the frequency)
const saveStateToLocalStorage = debounce((state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
    console.log(`State size: ${(new Blob([serializedState]).size / 1024).toFixed(2)} KB`); // Log state size in KB
  } catch (e) {
    console.warn("Could not save state", e);
  }
}, 1000); // Throttle saving to once every second

// Function to load state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state", e);
    return undefined;
  }
};

// Load persisted state from local storage
const persistedState = loadStateFromLocalStorage();

// Configure the store
const store = configureStore({
  reducer: rootReducer, // Combine your reducers here
  preloadedState: persistedState, // Initialize with persisted state
});

// Subscribe to store changes and save to local storage
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
