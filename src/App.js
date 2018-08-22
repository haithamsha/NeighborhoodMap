import React, { Component } from 'react';
import './App.css';
import Venues from './Venues';
import {mapCenter} from './apis/foursquare';
import ScriptLoader from 'react-async-script-loader';

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

            console.log("window width: ", window.innerWidth);
            console.log("map width", map);

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
      }

      showHideMenu() {
        var searchSection = document.querySelector('.search-section');
        if (searchSection.classList.contains('open')) {
            searchSection.classList.remove('open');
        }
        else {
            searchSection.classList.add('open');
        }
      }


    render() {
        return (
            <div className="App" role="main">
            <header tabIndex="0">
                <div className="logo">Bank Finder</div>
                <nav id="nav" className="humb" onClick={() => this.showHideMenu()}>
                    &#9776;
                </nav>
            </header>
            <aside className="search-section" tabIndex="1">
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
            <section role="application" className="map-section">
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