import * as R from 'ramda';
import nodemailer from 'nodemailer';

const emailAddress = process.env.GMAIL_USER;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailAddress,
    pass: process.env.GMAIL_PASS,
  },
});

const getNames = ({ req }) => (
  R.compose(
    R.map(R.prop(1)),
    R.filter(([key]) => key.startsWith('name-')),
    R.toPairs,
    R.prop('body'),
  )(req)
);

const getEmailText = (req) => {
  const names = getNames({ req });

  const mapWithIndex = R.addIndex(R.map);

  const foodChoices = R.compose(
    R.join(' '),
    mapWithIndex((name, index) => (`
      ${name}
      Starter: ${R.path(['body', `starter-${index + 1}`], req)}
      Main: ${R.path(['body', `main-${index + 1}`], req)}
      Dietary Requirements: ${R.path(['body', `dietary-requirements-${index + 1}`], req)}
    `)),
  )(names);

  const attending = R.path(['body', 'attending'], req);
  const email = R.path(['body', 'email'], req);
  const stayAtHuntsham = R.path(['body', 'stay-at-huntsham'], req);
  const stayOnFridayNight = R.path(['body', 'stay-on-friday-night'], req);
  const stayOnSaturdayNight = R.path(['body', 'stay-on-saturday-night'], req);
  const stayOnSundayNight = R.path(['body', 'stay-on-sunday-night'], req);
  const regNumber = R.path(['body', 'reg-number'], req);
  const dinnerFridayNight = R.path(['body', 'dinner-friday-night'], req);
  const bbqSunday = R.path(['body', 'bbq-sunday'], req);
  const additionalInfo = R.path(['body', 'additional-info'], req);

  let text = `
Name(s): ${names.join(', ')}
Is attending: ${attending}
  `;

  if (attending === 'yes') {
    text += `
Email: ${email}
Would like to stay at Huntsham Court: ${stayAtHuntsham}
Additional info: ${additionalInfo}
Food choices:
${foodChoices}
    `;
  }

  if (stayAtHuntsham === 'yes') {
    text += `
Would like to stay on Friday night: ${stayOnFridayNight}
Would like to stay on Saturday night: ${stayOnSaturdayNight}
Would like to stay on Sunday night: ${stayOnSundayNight}
Registration number: ${regNumber}
    `;
  }

  if (stayAtHuntsham === 'no') {
    text += `
Would like to have dinner on Friday night: ${dinnerFridayNight}
Would like to attend the BBQ on Sunday: ${bbqSunday}
    `;
  }

  return text;
};

export default async (req, res) => {
  const text = getEmailText(req);
  const names = getNames({ req });
  const subject = `RSVP from ${names.join(', ')}`;

  const mailOptions = {
    from: emailAddress,
    to: emailAddress,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);

  res.send({});
};
