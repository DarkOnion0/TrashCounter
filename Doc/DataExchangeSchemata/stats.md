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
      - _`trashName` :_ the trash name containing an array of 12 values representing a full year counting each trash use

## Example

```json
{
  "minYear": 2020,
  "maxYear": 2021,
  "year": {
    "YEAR": {
      "trashName": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      "trashName2": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  }
}
```
