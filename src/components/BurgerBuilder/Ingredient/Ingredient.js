import React from 'react';
import './Ingredient.css';
import BreadTop from '../../../assets/images/top.png';
import BreadBottom from '../../../assets/images/bottom.png';
import Beef from '../../../assets/images/beef.png';
import Salad from '../../../assets/images/salad.png';
import Cheese from '../../../assets/images/cheese.png';
import Egg from '../../../assets/images/egg.png';
import Chicken from '../../../assets/images/chicken.png';
import Ketchup from '../../../assets/images/ketchup.png';
import Mayo from '../../../assets/images/mayo.png';



const Ingredient = props => {
    let ingredient = null;

    switch (props.type) {
        case 'bread-top':
            ingredient = <div><img src={BreadTop} alt="Top Bread" /></div>;
            break;
        case 'salad':
            ingredient = <div><img src={Salad} alt="Salad" /></div>;
            break;
        case 'cheese':
            ingredient = <div><img src={Cheese} alt="Cheese" /></div>;
            break;
        case 'egg':
            ingredient = <div><img src={Egg} alt="Egg" /></div>;
            break;
        case 'beef':
            ingredient = <div><img src={Beef} alt="Beef" /></div>;
            break;
        case 'chicken':
            ingredient = <div><img src={Chicken} alt="Chicken" /></div>;
            break;
        case 'ketchup':
            ingredient = <div><img src={Ketchup} alt="Ketchup" /></div>;
            break;
        case 'mayo':
            ingredient = <div><img src={Mayo} alt="Mayo" /></div>;
            break;
        case 'bread-bottom':
            ingredient = <div><img src={BreadBottom} alt="Bottom Bread" /></div>;
            break;
        default:
            ingredient = null;
    }
    return (
        <div className="Ingredient">
            {ingredient}
        </div>
    )
}

export default Ingredient;