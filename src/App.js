import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Venues from './Venues';
import {mapCenter} from './apis/foursquare';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loadMapErr : false,
          map: {},
          bounds: {},
          infoWindow: {}
        };
        this.onScriptLoad = this.onScriptLoad.bind(this)
      }

    onScriptLoad() {
        const map = new window.google.maps.Map(document.getElementById("map"), {
            center: mapCenter,
            zoom: 13
        });
        const bounds = new window.google.maps.LatLngBounds();
        const infoWindow = new window.google.maps.InfoWindow({maxWidth: 250});
        this.setState({
            map: map,
            bounds : bounds,
            infoWindow: infoWindow
        });
        //this.props.onMapLoad(map)
    
        // // create marker
        // var marker = new window.google.maps.Marker({
        //   position: this.props.options.center,
        //   map: map,
        //   title: 'test from mapjs'
        // });
      }
    componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.googleapis.com/maps/api/js?v3&key=AIzaSyBesYgv-tO3OzTKU9BbM72BF9S4tCffvY0`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }
    render() {
        return (
            <div className="App">
                <aside className="search-section">
                    <Venues map = {this.state.map} 
                    bounds = {this.props.bounds}
                    infoWindow = {this.state.infoWindow}
                    />
                </aside>
                <section className="map-section">
                <div className="map" id="map" />
                   {/* <Map
                   id="map"
                   options = {{
                       center : mapCenter,
                       zoom: 13
                   }}
                //    onMapLoad = {
                //        map => {
                //            var marker = new window.google.maps.Marker({
                //                position: {lat: 29.9765634, lng: 31.2252541},
                //                map: map,
                //                title: 'test'
                //            });
                //        }
                //    }
                   /> */}
                </section>
            </div>
        );
    }
}

export default App;