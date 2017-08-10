import React from 'react';
import { formatPrice } from '../helpers';

import AddOrderForm from './AddOrderForm';
import base from '../base';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import CSSTransitionGroup from 'react-addons-css-transition-group';

injectTapEventPlugin();
  // handleChange = (event, index, value) => this.setState({value});


class OrderManagement extends React.Component {
  constructor() {
    super();
    this.renderOrders = this.renderOrders.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null,
      orderStatus: 'ordered',
    }
  }
  componentWillMount() {
  }
  componentDidMount() {

    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key) {
    const order = this.props.orders[key];
    // take a copy of that menu and update it with the new data
    const updatedOrder = {
      ...order,
      [e.target.status]: e.target.value
    }
    this.props.updateOrder(key, updatedOrder);
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData)  {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    // grab the store info
    const storeRef = base.database().ref(this.props.storeId);

    // query the firebase once for the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already
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

  renderLogin() {
    return (
      <nav className="login">
        <h2>Manage Orders</h2>
        <p>Sign in to manage orders</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
      </nav>
    )
  }

  renderOrder(key) {
    const menu = this.props.menues[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if(!menu || menu.status === 'unavailable') {
      return <li key={key}>Sorry, {menu ? menu.name : 'menu'} is no longer available!{removeButton}</li>
    }

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

          lbs {menu.name} {removeButton}
        </span>
        <span className="price">{formatPrice(count * menu.price)}</span>
        { this.props.order[key].status === 'ordered'
          ? <button onClick={() => {this.props.updateOrder()}}>Add Order</button>
          : null
        }
      </li>
    )
  }

  renderOrders(key) {
    const order = this.props.orders[key];

    const orderItemIds = Object.keys(this.props.order);
    const total = orderItemIds.reduce((prevTotal, key) => {
      const menu = this.props.menues[key];
      const count = this.props.order[key];
      const status = this.props.order[key].status;
      const isAvailable = menu && menu.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * menu.price || 0)
      }
      return prevTotal;
    }, 0);

    return (
      <div>
        <div className="order-wrap">
          <h2>Your Order</h2>

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

        </div>
        <div className="menu-edit" key={key}>
          <input type="text" name="name" value={order.name} placeholder="Your Name" onChange={(e) => this.handleChange(e, key)} />

          <select type="text" name="status" value={this.state.orderStatus} placeholder="Order Status" onChange={(e) => this.handleChange(e, key)}>
            <option value="ordered">Ordered</option>
            <option value="finalized">Finalized</option>
            <option value="delievered">Delievered</option>
          </select>

          <textarea type="text" name="desc" value={order.option} placeholder="Order Option" onChange={(e) => this.handleChange(e, key)}></textarea>
        </div>
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
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you arent the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Orders</h2>
        {logout}
        {Object.keys(this.props.orders).map(this.renderOrders)}
        <AddOrderForm placeOrder={this.props.placeOrder} uid={this.state.uid}/>
        <button onClick={this.props.loadSamples}>Load Sample Menues</button>
      </div>
    )
  }

  static propTypes = {
    menues: React.PropTypes.object.isRequired,
    orders: React.PropTypes.object.isRequired,
    placeOrder: React.PropTypes.func.isRequired,
    updateMenu: React.PropTypes.func.isRequired,
    removeMenu: React.PropTypes.func.isRequired,
    addMenu: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
  };
}

export default OrderManagement;
