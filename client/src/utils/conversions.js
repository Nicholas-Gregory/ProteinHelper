export const gramsToOunces = amount => amount * 0.034274;

export const ouncesToGrams = amount => amount / 0.034274/** 28.3495;*/

export const gramsToPounds = amount => amount * 0.00220462;

export const poundsToGrams = amount => amount * 453.592;

export const ouncesToPounds = amount => amount * 0.0625;

export const poundsToOunces = amount => amount * 16;

export const convertUnitsSameAmount = (from, to, amount) => {
    if (from === 'g') {
        if (to === 'oz') {
            return gramsToOunces(amount);
        } else if (to === 'lb') {
            return gramsToPounds(amount);
        } else if (to === 'g') {
            return amount;
        }
    } else if (from === 'oz') {
        if (to === 'g') {
            return ouncesToGrams(amount);
        } else if (to === 'lb') {
            return ouncesToPounds(amount);
        } else if (to === 'oz') {
            return amount;
        }
    } else if (from === 'lb') {
        if (to === 'g') {
            return poundsToGrams(amount);
        } else if (to === 'oz') {
            return poundsToOunces(amount);
        } else if (to === 'lb') {
            return amount;
        }
    }
}

export const convertAmountSameUnit = (oldAmount, oldDenominator, newDenominator) => oldAmount * newDenominator / oldDenominator;