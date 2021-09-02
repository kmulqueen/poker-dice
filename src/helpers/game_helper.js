import { difference } from "./math_helper";

export const randomNumber = (limit) => {
  return Math.floor(Math.random() * limit);
};

//* isValidRoll makes sure that all rules that are rolled are within 3 counts of eachother
export const isValidRoll = (dice, roll) => {
  for (const key in dice) {
    if (difference(roll.timesRolled, dice[key]) >= 3) {
      return false;
    }
  }
  return true;
};
