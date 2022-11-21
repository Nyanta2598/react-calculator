import React from 'react';

function App() {
  return (
    <div className="container">
      <div className='wrapper'>
        <div id='display'>
          <div className='previous-operand'>s</div>
          <div className='current-operand'>a</div>
        </div>
        <div id='buttons'>
          {/* Row Start */}
          <div className='row'>
            <button className='col span-two'>C</button>
            <button className='col'>DEL</button>
            <button className='col'>%</button>
            <button className='col'>÷</button>
          </div>
          {/* Row Start */}
          <div className='row'>
            <button className='col'>7</button> 
            <button className='col'>8</button>
            <button className='col'>9</button>
            <button className='col'>x</button>
          </div>
          {/* Row Start */}
          <div className='row'>
            <button className='col'>4</button>
            <button className='col'>5</button>
            <button className='col'>6</button>
            <button className='col'>-</button>
          </div>
          <div className='row'>
            <button className='col'>1</button>
            <button className='col'>2</button>
            <button className='col'>3</button>
            <button className='col'>+</button>
          </div>
          <div className='row'>
            <button className='dos'>0</button>
            <button className='col'>.</button>
            <button className='col'>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
