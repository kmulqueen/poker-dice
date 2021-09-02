import { randomNumber, isValidRoll } from "./helpers/game_helper";
import diceOptions from "./dice.json";
import { useState } from "react";

function App() {
  const [sides, setSides] = useState(diceOptions.length); // The number of sides the dice has
  const [rule, setRule] = useState(""); // The current rule from the roll
  const [description, setDescription] = useState(""); // The description of the current rule from the roll
  const [rolls, setRolls] = useState(
    diceOptions.reduce((acc, option) => {
      acc[option.ruleName] = option.timesRolled;
      return acc;
    }, {})
  ); // Holds rule name as key and times rolled as value. Used to check for valid roll.

  // Sets number of sides on dice
  const setDiceSides = (num) => {
    if (num > diceOptions.length) {
      setSides(diceOptions.length);
    } else if (num <= 0 || isNaN(num)) {
      setSides(1);
    } else {
      setSides(num);
    }
  };

  // Rolls dice & checks for valid roll. If roll isn't valid, re-roll
  const rollDice = () => {
    const pick = diceOptions[randomNumber(sides)];
    if (isValidRoll(rolls, pick)) {
      pick.timesRolled++;
      setRolls({
        ...rolls,
        [pick.ruleName]: pick.timesRolled,
      });
      setRule(pick.ruleName);
      setDescription(pick.description);
    } else {
      rollDice();
    }
  };

  return (
    <div className="App">
      <label htmlFor="dice-side-input">Number of sides on dice</label>
      <input
        type="number"
        name="dice-side-input"
        value={sides}
        onChange={(e) => setDiceSides(e.target.valueAsNumber)}
        min={1}
        max={diceOptions.length}
      />
      <button onClick={rollDice}>Roll Dice</button>
      <h1>{rule}</h1>
      <p>{description}</p>
    </div>
  );
}

export default App;
