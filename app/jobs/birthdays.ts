import { utc as moment } from 'moment';
import Friend from '../models/friend'
import sendMail from '../messengers/email';

export default async () => {
  let monthDay = `'${moment(new Date()).format('MM-DD')}'`;

  // Include the 29th if it's currently not a leap year and it's the 28th of Feb
  if (!moment().isLeapYear() && monthDay === `'02-28'`) {
    monthDay += `,'02-29'`;
  }

  try {
    // Find friends
    const friends = await Friend.query()
      .select('friends.id', 'friends.first_name', 'emails.address')
      .join('emails', 'emails.friend_id', 'friends.id')
      .where('emails.is_active', 1)
      .whereRaw(
        `strftime('%m-%d', birthday) IN (${monthDay})`
      );

    // Format messages
    const toSend: {
      id: number;
      to: string;
      cc: string[];
      subject: string;
      message: string;
    }[] = [];

    if (friends && friends.length > 0) {
      for (const friend of friends) {
        const found = toSend.find(ts => ts.id === friend.id);
        if (found) {
          found.cc.push(friend.address);
        } else {
          toSend.push({
            id: friend.id,
            to: friend.address,
            cc: [],
            subject: 'Happy Birthday!',
            message: `Happy Birthday, dear ${friend.firstName}!`
          })
        }
      }
    }

    // TODO: Add this to a queue instead. And run separate job to send emails
    const sent: { success: number, failures: number } = {
      success: 0,
      failures: 0
    };
    // Send mail
    for (const send of toSend) {
      const res = await sendMail(
        send.to,
        send.cc,
        send.subject,
        send.message
      );

      if (res?.accepted) {
        sent.success++;
      } else {
        sent.failures++;
      }
    }

    return `successfully sent: ${sent.success} messages, failed to send ${sent.failures}`
  } catch (e) {
    console.log(e);
  }
}