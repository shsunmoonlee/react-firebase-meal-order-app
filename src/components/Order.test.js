import React from 'react';
import { formatPrice } from '../helpers/helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
    this.state = {
      name: '',
      option: ''
    }
  }

  renderOrder(key) {
    const menu = this.props.menues[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    // if(!menu || menu.status === 'unavailable') {
    //   return <li key={key}>Sorry, {menu ? menu.name : 'menu'} is no longer available!{removeButton}</li>
    // }
    if(!menu) {
      return null
    }
    if(menu.status === 'unavailable') {
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

      </li>
    )
  }
  handleChange(e) {

  }

  render() {
    const orderItemIds = Object.keys(this.props.order);
    const total = orderItemIds.reduce((prevTotal, key) => {
      const menu = this.props.menues[key];
      const count = this.props.order[key];
      const isAvailable = menu && menu.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * menu.price || 0)
      }
      return prevTotal;
    }, 0);

    return (
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
        <div className="menu-edit">
          <input type="text" name="name" placeholder="Your Name" value={this.state.name} onChange={(e) => { this.setState({name: e.target.value});}} />
          <textarea type="text" name="desc" placeholder="Order Option" value={this.state.option} onChange={(e) => { this.setState({option: e.target.value});}} ></textarea>
        </div>
        <button
          onClick={() => {
            this.props.placeOrder('name', 'option', this.state.name, this.state.option);
            this.state.name='';
            this.state.option='';
          }}
        >Place Order</button>
      </div>
    )
  }
}

Order.propTypes = {
  menues: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired,
  placeOrder: React.PropTypes.func.isRequired,
};

export default Order;
