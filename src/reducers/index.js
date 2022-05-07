import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import headerNavbar from './navigation-container-reducers';

const rootReducer = combineReducers({
    form,
    headerNavbar
});

export default rootReducer;