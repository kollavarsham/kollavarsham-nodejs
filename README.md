# [kollavarsham](http://kollavarsham.org/)

[![npm](https://img.shields.io/npm/v/kollavarsham.svg)](https://www.npmjs.com/package/kollavarsham) [![Travis](https://img.shields.io/travis/kollavarsham/kollavarsham-nodejs.svg)](https://travis-ci.org/kollavarsham/kollavarsham-nodejs) [![Code Climate](https://img.shields.io/codeclimate/github/kollavarsham/kollavarsham-nodejs.svg)](https://codeclimate.com/github/kollavarsham/kollavarsham-nodejs/code) [![Code Climate](https://img.shields.io/codeclimate/coverage/github/kollavarsham/kollavarsham-nodejs.svg)](https://codeclimate.com/github/kollavarsham/kollavarsham-nodejs/coverage) [![David](https://img.shields.io/david/kollavarsham/kollavarsham-nodejs.svg)](https://david-dm.org/kollavarsham/kollavarsham-nodejs) [![David](https://img.shields.io/david/dev/kollavarsham/kollavarsham-nodejs.svg)](https://david-dm.org/kollavarsham/kollavarsham-nodejs#info=devDependencies&view=table)

Convert Gregorian date to Kollavarsham date and vice versa

## Getting Started
Install the module with: `npm install kollavarsham`

## Usage

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

## Documentation
Click [here](http://kollavarsham.org/kollavarsham-nodejs) to visit the API Documentation

## CLI app

Check out the [cli](https://www.npmjs.com/package/kollavarsham-cli) module ([GitHub repo](https://github.com/kollavarsham/cli)) for the `kollavarsham` cross-platform CLI app 

```plain
npm install -g kollavarsham-cli

kollavarsham --help
```

## Contributing
Check the [Contributing](CONTRIBUTING.md) guide.

## Release History
Check out the history at [GitHub Releases](https://github.com/kollavarsham/kollavarsham-nodejs/releases)

## License
Copyright (c) 2014-2015 The Kollavarsham Team. Licensed under the MIT license.
