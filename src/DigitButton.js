import { ACTIONS } from './App'

export default function DigitButton({ dispatch, digit}){
    return (
        <button className='col' onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: {digit}})}>
        {digit}
        </button>
    )
}