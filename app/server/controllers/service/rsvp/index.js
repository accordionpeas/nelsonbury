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
    R.join('\n\n*********************\n\n'),
    mapWithIndex((name, index) => (`
      ${name}

      Dietary Requirements: ${R.pathOr('N/A', ['body', `dietary-requirements-${index + 1}`], req)}

      Wedding Breakfast:

      Menu type: ${R.pathOr('N/A', ['body', `menu-type-${index + 1}-wedding-breakfast`], req)}
      Starter: ${R.pathOr('N/A', ['body', `starter-${index + 1}-wedding-breakfast`], req)}
      Main: ${R.pathOr('N/A', ['body', `main-${index + 1}-wedding-breakfast`], req)}


      Hartnoll lunch:

      Menu type: ${R.pathOr('N/A', ['body', `menu-type-${index + 1}-hartnoll-lunch`], req)}
      Starter: ${R.pathOr('N/A', ['body', `starter-${index + 1}-hartnoll-lunch`], req)}
      Main: ${R.pathOr('N/A', ['body', `main-${index + 1}-hartnoll-lunch`], req)}
      Dessert: ${R.pathOr('N/A', ['body', `dessert-${index + 1}-hartnoll-lunch`], req)}
    `)),
  )(names);

  return `${foodChoices}
    
      Reg number: ${R.pathOr('N/A', ['body', 'reg-number'], req)}
  `;
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
