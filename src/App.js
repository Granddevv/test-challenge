import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const generateArray = () => {
  let inputArray = []
  for(let index = 0; index < 30; index ++) {
    inputArray.push({
      label: 'Custom Input ' + index,
      value: '',
      name: 'custom-input' + index,
      labelUpdateFlag: false
    })
  }
  return inputArray;
}

function App() {
  let inputArrayValue = generateArray();
  const [ inputArray, setInputArray ] = useState(inputArrayValue)

  const handleSubmit = (evt) => {

  }

  const handleChange = (evt, index) => {
    let updatedInputArray = [...inputArray]
      updatedInputArray[index].value = evt.target.value;
    setInputArray(updatedInputArray);
  }

  const handleClear = () => {
    let updatedArray = inputArray.map(item => {
      item.value = "";
      return item;
    });
    setInputArray(updatedArray);
  }

  const handleClearItem = (index) => {
    let updatedArray = [...inputArray];
    updatedArray[index].value = ''

    setInputArray(updatedArray);
  }

  const handleUpdateLabel = (index, flagValue) => {
    let updatedArray = [...inputArray];
    updatedArray[index].labelUpdateFlag = flagValue;
    setInputArray(updatedArray)
  }

  const handleChangeLabel = (evt, index) => {
    let updatedArray = [...inputArray];
    updatedArray[index].label = evt.target.value;
    setInputArray(updatedArray)
  }

  return (
    <div className="App">
      <form action="/rest" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          {inputArray.map((inputItem, index) => (
            <div className="line-input-container" key={"key-input-" + index}>
              <div className="label-container">
                {!inputItem.labelUpdateFlag && <span className="input-title" onClick={() => handleUpdateLabel(index, true)}>{inputItem.label}: </span>}
                {inputItem.labelUpdateFlag && <>
                  <input value={inputItem.label} onChange={(evt) => handleChangeLabel(evt, index)} onBlur={() => handleUpdateLabel(index, false)} />
                </>}
              </div>
              <input name={inputItem.name} value={inputItem.value} onChange={(evt) => handleChange(evt, index)} />
              <span className="close-button" onClick={() => handleClearItem(index)}>&#9747;</span>
            </div>
          ))}
        </div>
        <div className="footer-wrapper">
          <button type="submit">Submit</button>
          <button onClick={() => handleClear()}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default App;
