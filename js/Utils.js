import colorLib from 'https://cdn.skypack.dev/@kurkle/color';
import {DateTime} from 'https://cdn.skypack.dev/luxon';
import chartjsAdapterLuxon from 'https://cdn.skypack.dev/chartjs-adapter-luxon';

var _seed = Date.now();

export function srand(seed) {
  _seed = seed;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba'
];

export function months(config) {
  var cfg = config || {};
  var count = cfg.count || 12;
  var section = cfg.section;
  var values = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}

export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

const NAMED_COLORS = [
  CHART_COLORS.red,
  CHART_COLORS.orange,
  CHART_COLORS.yellow,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.purple,
  CHART_COLORS.grey,
];

export function rand(min, max) {
    var seed = _seed;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    _seed = (seed * 9301 + 49297) % 233280;
    return min + (_seed / 233280) * (max - min);
}

export function numbers(config) {
  var cfg = config || {};
  var min = cfg.min || 0;
  var max = cfg.max || 1;
  var from = cfg.from || [];
  var count = cfg.count || 8;
  var decimals = cfg.decimals || 8;
  var continuity = cfg.continuity || 1;
  var dfactor = Math.pow(10, decimals) || 0;
  var data = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + this.rand(min, max);
    if (this.rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

export function randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
} 

export function numbersTrend(config) {
  var data = [];
    for (i = 0; i < config.count; ++i) {
      let start = data.length > 0 ? data[i-1] : config.startingNumber
      let ran = 0;
      if(config.direction ==='up'){
        ran = randomNumber(1,100)
      }else if (config.direction ==='down'){
        ran = randomNumber(-1,-100)
      }
      data[i] = Math.round(start + ran,0);
  }
  return data;
}


export function transparentize(value, opacity) {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}


export function namedColor(index) {
  return NAMED_COLORS[index % NAMED_COLORS.length];
}

export function newDate(days) {
  return DateTime.now().plus({days}).toJSDate();
}

export function newDateString(days) {
  return DateTime.now().plus({days}).toISO();
}

export function parseISODate(str) {
  return DateTime.fromISO(str);
}

