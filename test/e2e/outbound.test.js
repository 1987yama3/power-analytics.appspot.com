import assert from 'assert';
import * as ga from './ga';
import { bindLogAccessors } from './server';

describe('Outbound', () => {
  beforeEach(() => {
    browser.get('/outbound.html');
  });
  it('test', () => {
    assert(true);
  });
});
