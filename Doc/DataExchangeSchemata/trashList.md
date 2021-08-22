# trashList

This object contain the trash information

## Information

- **stored in :** _`localStorage`_
- **state :** _`unique to the app`_
- **attribute :**
  - _`name` :_ any valid string **WITHOUT `#`**
  - _`color` :_ any valid css color in the string format
  - _`textColor` :_ any valid css color in the string format
  - _`price` :_ a number representing the price of the trash

## Example

> When the array is not empty

```json
[
  { "name": "trash18", "color": "#3788d8", "textColor": "#ffffff", "price": 9 },
  { "name": "trash19", "color": "#37d7af", "textColor": "#ffffff", "price": 3 },
  { "name": "trash20", "color": "#ff0d00", "textColor": "#ffffff", "price": 6 }
]
```

> When the array is empty

```json
[]
```
