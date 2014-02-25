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
  YugaCivilDays                : true,
  YugaSynodicMonth             : true,
  YugaAdhimasa                 : true,
  YugaTithi                    : true,
  YugaKsayadina                : true,
  lagna                        : true,
  backLastConjunctionAhargana  : -1,
  backNextConjunctionAhargana  : -1,
  backLastConjunctionLongitude : -1,
  backNextConjunctionLongitude : -1,
  paksa                        : true,
  YearKali                     : true,
  YearSaka                     : true,
  YearVikrama                  : true,
  masaNum                      : true,
  sauraMasa                    : true,
  malayalaMasa                 : true, // HP
  malayalaMasaNum              : true, // HP
  tithiDay                     : true,
  ftithi                       : true,
  sriseh                       : true,
  srisem                       : true,
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
  ayanamin                     : true
};

module.exports = globals;