import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import TeamFightTactical from './components/Recipe';
import Leaderboard from './components/LeaderBoard';
import axios from "axios";
import * as serviceWorker from './serviceWorker';
import myUtilities from './utilities/apiKey'

const apiKey = myUtilities.getApiKey()
const proxyUrl = myUtilities.proxyUrl

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
        const styleMaxWidth = {
            maxWidth: '1400px',
            width: '100%',
            boxShadow: '0px 3px 15px rgba(0,0,0,0.5)',
            marginTop: '2rem',
            marginRight: '5px',
            marginLeft: '5px'
        }
        //console.log(this.state.activeTab)
        return (
            <div style={styleMaxWidth}>
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
        this.state = {
            challengerLeague: []
        }
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

serviceWorker.register();