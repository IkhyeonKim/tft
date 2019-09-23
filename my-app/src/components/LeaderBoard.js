import React from 'react';
import axios from "axios";

const apiKey = ''
const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const getIdUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`


class SummonerInfo extends React.Component {
    renderResults(profileIconName, summonerInfo) {

        return (
            <div>
                <img alt={profileIconName} src={`https://avatar.leagueoflegends.com/kr/${profileIconName}.png`}></img>
                <p>{summonerInfo.tier}</p>
            </div>
        )
    }
    // this.renderResults(this.props.summonerName, this.props.summonerInfo)
    render() {
        
        return (
            <section className="summonerInfo">
                {
                    this.props.stillLoading ? <p>Loading...</p> : 
                    this.props.summonerInfo ? <ChallengerInfo challengers={this.props.summonerInfo} challengerOrSummoner={'summoner'} /> : 
                    this.props.initPage ? <p>Check your TFT Ranking!</p> : <p>Can't find {this.props.summonerName} name :(</p>
                }
            </section>
        )
    }
}
class ChallengerInfo extends React.Component {
    
    renderChallenger(){
        if(this.props.challengers){

            const inlineStyle = {
                margin: "10px 0 10px 0"
            }
            const challengers = this.props.challengers
            const challengerOrSummoner = this.props.challengerOrSummoner
            const renderedChallenger = []
            renderedChallenger.push(
                (<div className="challenger" style={inlineStyle} key={`firstRow`} >
                    <span className="challenger__span">{challengerOrSummoner === 'challenger' ? 'Rank' : 'Tier'}</span>
                    <span className="challenger__span challenger__span--leftAlign">Name</span>                
                    <span className="challenger__span"> LP </span>
                    <span className="challenger__span challenger__span--bold"> WinRate </span>
                    <span className="challenger__span"> Wins </span>
                    <span className="challenger__span"> Losses </span>
                    
                </div>)
            )
    
            let i = 0
            let challenger 
            do {
                if(challengers.length){
                    challenger = challengers[i]
                }else{
                    challenger = challengers
                }
                const wins = parseInt(challenger.wins)
                const losses = parseInt(challenger.losses)
                
                renderedChallenger.push(
                    (<div className="challenger" key={i} >
                        <span className="challenger__span">
                        { 
                            challengerOrSummoner === 'summoner' ? 
                            challenger.tier + ' ' + challenger.rank : i+1 === 1 ? 
                            (i+1)+'st' : i+1 === 2 ? 
                            (i+1)+'nd' : i+1 === 3 ? 
                            (i+1)+'rd' : (i+1)+'th'
                        }
                        </span>
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
    
                i++
                
            } while (i < challengers.length);

            return renderedChallenger
        }else{
            return
        }
        
    }

    render(){
        return(
            <div className={`challengers ${this.props.challengerOrSummoner === 'summoner' ? 'challengers--white' : ''}`}>
                {this.props.challengers ?  this.renderChallenger() : '' }
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
            initPage: true
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
       
    }

    async componentDidMount(){

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

        }catch(error){
            console.log(error)
        }

    }

    async getSummonerId() {
        const summonerNameFromForm = this.state.summonerName
        
        try{
            return await axios.get(`${proxyUrl}${getIdUrl}${summonerNameFromForm}?api_key=${apiKey}`)
        }catch(error){
            console.log(error)
        }
    }

    async getSummonerInfo(){
        let summonerId = null

        const resultSummonerId = await this.getSummonerId()
        //console.log(resultSummonerId)
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
                    challengers={this.props.challengerLeague}
                    challengerOrSummoner={'challenger'}
                />
            </section>
        )
    }
}

export default Leaderboard