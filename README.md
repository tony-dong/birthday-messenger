# Birthday Messenger

- Send messages to friends on their birthdays
- The current implementation is very simple. It uses a sqlite DB to store the information of the friends.
- Ideally, with more time, it should be refactored to de-couple the job into two parts:
 - First job will decide who should be sent, and how it should be sent. It then puts the notifications into a queue (eg. SQS, Redis etc)
 - The second job should then pick up the notifications and send them via the correct messenger (eg, email / SMS etc)

## Installation
`$ yarn`

## Usage
 - Update the .env file with the correct settings for the local database and mailer
 - To run the job:
  - `$ yarn run job:birthdays`

- To run the tests:
  - `$ yarn test`

## TODO
 - Finish off remaining tests
 - De-couple jobs
