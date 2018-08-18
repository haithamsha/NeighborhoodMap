import React, {Component} from 'react';
import foursquare, { getVenues } from './apis/foursquare';

class Venues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venues: [],
            filteredVenues: [],
            venuesErr: false ,
            query: ''
        }
    }

    GetVenesByName(query) {
        this.setState({
            query: query
        })

        const filteredVenues = this.state.venues.filter((ven) => {
            var match = ven.name.toLowerCase().indexOf(query) > -1;
            ven.marker.setVisible(match);
            return match;
        });
        this.setState({
            filteredVenues
        });
        // add markers 
        this.addMarkers(filteredVenues);
        
    }

    componentDidMount() {
        getVenues().then(data => {
            this.setState({
                venues: data,
                filteredVenues: data,
                venuesErr: false
            });
            // add markers 
            this.addMarkers(data);
        })
        .catch(err => {
            this.setState(
                {
                    venuesErr: true
                }
            )
        })
    }

    addMarkers(locations) {
        console.log()
        var markers = [];
        // for (var i = 0; i < markers.length; i++) {
        //     markers[i].setMap(null);
        // }
        const bounds = this.props.bounds;
        locations.forEach((ven) => {
            const position = {
                lat : ven.location.lat,
                lng: ven.location.lng
            };

            ven.marker = new window.google.maps.Marker({
                position: position,
                map: this.props.map,
                title: ven.name,
                id: ven.id  
            });
            markers.push(ven.marker);
        })

        // bounds all markers
        for(var i = 0; i<markers.length; i++) {
            markers[i].setMap(this.props.map);
           if(bounds){
            bounds.extend(markers[i].position);
            markers[i].addListener('click', () => {
                console.log(markers[i]);
            });
           } 
          
        }
        this.props.map.fitBounds(bounds);


    }

    render() {
        return (
            <div className="venues">
                <input type="text" placeholder="Search" onChange = {(event) => this.GetVenesByName(event.target.value)}/>
                {this.state.venuesErr && this.state.filteredVenues.length > 0 ?
                    < ul >
                        {
                            this.state.filteredVenues.map((ven) =>
                                <li key={ven.id}>{ven.name}</li>
                            )
                        }
                    </ul>
                : 
                <div className= "err">There is erro when load venues data.</div>
                }
                
            </div>
        )
    }
}

export default Venues;