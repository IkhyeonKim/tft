import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

function SingleItem(props) {
    console.log(props.itemName[props.order])
    return (
        <div className="recipe__box--item">
           {props.itemName[props.order] && <img src={`/img/${props.itemName[props.order]}.png`}></img>} 
        </div>
    )
}

function CombinedItem() {
    return <div className="recipe__box--item recipe__box--combined"></div>
}

class RecipeBox extends React.Component {

    render(){
        //console.log(this.props.selectedItem)
        return (
            <div className="recipe__box">
                <SingleItem 
                    key={0}
                    order={0}
                    itemName={this.props.selectedItem}
                />
                <i className="material-icons">add</i>
                <SingleItem
                    key={1}
                    order={1}
                    itemName={this.props.selectedItem}
                />
                <i className="material-icons">arrow_forward</i>
                <CombinedItem/>
            </div>
        )
    }
}


function RecipePicture(props) {
    return(
        <img className="recipe__items--round" src={`/img/${props.itemName}.png`} onClick={() => {props.onClick(props.itemName)}}></img>
    )
}

class ItemRecipes extends React.Component {
    
    renderImg(itemName){
        return(
            <RecipePicture
                key={itemName}
                itemName={itemName}
                onClick={ this.props.onClick}
            />
        )
    }
    
    render(){
        const itemPictures = []
        this.props.itemList.forEach( (item) => {
            itemPictures.push(this.renderImg(item))
        } )
        return (
            <div className="recipe__items">
                {itemPictures}
            </div>
        )
    }
}


class TeamFightTactical extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedItem: Array(2).fill(null),
            currentItem: '',
            itemList: [
                'B.F._Sword',
                'Recurve_Bow',
                'Chain_Vest',
                'Negatron_Cloak',
                'Needlessly_Large_Rod',
                'Tear_of_the_Goddess',
                'Giant\'s_Belt',
                'Spatula'
            ]
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(itemName){
        // From Child to Parent
        const selected = this.state.selectedItem

        if(selected[0] === null){
            selected[0] = itemName
        }else if(selected[1] === null){
            selected[1] = itemName
        }else{
            return
        }

        this.setState( () => {
            return {
                selectedItem: selected,
                currentItem: itemName
            }
        })
        
    }

    componentDidUpdate(prevProps, prevState){

    }

    render(){   
        
        return (
            <div className="recipe">
                <RecipeBox 
                    selectedItem={this.state.selectedItem}
                />
                <ItemRecipes
                    itemList={this.state.itemList}
                    onClick={this.handleClick}
                />
            </div>
        )
    }
}

ReactDOM.render(<TeamFightTactical />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
