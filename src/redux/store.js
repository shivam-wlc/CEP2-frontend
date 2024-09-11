import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice.js";
import alertReducer from "./slices/alertSlice.js";
import adminReducer from "./slices/adminSlice.js";
import inviteReducer from "./slices/inviteSlice";
import profileReducer from "./slices/profileSlice.js";
import creatorReducer from "./slices/creatorSlice.js";
import onetSlice from "./slices/onetSlice.js";
import userSlice from "./slices/userSlice.js";
import zylaSlice from "./slices/zylaSlice.js";
import surveySlice from "./slices/surveySlice.js";
import unifiedRecordSlice from "./slices/unifiedRecordSlice.js";
import userDetailsSlice from "./slices/userDetailsSlice.js";
import resumeReducer from "./slices/resumeSlice.js";
import discSlice from "./slices/discSlice.js";

const persistConfig = {
  key: "user",
  version: 1,
  storage,
};

// Combine all your reducers into a root reducer
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  alert: alertReducer,
  admin: adminReducer,
  invite: inviteReducer,
  profile: profileReducer,
  creator: creatorReducer,
  onet: onetSlice,
  user: userSlice,
  zyla: zylaSlice,
  survey: surveySlice,
  unifiedRecord: unifiedRecordSlice,
  userDetails: userDetailsSlice,
  resume: resumeReducer,
  disc: discSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  preloadedState: {},
});

const persistor = persistStore(store);

export { store, persistor };
