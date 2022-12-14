import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return{
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
    
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null){
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      return {

      }
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) {
        return{
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return {...state, currentOperand: null}
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null || 
        state.currentOperand == null || 
        state.previousOperand == null
        ){
        return state
      }

      return{
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }

  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "??":
      computation = prev / current
      break
    case "x":
      computation = prev * current
      break
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer, 
    {}
    )
 
  return (
    <div className="container">
      <div className='wrapper'>
        <div id='display'>
          <div className='previous-operand'>
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className='current-operand'>{formatOperand(currentOperand)}</div>
        </div>
        <div id='buttons'>
          {/* Row Start */}
          <div className='row'>
            <button className='dos' onClick={()=> dispatch({ type: ACTIONS.CLEAR})}>C</button>
            <button className='col' onClick={()=> dispatch({ type: ACTIONS.DELETE_DIGIT})}>DEL</button>
            <button className='col' >PJE</button>
            
          </div>
          {/* Row Start */}
          <div className='row'>
            <DigitButton digit="7" dispatch={dispatch} />
            <DigitButton digit="8" dispatch={dispatch} />
            <DigitButton digit="9" dispatch={dispatch} />
            <OperationButton operation="??" dispatch={dispatch} />
          </div>
          {/* Row Start */}
          <div className='row'>
            <DigitButton digit="4" dispatch={dispatch} />
            <DigitButton digit="5" dispatch={dispatch} />
            <DigitButton digit="6" dispatch={dispatch} />
            <OperationButton operation="x" dispatch={dispatch} />
          </div>
          <div className='row'>
            <DigitButton digit="1" dispatch={dispatch} />
            <DigitButton digit="2" dispatch={dispatch} />
            <DigitButton digit="3" dispatch={dispatch} />
            <OperationButton operation="-" dispatch={dispatch} />
          </div>
          <div className='row'>
            <DigitButton className='dos' digit="0" dispatch={dispatch} />
            <DigitButton digit="." dispatch={dispatch} />
            <OperationButton operation="+" dispatch={dispatch} />
            <button className='col' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
