import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { Colors } from "../constants/Colors";
import PlacesListScreen, {
  PlacesListScreenNavigationOptions,
} from "../screens/PlacesListScreen";
import PlaceDetailScreen, {
  PlaceDetailScreenNavigationOptions,
} from "../screens/PlaceDetailScreen";
import NewPlaceScreen, {
  NewPlaceScreenNavigationOptions,
} from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";

const PlacesStackNavigator = createStackNavigator();

const PlacesNavigator = (props) => {
  return (
    <PlacesStackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }}
    >
      <PlacesStackNavigator.Screen
        name="Places"
        component={PlacesListScreen}
        options={PlacesListScreenNavigationOptions}
      />
      <PlacesStackNavigator.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={PlaceDetailScreenNavigationOptions}
      />
      <PlacesStackNavigator.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={NewPlaceScreenNavigationOptions}
      />
      <PlacesStackNavigator.Screen name="Map" component={MapScreen} />
    </PlacesStackNavigator.Navigator>
  );
};

export default PlacesNavigator;
