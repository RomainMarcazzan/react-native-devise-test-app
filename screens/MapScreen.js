import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, Platform, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "../constants/Colors";

const MapScreen = (props) => {
  const initialLocationParam = props.route.params?.initialLocation;
  const readonly = props.route.params?.readonly;
  const [selectedLocation, setSelectedLocation] = useState(
    initialLocationParam
  );
  const mapRegion = {
    latitude: initialLocationParam ? initialLocationParam.lat : 37.78,
    longitude: initialLocationParam ? initialLocationParam.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const savePickedLocationHandler = () => {
    if (!selectedLocation) {
      //Could show an alert
      return;
    }
    props.navigation.navigate("NewPlace", {
      mapSelectedLocation: selectedLocation,
    });
  };

  useLayoutEffect(() => {
    if (readonly) {
      return;
    }
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={savePickedLocationHandler}
        >
          <Text style={styles.headerText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});
