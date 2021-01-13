import type { StatusTotals } from '../data/content-items';
import { totalsPerStatus } from './status-totals';

describe('totalsPerStatus', () => {
  let statusTotals: StatusTotals;
  beforeEach(() => {
    totalsPerStatus.set({
      STATUS_1: 3,
      STATUS_2: 1,
    });

    totalsPerStatus.subscribe((totals) => (statusTotals = totals));
  });

  it('should increment a total for a status', () => {
    totalsPerStatus.incrementStatusTotals('STATUS_1');
    expect(statusTotals).toMatchInlineSnapshot(`
      Object {
        "STATUS_1": 4,
        "STATUS_2": 1,
      }
    `);
  });

  it('should decrement a total for a status', () => {
    totalsPerStatus.decrementStatusTotals('STATUS_2');
    expect(statusTotals).toMatchInlineSnapshot(`
      Object {
        "STATUS_1": 3,
        "STATUS_2": 0,
      }
    `);
  });
});
