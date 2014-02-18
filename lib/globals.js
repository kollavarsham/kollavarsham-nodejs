/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

// TODO:
//  This module is just a starting point to enable an easier porting of the below globals from Perl
//  The below data elements need to be refactored out into the corresponding modules as when possible,
var globals = {
  planet           : true,
  YugaCivilDays    : true,
  YugaSynodicMonth : true,
  YugaAdhimasa     : true,
  YugaTithi        : true,
  YugaKsayadina    : true,
  lagna            : true,

  backClongAhar  : -1,
  backNclongAhar : -1,
  backClong      : -1,
  backNclong     : -1,

  gregorianDate    : null, // HP
  //    type  paksas :(suklapaksa, krsnapaksa),
  // year              : true, // HP (don't need this anymore)
  // month             : true, // HP (don't need this anymore)
  paksa            : true,

  // (suklapaksa, krsnapaksa),
  // day              : true,              // {for ahargana} // HP (don't need this anymore)
  // ahar             : true,              // {for ahargana} // HP (don't need this anymore)
  // ahargana         : true, // HP (don't need this anymore)
  hours            : true,
  minutes          : true,
  // JulianDay        : true,              // {for Julian days}  // HP (don't need this anymore)
  YearKali         : true,
  YearSaka         : true,
  YearVikrama      : true,
  masaNum          : true,
  sauraMasa        : true,
  // sauraMasaNum     : true, // HP (don't need this anymore)
  // sauraMasaDay     : true, // HP (don't need this anymore)
  malayalaMasa     : true, // HP
  malayalaMasaNum  : true, // HP
  tithiDay         : true,
  mslong           : true,              // {solar position}
  tslong           : true,              // {solar position}
  mllong           : true,              // {lunar position}
  tllong           : true,              // {lunar position}
  clong            : true,
  nclong           : true,
  tithi            : true,
  ftithi           : true,
  // eqtime           : true,              // {for equation of time}  // HP (don't need this anymore)
  sriseh           : true,
  srisem           : true,
  // weekdayName      : true, // HP (don't need this anymore)
  suklaKrsna       : true,
  adhimasa         : true,
  masa             : true,
  naksatra         : true,
  malayalaNaksatra : true, // HP
  samkranti        : true,
  samkrantiYear    : true,
  samkrantiMonth   : true,
  samkrantiDay     : true,
  samkrantiHour    : true,
  samkrantiMin     : true,
  ayanadeg         : true,
  ayanamin         : true,
  desantara        : 0,     // actually it is `(kollavarsham.settings.longitude - locations.Ujjain.longitude) / 360` =~ 0

  counter : true
};

module.exports = globals;