import { ACTIONS } from './App'

export default function OperationButton({ dispatch, operation }){
    return (
        <button className='col' onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>
        {operation}
        </button>
    )
}