/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from 'react'
import { Container, Row } from 'reactstrap'
// used for making the prop types of this component
import PropTypes from 'prop-types'

type Props = {
  default?: boolean
  fluid?: boolean
}

const { REACT_APP_WORLD_ANVIL_HOMEPAGE } = process.env

class Footer extends React.Component<Props> {
  render() {
    return (
      <footer
        className={'footer' + (this.props.default ? ' footer-default' : '')}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="https://www.creative-tim.com" target="_blank">
                    Creative Tim
                  </a>
                </li>
                <li>
                  <a href={REACT_APP_WORLD_ANVIL_HOMEPAGE} target="_blank">
                    World Anvil
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.creative-tim.com/license"
                    target="_blank"
                  >
                    Licenses
                  </a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <div className="copyright">
                &copy; {new Date().getFullYear()}, made with{' '}
                <i className="fa fa-heart heart" /> by Creative Tim
              </div>
            </div>
          </Row>
        </Container>
      </footer>
    )
  }
}

export default Footer
