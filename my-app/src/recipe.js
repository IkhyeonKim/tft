import React from 'react';
import ReactDOM from 'react-dom';
import getFullItems from './getItem'

function SingleItem(props) {
    //console.log(props.itemName[props.order])
    return (
        <div className="recipe__box--item">
           {props.itemName[props.order] && <img alt={props.itemName[props.order]} src={`/img/${props.itemName[props.order]}.png`}></img>} 
        </div>
    )
}

function CombinedItem(props) {
    return (
        <div className="recipe__box--item recipe__box--combined">
            {props.newItem && <img alt={props.newItem} src={`/img/${props.newItem}.png`}></img>}
        </div>
    )
}

class RecipeBox extends React.Component {

    render(){

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
    const disabledImg = {
        opacity: .3,
        cursor: 'default'
    }
    return(
        <img 
        className="recipe__items--round"
        style={props.newItem ? disabledImg : null}
        alt={props.itemName}
        src={`/img/${props.itemName}.png`} 
        onClick={() => {props.onClick(props.itemName)}}>
        </img>
    )
}

class ItemRecipes extends React.Component {
    
    renderImg(itemName){
        return(
            <RecipePicture
                key={itemName}
                itemName={itemName}
                onClick={ this.props.onClick}
                newItem={this.props.newItem}
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

class RecipeGuide extends React.Component {
    render(){
        return(
            <div className="recipe__guide">
                <h1>Item Recipes</h1> <button className="recipe__button" onClick={() => this.props.onClick()} >Clear</button>
            </div>
        )
    }
    // onClick={this.props.onClick} vs onClick={() => this.props.onClick()}
}



export default class TeamFightTactical extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedItem: Array(2).fill(null),
            currentItem: null,
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
        this.clearBoxClick = this.clearBoxClick.bind(this)
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
    clearBoxClick(){
        console.log('clear!')
        this.setState({
            selectedItem: Array(2).fill(null),
            currentItem: null,
            newItem: null,
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

    render(){   

        return (

            <div className="recipe">
                <RecipeGuide
                    onClick={this.clearBoxClick}
                />
                <div className="recipe__layout">
                    <RecipeBox 
                        selectedItem={this.state.selectedItem}
                        newItem = {this.state.newItem}
                    />
                    <ItemRecipes
                        baseItemList={this.state.baseItemList}
                        onClick={this.handleClick}
                        newItem = {this.state.newItem}
                    />
                </div>
            </div>
        )
    }
}