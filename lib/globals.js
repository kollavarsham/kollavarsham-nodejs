/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 * Temporary module that holds all the Perl global variables
 * @module globals
 * @class globals
 * @static
 */
'use strict';

// TODO:
//  This module is just a starting point to enable an easier porting of the below globals from Perl
//  The below data elements need to be refactored out into the corresponding modules as when possible,
/**
 * @static
 * @type {{planet: boolean, YugaCivilDays: boolean, YugaSynodicMonth: boolean, YugaAdhimasa: boolean, YugaTithi: boolean, YugaKsayadina: boolean, lagna: boolean, back_clong_ahar: number, back_nclong_ahar: number, back_clong: number, back_nclong: number, year: boolean, month: boolean, paksa: boolean, day: boolean, ahar: boolean, ahargana: boolean, hours: boolean, minutes: boolean, JulianDay: boolean, YearKali: boolean, YearSaka: boolean, YearVikrama: boolean, masa_num: boolean, saura_masa_num: boolean, saura_masa_day: boolean, tithi_day: boolean, mslong: boolean, tslong: boolean, mllong: boolean, tllong: boolean, clong: boolean, nclong: boolean, tithi: boolean, ftithi: boolean, eqtime: boolean, sriseh: boolean, srisem: boolean, weekday_name: boolean, sukla_krsna: boolean, adhimasa: boolean, masa: boolean, naksatra: boolean, samkranti: boolean, samkranti_year: boolean, samkranti_month: boolean, samkranti_day: boolean, samkranti_hour: boolean, samkranti_min: boolean, ayanadeg: boolean, ayanamin: boolean, desantara: number, counter: boolean}}
 */
var globals = {
  planet           : true,
  YugaCivilDays    : true,
  YugaSynodicMonth : true,
  YugaAdhimasa     : true,
  YugaTithi        : true,
  YugaKsayadina    : true,
  lagna            : true,

  back_clong_ahar  : -1,
  back_nclong_ahar : -1,
  back_clong       : -1,
  back_nclong      : -1,

  //    type  paksas :(suklapaksa, krsnapaksa),
  year             : true,
  month            : true,
  paksa            : true,

  // (suklapaksa, krsnapaksa),
  day              : true,              // {for ahargana}
  ahar             : true,              // {for ahargana}
  ahargana         : true,
  hours            : true,
  minutes          : true,
  JulianDay        : true,              // {for Julian days}
  YearKali         : true,
  YearSaka         : true,
  YearVikrama      : true,
  masa_num         : true,
  saura_masa_num   : true,
  saura_masa_day   : true,
  tithi_day        : true,
  mslong           : true,              // {solar position}
  tslong           : true,              // {solar position}
  mllong           : true,              // {lunar position}
  tllong           : true,              // {lunar position}
  clong            : true,
  nclong           : true,
  tithi            : true,
  ftithi           : true,
  eqtime           : true,              // {for equation of time}
  sriseh           : true,
  srisem           : true,
  weekday_name     : true,
  sukla_krsna      : true,
  adhimasa         : true,
  masa             : true,
  naksatra         : true,
  // Jovian_Year_north : true,
  // Jovian_Year_south : true,
  samkranti        : true,
  samkranti_year   : true,
  samkranti_month  : true,
  samkranti_day    : true,
  samkranti_hour   : true,
  samkranti_min    : true,
  ayanadeg         : true,
  ayanamin         : true,
  desantara        : 0,     // actually it is `(kollavarsham.settings.longitude - locations.Ujjain.longitude) / 360` =~ 0

  counter : true
};

module.exports = globals;