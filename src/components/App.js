import React from 'react';
import Header from './Header';
import Order from './Order';
import OrderManagement from './OrderManagement';
import Menu from './Menu';
import sampleMenues from '../sample-menues';
import sampleOrders from '../sample-orders';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.addMenu = this.addMenu.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeMenu = this.removeMenu.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

  }

  state = {
    menues: {},
    order: {},
    orders: {}
  };

  componentWillMount() {
    this.loadSamples();


    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }

  }

  componentWillUnmount() {
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addMenu(menu) {
    // update our state
    const menues = {...this.state.menues};
    // add in our new menu
    const timestamp = Date.now();
    menues[`menu-${timestamp}`] = menu;
    // set state
    this.setState({ menues });
  }

  updateMenu = (key, updatedMenu) => {
    const menues = {...this.state.menues};
    menues[key] = updatedMenu;
    this.setState({ menues });
  };

  removeMenu = (key) => {
    const menues = {...this.state.menues};
    menues[key] = null;
    this.setState({ menues });
  };

  loadSamples = () => {
    this.setState({
      menues: sampleMenues,
      orders: sampleOrders
    });
  };

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of menu ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  placeOrder() {
    const orders = {...this.state.orders};
    // add in our new menu
    const timestamp = Date.now();
    orders[`order-${timestamp}`] = this.state.order;
    this.setState({ orders });
  }

  updateOrder(key, updatedMenu) {
    const orders = {...this.state.orders};
    // add in our new menu
    const timestamp = Date.now();
    orders[key] = updatedMenu;
    this.setState({ orders });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-menues">
            {
              Object
                .keys(this.state.menues)
                .map(key => <Menu key={key} index={key} details={this.state.menues[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
          orders={this.state.orders}
          menues={this.state.menues}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
          placeOrder={this.placeOrder}
          updateOrder={this.changeOrder}
        />
        <OrderManagement
          addOrder={this.addOrder}
          updateOrder={this.updateOrder}
          orders={this.state.orders}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
          placeOrder={this.placeOrder}
          removeMenu={this.removeMenu}
          loadSamples={this.loadSamples}
          menues={this.state.menues}
          updateMenu={this.updateMenu}
          storeId={this.props.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
