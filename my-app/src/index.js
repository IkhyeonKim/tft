import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import TeamFightTactical from './recipe'
import axios from "axios";
import App from './App';
import * as serviceWorker from './serviceWorker';

const mySummonerId = '-3ySDZ63kzWiSgB2-61v5t2ewABIllCDSa7b-168vkbNWw'
const apiKey = 'RGAPI-f9093e99-b897-4b39-8d27-d5f0322510d2'
const sampleURL = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${mySummonerId}?api_key=RGAPI-f9093e99-b897-4b39-8d27-d5f0322510d2`
const getIdUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`

class SummonerInfo extends React.Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

class Leaderboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            summonerName: '',
            summonerInfo: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({
            summonerName: event.target.value
        })
    }

    handleSubmit = (event) => {
        //console.log(this.state.summonerName)
        event.preventDefault()
        const summonerNameFromForm = this.state.summonerName
        console.log(summonerNameFromForm)

        const bySummoner = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/vtb9tbVs_KdXEw2S825RmTJiM89aedxQn8BEv6Mz3CN_qA?api_key=${apiKey}`
        const byName = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerNameFromForm}?api_key=${apiKey}`
        axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerNameFromForm}?api_key=${apiKey}`)
            .then( res => {
                console.log(res)
            })
        
        // fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/%EC%9D%91%EC%8A%B7%EC%9D%918?api_key=RGAPI-f9093e99-b897-4b39-8d27-d5f0322510d2`, {mode: 'no-cors'})
        // .then( response => {
        //     //console.log(response.json())
        //     return response.json()
        // })
        // .then( data => {
        //     console.log(data)
        // })
        // this.setState({
        //     summonerName: ''
        // })
        
    }

    componentDidMount(){
        // axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/hide%20on%20bush?api_key=${apiKey}`).then( response => {
        //     console.log(response)
        // })
    }

    async getSummonerId() {
        const summonerNameFromForm = this.state.summonerName
        try{
            console.log(`${getIdUrl}${summonerNameFromForm}?api_key=${apiKey}`)
            return await axios.get(`${getIdUrl}${summonerNameFromForm}?api_key=${apiKey}`)
        }catch(error){
            console.log(error)
        }
    }

    async getSummonerInfo(){
        const data = await this.getSummonerId()
        console.log(data)
        if(data.id){
            console.log(data.id)
        }
        
    }

    render(){
        return (
            <div className="leaderboard">
                <h1>Leader board</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="summonerName" 
                        placeholder="Summoner name" 
                        value={this.state.summonerName} 
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Search"/>
                </form>
                <SummonerInfo

                />
            </div>
        )
    }
}

function Tab(props) {
    return(
        <li onClick={ () => {props.onClick(props.label)}}>
            {props.label}
        </li>
    )
}

class Tabs extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeTab: this.props.children[0].props.label
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(label) {
        this.setState({
            activeTab: label
        })
    }

    render() {
        console.log(this.state.activeTab)
        return (
            <div>
                <div className="tabs">
                    <ul className="tabs__list">
                        {
                            this.props.children.map( child => {
                                return (
                                    <Tab
                                        activeTab={this.state.activeTab}
                                        label={child.props.label}
                                        key={child.props.label}
                                        onClick={this.handleClick}
                                    />
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="tabs__content">
                    {
                        this.props.children.map( child => {
                            if(this.state.activeTab === child.props.label){
                                return child
                            }
                        })
                    }
                </div>
            </div>

        )
    }
}

class MyPage extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>
                <Tabs>
                    <div label="Items">
                        <TeamFightTactical/>
                    </div>
                    <div label="Leaderboard">
                        <Leaderboard/>
                    </div>
                </Tabs>
            </div>
        )
    }

    componentDidMount(){
        // axios.get(sampleURL)
        // .then( response => {
        //     const data = response.data
        //     console.log(data[0])
        // })
    }
}



ReactDOM.render(<MyPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
