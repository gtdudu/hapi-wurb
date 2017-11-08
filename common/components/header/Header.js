import React, { Component } from 'react';
import Button from '../../components/button/Button.js';

export default class extends Component {
  render() {
    return (
      <div className="content-header">
        <div className="top">
          <div>
            <h2>Bring nature indoors</h2>
              <Button
                type="button"
                placeholder="test it"
              >
                Browse the shop
              </Button>
          </div>
        </div>
        <div className="bottom">
          <p>SED DO EIUSMOD TEMPOR  UTDO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE SEED MAGNA ALIQUA</p>
        </div>
      </div>
    )
  }
}
