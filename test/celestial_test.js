/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var calculations = require('../lib/calculations');
var Celestial = require('../lib/celestial/index');
var celestial;
var calendar = require('../lib/calendar');
var math = require('../lib/math');

var settings = {
  latitude     : 23.2,
  longitude    : 75.8,
  outputformat : 'verbose'
};

var runCalculationsWithADate = function () {
  calculations.fromGregorian(settings, new Date(2014, calendar.months.February, 11));
};

exports.celestial = {
  setUp                                   : function (done) {
    celestial = new Celestial(settings);
    done();
  },
  'threeRelation'                         : function (test) {
    test.expect(4);
    test.equal(celestial.threeRelation(-1, 1, 3), 1);
    test.equal(celestial.threeRelation(1, -1, -3), -1);
    test.equal(celestial.threeRelation(1, 1, 1), 0);
    test.equal(celestial.threeRelation(1, 5, -3), 0); //invalid scenario
    test.done();
  },
  'getTithi'                              : function (test) {
    test.expect(6);
    test.ok(math.floatingPointEqual(celestial.getTithi(37.5275236212135, 294.989551683806), 8.54483099478396));
    test.ok(math.floatingPointEqual(celestial.getTithi(45.9229472947752, 333.593757395798), 6.02743249158144));
    test.ok(math.floatingPointEqual(celestial.getTithi(123.3068304585275, 15.597297524597), 8.97579441116087));
    test.ok(math.floatingPointEqual(celestial.getTithi(15.5275236212135, 163.989551683806), 17.6281643281173));
    test.ok(math.floatingPointEqual(celestial.getTithi(245.9229472947752, 3.593757395798), 20.1940991582481));
    test.ok(math.floatingPointEqual(celestial.getTithi(302.3068304585275, 56.597297524597), 20.4757944111609));
    test.done();
  },
  'getMandaEquation'                      : function (test) {
    test.expect(44);
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(216.448410870245, 'sun'), -1.30810722363905));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(-72.3184309200178, 'moon'), -4.83281883352571));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(150.807334962742, 'moon'), 2.47190852495064));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(206.122810882618, 'sun'), -0.969422483995786));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(203.067198238109, 'moon'), -1.98547851952987));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(210.065221570941, 'sun'), -1.10305954670912));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(176.937266597806, 'moon'), 0.270697085906033));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.094016226779, 'sun'), -1.03685394627977));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(163.872300782873, 'moon'), 1.40749058746745));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(207.108413554698, 'sun'), -1.00328649380511));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(190.002232417937, 'moon'), -0.880005747995446));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(209.07961889886, 'sun'), -1.07011491083048));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(176.937266597806, 'moon'), 0.270697085906033));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.094016226779, 'sun'), -1.03685394627977));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(170.404783692979, 'moon'), 0.844536073585857));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(207.601214890739, 'sun'), -1.02010791244252));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(183.469749507872, 'moon'), -0.306629778128034));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.58681756282, 'sun'), -1.05352335673225));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(176.937266597806, 'moon'), 0.270697085906033));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.094016226779, 'sun'), -1.03685394627977));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(190.002232417937, 'moon'), -0.880005747995446));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(209.07961889886, 'sun'), -1.07011491083048));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(183.469749507872, 'moon'), -0.306629778128034));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.58681756282, 'sun'), -1.05352335673225));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(180.203508055438, 'moon'), -0.0179953506933944));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.340416894636, 'sun'), -1.04519830661684));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(186.735990965544, 'moon'), -0.594275735600709));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.833218230676, 'sun'), -1.06182894265887));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(183.469749507872, 'moon'), -0.306629778128034));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.58681756282, 'sun'), -1.05352335673225));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(176.937266597806, 'moon'), 0.270697085906033));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.094016226779, 'sun'), -1.03685394627977));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(180.203508055438, 'moon'), -0.0179953506933944));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(208.340416894636, 'sun'), -1.04519830661684));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(83.931123946793, 'mercury'), 4.59454849262788));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(81.6338497004791, 'mercury'), 4.57122541974445));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(191.523444971968, 'venus'), -0.365635863559596));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(191.706262903748, 'venus'), -0.37135641118768));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(34.7045977141798, 'mars'), 6.67523064837691));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(31.3669823899913, 'mars'), 6.10047750894678));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(-91.5542432559879, 'jupiter'), -5.17767683561233));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(-88.9654048381817, 'jupiter'), -5.17874093000353));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(-42.8326673204595, 'saturn'), -5.25521105975762));
    test.ok(math.floatingPointEqual(celestial.getMandaEquation(-40.2050617905807, 'saturn'), -4.98912071710793));
    test.done();
  },
  'declination'                           : function (test) {
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
  'getTllong'                             : function (test) {
    test.expect(14);
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2299158.5), 167.084587116821));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2299159.5), 179.618866280373));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2299160.5), 191.953219840454));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2299161.5), 204.131519861513));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2361220.5), 349.195739637822));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2361221.5), 1.82309136307406));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2361222.5), 14.6945040053245));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(1721457.5), 6.55724149356419));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2456656.5), 16.24829446685));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2456657.5), 29.8253740270552));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2455957.5), 156.709071062542));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2456351.5), 316.081404838166));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2455985.5), 165.854323537076));
    test.ok(math.floatingPointEqual(celestial.getTrueLunarLongitude(2433313.5), 236.806759936797));
    test.done();
  },
  'getTslong'                             : function (test) {
    test.expect(14);
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2299158.5), 215.330481398828));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2299159.5), 216.345092245966));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2299160.5), 217.360117559963));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2299161.5), 218.375548627069));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2361220.5), 183.139229101953));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2361221.5), 184.136821438217));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2361222.5), 185.135030298228));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(1721457.5), 355.302664567532));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2456656.5), 288.309252298232));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2456657.5), 289.32751969395));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2455957.5), 320.200309773426));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2456351.5), 348.803993428264));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2455985.5), 348.072902270539));
    test.ok(math.floatingPointEqual(celestial.getTrueSolarLongitude(2433313.5), 322.249740952942));
    test.done();
  },
  'getMeanLongitude'                      : function (test) {
    test.expect(14);
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
  },
  'getTrueLongitude'                      : function (test) {
    runCalculationsWithADate();
    test.expect(70);
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710693, 215.330481398828, 'mercury'), 290.256193246842));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710694, 216.345092245966, 'mercury'), 287.939466847665));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710695, 217.360117559963, 'mercury'), 285.69872602331));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710696, 218.375548627069, 'mercury'), 283.567766431273));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772755, 183.139229101953, 'mercury'), 292.367822361191));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772756, 184.136821438217, 'mercury'), 293.462095381124));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772757, 185.135030298228, 'mercury'), 294.554161309681));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1132992, 355.302664567532, 'mercury'), 294.330597635538));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1868191, 288.309252298232, 'mercury'), 280.5291286866));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1868192, 289.32751969395, 'mercury'), 281.497932838323));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867492, 320.200309773426, 'mercury'), 285.388042602287));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867886, 348.803993428264, 'mercury'), 308.404674687418));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867520, 348.072902270539, 'mercury'), 312.012169567129));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1844848, 322.249740952942, 'mercury'), 287.862667589296));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710693, 215.330481398828, 'venus'), 324.308933009715));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710694, 216.345092245966, 'venus'), 321.407541005215));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710695, 217.360117559963, 'venus'), 318.226901026202));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710696, 218.375548627069, 'venus'), 314.775291122611));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772755, 183.139229101953, 'venus'), 253.240856229459));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772756, 184.136821438217, 'venus'), 253.582115854346));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772757, 185.135030298228, 'venus'), 253.942554219963));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1132992, 355.302664567532, 'venus'), 331.723144303665));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1868191, 288.309252298232, 'venus'), 344.369387070859));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1868192, 289.32751969395, 'venus'), 344.125688357144));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867492, 320.200309773426, 'venus'), 338.204333524322));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867886, 348.803993428264, 'venus'), 303.63668762932));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867520, 348.072902270539, 'venus'), 343.326701630526));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1844848, 322.249740952942, 'venus'), 289.230030387495));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710693, 215.330481398828, 'mars'), 158.887067202077));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710694, 216.345092245966, 'mars'), 159.240835569617));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710695, 217.360117559963, 'mars'), 159.593872869183));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710696, 218.375548627069, 'mars'), 159.946154425643));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772755, 183.139229101953, 'mars'), 147.311514092937));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772756, 184.136821438217, 'mars'), 147.677928778235));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772757, 185.135030298228, 'mars'), 148.044220074319));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1132992, 355.302664567532, 'mars'), 149.172853178935));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1868191, 288.309252298232, 'mars'), 179.846235661092));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1868192, 289.32751969395, 'mars'), 180.010186773321));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867492, 320.200309773426, 'mars'), 179.72880836255));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867886, 348.803993428264, 'mars'), 158.084536851156));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867520, 348.072902270539, 'mars'), 159.029060106121));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1844848, 322.249740952942, 'mars'), 179.131773264678));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710693, 215.330481398828, 'saturn'), 194.843713150225));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710694, 216.345092245966, 'saturn'), 194.935519951897));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710695, 217.360117559963, 'saturn'), 195.027563651004));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710696, 218.375548627069, 'saturn'), 195.119823966232));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772755, 183.139229101953, 'saturn'), 192.153417342728));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772756, 184.136821438217, 'saturn'), 192.226932462565));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772757, 185.135030298228, 'saturn'), 192.301333486724));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1132992, 355.302664567532, 'saturn'), 201.3134602354));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1868191, 288.309252298232, 'saturn'), 200.822899002374));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1868192, 289.32751969395, 'saturn'), 200.88079361344));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867492, 320.200309773426, 'saturn'), 201.987978576402));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867886, 348.803993428264, 'saturn'), 201.614465529182));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867520, 348.072902270539, 'saturn'), 201.643214770863));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1844848, 322.249740952942, 'saturn'), 202.010337361371));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710693, 215.330481398828, 'saturn'), 194.843713150225));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710694, 216.345092245966, 'saturn'), 194.935519951897));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710695, 217.360117559963, 'saturn'), 195.027563651004));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1710696, 218.375548627069, 'saturn'), 195.119823966232));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772755, 183.139229101953, 'saturn'), 192.153417342728));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772756, 184.136821438217, 'saturn'), 192.226932462565));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1772757, 185.135030298228, 'saturn'), 192.301333486724));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1132992, 355.302664567532, 'saturn'), 201.3134602354));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1868191, 288.309252298232, 'saturn'), 200.822899002374));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1868192, 289.32751969395, 'saturn'), 200.88079361344));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867492, 320.200309773426, 'saturn'), 201.987978576402));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867886, 348.803993428264, 'saturn'), 201.614465529182));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1867520, 348.072902270539, 'saturn'), 201.643214770863));
    test.ok(math.floatingPointEqual(celestial.getTrueLongitude(1844848, 322.249740952942, 'saturn'), 202.010337361371));
    test.done();
  },
  'getElong'                              : function (test) {
    test.expect(70);
    test.ok(math.floatingPointEqual(celestial.getElong(1710693), 168.08719102714));
    test.ok(math.floatingPointEqual(celestial.getElong(1710694), 154.755365716082));
    test.ok(math.floatingPointEqual(celestial.getElong(1710695), 141.463254728984));
    test.ok(math.floatingPointEqual(celestial.getElong(1710696), 128.268162836368));
    test.ok(math.floatingPointEqual(celestial.getElong(1772755), 59.276089124806));
    test.ok(math.floatingPointEqual(celestial.getElong(1772756), 70.8982212421655));
    test.ok(math.floatingPointEqual(celestial.getElong(1772757), 82.3090362371512));
    test.ok(math.floatingPointEqual(celestial.getElong(1132992), 95.3516217819625));
    test.ok(math.floatingPointEqual(celestial.getElong(1868191), 35.3086446106693));
    test.ok(math.floatingPointEqual(celestial.getElong(1868192), 22.4428920586289));
    test.ok(math.floatingPointEqual(celestial.getElong(1867492), 87.4807549325996));
    test.ok(math.floatingPointEqual(celestial.getElong(1867886), 156.157101234428));
    test.ok(math.floatingPointEqual(celestial.getElong(1867520), 67.5269642534404));
    test.ok(math.floatingPointEqual(celestial.getElong(1844848), 154.486799638547));
    test.ok(math.floatingPointEqual(celestial.getElong(1710693), 168.08719102714));
    test.ok(math.floatingPointEqual(celestial.getElong(1710694), 154.755365716082));
    test.ok(math.floatingPointEqual(celestial.getElong(1710695), 141.463254728984));
    test.ok(math.floatingPointEqual(celestial.getElong(1710696), 128.268162836368));
    test.ok(math.floatingPointEqual(celestial.getElong(1772755), 59.276089124806));
    test.ok(math.floatingPointEqual(celestial.getElong(1772756), 70.8982212421655));
    test.ok(math.floatingPointEqual(celestial.getElong(1772757), 82.3090362371512));
    test.ok(math.floatingPointEqual(celestial.getElong(1132992), 95.3516217819625));
    test.ok(math.floatingPointEqual(celestial.getElong(1868191), 35.3086446106693));
    test.ok(math.floatingPointEqual(celestial.getElong(1868192), 22.4428920586289));
    test.ok(math.floatingPointEqual(celestial.getElong(1867492), 87.4807549325996));
    test.ok(math.floatingPointEqual(celestial.getElong(1867886), 156.157101234428));
    test.ok(math.floatingPointEqual(celestial.getElong(1867520), 67.5269642534404));
    test.ok(math.floatingPointEqual(celestial.getElong(1844848), 154.486799638547));
    test.ok(math.floatingPointEqual(celestial.getElong(1710693), 168.08719102714));
    test.ok(math.floatingPointEqual(celestial.getElong(1710694), 154.755365716082));
    test.ok(math.floatingPointEqual(celestial.getElong(1710695), 141.463254728984));
    test.ok(math.floatingPointEqual(celestial.getElong(1710696), 128.268162836368));
    test.ok(math.floatingPointEqual(celestial.getElong(1772755), 59.276089124806));
    test.ok(math.floatingPointEqual(celestial.getElong(1772756), 70.8982212421655));
    test.ok(math.floatingPointEqual(celestial.getElong(1772757), 82.3090362371512));
    test.ok(math.floatingPointEqual(celestial.getElong(1132992), 95.3516217819625));
    test.ok(math.floatingPointEqual(celestial.getElong(1868191), 35.3086446106693));
    test.ok(math.floatingPointEqual(celestial.getElong(1868192), 22.4428920586289));
    test.ok(math.floatingPointEqual(celestial.getElong(1867492), 87.4807549325996));
    test.ok(math.floatingPointEqual(celestial.getElong(1867886), 156.157101234428));
    test.ok(math.floatingPointEqual(celestial.getElong(1867520), 67.5269642534404));
    test.ok(math.floatingPointEqual(celestial.getElong(1844848), 154.486799638547));
    test.ok(math.floatingPointEqual(celestial.getElong(1710693), 168.08719102714));
    test.ok(math.floatingPointEqual(celestial.getElong(1710694), 154.755365716082));
    test.ok(math.floatingPointEqual(celestial.getElong(1710695), 141.463254728984));
    test.ok(math.floatingPointEqual(celestial.getElong(1710696), 128.268162836368));
    test.ok(math.floatingPointEqual(celestial.getElong(1772755), 59.276089124806));
    test.ok(math.floatingPointEqual(celestial.getElong(1772756), 70.8982212421655));
    test.ok(math.floatingPointEqual(celestial.getElong(1772757), 82.3090362371512));
    test.ok(math.floatingPointEqual(celestial.getElong(1132992), 95.3516217819625));
    test.ok(math.floatingPointEqual(celestial.getElong(1868191), 35.3086446106693));
    test.ok(math.floatingPointEqual(celestial.getElong(1868192), 22.4428920586289));
    test.ok(math.floatingPointEqual(celestial.getElong(1867492), 87.4807549325996));
    test.ok(math.floatingPointEqual(celestial.getElong(1867886), 156.157101234428));
    test.ok(math.floatingPointEqual(celestial.getElong(1867520), 67.5269642534404));
    test.ok(math.floatingPointEqual(celestial.getElong(1844848), 154.486799638547));
    test.ok(math.floatingPointEqual(celestial.getElong(1710693), 168.08719102714));
    test.ok(math.floatingPointEqual(celestial.getElong(1710694), 154.755365716082));
    test.ok(math.floatingPointEqual(celestial.getElong(1710695), 141.463254728984));
    test.ok(math.floatingPointEqual(celestial.getElong(1710696), 128.268162836368));
    test.ok(math.floatingPointEqual(celestial.getElong(1772755), 59.276089124806));
    test.ok(math.floatingPointEqual(celestial.getElong(1772756), 70.8982212421655));
    test.ok(math.floatingPointEqual(celestial.getElong(1772757), 82.3090362371512));
    test.ok(math.floatingPointEqual(celestial.getElong(1132992), 95.3516217819625));
    test.ok(math.floatingPointEqual(celestial.getElong(1868191), 35.3086446106693));
    test.ok(math.floatingPointEqual(celestial.getElong(1868192), 22.4428920586289));
    test.ok(math.floatingPointEqual(celestial.getElong(1867492), 87.4807549325996));
    test.ok(math.floatingPointEqual(celestial.getElong(1867886), 156.157101234428));
    test.ok(math.floatingPointEqual(celestial.getElong(1867520), 67.5269642534404));
    test.ok(math.floatingPointEqual(celestial.getElong(1844848), 154.486799638547));
    test.done();
  },
  'getConjunction'                        : function (test) {
    test.expect(70);
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710693), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710694), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710695), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710696), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772755), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772756), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772757), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1132992), 330.403978010768));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1868191), 256.693393501849));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1868192), 256.693393501849));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867492), 278.46912256809));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867886), 327.315683844566));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867520), 308.537344813799));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1844848), 274.457623345507));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710693), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710694), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710695), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710696), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772755), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772756), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772757), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1132992), 330.403978010768));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1868191), 256.693393501849));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1868192), 256.693393501849));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867492), 278.46912256809));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867886), 327.315683844566));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867520), 308.537344813799));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1844848), 274.457623345507));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710693), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710694), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710695), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710696), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772755), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772756), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772757), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1132992), 330.403978010768));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1868191), 256.693393501849));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1868192), 256.693393501849));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867492), 278.46912256809));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867886), 327.315683844566));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867520), 308.537344813799));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1844848), 274.457623345507));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710693), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710694), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710695), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710696), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772755), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772756), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772757), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1132992), 330.403978010768));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1868191), 256.693393501849));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1868192), 256.693393501849));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867492), 278.46912256809));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867886), 327.315683844566));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867520), 308.537344813799));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1844848), 274.457623345507));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710693), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710694), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710695), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1710696), 195.220929584348));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772755), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772756), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1772757), 145.265504902157));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1132992), 330.403978010768));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1868191), 256.693393501849));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1868192), 256.693393501849));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867492), 278.46912256809));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867886), 327.315683844566));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1867520), 308.537344813799));
    test.ok(math.floatingPointEqual(celestial.getConjunction(1844848), 274.457623345507));
    test.done();
  }
};
