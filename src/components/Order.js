import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);

  }

  state = {
    ordered: false,
    order: null
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

      </li>
    )
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

        <button onClick={() => {this.props.placeOrder(this.state.order); this.state.ordered=true;}}>Place Order</button>
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
