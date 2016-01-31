import config from 'config';
import { fromCallback } from 'bluebird';
import mailgun from 'mailgun-js';

const contactFormReceive = config.get('mail.contactFormReceive');

const mailer = mailgun(config.get('mailgun'));

export default function *() {
  const body = this.request.body;

  const data = {
    from: body.email,
    to: contactFormReceive,
    subject: `Contact Form Submit (from ${body.email})`,
    text: body.message,
  };

  yield fromCallback((done) => {
    mailer.messages().send(data, done);
  });

  this.redirect('back');
}
