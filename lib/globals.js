'use strict';

// TODO:
//  This module is just a starting point to enable an easier porting of the below globals from Perl
//  The below data elements need to be refactored out into the corresponding modules as when possible,

var locations = require('./locations');
var kollavarsham = require('./kollavarsham');

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
  desantara        : ( kollavarsham.settings.longitude - locations.Ujjain.longitude) / 360,

  counter : true
};

module.exports = globals;