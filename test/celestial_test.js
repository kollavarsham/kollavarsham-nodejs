/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var celestial = require('../lib/celestial.js');
var math = require('../lib/math.js');

exports.celestial = {
  setUp              : function (done) {
    celestial.setPrimaryConstants();
    celestial.setSecondaryConstants();
    celestial.setPlanetaryConstants();
    done();
  },
  'zero360'          : function (test) {
    test.expect(5);
    test.equal(celestial.zero360(75.2), 75.2);
    test.equal(celestial.zero360(-75.2), 284.8);
    test.equal(celestial.zero360(370), 10);
    test.equal(celestial.zero360(0), 0);
    test.equal(celestial.zero360(0.234), 0.234);
    test.done();
  },
  'threeRelation'    : function (test) {
    test.expect(4);
    test.equal(celestial.threeRelation(-1, 1, 3), 1);
    test.equal(celestial.threeRelation(1, -1, -3), -1);
    test.equal(celestial.threeRelation(1, 1, 1), 0);
    test.equal(celestial.threeRelation(1, 5, -3), 0); //invalid scenario
    test.done();
  },
  'getTithi'         : function (test) {
    test.expect(6);
    test.ok(math.floatingPointEqual(celestial.getTithi(37.5275236212135, 294.989551683806), 8.54483099478396));
    test.ok(math.floatingPointEqual(celestial.getTithi(45.9229472947752, 333.593757395798), 6.02743249158144));
    test.ok(math.floatingPointEqual(celestial.getTithi(123.3068304585275, 15.597297524597), 8.97579441116087));
    test.ok(math.floatingPointEqual(celestial.getTithi(15.5275236212135, 163.989551683806), 17.6281643281173));
    test.ok(math.floatingPointEqual(celestial.getTithi(245.9229472947752, 3.593757395798), 20.1940991582481));
    test.ok(math.floatingPointEqual(celestial.getTithi(302.3068304585275, 56.597297524597), 20.4757944111609));
    test.done();
  },
  'getMandaEquation' : function (test) {
    test.expect(44);
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(216.448410870245, "sun"), -1.30810722363905));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(-72.3184309200178, "moon"), -4.83281883352571));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(150.807334962742, "moon"), 2.47190852495064));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(206.122810882618, "sun"), -0.969422483995786));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(203.067198238109, "moon"), -1.98547851952987));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(210.065221570941, "sun"), -1.10305954670912));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(176.937266597806, "moon"), 0.270697085906033));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.094016226779, "sun"), -1.03685394627977));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(163.872300782873, "moon"), 1.40749058746745));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(207.108413554698, "sun"), -1.00328649380511));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(190.002232417937, "moon"), -0.880005747995446));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(209.07961889886, "sun"), -1.07011491083048));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(176.937266597806, "moon"), 0.270697085906033));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.094016226779, "sun"), -1.03685394627977));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(170.404783692979, "moon"), 0.844536073585857));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(207.601214890739, "sun"), -1.02010791244252));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(183.469749507872, "moon"), -0.306629778128034));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.58681756282, "sun"), -1.05352335673225));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(176.937266597806, "moon"), 0.270697085906033));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.094016226779, "sun"), -1.03685394627977));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(190.002232417937, "moon"), -0.880005747995446));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(209.07961889886, "sun"), -1.07011491083048));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(183.469749507872, "moon"), -0.306629778128034));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.58681756282, "sun"), -1.05352335673225));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(180.203508055438, "moon"), -0.0179953506933944));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.340416894636, "sun"), -1.04519830661684));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(186.735990965544, "moon"), -0.594275735600709));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.833218230676, "sun"), -1.06182894265887));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(183.469749507872, "moon"), -0.306629778128034));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.58681756282, "sun"), -1.05352335673225));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(176.937266597806, "moon"), 0.270697085906033));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.094016226779, "sun"), -1.03685394627977));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(180.203508055438, "moon"), -0.0179953506933944));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.340416894636, "sun"), -1.04519830661684));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(83.931123946793, "mercury"), 4.59454849262788));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(81.6338497004791, "mercury"), 4.57122541974445));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(191.523444971968, "venus"), -0.365635863559596));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(191.706262903748, "venus"), -0.37135641118768));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(34.7045977141798, "mars"), 6.67523064837691));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(31.3669823899913, "mars"), 6.10047750894678));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(-91.5542432559879, "jupiter"), -5.17767683561233));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(-88.9654048381817, "jupiter"), -5.17874093000353));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(-42.8326673204595, "saturn"), -5.25521105975762));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(-40.2050617905807, "saturn"), -4.98912071710793));
    test.done();
  },
  'declination'      : function (test) {
    test.expect(7);
    test.ok(math.floatingPointEqual(celestial.declination(31.3101877453024), 12.2026059914001));
    test.ok(math.floatingPointEqual(celestial.declination(42.2597957259723), 15.8742931864835));
    test.ok(math.floatingPointEqual(celestial.declination(59.2349729472294), 20.4565845497204));
    test.ok(math.floatingPointEqual(celestial.declination(62.5975972349908), 21.1677169773821));
    test.ok(math.floatingPointEqual(celestial.declination(80.4818781723799), 23.6492922420057));
    test.ok(math.floatingPointEqual(celestial.declination(121.1497130809087), 20.3707052985127));
    test.ok(math.floatingPointEqual(celestial.declination(320.8687779979979), -14.8738036439391));
    test.done();
  },
  'getTllong':function(test){
    test.expect(14);
    test.ok(math.floatingPointEqual(celestial.getTllong(2299158.5), 167.084587116821));
    test.ok(math.floatingPointEqual(celestial.getTllong(2299159.5), 179.618866280373));
    test.ok(math.floatingPointEqual(celestial.getTllong(2299160.5), 191.953219840454));
    test.ok(math.floatingPointEqual(celestial.getTllong(2299161.5), 204.131519861513));
    test.ok(math.floatingPointEqual(celestial.getTllong(2361220.5), 349.195739637822));
    test.ok(math.floatingPointEqual(celestial.getTllong(2361221.5), 1.82309136307406));
    test.ok(math.floatingPointEqual(celestial.getTllong(2361222.5), 14.6945040053245));
    test.ok(math.floatingPointEqual(celestial.getTllong(1721457.5), 6.55724149356419));
    test.ok(math.floatingPointEqual(celestial.getTllong(2456656.5), 16.24829446685));
    test.ok(math.floatingPointEqual(celestial.getTllong(2456657.5), 29.8253740270552));
    test.ok(math.floatingPointEqual(celestial.getTllong(2455957.5), 156.709071062542));
    test.ok(math.floatingPointEqual(celestial.getTllong(2456351.5), 316.081404838166));
    test.ok(math.floatingPointEqual(celestial.getTllong(2455985.5), 165.854323537076));
    test.ok(math.floatingPointEqual(celestial.getTllong(2433313.5), 236.806759936797));
    test.done();
  },
  'getTslong':function(test){
    test.expect(14);
    test.ok(math.floatingPointEqual(celestial.getTslong(2299158.5), 215.330481398828));
    test.ok(math.floatingPointEqual(celestial.getTslong(2299159.5), 216.345092245966));
    test.ok(math.floatingPointEqual(celestial.getTslong(2299160.5), 217.360117559963));
    test.ok(math.floatingPointEqual(celestial.getTslong(2299161.5), 218.375548627069));
    test.ok(math.floatingPointEqual(celestial.getTslong(2361220.5), 183.139229101953));
    test.ok(math.floatingPointEqual(celestial.getTslong(2361221.5), 184.136821438217));
    test.ok(math.floatingPointEqual(celestial.getTslong(2361222.5), 185.135030298228));
    test.ok(math.floatingPointEqual(celestial.getTslong(1721457.5), 355.302664567532));
    test.ok(math.floatingPointEqual(celestial.getTslong(2456656.5), 288.309252298232));
    test.ok(math.floatingPointEqual(celestial.getTslong(2456657.5), 289.32751969395));
    test.ok(math.floatingPointEqual(celestial.getTslong(2455957.5), 320.200309773426));
    test.ok(math.floatingPointEqual(celestial.getTslong(2456351.5), 348.803993428264));
    test.ok(math.floatingPointEqual(celestial.getTslong(2455985.5), 348.072902270539));
    test.ok(math.floatingPointEqual(celestial.getTslong(2433313.5), 322.249740952942));
    test.done();
  },
  'getMeanLongitude':function(test){
    test.expect();
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15634155, 4320000), 298.54776362783));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15637207, 4320000), 298.547793708385));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15635681, 4320000), 298.547778668108));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15635681, 4320000), 298.547778668108));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15637207, 4320000), 298.547793708385));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15636444, 4320000), 298.547786188246));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15635681, 4320000), 298.547778668108));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15636444, 4320000), 298.547786188246));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15636063, 4320000), 298.547782433088));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15636063, 4320000), 298.547782433088));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15636444, 4320000), 298.547786188246));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15636253, 4320000), 298.54778430592));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15636063, 4320000), 298.547782433088));
    test.ok(math.floatingPointEqual(celestial.getMeanLongitude(1868236.15636253, 4320000), 298.54778430592));
    test.done();
  }
};
