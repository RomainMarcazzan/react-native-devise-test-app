import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducer from "./store/places-reducer";
import { init } from "./helpers/db";
import { StyleSheet } from "react-native";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { NavigationContainer } from "@react-navigation/native";

init()
  .then(() => console.log("initialized database"))
  .catch((err) => {
    console.log("initializing db failed");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <PlacesNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
