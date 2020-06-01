const createPlaceholder = () => {
    const placeholderInput = document.createElement('div');
    placeholderInput.classList.add('placeholder-input');

    return placeholderInput;
};


const closest = (arr, textToFind) => {
    var matches = arr.filter(function (windowValue) {
        if (windowValue) {
            return windowValue.indexOf(textToFind) >= 0;
        }
    });

    return matches[0] || '';
};

export const getFormattedStringFromInput = ({currentText, terms}) => {
    let finalString = '';
    const splitTextBySpace = currentText.split(' ').filter(Boolean);

    splitTextBySpace.forEach((textBlock, textIndex) => {
        // if empty return
        if (textBlock === '') {
            return;
        }


        const splitTextByColon = textBlock.split(':');

        //if were not last we just show key value no need to check
        if (textIndex !== splitTextBySpace.length - 1) {
            const key = splitTextByColon[0];
            const value = splitTextByColon[1];

            //space in the end between existing combinations
            if (key && value) {
                finalString += `${key}:${value} `;
            } else if (key) {
                finalString += `${key} `;
            }

            return;
        }

        //key + value
        if (splitTextByColon.length === 2) {
            const key = splitTextByColon[0];

            // bad combination amazing user
            if (!terms[key]) {
                finalString = currentText;
                return;
            }

            const textValue = splitTextByColon[1];
            const allValues = Object.values(terms[key]);


            if (textValue.indexOf(',') === -1) {
                const valueToShow = closest(allValues, textValue);
                finalString += `${key}:${valueToShow || textValue}`;
            } else {
                // multiple values
                const splitValueByCommas = textValue.split(',');
                const lastValue = splitValueByCommas.splice(-1);
                const lastValueSimilarFound = closest(allValues, lastValue) || lastValue; // for now default 0
                const allValuesToShow = [...splitValueByCommas, lastValueSimilarFound];
                finalString += `${key}:${allValuesToShow.join(',')}`;
            }

            return;
        }
        // only key
        if (splitTextByColon.length === 1) {
            const key = splitTextByColon[0];
            const allKeys = Object.keys(terms);
            const keyName = closest(allKeys, key);

            if (!keyName) {
                finalString = currentText;
                return;
            }

            finalString += `${keyName}:${terms[keyName][0]}`;
            return;
        }

    });

    return finalString;
};

const listenToText = ({input, placeholder, terms}) => {
    const getTextFromEvent = (e) => {
        const currentText = e.target.value;

        return getFormattedStringFromInput({currentText, terms});
    };

    const handleInput = (e) => {
        placeholder.innerText = getTextFromEvent(e);
    };

    const handleTabPress = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();

            const result = getTextFromEvent(e);

            if (result) {
                input.value = result;
            }
        }
    };

    input.addEventListener('input', handleInput);
    input.addEventListener('keydown', handleTabPress);
    // placeholder.addEventListener('click', () => input.focus());
};

export const createPlaceholderAutocomplete = ({inputId, styles = {}, terms}) => {
    const realInput = document.getElementById(inputId);
    const placeholderInput = createPlaceholder();

    //set parent css
    realInput.parentElement.style.position = 'relative';

    //get css from input to apply on placeholder
    const {fontFamily, width, padding, font, fontWeight} = getComputedStyle(realInput);
    Object.assign(placeholderInput.style, {
        position: 'absolute',
        pointerEvents: 'none',
        opacity: '0.5',
        overflow: 'hidden',
        cursor: 'text',
        userSelect: 'none',
        padding,
        font,
        fontFamily,
        fontWeight,
        width
    }, styles);

    realInput.after(placeholderInput);

    listenToText({
        input: realInput,
        placeholder: placeholderInput,
        terms
    });
};
