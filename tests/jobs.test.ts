import knex from 'knex';
import mockDb from 'mock-knex';
import birthdays from '../app/jobs/birthdays';
import { Model } from 'objection';
import { expect } from 'chai';
import moment from 'moment';
import tk from 'timekeeper';

const db = knex({
    client: 'sqlite3',
});

mockDb.mock(db);
Model.knex(db);

describe('Jobs', () => {
  describe('Birthdays', () => {
    before(async () => {
      const monthDay = moment(new Date()).format('MM-DD');
      await db('friends').insert({
        id: 1,
        first_name: 'T',
        last_name: 'D',
        birthday: `1993-${monthDay}`
      });
      await db('emails').insert({
        id: 1,
        friend_id: 1,
        address: 'td@test.com'
      });
    });

    it('must send 1 email if friend found', async () => {
      const res = await birthdays();
      expect(res).to.eq('successfully sent: 1 messages, failed to send 0');
    });

    it('must send 0 email if friend not found', async () => {
      // TODO
    });

    it('only send 1 email for multiple emails of same friend', async () => {
      // TODO
    });

    it('send 0 email if is_active is false', async () => {
      // TODO
    });

    describe('Leap years', () => {
      before(async () => {
        await db('friends').insert({
          id: 2,
          first_name: 'A',
          last_name: 'B',
          birthday: `2004-02-29`
        });
        await db('emails').insert({
          id: 2,
          friend_id: 2,
          address: 'td@test.com'
        });
      })

      it('must send mail for leap birthdays IF not leap year', async () => {
        tk.travel('2022-02-28');
        const res = await birthdays();
        expect(res).to.eq('successfully sent: 1 messages, failed to send 0');
      })

      it('must send mail for leap birthdays IF leap year', async () => {
        tk.travel('2024-02-28');
        const res = await birthdays();
        expect(res).to.eq('successfully sent: 0 messages, failed to send 0');
      })
    })
  });
});