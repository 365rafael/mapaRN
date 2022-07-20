import React, {Component} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
//import Pin from './src/Pin';
import MapViewDirections from 'react-native-maps-directions';
import {getPixel} from './src/utils';
// Uberlândia  latitude: -18.9218962, longitude: -48.3336048,

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      destLocation: null,
    };
  }

  async componentDidMount() {
    await Geolocation.getCurrentPosition(
      async ({coords: {latitude, longitude}}) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0121,
          },
        });
      },
      () => {}, //Erro
      {
        timeout: 3000,
        enableHighAccuracy: true,
        maximumAge: 2000,
      },
    );
  }

  render() {
    const {region} = this.state;
    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={styles.mapa}
          region={region}
          showsUserLocation
          loadingEnabled>
          {
            this.state.destLocation && (
              <MapViewDirections
                origin={this.state.region}
                destination={this.state.destLocation}
                apikey="AIzaSyBpRq15gH_P-KTh1bj3vhiAn-POxjH6K6I"
                strokeWidth={5}
                strokeColor="#000"
                onReady={result => {
                  this.map.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixel(50),
                      left: getPixel(50),
                      top: getPixel(50),
                      bottom: getPixel(50),
                    },
                  });
                }}
              />
            )

            //-18.9188323,-48.242692
            //-18.9215706,-48.3056264
            //-18.920614,-48.2496106
          }
        </MapView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.box}>
          <View style={styles.localView}>
            <TouchableOpacity
              style={styles.localBtn}
              onPress={() => {
                this.setState({
                  destLocation: {
                    latitude: -18.9188323,
                    longitude: -48.242692,
                  },
                });
              }}>
              <Text style={styles.localText}>Rondon Pacheco</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.localView}>
            <TouchableOpacity
              style={styles.localBtn}
              onPress={() => {
                this.setState({
                  destLocation: {
                    latitude: -18.9215706,
                    longitude: -48.3056264,
                  },
                });
              }}>
              <Text style={styles.localText}>Getúlio Vargas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.localView}>
            <TouchableOpacity
              style={styles.localBtn}
              onPress={() => {
                this.setState({
                  destLocation: {
                    latitude: -18.920614,
                    longitude: -48.2496106,
                  },
                });
              }}>
              <Text style={styles.localText}>Segismundo Pereira</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapa: {
    flex: 1,
  },
  box: {
    position: 'absolute',
    top: 30,
    margin: 10,
    height: 70,
  },
  localView: {
    height: 40,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  localBtn: {
    backgroundColor: '#ff0000',
    height: 40,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  localText: {
    color: '#FFF',
  },
});
