import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListPlanets from './ListPlanets';
import {loadPlanets} from '../../actions/async/loginActions';
import './StarWarWorld.css'

class StarWarWorld extends Component {
    constructor(props){
        super();
        this.state = {planets: props.planets};
        this.searchPlanets = this.searchPlanets.bind(this);
    }
    componentDidMount(){
        if(!this.props.planets.length){
            this.props.loadPlanets();
        }
    }
    componentWillReceiveProps(props){
        this.setState({planets: props.planets});
    }
    searchPlanets(event) {
        let searctText = event.target.value.toUpperCase();
        let planets = this.props.planets.filter( planet => planet.name.toUpperCase().includes(searctText));
        this.setState({planets});
    }
    render() {
        return (
            <div className='star-war-world'>
                <div>
                    <input type='text' placeholder='Start typing to search' onChange={this.searchPlanets}></input>
                </div>
                <h4>{'Number of Planets displayed here: ' + this.state.planets.length}</h4>
                <ListPlanets planets={this.state.planets}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    planets: state.login.planets
})

const mapDispatchToProps = (dispatch) => ({
    loadPlanets: () => dispatch(loadPlanets())
})

export default connect(mapStateToProps, mapDispatchToProps)(StarWarWorld);