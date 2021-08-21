# stats

This object contains all the stats of the app displayed in the stats tab

## Information

- **stored in :** _`localStorage`_
- **state :** _`unique to the app`_
- **attribute :**
  - _`minYear` :_ any valid number representing a year
  - _`maxYear` :_ any valid number representing a year
  - _`year` :_ An object containing all the year
    - _`YEAR` :_ An array containing the MONTH
      - _`month` :_ the month name
      - _`trashName` :_ the trash name with how many trashes there are in the month as a value
      - _`trashNameColor` :_ the trash color

## Example

```json
{
  "minYear": 2020,
  "maxYear": 2021,
  "year": {
    "YEAR": {
      "trashName": [
        {
          "x": "Jan"
          "trash": 2
        }, {
          "x": "May"
          "trash": 15
        }
      ],
      "trashName": [
        {
          "x": "Feb"
          "trash": 8
        }, {
          "x": "Jul"
          "trash": 1
        }
      ]
    }
  }
}
```
