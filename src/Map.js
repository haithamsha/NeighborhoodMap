import React, { Component } from 'react';
import './App.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMapErr : false
    };
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
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
      <div>
        {/* {!this.state.loadMapErr && 
        <div className="map" id={this.props.id} />
        }:
        <div className="err">The Map cannot loaded sucessfully</div> */}
        <div className="map" id={this.props.id} />
      </div>
    );
  }
}

export default Map