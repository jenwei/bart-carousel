/** @format */

/**
 * General TODOs
 * - Extract Bart data-gathering logic into separate file
 * - Combine ETD functions as they're quite similar
 * - Add keyboard nav (e.g. left, right key)
 * - DRY up code
 *
 * TODOs re: carousel nav
 * - Consider disabling the button?
 * - (Nice to have) Show loading spinner
 * - Update currentStation to next station in stationsMappedByAbbr
 * - Use getETDsByStation() to update ETD for next station
 * - (Nice to have) Once data is fetched, remove loading spinner + show updated card
 */

/**
 * Local Dev / Testing - use VSCode Live Server
 */

// Public Bart API key
const bartAPI = {
  key: "MW9S-E7SL-26DU-VV8V",
  url: "http://api.bart.gov/api/",
};

var stationsList = [];

// Key stations by abbr
var stationsMappedByAbbr = {};

// Used to keep track of selected station
var currentStationAbbr = undefined;
var currentStationIndex = undefined;

/**
 * BART data-gathering + manipulating
 */
function getAllStations() {
  // https://api.bart.gov/docs/stn/stns.aspx
  const stationsPath = buildResourcePath("stns");
  return fetch(stationsPath)
    .then((response) => response.json())
    .then((json) => json.root.stations.station);
}

function getAllETDs() {
  const allETDPath = buildResourcePath("etd");
  return fetch(allETDPath)
    .then((response) => response.json())
    .then((json) => json.root.station);
}

/**
 * station [String] abbrev
 */
function getETDsByStation(station) {
  const ETDPath = buildResourcePath("etd", { station });
  return fetch(ETDPath)
    .then((response) => response.json())
    .then((json) => json.root.station[0].etd);
}

/**
 * Helper to build Bart resource path
 * @param command [String] @see http://api.bart.gov/docs for list of commands
 * @option station [String] station abbreviation or 'ALL' @see http://api.bart.gov/docs/overview/abbrev.aspx
 * @todo DRY up code (e.g. pass in keys vs hard-coding them in the switch)
 */
function buildResourcePath(command, options = {}) {
  var path = bartAPI.url;
  switch (command) {
    case "stns":
      path += "stn.aspx?cmd=" + command;
      break;
    case "etd":
      path += "etd.aspx?cmd=" + command + "&orig=" + (options.station || "ALL");
      break;
  }
  path += "&key=" + bartAPI.key + "&json=y";
  return path;
}

/**
 * Helper to get all station-related data needed and set it up for card carousel display
 */
function setup() {
  // Get all stations
  getAllStations()
    .then((stationList) => {
      console.log("Populating stations map...");
      stationList.forEach((station) => {
        stationsMappedByAbbr[station.abbr] = {
          ...station,
        };
      });
      console.log("Done population stations map");
      return;
    })
    .then(() => {
      return getAllETDs();
    })
    .then((stationList) => {
      console.log("Adding ETD data...");
      stationList.forEach((station) => {
        stationsMappedByAbbr[station.abbr] = {
          ...stationsMappedByAbbr[station.abbr],
          nextArrivals: station.etd,
        };
      });
      console.log("Done adding ETD data");

      stationsList = Object.values(stationsMappedByAbbr);

      // Default current station shown to first one returned from API
      currentStationAbbr = stationList[0].abbr;
      currentStationIndex = 0;

      return;
    })
    .then(() => updateDisplay());
}

function updateDisplay() {
  console.log(stationsMappedByAbbr);
}

/**
 * General logic
 */

setupData();

// const previous = document.getElementById("previous");
// const next = document.getElementById("next");

// // Populate stations list
// var stationsListElement = document.getElementById("station-list");
// for (const station in stationsMappedByAbbr) {
//   let stationElement = document.createElement("div");
//   stationElement.innerHTML = station.abbr;
//   stationsListElement.appendChild(stationElement);
// }

// DEFAULT to 16th
// var currentStation = '16TH'

/**
 * TODO-dev: Add handling for previous button click
 * - If there is no station before the current one - do nothing (consider disabling the button?)
 * - (Nice to have) Show loading spinner
 * - Update currentStation to previous station in stationsMappedByAbbr
 * - Use getETDsByStation() to update ETD for previous station
 * - (Nice to have) Once data is fetched, remove loading spinner + show updated card
 * 
 * TODO-dev: Add handling for next button click
 * - If there is no station after the current one - do nothing (consider disabling the button?)
 *  * - (Nice to have) Show loading spinner
 * - Update currentStation to next station in stationsMappedByAbbr
 * - Use getETDsByStation() to update ETD for next station
 * - (Nice to have) Once data is fetched, remove loading spinner + show updated card
 * 
 * TODO-dev: Add handling for clicking and highlighting of station in list
 * - Add border around currentStation
 * - When another station is clicked, update currentStation
 * - Remove border styling from previous station and add to selected station
 */

