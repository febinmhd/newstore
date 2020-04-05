const initialState={
    products:[['RED',require('./images/4.jpg'),'50'],
    ['GREEN',require('./images/5.jpg'),'50'],
    ['YELLOW',require('./images/6.jpg'),'50']],
    cart:[]
}


const ShopReducer=(state=initialState,action)=>{
    switch (action.type){
        case "setname":
        state={
            ...state,
            name:action.payload,
        }
        case "setcart":
        state={
            ...state,
            cart:action.payload,
        }
        case "addquantity":
            state={
                ...state,
                cart:[...state.cart,[action.payload]],
            }
            case "delete":
            state={
                ...state,
            }
    }
    
    return state;

}

export default ShopReducer;