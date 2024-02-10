const FACTORS = [
    ['g', 'mg', 1000],
    ['g', 'µg', 1000000],
    ['g', 'oz', 0.035274],
    ['g', 'lb', 0.00220462],
    ['mg', 'µg', 1000],
    ['mg', 'oz', 3.5274e-5],
    ['mg', 'lb', 2.20462e-6],
    ['µg', 'oz', 3.5274e-8],
    ['µg', 'lb', 2.20462e-9],
    ['oz', 'lb', 0.0625]
];

export const convertUnits = (amount, from, to) => {
    const factor = FACTORS.find(factor => factor.some(label => label === from) && factor.some(label => label === to));

    if (factor[0] === from) {
        return amount * factor[2];
    } else {
        return amount / factor[2];
    }
}

export const convertAmount = (oldAmount, oldDenominator, newDenominator) => oldAmount * newDenominator / oldDenominator;