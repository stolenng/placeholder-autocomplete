window.onload = () => {
    createPlaceholderAutocompleteWithContainer({
        containerId: 'test',
        terms: {
            'from': ['georgy', 'artem', 'nandato'],
            'to': ['georgy', 'artem', 'nandato'],
        }
    });

    createPlaceholderAutocomplete({
        inputId: 'input-without-container',
        terms: {
            'from': ['georgy', 'artem', 'nandato'],
            'to': ['georgy', 'artem', 'nandato'],
        }
    });
};


const createPlaceholderInput = () => {
    const realInput = document.createElement('input');
    realInput.type = 'text';
    realInput.classList.add('real-input');

    return realInput;
};

const createPlaceholder = () => {
    const placeholderInput = document.createElement('div');
    placeholderInput.classList.add('placeholder-input');

    return placeholderInput;
};


function closest(arr, textToFind) {
    var matches = arr.filter(function (windowValue) {
        if (windowValue) {
            return windowValue.indexOf(textToFind) >= 0;
        }
    });

    return matches[0] || '';

}

const listenToText = ({input, placeholder, terms}) => {
    const getTextFromEvent = (e) => {
        const currentText = e.target.value;

        let finalString = '';
        const splitTextBySpace = currentText.split(' ');

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

                finalString += `${key}:${value} `;

                return;
            }

            //key + value
            if (splitTextByColon.length === 2) {
                const key = splitTextByColon[0];
                const textValue = splitTextByColon[1];
                const allValues = Object.values(terms[key]);

                if (textValue.indexOf(',') === -1) {
                    const valueToShow = closest(allValues, textValue);
                    finalString += `${key}:${valueToShow || textValue}`;
                } else {
                    // if it has commas -> multiple values
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
                const closestKey = closest(allKeys, key);
                const keyName = closestKey;

                if (!keyName) {
                    return;
                }

                finalString += `${keyName}:${terms[keyName][0]}`;
                return;
            }

        });

        if (e.key === 'Tab') {
            input.value = finalString;
        }

        return finalString;

    }

    const handleInput = (e) => {
        const result = getTextFromEvent(e);

        placeholder.innerText = result;
    };

    const handleTabPress = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();

            const result = getTextFromEvent(e);

            input.value = result;
        }
    }

    input.addEventListener('input', handleInput);
    input.addEventListener('keydown', handleTabPress);
    placeholder.addEventListener('click', () => {
        input.focus();
    })
};

const createPlaceholderAutocompleteWithContainer = ({containerId, terms}) => {
    const rootElement = document.getElementById(containerId);
    rootElement.classList.add('placeholder-autocomplete-container');

    const realInput = createPlaceholderInput();
    const placeholderInput = createPlaceholder();

    rootElement.appendChild(placeholderInput);
    rootElement.appendChild(realInput);

    listenToText({
        input: realInput,
        placeholder: placeholderInput,
        terms
    });
};

const createPlaceholderAutocomplete = ({inputId, styles = {}, terms}) => {
    const realInput = document.getElementById(inputId);
    const placeholderInput = createPlaceholder();

    //set parent css
    realInput.parentElement.style.position = 'relative';
    realInput.parentElement.style.lineHeight = '22px';

    //get css from input to apply on placeholder
    const {fontFamily, width, padding, font, fontWeight} = getComputedStyle(realInput);
    Object.assign(placeholderInput.style, {
        position: 'absolute',
        top: '2px',
        left: '2px',
        opacity: '0.5',
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
