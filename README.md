# kollavarsham [![Build Status](https://secure.travis-ci.org/kollavarsham/kollavarsham-nodejs.png?branch=master)](http://travis-ci.org/kollavarsham/kollavarsham-nodejs)

Convert Gregorian date to Kollavarsham date and vice versa

## Getting Started
Install the module with: `npm install kollavarsham`

## Usage

```
./cli.js [options] [arguments]
options
-h --help 
	Show this text
-m --mode <0/1>
	0 for Gregorian Calendar Date to Malayalam Calendar Date
	1 for Malayalam Calendar Date to Gregorian Calendar Date
-la --Latitude number
	number signifying degrees of Latitude of the location Where the "Date" event occurred
        default: 23.2
-lo --Longitude number
	number signifying degrees of Latitude of the location Where the "Date" event occurred
        default: 75.8
-b --Bija <true/false>
	Turn bija on or off. Default off.
-o --OutputFormat <list/verbose>
        list for dates on both sides of the entered
	verbose for detailed view of the output date

arguments
Date
        Input date to be converted. Use the following date formats. 
	Date format: DDMMYYYY when mode is 0 (Gregorian to Malayalam)
	Date format: DDMMYYYY when mode is 1 (Malayalam to Gregorian) where
		DD is the day of the Malayalam month
                MM 01 for Chingam, 02 for Kanni, 03 for Thulam, 04 for Vrischikam, 05 for Dhanu, 06 for Makaram, 07 for Kumbham, 08 for Meenam, 09 for Medam, 10 for Edavam, 11 for Mithunam, 12 for Karkidakam
		YYYY is the Malayalam Year (Kollavarshan)
```

RESOURCES AND DOCUMENTATION
 http://kollavarsham.org

```javascript
var kollavarsham = require('kollavarsham');
kollavarsham.awesome(); // "awesome"
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Floyd Pink. Licensed under the MIT license.
