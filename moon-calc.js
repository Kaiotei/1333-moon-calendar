(function (root) {
  var RAD = Math.PI / 180;

  function sin(d) { return Math.sin(d * RAD); }
  function cos(d) { return Math.cos(d * RAD); }

  function dateToJD(date) {
    return date.getTime() / 86400000 + 2440587.5;
  }

  function jdToDate(jd) {
    return new Date((jd - 2440587.5) * 86400000);
  }

  function approxK(date) {
    var y = date.getUTCFullYear() + (date.getUTCMonth() + (date.getUTCDate() - 0.5) / 30) / 12;
    return (y - 2000) * 12.3685;
  }

  function meanJde(k) {
    var T = k / 1236.85;
    var T2 = T * T, T3 = T2 * T, T4 = T3 * T;
    return 2451550.09766 + 29.530588861 * k + 0.00015437 * T2 - 0.000000150 * T3 + 0.00000000073 * T4;
  }

  function jdeOfPhase(k) {
    var T = k / 1236.85;
    var T2 = T * T, T3 = T2 * T, T4 = T3 * T;
    var jde = meanJde(k);
    var E = 1 - 0.002516 * T - 0.0000074 * T2;
    var M = 2.5534 + 29.10535670 * k - 0.0000014 * T2 - 0.00000011 * T3;
    var Mp = 201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4;
    var F = 160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T4;
    var Om = 124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3;
    var A1 = 299.77 + 0.107408 * k - 0.009173 * T2;
    var A2 = 251.88 + 0.016321 * k;
    var A3 = 251.83 + 26.651886 * k;
    var A4 = 349.42 + 36.412478 * k;
    var A5 = 84.66 + 18.206239 * k;
    var A6 = 141.74 + 53.303771 * k;
    var A7 = 207.14 + 2.453732 * k;
    var A8 = 154.84 + 7.306860 * k;
    var A9 = 34.52 + 27.261239 * k;
    var A10 = 207.19 + 0.121824 * k;
    var A11 = 291.34 + 1.844379 * k;
    var A12 = 161.72 + 24.198154 * k;
    var A13 = 239.56 + 25.513099 * k;
    var A14 = 331.55 + 3.592518 * k;

    var frac = k - Math.floor(k);
    if (frac < 0) frac += 1;
    var isQuarter = Math.abs(frac - 0.25) < 0.001 || Math.abs(frac - 0.75) < 0.001;
    var isFull = Math.abs(frac - 0.5) < 0.001;
    var corr = 0;

    if (!isQuarter) {
      if (!isFull) {
        corr =
          -0.40720 * sin(Mp) +
          0.17241 * E * sin(M) +
          0.01608 * sin(2 * Mp) +
          0.01039 * sin(2 * F) +
          0.00739 * E * sin(Mp - M) -
          0.00514 * E * sin(Mp + M) +
          0.00208 * E * E * sin(2 * M) -
          0.00111 * sin(Mp - 2 * F) -
          0.00057 * sin(Mp + 2 * F) +
          0.00056 * E * sin(2 * Mp + M) -
          0.00042 * sin(3 * Mp) +
          0.00042 * E * sin(M + 2 * F) +
          0.00038 * E * sin(M - 2 * F) -
          0.00024 * E * sin(2 * Mp - M) -
          0.00017 * sin(Om) -
          0.00007 * sin(Mp + 2 * M) +
          0.00004 * sin(2 * Mp - 2 * F) +
          0.00004 * sin(3 * M) +
          0.00003 * sin(Mp + M - 2 * F) +
          0.00003 * sin(2 * Mp + 2 * F) -
          0.00003 * sin(Mp + M + 2 * F) +
          0.00003 * sin(Mp - M + 2 * F) -
          0.00002 * sin(Mp - M - 2 * F) -
          0.00002 * sin(3 * Mp + M) +
          0.00002 * sin(4 * Mp);
      } else {
        corr =
          -0.40614 * sin(Mp) +
          0.17302 * E * sin(M) +
          0.01614 * sin(2 * Mp) +
          0.01043 * sin(2 * F) +
          0.00734 * E * sin(Mp - M) -
          0.00515 * E * sin(Mp + M) +
          0.00209 * E * E * sin(2 * M) -
          0.00111 * sin(Mp - 2 * F) -
          0.00057 * sin(Mp + 2 * F) +
          0.00056 * E * sin(2 * Mp + M) -
          0.00042 * sin(3 * Mp) +
          0.00042 * E * sin(M + 2 * F) +
          0.00038 * E * sin(M - 2 * F) -
          0.00024 * E * sin(2 * Mp - M) -
          0.00017 * sin(Om) -
          0.00007 * sin(Mp + 2 * M) +
          0.00004 * sin(2 * Mp - 2 * F) +
          0.00004 * sin(3 * M) +
          0.00003 * sin(Mp + M - 2 * F) +
          0.00003 * sin(2 * Mp + 2 * F) -
          0.00003 * sin(Mp + M + 2 * F) +
          0.00003 * sin(Mp - M + 2 * F) -
          0.00002 * sin(Mp - M - 2 * F) -
          0.00002 * sin(3 * Mp + M) +
          0.00002 * sin(4 * Mp);
      }
    } else {
      corr =
        -0.62801 * sin(Mp) +
        0.17172 * E * sin(M) +
        0.00862 * sin(2 * Mp) +
        0.00804 * sin(2 * F) +
        0.00454 * E * sin(Mp - M) +
        0.00216 * E * E * sin(2 * M) -
        0.00180 * sin(Mp - 2 * F) -
        0.00070 * sin(Mp + 2 * F) -
        0.00040 * sin(3 * Mp) -
        0.00034 * E * sin(2 * Mp - M) +
        0.00032 * E * sin(M + 2 * F) +
        0.00032 * E * sin(M - 2 * F) -
        0.00028 * E * E * sin(Mp + 2 * M) +
        0.00027 * E * sin(2 * Mp + M) -
        0.00017 * sin(Om) -
        0.00005 * sin(Mp - M - 2 * F) +
        0.00004 * sin(2 * Mp + 2 * F) -
        0.00004 * sin(Mp + M + 2 * F) +
        0.00004 * sin(Mp - 2 * M) +
        0.00003 * sin(Mp + M - 2 * F) +
        0.00003 * sin(3 * M) +
        0.00002 * sin(2 * Mp - 2 * F) +
        0.00002 * sin(Mp - M + 2 * F) -
        0.00002 * sin(3 * Mp + M);
      var W =
        0.00306 -
        0.00038 * E * cos(M) +
        0.00026 * cos(Mp) -
        0.00002 * cos(Mp - M) +
        0.00002 * cos(Mp + M) +
        0.00002 * cos(2 * F);
      corr += Math.abs(frac - 0.25) < 0.001 ? W : -W;
    }

    corr +=
      0.000325 * sin(A1) +
      0.000165 * sin(A2) +
      0.000164 * sin(A3) +
      0.000126 * sin(A4) +
      0.000110 * sin(A5) +
      0.000062 * sin(A6) +
      0.000060 * sin(A7) +
      0.000056 * sin(A8) +
      0.000047 * sin(A9) +
      0.000042 * sin(A10) +
      0.000040 * sin(A11) +
      0.000037 * sin(A12) +
      0.000035 * sin(A13) +
      0.000023 * sin(A14);

    return jde + corr;
  }

  function nearestNewK(date) {
    var k = Math.round(approxK(date));
    var jd = dateToJD(date);
    var best = k, bestDiff = Infinity;
    for (var i = k - 2; i <= k + 2; i++) {
      var d = Math.abs(jdeOfPhase(i) - jd);
      if (d < bestDiff) { bestDiff = d; best = i; }
    }
    return best;
  }

  function lastNewK(date) {
    var k = nearestNewK(date);
    var jd = dateToJD(date);
    while (jdeOfPhase(k) > jd) k--;
    while (jdeOfPhase(k + 1) <= jd) k++;
    return k;
  }

  function phaseAt(date) {
    var k = lastNewK(date);
    var jd0 = jdeOfPhase(k);
    var jd1 = jdeOfPhase(k + 1);
    var jd = dateToJD(date);
    var span = jd1 - jd0;
    var age = jd - jd0;
    var phase = age / span;
    if (phase < 0) phase = 0;
    if (phase > 1) phase = 1;
    return {
      k: k,
      phase: phase,
      age: age,
      span: span,
      illumination: (1 - Math.cos(2 * Math.PI * phase)) / 2,
      jdNew: jd0,
      jdNextNew: jd1,
      jdFull: jdeOfPhase(k + 0.5)
    };
  }

  function phaseName(phase) {
    if (phase < 0.03 || phase >= 0.97) return 'New Moon';
    if (phase < 0.22) return 'Waxing Crescent';
    if (phase < 0.28) return 'First Quarter';
    if (phase < 0.47) return 'Waxing Gibbous';
    if (phase < 0.53) return 'Full Moon';
    if (phase < 0.72) return 'Waning Gibbous';
    if (phase < 0.78) return 'Last Quarter';
    return 'Waning Crescent';
  }

  function phaseSymbol(phase) {
    if (phase < 0.03 || phase >= 0.97) return '\u25CF';
    if (phase < 0.22) return '\u263D';
    if (phase < 0.28) return '\u25D1';
    if (phase < 0.47) return '\u25D5';
    if (phase < 0.53) return '\u25CB';
    if (phase < 0.72) return '\u25D4';
    if (phase < 0.78) return '\u25D0';
    return '\u263E';
  }

  function nextPhases(date, count) {
    count = count || 6;
    var k0 = lastNewK(date);
    var jd = dateToJD(date);
    var types = [
      { name: 'New Moon', off: 0 },
      { name: 'First Quarter', off: 0.25 },
      { name: 'Full Moon', off: 0.5 },
      { name: 'Last Quarter', off: 0.75 }
    ];
    var out = [];
    for (var c = k0; c <= k0 + 3 && out.length < count + 4; c++) {
      for (var i = 0; i < types.length; i++) {
        var jde = jdeOfPhase(c + types[i].off);
        if (jde > jd + 0.01) {
          out.push({ type: types[i].name, jd: jde, date: jdToDate(jde) });
        }
      }
    }
    out.sort(function (a, b) { return a.jd - b.jd; });
    return out.slice(0, count);
  }

  root.CovenantMoon = {
    dateToJD: dateToJD,
    jdToDate: jdToDate,
    jdeOfPhase: jdeOfPhase,
    lastNewK: lastNewK,
    nearestNewK: nearestNewK,
    phaseAt: phaseAt,
    phaseName: phaseName,
    phaseSymbol: phaseSymbol,
    nextPhases: nextPhases,
    approxK: approxK
  };
})(typeof window !== 'undefined' ? window : global);
