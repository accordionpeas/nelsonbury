import * as R from 'ramda';
import sendgrid from 'sendgrid';

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
Name(s): ${names.join(', ')}\n
Is attending: ${attending}\n
  `;

  if (attending === 'yes') {
    text += `
Email: ${email}\n
Would like to stay at Huntsham Court: ${stayAtHuntsham}\n
Would like to have dinner on Friday night: ${dinnerFridayNight}\n
Would like to attend the BBQ on Sunday: ${bbqSunday}\n
Additional info: ${additionalInfo}\n
Food choices:
${foodChoices}
    `;
  }

  if (stayAtHuntsham === 'yes') {
    text += `
Would like to stay on Friday night: ${stayOnFridayNight}\n
Would like to stay on Saturday night: ${stayOnSaturdayNight}\n
Would like to stay on Sunday night: ${stayOnSundayNight}\n
Registration number: ${regNumber}\n
    `;
  }

  return text;
};

export default async (req, res) => {
  const text = getEmailText(req);
  const names = getNames({ req });
  const subject = `RSVP from ${names.join(', ')}`;

  const helper = sendgrid.mail;
  const fromEmail = new helper.Email('rsvp@nelsonbury.com');
  const toEmail = new helper.Email(process.env.GMAIL_USER);
  const content = new helper.Content('text/plain', text);
  const mail = new helper.Mail(fromEmail, subject, toEmail, content);

  const sg = sendgrid(process.env.SENDGRID_API_KEY);

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  await sg.API(request);

  res.send({});
};
