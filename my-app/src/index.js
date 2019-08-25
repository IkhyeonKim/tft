import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

function SingleItem(props) {
    //console.log(props.itemName[props.order])
    return (
        <div className="recipe__box--item">
           {props.itemName[props.order] && <img src={`/img/${props.itemName[props.order]}.png`}></img>} 
        </div>
    )
}

function CombinedItem(props) {
    return (
        <div className="recipe__box--item recipe__box--combined">
            {props.newItem && <img src={`/img/${props.newItem}.png`}></img>}
        </div>
    )
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
                <CombinedItem
                    key={2}
                    newItem={this.props.newItem}
                />
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
        this.props.baseItemList.forEach( (item) => {
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
            newItem: null,
            baseItemList: [
                'B_F_Sword',
                'Recurve_Bow',
                'Chain_Vest',
                'Negatron_Cloak',
                'Needlessly_Large_Rod',
                'Tear_of_the_Goddess',
                'Giant_s_Belt',
                'Spatula'
            ],
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(itemName){
        // From Child to Parent
        const selected = this.state.selectedItem
        let newItem = null

        if(selected[0] === null){
            selected[0] = itemName
        }else if(selected[1] === null){
            selected[1] = itemName
        }else{
            return
        }
        
        console.log(selected)
        if(this.isItemBoxFull()){
            newItem = getFullItems(selected[0], selected[1])
        }

        this.setState( () => {
            return {
                selectedItem: selected,
                currentItem: itemName,
                newItem: newItem
            }
        })
        
    }

    isItemBoxFull(){
      
        if(this.state.selectedItem[0] && this.state.selectedItem[1]){
            //newItem = getFullItems(firstItem, secondItem)
            return true
        }else {
            return false
        }
    }

    

    componentDidUpdate(prevProps, prevState){

    }

    render(){   
        //this.isItemBoxFull()
        //this.getFullItems('B_F_Sword', 'Recurve_Bow')
        return (
            <div className="recipe">
                <RecipeBox 
                    selectedItem={this.state.selectedItem}
                    newItem = {this.state.newItem}
                />
                <ItemRecipes
                    baseItemList={this.state.baseItemList}
                    onClick={this.handleClick}
                />
            </div>
        )
    }
}

const getFullItems = (firstItem,secondItem) => {
    let combinedItem = ''
    const fullList = [ 
        'B_F_Sword',
        [['B_F_Sword', 'Infinity_Edge'],
        ['Recurve_Bow','Sword_of_the_Divine'],
        ['Chain_Vest', 'Guardian_Angel'],
        ['Negatron_Cloak', 'The_Bloodthirster'],
        ['Needlessly_Large_Rod', 'Hextech_Gunblade'],
        ['Tear_of_the_Goddess', 'Spear_of_Shojin'],
        ['Giant_s_Belt', 'Zeke_s_Herald'],
        ['Spatula', 'Youmuu_s_Ghostblade']],
        'Recurve_Bow',
        [['B_F_Sword', 'Sword_of_the_Divine'],
        ['Recurve_Bow', 'Rapid_FireCannon'],
        ['Chain_Vest', 'Phantom_Dancer'],
        ['Negatron_Cloak', 'CursedBlade'],
        ['Needlessly_Large_Rod', 'Guinsoo_s_Rageblade'],
        ['Tear_of_the_Goddess', 'Statikk_Shiv'],
        ['Giant_s_Belt', 'Titanic_Hydra'],
        ['Spatula', 'Runaan_s_Hurricane']]
    ]

    // [{ item: 'B_F_Sword', combined: 'Sword_of_the_Divine'}],
    // [{ item: 'Recurve_Bow', combined: 'Rapid_FireCannon'}],
    // [{ item: 'Chain_Vest', combined: 'Phantom_Dancer'}],
    // [{ item: 'Negatron_Cloak', combined: 'CursedBlade'}],
    // [{ item: 'Needlessly_Large_Rod', combined: 'Guinsoo_s_Rageblade'}],
    // [{ item: 'Tear_of_the_Goddess', combined: 'Statikk_Shiv'}],
    // [{ item: 'Giant_s_Belt', combined: 'Titanic_Hydra'}],
    // [{ item: 'Spatula', combined: 'Runaan_s_Hurricane'}]

    for(let i = 0; i< fullList.length; i += 2){ // Check item name in the array above

        if(fullList[i] === firstItem){
            combinedItem = fullList[i+1].filter( item => {
                return item[0] === secondItem
            })
        }
    }
    
    return combinedItem[0][1]
}

ReactDOM.render(<TeamFightTactical />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
