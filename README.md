# eagletrt-telemetria-controller

A controller of the [@eagletrt](https://www.github.com/eagletrt).

**Note:** This repository has been moved to the official **[eagletrt organization](https://www.github.com/eagletrt/eagletrt-telemetria-controller)**.

## Project purpose

The telemetry or eagletrt is in a raspberry plugged to the car. It parses the can and gps messages, 
forwards them via mqtt and saves them in a local mongodb. 

This project is a **temporary solution** for two problems:

* The telemetry should **not save data** when the car is not moving. This **steering-wheel** should control the telemetry abiliting or disabiliting it
* The telemetry should save timestamps in milliseconds since 01/01/1970, but **is not yet connected** to the internet.

## Project solutions

This project is a **NodeJS server** that listens for **mqtt** messages.

The topics are:

* `controller_command`: Listens for a message, to enable or disable the telemetry
* `controller_timestamp`: Listens for a message, to change the raspberry datetime

## How to use it

**On the telemetry**, the project starts automatically on the raspberry with **systemctl**.

**On the user's pc**:

* Clone this repository
* Install __nodejs__
* Open a terminal and move to the root directory of this project
* Execute `npm i`
* To control the telemetry, execute `npm run command STATUS PILOT RACE`, where __STATUS__ is `1` to enabled and `0` to idle, __PILOT__ is the index in the telemetry array of the current pilot and __RACE__ the index in the telemetry array of the current race type.
* To update the telemetry date-time, execute `npm run timestamp`. It will automatically take the date-time from your pc and send the message to update the telemetry one.
