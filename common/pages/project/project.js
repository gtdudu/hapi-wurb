import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/button/Button.js';
import { default as Link } from '../../components/link/Link.js';


class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      add: '',
      search: '',
      delete: '',
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      add: e.target.value,
    })
  }

  createList() {
    const elem = React.createElement(
      'Button',
      {
        children: 'test',
        className: 'dark',
      }
    )

    return elem;
  }

  handleKeyPres(e) {
    console.log(e.charCode, e.key);
  }

  handleClick() {
    console.log(this.state);
  }

  render() {
    return (
  	  <div className="wrap">
        <header className="header">
          <input
            className="hidden-checkbox"
            type="checkbox"
            name="checkbox"
            id="checkbox_id"
            value="value" />

          <div className="logo">
            <Link to="/">WAID</Link>
          </div>

          <label
            className="menu-trigger"
            htmlFor="checkbox_id">
            <div className="menu-btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
          </label>

          <ul className="menu">
            <li>
              <Link to="/home">home</Link>
            </li>
            <li>
              <Link to="/blog">blog</Link>
            </li>
            <li>
              <Link to="/project">project</Link>
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>
            <li>
            <Link to="/cart">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                (1)
            </Link>
            </li>
          </ul>
        </header>


        <div className="content">

        {this.createList()}

          <div className="inner6">
              <p>
                fiozeahfio azhefiue azoiuf haeziufhauei ozh fahz efiuzahfehazif
              </p>

          </div>

          <div className="inner4">
            <div id="entry-1" className="entry-wrapper">
                <a href="#">
                 <article className="entry-content">
                    <h2>Architecture Project</h2>
                    <h3>— view —</h3>
                  </article>
                </a>
              </div>
              <div id="entry-2" className="entry-wrapper">
                <a href="#">
                  <article className="entry-content">
                    <h2>L'ours project</h2>
                    <h3>— view —</h3>
                  </article>
                </a>
              </div>
            <div id="entry-3" className="entry-wrapper">
              <a href="#">
               <article className="entry-content">
                  <h2>Architecture Project</h2>
                  <h3>— view —</h3>
                </article>
              </a>
            </div>
            <div id="entry-4" className="entry-wrapper">
              <a href="#">
                <article className="entry-content">
                  <h2>L'ours project</h2>
                  <h3>— view —</h3>
                </article>
              </a>
            </div>
            <div id="entry-1" className="entry-wrapper">
                <a href="#">
                 <article className="entry-content">
                    <h2>Architecture Project</h2>
                    <h3>— view —</h3>
                  </article>
                </a>
              </div>
              <div id="entry-2" className="entry-wrapper">
                <a href="#">
                  <article className="entry-content">
                    <h2>L'ours project</h2>
                    <h3>— view —</h3>
                  </article>
                </a>
              </div>
            <div id="entry-3" className="entry-wrapper">
              <a href="#">
               <article className="entry-content">
                  <h2>Architecture Project</h2>
                  <h3>— view —</h3>
                </article>
              </a>
            </div>
            <div id="entry-4" className="entry-wrapper">
              <a href="#">
                <article className="entry-content">
                  <h2>L'ours project</h2>
                  <h3>— view —</h3>
                </article>
              </a>
            </div>
            <div id="entry-1" className="entry-wrapper">
                <a href="#">
                 <article className="entry-content">
                    <h2>Architecture Project</h2>
                    <h3>— view —</h3>
                  </article>
                </a>
              </div>
              <div id="entry-2" className="entry-wrapper">
                <a href="#">
                  <article className="entry-content">
                    <h2>L'ours project</h2>
                    <h3>— view —</h3>
                  </article>
                </a>
              </div>
            <div id="entry-3" className="entry-wrapper">
              <a href="#">
               <article className="entry-content">
                  <h2>Architecture Project</h2>
                  <h3>— view —</h3>
                </article>
              </a>
            </div>
            <div id="entry-4" className="entry-wrapper">
              <a href="#">
                <article className="entry-content">
                  <h2>L'ours project</h2>
                  <h3>— view —</h3>
                </article>
              </a>
            </div>
          </div>

          <div className="content-header">
            <div className="top">
              <div>
                <h2>Bring nature indoors</h2>
                <Button
            			type="submit"
								>Browse the shop</Button>
              </div>
            </div>
            <div className="bottom">
              <p>SED DO EIUSMOD TEMPOR  UTDO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE SEED MAGNA ALIQUA</p>
            </div>
          </div>

            <div className="inner2">
              <ul>
                <li className="tile">
                  <div className="box">
                    <h3 className="tile__title">Fake title here</h3>
                    <p className="tile__description">Some text will go here...</p>
                  </div>
                  <a href="#" className="tile__button">Read More +</a>
                </li>

                <li className="tile">
                  <div className="box">
                    <h3 className="tile__title">Title</h3>
                    <p className="tile__description">asdfasdf</p>
                  </div>
                  <a href="#" className="tile__button">Read More +</a>
                </li>

                <li className="tile">
                  <div className="box">
                    <h3 className="tile__title">Title</h3>
                    <p className="tile__description">asdfasdf</p>
                  </div>
                  <a href="#" className="tile__button">Read More +</a>
                </li>

                <li className="tile">
                  <div className="box">
                    <h3 className="tile__title">Title</h3>
                    <p className="tile__description">asdfasdf</p>
                  </div>
                  <a href="#" className="tile__button">Read More +</a>
                </li>

                <li className="tile">
                  <div className="box">
                    <h3 className="tile__title">Title</h3>
                    <p className="tile__description">asdfasdf</p>
                  </div>
                  <a href="#" className="tile__button">Read More +</a>
                </li>

                <li className="tile">
                  <div className="box">
                    <h3 className="tile__title">Title</h3>
                    <p className="tile__description">asdfasdf</p>
                  </div>
                  <a href="#" className="tile__button">Read More +</a>
                </li>

                <li className="tile">
                  <div className="box">
                    <h3 className="tile__title">Title</h3>
                    <p className="tile__description">asdfasdf</p>
                  </div>
                  <a href="#" className="tile__button">Read More +</a>
                </li>

                <li className="tile">
                  <div className="box">
                    <h3 className="tile__title">Title</h3>
                    <p className="tile__description">asdfasdf</p>
                  </div>
                  <a href="#" className="tile__button">Read More +</a>
                </li>

                <li className="tile">
                  <div className="box">
                    <h3 className="tile__title">Title</h3>
                    <p className="tile__description">asdfasdf</p>
                  </div>
                  <a href="#" className="tile__button">Read More +</a>
                </li>

              </ul>
            </div>

            <div className="inner1">
              <ul>
                <li>
                  <img src="/public/wall.jpg" />
                  <h1>The Grasslands</h1>
                   <p>Nunc  quam nulla, fringilla ac imperdiet at, consequat vel leo. Quisque non
                  </p>
									<Button
                    type="submit"
                    className="dark"
                  >
                  Read more</Button>
                </li>

                <li>
                  <img src="/public/wall.jpg" />
                  <h1>Paradise Found</h1>
                   <p>Nunc  quam nulla, fringilla ac imperdiet at, consequat vel leo. Quisque non
                  </p>
									<Button
                    type="submit"
                    className="dark"
                  >
                  Read more</Button>
                </li>

                <li>
                  <img src="/public/wall.jpg" />
                  <h1>Smoke On The Water</h1>
                   <p>Nunc  quam nulla, fringilla ac imperdiet at, consequat vel leo. Quisque non
                    semper justo, eu aliquam velit. Pellentesque rhoncus, quam ac fringilla euismod,
                  </p>
									<Button
                    type="submit"
                    className="dark"
                  >
                  Read more</Button>

                </li>

                <li>
                  <img src="/public/wall.jpg" />
                  <h1>Headline</h1>
                   <p>Nunc  quam nulla, fringilla ac imperdiet at, consequat vel leo. Quisque non
                    semper justo, eu aliquam velit. Pellentesque rhoncus, quam ac fringilla euismod,
                  </p>
									<Button className="dark">Read more</Button>
                </li>
              </ul>

            </div>

            <div className="inner3">
              <ul className="row">
                <li className="col-xs-12 col-sm-6 col-lg-4">
                  <div className="box">
                    <h3 className="tile__title">Fake title here</h3>
                    <p className="tile__description">Some text will go here...</p>
                    <a href="#" className="tile__button">Read More +</a>
                  </div>
                </li>
                <li className="col-xs-12 col-sm-6 col-lg-4">
                  <div className="box">
                    <h3 className="tile__title">Fake title here</h3>
                    <p className="tile__description">Some text will go here...</p>
                  </div>
                </li>
                <li className="col-xs-12 col-sm-6 col-lg-4">
                  <div className="box">
                    <h3 className="tile__title">Fake title here</h3>
                    <p className="tile__description">Some text will go here...</p>
                  </div>
                </li>
                <li className="col-xs-12 col-sm-6 col-lg-4">
                  <div className="box">
                    <h3 className="tile__title">Fake title here</h3>
                    <p className="tile__description">Some text will go here...</p>
                  </div>
                </li>
                <li className="col-xs-12 col-sm-6 col-lg-4">
                  <div className="box">
                    <h3 className="tile__title">Fake title here</h3>
                    <p className="tile__description">Some text will go here...</p>
                  </div>
                </li>
                <li className="col-xs-12 col-sm-6 col-lg-4">
                  <div className="box">
                    <h3 className="tile__title">Fake title here</h3>
                    <p className="tile__description">Some text will go here...</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

       </div>
    )
  }
}

Project.propTypes = {
  app: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(Project);
