import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import TeamFightTactical from './recipe'
import axios from "axios";
import * as serviceWorker from './serviceWorker';
// https://avatar.leagueoflegends.com/kr/응슷응8.png
const apiKey = 'RGAPI-5cfe28b7-ff6d-4ff7-a047-a2782dedd986'
const getIdUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`
const proxyUrl = "https://cors-anywhere.herokuapp.com/"

class SummonerInfo extends React.Component {
    renderResults(profileIconName, summonerInfo) {

        return (
            <div>
                <img alt={profileIconName} src={`https://avatar.leagueoflegends.com/kr/${profileIconName}.png`}></img>
                <p>{summonerInfo.tier}</p>
            </div>
        )
    }

    render() {
        console.log(this.props.summonerInfo)
        return (
            <section className="summonerInfo">
                {
                    this.props.stillLoading ? <p>Loading...</p> : 
                    this.props.summonerInfo ? this.renderResults(this.props.summonerName, this.props.summonerInfo) : 
                    this.props.initPage ? <p>Check your TFT Ranking!</p> : <p>Can't find {this.props.summonerName} name :(</p>
                }
            </section>
        )
    }
}
class ChallengerInfo extends React.Component {
    
    renderChallenger(){
        const inlineStyle = {
            margin: "10px 0 10px 0"
        }
        const challengers = this.props.challengers
        const renderedChallenger = []
        renderedChallenger.push(
            (<div className="challenger" style={inlineStyle} key={`firstRow`} >
                <span className="challenger__span">Rank</span>
                <span className="challenger__span">Name</span>                
                <span className="challenger__span"> LP </span>
                <span className="challenger__span challenger__span--bold"> WinRate </span>
                <span className="challenger__span"> Wins </span>
                <span className="challenger__span"> Losses </span>
                
            </div>)
        )
        for(let i = 0; i< challengers.length; i++){
            const challenger = challengers[i]
            const wins = parseInt(challenger.wins)
            const losses = parseInt(challenger.losses)
            
            renderedChallenger.push(
                (<div className="challenger" key={i} >
                    <span className="challenger__span">{i+1 === 1 ? (i+1)+'st' : i+1 === 2 ? (i+1)+'nd' : i+1 === 3 ? (i+1)+'rd' : (i+1)+'th'}</span>
                    <div className="challenger__profile">
                        <img 
                            alt={challenger.summonerName + ' profile icon'} 
                            src={`https://avatar.leagueoflegends.com/kr/${challenger.summonerName}.png`}>
                        </img>
                        <span> {challenger.summonerName} </span>
                    </div>
                    
                    <span className="challenger__span"> {challenger.leaguePoints} </span>
                    <span className="challenger__span challenger__span--bold"> {((wins / losses) * 100).toFixed(2) + '%'} </span>
                    <span className="challenger__span"> {wins} </span>
                    <span className="challenger__span"> {losses} </span>
                    
                </div>)
            )
        }

        return renderedChallenger
    }

    render(){
        return(
            <div className="challengers">
                {this.renderChallenger()}
            </div>
        )
    }
}
class Leaderboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            summonerName: '',
            summonerNameSet: '',
            summonerInfo: null,
            stillLoading: undefined,
            initPage: true,
            challengerLeague: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({
            summonerName: event.target.value
        })
    }

    handleSubmit = async (event) => {
        //console.log(this.state.summonerName)
        event.preventDefault()

        const summonerNameFromForm = this.state.summonerName
        this.setState({
            stillLoading: true,
            summonerNameSet: summonerNameFromForm,
        })
        
        this.getSummonerInfo()
        // fetch(proxyurl + byName)
        // .then( response => {
        //     return response.json()
        // })
        // .then( data => {
        //     console.log(data)
        // }).catch(error => console.log(error))

        
    }

    async componentDidMount(){
        // fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/%EC%9D%91%EC%8A%B7%EC%9D%918?api_key=${apiKey}`)
        // .then( response => {
        //     return response.json()
        // })
        // .then( data => {
        //     console.log(data)
        // })

        try{
            const challenger =  await axios.get(`${proxyUrl}https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_TFT?api_key=${apiKey}`)
            let max10th = []
            for(let i = 0; i < 10; i++){
                max10th[i] = 0
            }

            const challengerEntries = challenger.data.entries

            challengerEntries.sort( (a,b) => {
                return b.leaguePoints - a.leaguePoints
            })

            max10th = challengerEntries.slice(0, 10)
            this.setState({
                challengerLeague: max10th
            })
            console.log(max10th)

        }catch(error){
            console.log(error)
        }

    }

    async getSummonerId() {
        const summonerNameFromForm = this.state.summonerName
        
        try{
            //console.log(`${proxyUrl}${getIdUrl}${summonerNameFromForm}?api_key=${apiKey}`)
            return await axios.get(`${proxyUrl}${getIdUrl}${summonerNameFromForm}?api_key=${apiKey}`)
        }catch(error){
            console.log(error)
        }
    }

    async getSummonerInfo(){
        let summonerId = null

        const resultSummonerId = await this.getSummonerId()
        console.log(resultSummonerId)
        if(resultSummonerId){
            summonerId = resultSummonerId.data.id
            const bySummonerID = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
            try{
            const resultSummonerInfo =  await axios.get(`${proxyUrl}${bySummonerID}`)
            const summonerInfoData = resultSummonerInfo.data.filter( rankData => {
                    return rankData.queueType === 'RANKED_TFT'
            })
            this.setState({
                summonerInfo: summonerInfoData[0],
                stillLoading: false,
            })
            //console.log(summonerInfoData[0])
            
            }catch(error){
                console.log(error)
            }
        }else{
            this.setState({
                summonerInfo: null,
                stillLoading: false,
                initPage: false,
            })       
    
        }


    }
    //<i class="material-icons">search</i>
    //<input className="summonerSearch__button" type="submit" value="Search"/>
    render(){
        return (
            <section className="leaderboard">
                <h1>Challenger Leader board</h1>
                <form className="summonerSearch" onSubmit={this.handleSubmit}>
                    <input 
                        className="summonerSearch__input"
                        type="text" 
                        name="summonerName" 
                        placeholder="Summoner name" 
                        value={this.state.summonerName} 
                        onChange={this.handleChange}
                    />
                    <button className="summonerSearch__button" type="submit"><i className="material-icons">search</i></button>
                </form>
                <SummonerInfo
                    stillLoading={this.state.stillLoading}
                    summonerInfo={this.state.summonerInfo}
                    summonerName={this.state.summonerNameSet}
                    initPage={this.state.initPage}
                />

                <ChallengerInfo
                    challengers={this.state.challengerLeague}
                />
            </section>
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
            activeTab: this.props.children[1].props.label
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
                <nav className="tabs">
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
                </nav>
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
