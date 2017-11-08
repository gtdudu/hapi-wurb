import Bcrypt from 'bcrypt'
import { Recruiter } from '../models/recruiter'
import { v4 } from 'uuid'
import colors from 'colors/safe'

export default () => {
  Recruiter.find({email: 'admin@admin.com'}, (err, res) => {
    if (err) {
      console.log('Err from find admin', err);
      return;
    }

    if (res && res[0] && res[0]._id) {
      Recruiter.deleteOne({ _id: res[0]._id }, err => {
        console.log(err);
      });
    }

    const salt = Bcrypt.genSaltSync(10);
    const hash = Bcrypt.hashSync('mastermind', salt);

    Recruiter.create(Object.assign({}, {
      email: 'admin@admin.com',
      firstName: 'tom',
      lastName: 'mind',
      password: hash,
      whireId: v4(),
      role: ['base', 'admin'],
      accountValid: false
    }), (err, user) => {
      if (err || !user) {
        console.log(err)
      }

      console.log(colors.green('Created Admin fixture'));
    })
  });
};
