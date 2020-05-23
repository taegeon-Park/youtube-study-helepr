import {createStore} from 'redux';

//createstore 안의 function은 reducer
export default createStore(function(state, action) {
    if(state === undefined) {
        return  {
            onExtendNavMod: false,
            onExtendMain: false,
            categoryArr: [],
            noteArr  : [],
            categorySelected: false,
            login: false
        }        
    }

    switch(action.type) {
        case 'LOGIN':
            return Object.assign(state,{login: action.login}); 
        case 'CATEGORYS_LOAD':
            return Object.assign(state,{categoryArr:action.categoryArr});
        case 'NOTES_LOAD':
            return Object.assign(state,{noteArr:action.noteArr});
        case 'NOTES_LOADED':
            return Object.assign(state,{noteArr:action.noteArr});
        case 'EXTEND_NAV':
            return Object.assign(state,{onExtendNavMod:action.onExtendNavMod});
        case 'EXTEND_MAIN':
            return Object.assign(state,{onExtendMain: action.onExtendMain});
        case 'SELECTED_CATEGORY':
            return Object.assign(state,{categorySelected:action.categorySelected});
        default:
            break;
    }
    return state;
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())