import React from 'react';
import { formatPrice } from '../helpers/helpers';
import { socialLogin, login, resetPassword } from '../helpers/auth'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

// import AddOrderForm from './AddOrderForm';
import {ref, firebaseAuth} from '../config/constants.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import firebaseApp from '../config/constants'
import firebase from 'firebase'
injectTapEventPlugin();
  // handleChange = (event, index, value) => this.setState({value});

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class OrderManagement extends React.Component {
  constructor() {
    super();
    this.renderOrders = this.renderOrders.bind(this);
    this.renderOrder = this.renderOrder.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    uid: null,
    owner: null,
    email:'',
    password:'',
    loginMessage: null,
    order: {},
  }
  componentWillMount() {
  }
  componentDidMount() {

    firebaseAuth().onAuthStateChanged((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }
  //Login
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.state.email, this.state.password)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.state.email}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  // socialLoginHandler = () => {
  //   socialLogin('google')
  //     .catch((error) => {
  //       this.setState(setErrorMsg(error.message))
  //     })
  // }


  logout() {
    firebaseAuth().signOut().then(() => {
      this.setState({ uid: null });
    });
  }

  authHandler(err, authData)  {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    // grab the store info
    const storeRef = firebase.database().ref(this.props.storeId);

    // query the firebase once for the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already
      // this is where to update firebase db.
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  //Order Management
  handleChange(e, key) {
    const order = this.props.orders[key];
    // take a copy of that menu and update it with the new data
    const updatedOrder = {
      ...order,
      [e.target.status]: e.target.value
    }
    this.props.updateOrder(key, updatedOrder);
  }

  renderLogin() {
    const style = {
     margin: 15,
    };
    return (
      <nav className="login">
        <h2>Manage Orders</h2>
        <p>Sign in to manage orders</p>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <TextField
              className="form-email"
              ref={(email) => this.email = email}
              hintText="Email"
              floatingLabelText="Email"
              onChange = {(event,newValue) => this.setState({email:newValue})}
              />
          </div>
          <div className="form-group">
            <TextField
              type="password"
              className="form-password"
              ref={(pw) => this.pw = pw}
              hintText="Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
              />
          </div>
          {
            this.state.loginMessage &&
            <div className="form-group">
            <TextField>
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
            </div>
            </TextField>
            </div>
          }
          <RaisedButton label="Login" onClick={this.handleSubmit} type="submit" className="btn btn-primary" primary={true} style={style}/>

        </form>

        <button className="google" onClick={() => socialLogin('google')}>Log In with Google</button>
        <button className="facebook" onClick={() => socialLogin('facebook')} >Log In with Facebook</button>
        <button className="twitter" onClick={() => socialLogin('twitter')} >Log In with Twitter</button>
      </nav>
    )
  }

  renderOrder(key) {
    const menu = this.props.menues[key] ? this.props.menues[key] : null ;
    const count = this.state.order[key];

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>

          { menu === null ? null : 'lbs ' + menu.name }
        </span>
        <span className="price">{ menu ? formatPrice(count * menu.price) : null }</span>
      </li>
    )
  }

  renderOrders(key) {
    this.state.order = this.props.orders[key];
    const orderItemIds = Object.keys(this.state.order);
    const total = orderItemIds.reduce((prevTotal, key) => {
      const menu = this.props.menues[key];
      const count = this.state.order[key];
      const isAvailable = menu && menu.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * menu.price || 0)
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap" key={key}>
        <h2>{key}</h2>

        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderItemIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
          <select type="text" name="status" value={this.props.orders[key].status} placeholder="Order Status" onChange={(e) => {this.props.updateExistingOrder('status', e.target.value, key, this.props.orders[key]);}}>
            <option value="ordered">Ordered</option>
            <option value="finalized">Finalized</option>
            <option value="delievered">Delievered</option>
          </select>
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // check if they are no logged in at all
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Check if they are the owner of the current store
    // if(this.state.uid !== this.state.owner) {
    //   return (
    //     <div>
    //       <p>Sorry you arent the owner of this store!</p>
    //       {logout}
    //     </div>
    //   )
    // }

    return (
      <div>
        <h2>Orders</h2>
        {logout}
        {Object.keys(this.props.orders).reverse().map(this.renderOrders)}
        {/*
          <AddOrderForm placeOrder={this.props.placeOrder} uid={this.state.uid}/>
          <button onClick={this.props.loadSamples}>Load Sample Menues</button>
        */}
      </div>
    )
  }
}

OrderManagement.propTypes = {
  menues: React.PropTypes.object.isRequired,
  orders: React.PropTypes.object.isRequired,
  // addMenu: React.PropTypes.func.isRequired,
  // loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired,
  updateExistingOrder: React.PropTypes.func.isRequired,
}

export default OrderManagement;
