import * as actionTypes from './actionTypes';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 30,
    egg: 30,
    beef: 60,
    chicken: 50,
    ketchup: 10,
    mayonnaise: 15,
}

const INITIAL_STATE = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'cheese', amount: 0 },
        { type: 'egg', amount: 0 },
        { type: 'beef', amount: 0 },
        { type: 'chicken', amount: 0 },
        { type: 'ketchup', amount: 0 },
        { type: 'mayonnaise', amount: 0 },
    ],
    totalPrice: 40,
    purchasable: false,
}

export const reducer = (state = INITIAL_STATE, action) => {
    const ingredients = [...state.ingredients];
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) item.amount++;
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
            }
        case actionTypes.REMOVE_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--;
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
            }
        case actionTypes.UPDATE_PURCHASABLE:
            const sum = state.ingredients.reduce((sum, element) => {
                return sum + element.amount;
            }, 0)
            return {
                ...state,
                purchasable: sum > 0,
            }
        default:
            return state;
    }

}