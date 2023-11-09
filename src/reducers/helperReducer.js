import { CREATE_SHOP_MODAL, ERROR_MESSAGE, LOADED, LOADING, PAYMENT_MODAL,VALIDATION_ERROR, RESET_MESSAGES, SUCCESS_MESSAGE, TOPBAR_STATUS, COUNTER } from "../action/type";

const initState = {
    topBarStatus: false,
    createShopModal: false,
    validationError: null,
    error: null,
    success: null,
    loading: false,
    paymentModal: false,
    counter: null,
}
export default (state = initState , action) => {
    switch (action.type) {
        case TOPBAR_STATUS:
            return{
                ...state, 
                topBarStatus: action.payload,
            };
        case CREATE_SHOP_MODAL:
            return{
                ...state, 
                createShopModal: action.payload,
            };
        case PAYMENT_MODAL:
            return{
                ...state, 
                paymentModal: action.payload,
            };
        case ERROR_MESSAGE:
            return{
                ...state, 
                error: action.payload,
            };
        case SUCCESS_MESSAGE:
            return{
                ...state, 
                success: action.payload,
            };
        case LOADING:
            return{
                ...state, 
                loading: true,
            };
        case LOADED:
            return{
                ...state, 
                loading: false,
            };
        case RESET_MESSAGES:
            return {
                ...state,
                error: null,
                success: null,
            }
        case VALIDATION_ERROR:
            return {
                ...state,
                validationError: action.payload,
            }
        case COUNTER:
            return {
                ...state,
                counter: action.payload,
            }
        
            default:
                return state;
        }
    }