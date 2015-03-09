# kollavarsham [![NPM version](https://badge.fury.io/js/kollavarsham.png)](http://badge.fury.io/js/kollavarsham) [![Build Status](https://secure.travis-ci.org/kollavarsham/kollavarsham-nodejs.png?branch=master)](http://travis-ci.org/kollavarsham/kollavarsham-nodejs) [![Dependency Status](https://gemnasium.com/kollavarsham/kollavarsham-nodejs.png)](https://gemnasium.com/kollavarsham/kollavarsham-nodejs)

Convert Gregorian date to Kollavarsham date and vice versa

## Getting Started
Install the module with: `npm install kollavarsham`

## Usage

#### As library/module

```javascript
var Kollavarsham = require('kollavarsham');

var options = {
  system: 'SuryaSiddhanta',
  latitude: 10,
  longitude: 76.2,
  outputFormat: 'verbose'
};

var kollavarsham = new Kollavarsham(options);

var todayInMalayalamEra = kollavarsham.fromGregorianDate(new Date());

var today = kollavarsham.toGregorianDate(todayInMalayalamEra);
```

#### As globally installed node.js CLI app

```plain
npm install -g kollavarsham

kollavarsham --help
```

## Documentation
Click [here](http://kollavarsham.org/kollavarsham-nodejs) to visit the API Documentation

## Examples
To convert Modern Date to Kollavarsham Date for Location (100 deg east, 90 deg north using 'InPancasiddhantika' system and list output:

```
kollavarsham -s 'InPancasiddhantika' -t 90 -g 100 -m 0 -o list 23:08:2008
```

To convert Modern Date to with default settings (Location: Ujjain):

```
kollavarsham 04:04:2011
```

## Contributing
Check the [Contributing](CONTRIBUTING.md) guide.

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014-2015 The Kollavarsham Team. Licensed under the MIT license.
