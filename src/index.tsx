import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { chip8Reducer, chip8Sagas } from 'src/chip8/store'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(chip8Reducer, compose(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(chip8Sagas)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
