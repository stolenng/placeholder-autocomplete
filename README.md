# placeholder-autocomplete
A library of placeholder autocomplete which allows you to connect to existing inputs from any library or custom ones.

![](placeholder-autcomplete.gif)

## How it works
Each input pair value is being split by spaces, e.g `from:someone to:someone` will be split into 2 groups: `[from:someone, to:someone]`,
then we will take the laast value from this array, split it again by key value seperator `:` and we receive `[to, someone]` and then we take first position as `key` and last as `value`.
Then we access the `terms` object we received by the user via key and give our closet match to the values array.
User can click `Tab` key for autocomplete.
<br>
Before attaching the placeholder we copy the css from the input so it can identical :) 

## Docs - There is only 1 simple function
- `createPlaceholderAutocomplete` - the function which we use to create placeholder autocomplete.
<br>
it receives 2 parameters:
- `inputId` - id of the input element.
- `styles` - styles object to append to the placeholder.
its is optional to pass styles but if need you have full control of the styles. 
- `terms` - key value object which hold key as the term key and the values as rray of values to autocomplete.
- `onSuggestion` - fires a callback on the next suggestion key and value
<br>
<br>
For Example:
<br>

```
createPlaceholderAutocomplete({
        inputId: 'input-without-container',
        terms: {
            'from': ['georgy', 'artem', 'nandato'],
            'to': ['georgy', 'artem', 'nandato'],
        },
        onSuggestion: (obj) => {
            const {key, value} = obj;

            console.log(`key is ${key}`);
            console.log(`value is ${value}`);
        }
    });
``` 

Ideally you should have `input` under 1 parent element, like:
```
<div>
    <input/>
</div>
``` 

Like this it will be easier to the placeholder to position it self behind the text.

# Examples
SOON

## TODOS/IDEAS
- [ ] async fetch term values
- [ ] callback event for key,value, fullText
- [ ] allow autocomplete list also ??
    - [ ] custom
    - [ ] default list
- [ ] allow to pass custom seperators
    - [ ] pair seperator
    - [ ] key value seperator
    - [ ] multiple values seperator
- [ ] create angular example
- [ ] create react example
- [ ] create vue example
- [ ] create angular example

## License 
MIT License.
