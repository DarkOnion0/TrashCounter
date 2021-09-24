# dataT

## Information

- **datasets :**
  - _`data` :_ the data array is always equal to 12 because it represents the year

For more information check the **[`graph.js doc`](https://www.chartjs.org/docs/latest/general/data-structures.html)** for information about the data structure

## Example

```js
{
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "trash18",
      data: [0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "#3788d8",
      stack: "Stack 0",
    },
    {
      label: "trash19",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0],
      backgroundColor: "#ff0d00",
      stack: "Stack 0",
    }
  ]
}
```
