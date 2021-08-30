# calendar

This object contains the calendar date of specific trash information

## Information

- **stored in :** _`localStorage`_
- **state :** _`unique to a trash`_
- **formation :** _`calendar`_ **+** _`[VALID_TRASH_NAME_CAPITALIZED]`_
- **evolution during the time :** _`the object is specific to a trash. It follows the trash lifecycle (if the trash is deleted it will be deleted...)`_
- **attribute :**
  - _`title` :_ any valid string **WITHOUT `#`**
  - _`data` :_ any valid string formatting like this `YYYY-MM-DD`

## Example

**`calendarTRASH18`**

```json
[
  {},
  { "title": "trash18", "date": "2021-07-23" },
  { "title": "trash18", "date": "2021-07-13" },
  { "title": "trash18", "date": "2021-07-07" }
]
```

**`calendarTRASH19`**

```json
[
  {},
  { "title": "trash19", "date": "2021-09-23" },
  { "title": "trash19", "date": "2021-07-1" },
  { "title": "trash19", "date": "2021-07-23" }
]
```

**`calendarTRASH20`**

```json
[
  {},
  { "title": "trash20", "date": "2021-08-23" },
  { "title": "trash20", "date": "2021-07-12" },
  { "title": "trash20", "date": "2021-06-07" }
]
```
