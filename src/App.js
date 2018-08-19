import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Venues from './Venues';
import {mapCenter} from './apis/foursquare';
import ScriptLoader from 'react-async-script-loader';
import MenuIcon from './menuicon.svg';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loadMapErr : false,
          map: {},
          bounds: {},
          infoWindow: {},
          mapReady: false,
          mapError : false
        };
        //this.onScriptLoad = this.onScriptLoad.bind(this)
      }

    componentWillReceiveProps({isScriptLoadSucceed}) {
       
        if(isScriptLoadSucceed && !this.state.mapReady) {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: mapCenter,
                zoom: 13
            });

            const bounds = new window.google.maps.LatLngBounds();
            const infoWindow = new window.google.maps.InfoWindow({maxWidth: 250});
            this.setState({
                map: map,
                bounds : bounds,
                infoWindow: infoWindow,
                mapReady : true
            });
        }
        else if (!this.state.mapReady) {
            this.setState({
                mapError: true
            })
        }


       
        //this.props.onMapLoad(map)
    
        // // create marker
        // var marker = new window.google.maps.Marker({
        //   position: this.props.options.center,
        //   map: map,
        //   title: 'test from mapjs'
        // });
      }
//     componentDidMount() {
//     if (!window.google) {
//       var s = document.createElement('script');
//       s.type = 'text/javascript';
//       s.src = `https://maps.googleapis.com/maps/api/js?v3&key=AIzaSyBesYgv-tO3OzTKU9BbM72BF9S4tCffvY0`;
//       var x = document.getElementsByTagName('script')[0];
//       x.parentNode.insertBefore(s, x);
//       // Below is important. 
//       //We cannot access google.maps until it's finished loading
//       s.addEventListener('load', e => {
//         this.onScriptLoad()
//       })
//     } else {
//       this.onScriptLoad()
//     }
//   }
    render() {
        return (
            <div className="App">
            <header>
                <div className="logo">Bank Finder</div>
                <nav className="humb">
                    <img alt="Menu Icon" src={MenuIcon}/>
                </nav>
            </header>
                <aside className="search-section">
                    {
                        this.state.mapReady ?
                            <Venues map={this.state.map}
                                bounds={this.props.bounds}
                                infoWindow={this.state.infoWindow}
                            />
                            :
                            <div>Map not loaded sucessfully</div>
                    }
                </aside>
                <section className="map-section">
                    <div className="map" id="map">
                     {this.state.mapError ? 
                     <div className="err">error while loading the map.</div>    
                     :
                     <div>Map Loading ............</div> 
                      }
                    </div>
                </section>
            </div>
        );
    }
}

export default ScriptLoader(
    ['https://maps.googleapis.com/maps/api/js?v3&key=AIzaSyBesYgv-tO3OzTKU9BbM72BF9S4tCffvY0']
)(App);