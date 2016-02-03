'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function* () {
  const body = this.request.body;

  const data = {
    from: body.email,
    to: contactFormReceive,
    subject: `Contact Form Submit (from ${ body.email })`,
    text: body.message
  };

  yield (0, _bluebird.fromCallback)(done => {
    mailer.messages().send(data, done);
  });

  this.redirect('back');
};

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _bluebird = require('bluebird');

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const contactFormReceive = _config2.default.get('mail.contactFormReceive');

const mailer = (0, _mailgunJs2.default)(_config2.default.get('mailgun'));
//# sourceMappingURL=submit-form.js.map