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
  YugaCivilDays    : true,
  YugaSynodicMonth : true,
  YugaAdhimasa     : true,
  YugaTithi        : true,
  YugaKsayadina    : true,
  lagna            : true,

  backLastConjunctionAhargana  : -1,
  backNextConjunctionAhargana  : -1,
  backLastConjunctionLongitude : -1,
  backNextConjunctionLongitude : -1,

  //    type  paksas :(suklapaksa, krsnapaksa),
  // year              : true, // HP (don't need this anymore)
  // month             : true, // HP (don't need this anymore)
  paksa                        : true,

  // (suklapaksa, krsnapaksa),
  // day              : true,              // {for ahargana} // HP (don't need this anymore)
  // ahar             : true,              // {for ahargana} // HP (don't need this anymore)
  // ahargana         : true, // HP (don't need this anymore)
  hours                        : true,
  minutes                      : true,
  // JulianDay        : true,              // {for Julian days}  // HP (don't need this anymore)
  YearKali                     : true,
  YearSaka                     : true,
  YearVikrama                  : true,
  masaNum                      : true,
  sauraMasa                    : true,
  // sauraMasaNum     : true, // HP (don't need this anymore)
  // sauraMasaDay     : true, // HP (don't need this anymore)
  malayalaMasa                 : true, // HP
  malayalaMasaNum              : true, // HP
  tithiDay                     : true,
  meanSolarLongitude           : true,              // {solar position}
  trueSolarLongitude           : true,              // {solar position}
  meanLunarLongitude           : true,              // {lunar position}
  trueLunarLongitude           : true,              // {lunar position}
  lastConjunctionLongitude     : true,
  nextConjunctionLongitude     : true,
  // tithi            : true, // HP (don't need this anymore)
  ftithi                       : true,
  // eqtime           : true,              // {for equation of time}  // HP (don't need this anymore)
  sriseh                       : true,
  srisem                       : true,
  // weekdayName      : true, // HP (don't need this anymore)
  suklaKrsna                   : true,
  adhimasa                     : true,
  masa                         : true,
  naksatra                     : true,
  malayalaNaksatra             : true, // HP
  samkranti                    : true,
  samkrantiYear                : true,
  samkrantiMonth               : true,
  samkrantiDay                 : true,
  samkrantiHour                : true,
  samkrantiMin                 : true,
  ayanadeg                     : true,
  ayanamin                     : true,
  counter                      : true
};

module.exports = globals;