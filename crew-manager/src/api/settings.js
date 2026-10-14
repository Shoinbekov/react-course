//key to store data in localstorage
export const DATA_KEY = "crew-manager-data-v1";

//configs for fake API
// Delays between 0.5 s and 3 s make race conditions easy to see:
// a request sent later can finish earlier.
export const API_CONFIG = {
  minDelay: 500,
  maxDelay: 3000,
  errorChance: 0.05,
};
