import { quotes } from './index'
import { expect } from 'chai';

describe('loadEnvironment', () => {
  it('quotes should exist', () => {
      expect(quotes).to.exist;
  });
});
