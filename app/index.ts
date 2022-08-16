import { KnexConfig } from './config';
import jobs from './jobs';

const time = process.hrtime();
new KnexConfig().build();

(async () => {
  const key = process.argv[2] as keyof typeof jobs;
  if (!jobs.hasOwnProperty(key)) {
    console.error(`Invalid argument ${key} no job found`);
    process.exit(1);
  }
  console.log('Job starting');
  console.log(await jobs[key]());
})()
  .then(() => {
    const diff = process.hrtime(time);
    console.log(`Job complete in ${diff[0]} seconds and ${diff[1] / 1000000} ms`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
