import {  SimpleRule } from 'vue3-form-validation';

import { Lengthy } from './types';

const randomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const rules = {
  required:
    (msg: string): SimpleRule =>
    (x) =>
      !x && msg,
  min:
    (min: number) =>
    (msg: string): SimpleRule<Lengthy> =>
    (x) =>
      x.length >= min || msg,
  max:
    (max: number) =>
    (msg: string): SimpleRule<Lengthy> =>
    (x) =>
      x.length <= max || msg,
  minMax:
    (min: number, max: number) =>
    (msg: string): SimpleRule<Lengthy> =>
    (x) =>
      (min <= x.length && x.length <= max) || msg,
};
