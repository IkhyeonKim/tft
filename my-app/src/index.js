import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';




function RecipePicture(props) {
    return(
        <img className="recipe__items--round" src={`/img/${props.itemName}.png`}></img>
    )
}

class ItemRecipes extends React.Component {
    
    renderImg(itemName){
        return(
            <RecipePicture
                key={itemName}
                itemName={itemName}
            />
        )
    }
    
    render(){
        const itemArray = [
            'B.F._Sword',
            'Recurve_Bow',
            'Chain_Vest',
            'Negatron_Cloak',
            'Needlessly_Large_Rod',
            'Tear_of_the_Goddess',
            'Giant\'s_Belt',
            'Spatula'
        ]
        const itemPictures = []
        itemArray.forEach( (item) => {
            itemPictures.push(this.renderImg(item))
        } )
        return itemPictures
    }
}


class TeamFightTactical extends React.Component {
    constructor(props){
        super(props)
    }


    render(){
        return (
            <div className="recipe">
                <div className="recipe__box"></div>
                <div className="recipe__items">
                    <ItemRecipes/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<TeamFightTactical />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
