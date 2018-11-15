import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { chip8Reducer } from 'src/chip8/store'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(chip8Reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
