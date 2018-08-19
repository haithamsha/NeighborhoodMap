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

    state = {
        venues: [],
        filteredVenues: [],
        venuesErr: false ,
        query: ''
    }

    GetVenesByName(query) {
        this.setState({
            query: query
        })

        const filteredVenues = this.state.venues.filter((ven) => {
            var match = ven.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
            console.log(match);
            ven.marker.setVisible(match);
            return match;
        });
        this.setState({
            filteredVenues,
            venuesErr: false
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
            if(data) this.addMarkers(data);
        })
        .catch(err => {
            this.setState(
                {
                    venuesErr: true
                }
            )
        })
    }

    addMarkers(locations){
       
        const { map, bounds, infoWindow } = this.props;
        const self = this;
        

        // the problem from here.
        locations.map((ven) => {
            console.log('repeat!');
            const position = {
                lat : ven.location.lat,
                lng: ven.location.lng
            };
            console.log(position);

            ven.marker = new window.google.maps.Marker({
                position: position,
                map: map,
                title: ven.name,
                id: ven.id  
            });
           // bounds.extend(position);
            ven.marker.addListener('click', function() {
                const marker = this;
                marker.infoContent = `<div class='info-window'>
                <h3>Bank info</h3>
                ${ven.name}
                </div>`;
                infoWindow.setContent(marker.infoContent);
                infoWindow.open(map, marker);
            })
        });

        // bounds all markers
        // for(var i = 0; i<markers.length; i++) {
        //     //markers[i].setMap(this.props.map);
        //    //if(bounds){
        //        console.log(bounds);
        //     bounds.extend(markers[i].position);
        //     markers[i].addListener('click', () => {
        //         console.log(markers[i]);
        //     });
        //    //} 
          
        // }
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
                <div className= "err">There is error when load venues data.</div>
                }
                
            </div>
        )
    }
}

export default Venues;