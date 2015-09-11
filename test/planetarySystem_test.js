/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var PlanetarySystem = require('../lib/celestial/planetarySystem/index');

exports.planetarySystem = {
  setUp                          : function (done) {
    done();
  },
  'empty constructor'            : function (test) {
    test.expect(10);
    var ps = new PlanetarySystem();
    test.equal(ps.star.YugaRotation, 1582237800);
    test.equal(ps.sun.YugaRotation, 4320000);
    test.equal(ps.moon.YugaRotation, 57753336);
    test.equal(ps.mercury.YugaRotation, 17937000);
    test.equal(ps.venus.YugaRotation, 7022388);
    test.equal(ps.mars.YugaRotation, 2296824);
    test.equal(ps.jupiter.YugaRotation, 364220);
    test.equal(ps.saturn.YugaRotation, 146564);
    test.equal(ps.candrocca.YugaRotation, 488219);
    test.equal(ps.rahu.YugaRotation, -232226);
    test.done();
  },
  'system is SuryaSiddhanta'     : function (test) {
    test.expect(65);
    var ps = new PlanetarySystem('SuryaSiddhanta');
    test.equal(ps.star.YugaRotation, 1582237800);
    test.equal(ps.sun.YugaRotation, 4320000);
    test.equal(ps.moon.YugaRotation, 57753336);
    test.equal(ps.mercury.YugaRotation, 17937000);
    test.equal(ps.venus.YugaRotation, 7022388);
    test.equal(ps.mars.YugaRotation, 2296824);
    test.equal(ps.jupiter.YugaRotation, 364220);
    test.equal(ps.saturn.YugaRotation, 146564);
    test.equal(ps.candrocca.YugaRotation, 488219);
    test.equal(ps.rahu.YugaRotation, -232226);

    test.equal(ps.star.Rotation, 0);
    test.equal(ps.sun.Rotation, 4320000);
    test.equal(ps.moon.Rotation, 57753336);
    test.equal(ps.mercury.Rotation, 4320000);
    test.equal(ps.venus.Rotation, 4320000);
    test.equal(ps.mars.Rotation, 2296824);
    test.equal(ps.jupiter.Rotation, 364220);
    test.equal(ps.saturn.Rotation, 146564);
    test.equal(ps.candrocca.Rotation, 488219);
    test.equal(ps.rahu.Rotation, -232226);

    test.equal(ps.star.Sighra, 0);
    test.equal(ps.sun.Sighra, 4320000);
    test.equal(ps.moon.Sighra, 0);
    test.equal(ps.mercury.Sighra, 17937000);
    test.equal(ps.venus.Sighra, 7022388);
    test.equal(ps.mars.Sighra, 4320000);
    test.equal(ps.jupiter.Sighra, 4320000);
    test.equal(ps.saturn.Sighra, 4320000);
    test.equal(ps.candrocca.Sighra, 0);
    test.equal(ps.rahu.Sighra, 0);

    test.equal(ps.star.Apogee, 0);
    test.equal(ps.sun.Apogee, 77.28333333333333);
    test.equal(ps.moon.Apogee, 0);
    test.equal(ps.mercury.Apogee, 220.45);
    test.equal(ps.venus.Apogee, 79.83333333333333);
    test.equal(ps.mars.Apogee, 130.03333333333333);
    test.equal(ps.jupiter.Apogee, 171.3);
    test.equal(ps.saturn.Apogee, 236.61666666666667);
    test.equal(ps.candrocca.Apogee, 0);
    test.equal(ps.rahu.Apogee, 0);

    test.equal(ps.star.MandaCircumference, 0);
    test.equal(ps.sun.MandaCircumference, 13.833333333333334);
    test.equal(ps.moon.MandaCircumference, 31.833333333333332);
    test.equal(ps.mercury.MandaCircumference, 29);
    test.equal(ps.venus.MandaCircumference, 11.5);
    test.equal(ps.mars.MandaCircumference, 73.5);
    test.equal(ps.jupiter.MandaCircumference, 32.5);
    test.equal(ps.saturn.MandaCircumference, 48.5);
    test.equal(ps.candrocca.MandaCircumference, 0);
    test.equal(ps.rahu.MandaCircumference, 0);

    test.equal(ps.star.SighraCircumference, 0);
    test.equal(ps.sun.SighraCircumference, 0);
    test.equal(ps.moon.SighraCircumference, 0);
    test.equal(ps.mercury.SighraCircumference, 131.5);
    test.equal(ps.venus.SighraCircumference, 261);
    test.equal(ps.mars.SighraCircumference, 233.5);
    test.equal(ps.jupiter.SighraCircumference, 71);
    test.equal(ps.saturn.SighraCircumference, 39.5);
    test.equal(ps.candrocca.SighraCircumference, 0);
    test.equal(ps.rahu.SighraCircumference, 0);

    test.equal(ps.yuga.CivilDays, 1577917800);
    test.equal(ps.yuga.SynodicMonth, 53433336);
    test.equal(ps.yuga.Adhimasa, 1593336);
    test.equal(ps.yuga.Tithi, 1603000080);
    test.equal(ps.yuga.Ksayadina, 25082280);

    test.done();
  },
  'system is InPancasiddhantika' : function (test) {
    test.expect(65);
    var ps = new PlanetarySystem('InPancasiddhantika');
    test.equal(ps.star.YugaRotation, 1582237828);
    test.equal(ps.sun.YugaRotation, 4320000);
    test.equal(ps.moon.YugaRotation, 57753336);
    test.equal(ps.mercury.YugaRotation, 17937060);
    test.equal(ps.venus.YugaRotation, 7022376);
    test.equal(ps.mars.YugaRotation, 2296832);
    test.equal(ps.jupiter.YugaRotation, 364220);
    test.equal(ps.saturn.YugaRotation, 146568);
    test.equal(ps.candrocca.YugaRotation, 488203);
    test.equal(ps.rahu.YugaRotation, -232238);

    test.equal(ps.star.Rotation, 0);
    test.equal(ps.sun.Rotation, 4320000);
    test.equal(ps.moon.Rotation, 57753336);
    test.equal(ps.mercury.Rotation, 4320000);
    test.equal(ps.venus.Rotation, 4320000);
    test.equal(ps.mars.Rotation, 2296832);
    test.equal(ps.jupiter.Rotation, 364220);
    test.equal(ps.saturn.Rotation, 146568);
    test.equal(ps.candrocca.Rotation, 488203);
    test.equal(ps.rahu.Rotation, -232238);

    test.equal(ps.star.Sighra, 0);
    test.equal(ps.sun.Sighra, 4320000);
    test.equal(ps.moon.Sighra, 0);
    test.equal(ps.mercury.Sighra, 17937060);
    test.equal(ps.venus.Sighra, 7022376);
    test.equal(ps.mars.Sighra, 4320000);
    test.equal(ps.jupiter.Sighra, 4320000);
    test.equal(ps.saturn.Sighra, 4320000);
    test.equal(ps.candrocca.Sighra, 0);
    test.equal(ps.rahu.Sighra, 0);

    test.equal(ps.star.Apogee, 0);
    test.equal(ps.sun.Apogee, 77.28333333333333);
    test.equal(ps.moon.Apogee, 0);
    test.equal(ps.mercury.Apogee, 220.45);
    test.equal(ps.venus.Apogee, 79.83333333333333);
    test.equal(ps.mars.Apogee, 130.03333333333333);
    test.equal(ps.jupiter.Apogee, 171.3);
    test.equal(ps.saturn.Apogee, 236.61666666666667);
    test.equal(ps.candrocca.Apogee, 0);
    test.equal(ps.rahu.Apogee, 0);

    test.equal(ps.star.MandaCircumference, 0);
    test.equal(ps.sun.MandaCircumference, 13.833333333333334);
    test.equal(ps.moon.MandaCircumference, 31.833333333333332);
    test.equal(ps.mercury.MandaCircumference, 29);
    test.equal(ps.venus.MandaCircumference, 11.5);
    test.equal(ps.mars.MandaCircumference, 73.5);
    test.equal(ps.jupiter.MandaCircumference, 32.5);
    test.equal(ps.saturn.MandaCircumference, 48.5);
    test.equal(ps.candrocca.MandaCircumference, 0);
    test.equal(ps.rahu.MandaCircumference, 0);

    test.equal(ps.star.SighraCircumference, 0);
    test.equal(ps.sun.SighraCircumference, 0);
    test.equal(ps.moon.SighraCircumference, 0);
    test.equal(ps.mercury.SighraCircumference, 131.5);
    test.equal(ps.venus.SighraCircumference, 261);
    test.equal(ps.mars.SighraCircumference, 233.5);
    test.equal(ps.jupiter.SighraCircumference, 71);
    test.equal(ps.saturn.SighraCircumference, 39.5);
    test.equal(ps.candrocca.SighraCircumference, 0);
    test.equal(ps.rahu.SighraCircumference, 0);

    test.equal(ps.yuga.CivilDays, 1577917828);
    test.equal(ps.yuga.SynodicMonth, 53433336);
    test.equal(ps.yuga.Adhimasa, 1593336);
    test.equal(ps.yuga.Tithi, 1603000080);
    test.equal(ps.yuga.Ksayadina, 25082252);

    test.done();
  }
};
