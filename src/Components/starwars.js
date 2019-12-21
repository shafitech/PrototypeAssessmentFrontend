import React, { Component } from 'react';
import starwarlogo from '../assets/Star_Wars_Logo.svg'
import './starwars.css'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'


class Starwars extends Component {
    constructor(props) {
        super(props);
        this.state={
            URL:"http://localhost:49363/api/StarWars/",
            isStarwarDetailsAvailable:false,
            longestOpeningCrawl:"",
            mostApprCharacter:"",
            mostApprSpecies:[],
            planetwithMostVehiclePilot:[]

        }
        this.showStarWarDetails = this.showStarWarDetails.bind(this);
    }
    showStarWarDetails(){  
        //Getting Longest Opening Crawl    
        axios.get(this.state.URL+'getLongestOpeningCrawl')
        .then(response => {
            this.setState({longestOpeningCrawl:response.data})           
        }).catch(err=>{
            console.log(err)
        })

        //Getting Most Appeared Character
        axios.get(this.state.URL+'getMostAppeardChar')
        .then(response => {
            this.setState({mostApprCharacter:response.data})
            
        }).catch(err=>{
            console.log(err)
        })

        //Getting Most Appeared Species
        axios.get(this.state.URL+'getMostAppeardCharSpecies')
        .then(response => {
            console.log(response)
            const species=response.data
            this.setState({mostApprSpecies:species.map(d=><div>{d}</div>)})            
        }).catch(err=>{
            console.log(err)
        })

        //Getting Planet with large no. of vehicle pilots
        axios.get(this.state.URL+'getPlanetWithMostVehiclePilot')
        .then(response => {
            console.log(response)
            const species=response.data
            this.setState({planetwithMostVehiclePilot:species.map(d=><div>{d}</div>)})
            this.setState({isStarwarDetailsAvailable:true})
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <img src={starwarlogo} className="starwar-logo"  alt="logo" />
                <br/>
                 <button className="button" onClick={this.showStarWarDetails}><i className="fa fa-star strIconL fa-lg"></i>Do. Or do not. There is no try.<i className="fa fa-star strIconR fa-lg"></i></button>
                 { this.state.isStarwarDetailsAvailable ? <div className="info">
                 <div className="ques">Which of all StarWars movies has longest opening crawl?</div>
                 <div className="ans">{this.state.longestOpeningCrawl}</div>
                 <div className="ques">What character (person) appeared in the most of StarWars films?</div>
                 <div className="ans">{this.state.mostApprCharacter}</div>
                 <div className="ques">What species appeared in the most number of StarWars films?</div>
                 <div className="ans">{this.state.mostApprSpecies}</div>
                 <div className="ques">What planet in StarWars universe provided largest number of vehicle pilots?</div>
                 <div className="ans">{this.state.planetwithMostVehiclePilot}</div>
            </div>
: null }
            </div>
        );
    }
}

export default Starwars;