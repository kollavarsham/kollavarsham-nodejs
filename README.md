# kollavarsham [![Build Status](https://secure.travis-ci.org/kollavarsham/kollavarsham-nodejs.png?branch=master)](http://travis-ci.org/kollavarsham/kollavarsham-nodejs)

Convert Gregorian date to Kollavarsham date and vice versa

## Getting Started
Install the module with: `npm install kollavarsham`

## Usage

#### As library/module

```javascript
var kollavarsham = require('kollavarsham');
kollvarsham.doStuff();
```

#### As globally installed node.js CLI app

```plain
npm install -g kollavarsham

kollavarsham [options] [arguments]

options
=======
-h --help
   Show this text
-a --show-latitudes
   Display a map of India with the latitudes
-o --show-longitudes
   Display a map of India with the longitudes
-b --bija
   Set Bija to true
-m --mode <0/1>
   0 for Gregorian Calendar Date to Malayalam Calendar Date
   1 for Malayalam Calendar Date to Gregorian Calendar Date
-t --latitude number
   number signifying degrees of Latitude of the location Where the event occurred
   default: 23.2 (Use option --showlatitude for help)
-g --longitude number
   number signifying degrees of Latitude of the location Where the event occurred
   default: 75.8 (Use option --showlongitude for help)
-b --bija <true/false>
   Turn bija on or off. Default off.
-o --output-format <list/verbose>
   list: for dates on both sides of the entered
   verbose: for detailed view of the output date
   (Any other value than 'list' or 'verbose' will be discarded)
arguments
=========
Date
    Input date to be converted. Use the following date formats.
    Date format: DD:MM:YYYY when mode is 0 (Gregorian to Malayalam)
    Date format: DD:MM:YYYY when mode is 1 (Malayalam to Gregorian) where
    DD is the day of the Malayalam month
    MM 01 for Chingam, 02 for Kanni, 03 for Thulam, 04 for Vrischikam, 05 for Dhanu, 06 for Makaram,
       07 for Kumbham, 08 for Meenam, 09 for Medam, 10 for Edavam, 11 for Mithunam, 12 for Karkidakam
    YYYY is the Malayalam Year (Kollavarsham)
```

Resources and Documentation

http://kollavarsham.org

## Documentation
Click [here](http://kollavarsham.org/kollavarsham-nodejs) to visit the API Documentation

## Examples
To convert Modern Date to Kollavarsham Date for Location (100 deg east, 90 deg north with bija and list output:

```
kollavarsham -b -t 90 -g 100 -m 0 -o list 23:08:2008
```

To convert Modern Date to with default settings (Location: Ujjain):

```
kollavarsham 04:04:2011
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 The Kollavarsham Team. Licensed under the MIT license.
