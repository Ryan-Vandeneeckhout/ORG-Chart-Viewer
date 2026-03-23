(function(global){
  'use strict';

  const MONTHS = {
    jan:1,january:1,feb:2,february:2,mar:3,march:3,apr:4,april:4,may:5,
    jun:6,june:6,jul:7,july:7,aug:8,august:8,sep:9,september:9,
    oct:10,october:10,nov:11,november:11,dec:12,december:12
  };

  function toString(value){
    return String(value ?? '');
  }

  function pad2(n){
    return String(n).padStart(2, '0');
  }

  function normalizeWhitespace(value){
    return toString(value).trim().replace(/\s+/g, ' ');
  }

  function looksLikeDateString(value){
    const v = normalizeWhitespace(value);
    if (!v) return false;
    return (
      /^\d{4}[-\/.]\d{1,2}[-\/.]\d{1,2}(?:[ T].*)?$/.test(v) ||
      /^\d{1,2}[-\/.]\d{1,2}[-\/.]\d{2,4}(?:[ T].*)?$/.test(v) ||
      /^[A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4}$/.test(v) ||
      /^\d{4}-\d{2}-\d{2}T/.test(v)
    );
  }

  function normalizeDateString(input){
    const raw = normalizeWhitespace(input);
    if (!raw) return raw;

    let s = raw.replace(/[.]/g, '/').replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T.*$/, '$1-$2-$3');

    let m = s.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})(?:\s+.*)?$/);
    if (m) {
      const y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
      if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31) return `${y}-${pad2(mo)}-${pad2(d)}`;
    }

    m = s.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2,4})(?:\s+.*)?$/);
    if (m) {
      let a = Number(m[1]), b = Number(m[2]), y = Number(m[3]);
      if (y < 100) y += (y >= 70 ? 1900 : 2000);
      let mo = a, d = b;
      if (a > 12 && b <= 12) { d = a; mo = b; }
      else if (b > 12 && a <= 12) { mo = a; d = b; }
      if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31) return `${y}-${pad2(mo)}-${pad2(d)}`;
    }

    m = s.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})$/);
    if (m) {
      const mo = MONTHS[m[1].toLowerCase()];
      const d = Number(m[2]), y = Number(m[3]);
      if (mo && d >= 1 && d <= 31) return `${y}-${pad2(mo)}-${pad2(d)}`;
    }

    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
      return `${parsed.getFullYear()}-${pad2(parsed.getMonth() + 1)}-${pad2(parsed.getDate())}`;
    }

    return raw;
  }

  function normalizeNumericString(input){
    const raw = normalizeWhitespace(input);
    if (!raw) return raw;
    if (!/^[+-]?\d+(?:\.\d+)?$/.test(raw)) return raw;

    let sign = '';
    let body = raw;
    if (body[0] === '+' || body[0] === '-') {
      sign = body[0] === '-' ? '-' : '';
      body = body.slice(1);
    }

    let out = '';
    if (body.includes('.')) {
      let [intPart, fracPart] = body.split('.');
      intPart = intPart.replace(/^0+(?=\d)/, '');
      if (!intPart) intPart = '0';
      fracPart = (fracPart || '').replace(/0+$/, '');
      out = fracPart ? `${intPart}.${fracPart}` : intPart;
    } else {
      out = body.replace(/^0+(?=\d)/, '') || '0';
    }

    const finalValue = sign + out;
    return finalValue === '-0' ? '0' : finalValue;
  }

  function stripZerosFromValue(input){
    let s = normalizeWhitespace(input);
    if (!s) return s;
    if (looksLikeDateString(s)) return normalizeDateString(s);
    const numeric = normalizeNumericString(s);
    if (numeric !== s) return numeric;
    return s.replace(/^([+-]?)0+(?=\d)/, '$1');
  }

  function normalizeCsvCell(input){
    const s = normalizeWhitespace(input);
    if (!s) return '';
    if (looksLikeDateString(s)) return normalizeDateString(s);
    return stripZerosFromValue(s);
  }

  function normalizePosition(input){
    const raw = normalizeWhitespace(input);
    if (!raw) return '';
    if (/^\d+$/.test(raw)) return String(Number(raw));
    const normalized = stripZerosFromValue(raw);
    return normalizeWhitespace(normalized);
  }

  function normalizeKey(input, options){
    const opts = options || {};
    let s = normalizeWhitespace(input);
    if (!s) return '';
    if (opts.normalizeDates !== false && looksLikeDateString(s)) s = normalizeDateString(s);
    if (opts.stripLeadingZeros !== false) s = stripZerosFromValue(s);
    if (opts.uppercase !== false) s = s.toUpperCase();
    return s;
  }

  global.CGPNormalize = {
    MONTHS,
    pad2,
    normalizeWhitespace,
    looksLikeDateString,
    normalizeDateString,
    normalizeNumericString,
    stripZerosFromValue,
    normalizeCsvCell,
    normalizePosition,
    normalizeKey
  };
})(window);
