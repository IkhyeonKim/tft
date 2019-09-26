import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import TeamFightTactical from './components/Recipe';
import Leaderboard from './components/LeaderBoard';
import Tabs from './components/Tabs'
import axios from "axios";
import * as serviceWorker from './serviceWorker';
import myUtilities from './utilities/apiKey'

const apiKey = myUtilities.getApiKey()
const proxyUrl = myUtilities.proxyUrl

class MyPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            challengerLeague: [],
            challengersProfileIcon: []
        }
    }
    async componentDidMount(){

        try{
            const challenger =  await axios.get(`${proxyUrl}https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_TFT?api_key=${apiKey}`)
            let topTenPlayers = []

            for(let i = 0; i < 10; i++){
                topTenPlayers[i] = 0
            }

            const challengerEntries = challenger.data.entries
            challengerEntries.sort( (a,b) => {
                return b.leaguePoints - a.leaguePoints
            })

            topTenPlayers = challengerEntries.slice(0, 10)

            this.setState({
                challengerLeague: topTenPlayers,
            })

        }catch(error){
            console.log(error)
        }

    }

    render() {
        const flexLayout = {
            display: 'flex',
            justifyContent: 'center'
        }
        const gridInlineStyle = {
            gridColumn: '2 / 3'
        }
        return(
            <div style={flexLayout}>
                <Tabs>
                    <div label="Items" style={gridInlineStyle}>
                        <TeamFightTactical/>
                    </div>
                    <div label="Leader board" style={gridInlineStyle}>
                        <Leaderboard
                            challengerLeague={this.state.challengerLeague}
                        />
                    </div>
                </Tabs>
            </div>
        )
    }
}



ReactDOM.render(<MyPage />, document.getElementById('root'));

serviceWorker.unregister();