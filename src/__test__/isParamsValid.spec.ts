import { describe, it, expect } from 'vitest';
import { isParamsValid } from '../utils';
import { Params } from '../types';

describe('isParamsValid', () => {

  it('should return true for valid Params', () => {
    const validParams: Params = {
      id: 'testId',
      question: 'testQuestion',
      options: ['option1', 'option2'],
      element: document.createElement('div'),
    };
    expect(isParamsValid(validParams)).toBe(true);
  });

  it('should return false if id is invalid', () => {
    const invalidParams: Params = {
      id: '',
      question: 'testQuestion',
      options: ['option1', 'option2'],
      element: document.createElement('div'),
    };
    expect(isParamsValid(invalidParams)).toBe(false);
  });

  it('should return false if options is not provided', () => {
    const params = {
      id: 'testId',
      question: 'testQuestion',
      element: document.createElement('div'),
    };
    expect(isParamsValid(params as any)).toBe(false);
  });
  
  it('should return false if options is not an array', () => {
    const params = {
      id: 'testId',
      question: 'testQuestion',
      options: 'notAnArray',
      element: document.createElement('div'),
    };
    expect(isParamsValid(params as any)).toBe(false);
  });

});
