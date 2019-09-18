import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import TeamFightTactical from './components/Recipe';
import Leaderboard from './components/LeaderBoard';

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
            marginTop: '2rem'
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
                        <Leaderboard/>
                    </div>
                </Tabs>
            </div>
        )
    }
}



ReactDOM.render(<MyPage />, document.getElementById('root'));