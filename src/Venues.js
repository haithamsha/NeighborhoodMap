import React, {Component} from 'react';
import foursquare, { getVenues } from './apis/foursquare';

class Venues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venues: [],
            filteredVenues: {},
            venuesErr: {} ,
            query: '',
            VenensdataStatus : 'Loading ............'
        }
    }

    // Filter banks data method
    GetVenesByName(query) {
        this.setState({
            query: query
        })

        const filteredVenues = this.state.venues.filter((ven) => {
            var match = ven.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
            ven.marker.setVisible(match);
            return match;
        });

        // If there is no search result.
        if(filteredVenues.length == 0) {
            this.setState({
                VenensdataStatus: 'There is no data matching your search.'
            })
        }
        this.setState({
            filteredVenues: filteredVenues,
        });
    }

    componentDidMount() {
        getVenues().then(data => {
            this.setState({
                venues: data,
                filteredVenues: data,
                venuesErr: false
            });
            if(data.length == 0) {
                this.setState({
                    VenensdataStatus: 'There is no data matching your search.'
                })
            }
            // Invoke add markers function.
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
        // Loop throw all the locations
        locations.forEach((ven) => {
            const position = {
                lat : ven.location.lat,
                lng: ven.location.lng
            };

            // Add marker to each position.
            ven.marker = new window.google.maps.Marker({
                position: position,
                map: map,
                title: ven.name,
                id: ven.id  
            });

            // Add info window to each marker. 
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
        // fit markers to appear on the map.
        this.props.map.fitBounds(bounds);
    }

    render() {
        return (
            <div className="venues">
                <input type="text" placeholder="Search" onChange = {(event) => this.GetVenesByName(event.target.value)}/>
                    {this.state.filteredVenues.length > 0 ?  (
                        < ul >
                        {
                            this.state.filteredVenues.map((ven) =>
                                <li key={ven.id}>{ven.name}</li>
                            )
                        }
                    </ul>
                    ): <div className="result">{this.state.VenensdataStatus}</div>
                }
                
            </div>
        )
    }
}

export default Venues;