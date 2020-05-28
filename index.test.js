import {getFormattedStringFromInput} from "./index";

describe('placeholder autocomplete', () => {
   it('should format normal string correctly', () => {
       const result = getFormattedStringFromInput({
           currentText: 'fro',
           terms: {
               'from': ['georgy', 'artem']
           }
       });

      expect(result).toEqual('from:georgy');
   });

   it('should format multiple values correctly', () => {
       const result = getFormattedStringFromInput({
           currentText: 'from:georgy,a',
           terms: {
               'from': ['georgy', 'artem', 'test']
           }
       });

       expect(result).toEqual('from:georgy,artem');
   });

   it('should format long string correctly', () => {
       const result = getFormattedStringFromInput({
           currentText: 'from:georgy,art to:artem,test from:someone to:g',
           terms: {
               'from': ['georgy', 'artem', 'test'],
               'to': ['georgy', 'artem', 'test']
           }
       });

       expect(result).toEqual('from:georgy,art to:artem,test from:someone to:georgy');
   })

    it('should show string different than text', () => {
        const result = getFormattedStringFromInput({
            currentText: 'just a simple text',
            terms: {
                'from': ['georgy', 'artem', 'test']
            }
        });

        expect(result).toEqual('just a simple text');
    });
});
