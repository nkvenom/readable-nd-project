import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import { reducer as categories } from './categories'
import { reducer as posts } from './posts'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const reducer = combineReducers({
  categories,
  posts
})

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store