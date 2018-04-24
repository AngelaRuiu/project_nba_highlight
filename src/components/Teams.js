import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

const URL_TEAMS = 'http://localhost:3004/teams'

const fadeAnimation = {
    transitionName:"fade",
    transitionAppear:true,
    transitionAppearTimeout:500,
    transitionEnter:true,
    transitionEnterTimeout:500,
    transitionLeave:true,
    transitionLeaveTimeout:500
}

class Teams extends Component {
    constructor(props){
        super(props);

        this.state= {
            teams:[],
            filtered:[],
            keywords:''
        }
    }

    componentDidMount(){
        fetch(URL_TEAMS,{method:'GET'})
        .then(response => response.json())
        .then(json=>{
            this.setState({
                teams:json,
                filtered:json
            })
        })
    }
    searchTeam = (e) => {
        const keyword = e.target.value;
        if(keyword !== ''){
            const list = this.state.teams.filter((item)=>{
                return item.name.toLowerCase().indexOf(keyword.toLowerCase())> -1
            })
            this.setState({
                filtered:list,
                keyword:e.target.value
            })
        }else{
            this.setState({
                filtered:this.state.teams,
                keyword:keyword // or just keyword
            })
        }
    }

    renderList = ({filtered}) =>{
        return filtered.map((item)=>{
            return(
                <Link to={`/team/${item.name}`} key={item.id} className="team_item">
                    <img alt={item.name} src={`/images/teams/${item.logo}`}/>
                </Link>
            )
        })
    }

    render(){
        return (
            <div className="teams_component"> 
                <div className="teams_input">
                    <input type="text" placeholder="Search for a Team" value={this.state.keyword} onChange={(e)=>this.searchTeam(e)}/>
                </div>
                <div className="teams_container">
                    <CSSTransitionGroup {...fadeAnimation}>
                        {this.renderList(this.state)}
                    </CSSTransitionGroup>
                </div>
            </div>
        )
    }

}

export default Teams;