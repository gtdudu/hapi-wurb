import sinon from 'sinon';
import Bcrypt from 'bcrypt'
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import Boom from 'boom';

import { login } from './handler'
import { Recruiter } from './../../models/recruiter'

chai.use(sinonChai);

describe('fefze', () => {
  let reply;

  beforeEach(() => {
    reply = sinon.stub();
    Recruiter.findOne = sinon.stub().resolves(null);
    Bcrypt.compare = sinon.stub().resolves();
    Boom.badData = sinon.stub().resolves();
  });

  it('fazfzeafaez', () => {
    return login({
      payload: 'fake@mail.com',
    }, reply)
      .then(() => {
        expect(Recruiter.findOne).to.have.been.calledOnce;
        expect(Bcrypt.compare).to.not.have.been.calledOnce;
        expect(Boom.badData).to.have.been.calledOnce;
        expect(reply).to.have.been.calledOnce;
      })
  });
});
