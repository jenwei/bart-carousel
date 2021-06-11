<!-- @format -->

# bart-carousel

A small app that grabs and displays station and arrival information from the [Bart API](https://api.bart.gov/docs/overview/index.aspx)

## Development

### Tools

- VSCode
- [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Steps

To run locally

- Open repo in VSCode
- Right-click `index.html`
- `Open with Live Server`

## Demo

[Link](https://jenwei.github.io/bart-carousel/)

## TODOs

<details><summary>Expand to view all TODOs</summary>

#### General

- [ ] Extract Bart data-gathering logic into separate file
- [ ] Combine ETD functions as they're quite similar
- [ ] Add keyboard nav (e.g. left, right key)
- [ ] DRY up code
- [ ] Handle fast-clicking

#### Carousel

- [ ] Consider disabling the button?
- [ ] (Nice to have) Show loading spinner
- [ ] Update currentStation to next station in stationsMappedByAbbr
- [ ] Use getETDsByStation() to update ETD for next station
- [ ] (Nice to have) Once data is fetched, remove loading spinner + show updated card
- [ ] Animate carousel from left to right, right to left

</details>
