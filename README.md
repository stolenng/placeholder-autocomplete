# placeholder-autocomplete
A library of placeholder autocomplete which allows you to connect to existing inputs from any library or custom ones.

![](placeholder-autocomplete.gif)

## How it works
Each input pair value is being split by spaces, e.g `from:someone to:someone` will be split into 2 groups: `[from:someone, to:someone]`,
then we will take the laast value from this array, split it again by key value seperator `:` and we receive `[to, someone]` and then we take first position as `key` and last as `value`.
Then we access the `terms` object we received by the user via key and give our closet match to the values array.
User can click `Tab` key for autocomplete.
<br>
Before attaching the placeholder we copy the css from the input so it can identical :) 

## Docs - There is only 1 simple function
`createPlaceholderAutocomplete` - the function which we use to create placeholder autocomplete.
<br>
it receives 2 parameters:
- `inputId` - id of the input element.
- `styles` - styles object to append to the placeholder.
- `terms` - key value object which hold key as the term key and the values as rray of values to autocomplete.
<br>
<br>
For Example:
```
createPlaceholderAutocomplete({
        inputId: 'input-without-container',
        terms: {
            'from': ['georgy', 'artem', 'nandato'],
            'to': ['georgy', 'artem', 'nandato'],
        }
    });
``` 

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
