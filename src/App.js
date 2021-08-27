import {randomNumber} from './helpers/helper';
import diceOptions from './dice.json';
import {useState} from 'react';

function App() {
  const [sides, setSides] = useState(6)
  const [rule, setRule] = useState("")
  const [description, setDescription] = useState("")

  const setDiceSides = (num) => {
    if (num > diceOptions.length) {
      setSides(diceOptions.length)
    } else if(num <= 0 || isNaN(num)) {
      setSides(1)
    } else {
      setSides(num)
    }
  }

  const rollDice = () => {
    const pick = diceOptions[randomNumber(sides)]
    setRule(pick.ruleName)
    setDescription(pick.description)
  }

  return (
    <div className="App">
      <label htmlFor="dice-side-input">Number of sides on dice</label>
      <input type="number" name="dice-side-input" value={sides} onChange={e => setDiceSides(e.target.valueAsNumber)} min={1} max={diceOptions.length}/>
      <button onClick={rollDice}>Roll Dice</button>
      <h1>{rule}</h1>
      <p>{description}</p>
    </div>
  );
}

export default App;
