import React from 'react';
import Header from './Header';
import Order from './Order';
import OrderManagement from './OrderManagement';
import Menu from './Menu';
import sampleMenues from '../sample-menues';
import sampleOrders from '../sample-orders';
import { base, firebaseApp, ref, firebaseAuth } from '../config/constants'

class App extends React.Component {
  constructor() {
    super();

    // this.addMenu = this.addMenu.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeMenu = this.removeMenu.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    this.state = {
      menues: {},
      order: {
        name: '',
        status: '',
        option: ''
      },
      orders: {},
      authed: false,
    }
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.match.params.storeId}/orders`, {
      context: this,
      state: 'orders'
    });
    this.ref = base.syncState(`${this.props.match.params.storeId}/menues`, {
      context: this,
      state: 'menues'
    });
    if(this.state.menues == null) {
      this.loadSamples();
    }

  // base.post(`users/${userId}`, {
  //   data: {name: 'Tyler McGinnis', age: 25}
  // }).then(() => {
  //   Router.transitionTo('dashboard');
  // }).catch(err => {
  //   // handle error
  // });
    // firebaseApp.database.ref('/').once('value', snap => {
    //   const restaurant = snap.val();
    //
    // });


    // check if there is any order in localStorage
    // const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);
    //
    // if(localStorageRef) {
    //   // update our App component's order state
    //   this.setState({
    //     orders: JSON.parse(localStorageRef)
    //   });
    // }

  }

  componentWillUnmount() {
    this.removeListener();
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order));
  }

  // addMenu(menu) {
  //   // update our state
  //   const menues = {...this.state.menues};
  //   // add in our new menu
  //   const timestamp = Date.now();
  //   menues[`menu-${timestamp}`] = menu;
  //   // set state
  //   this.setState({ menues });
  // }

  updateMenu = (key, updatedMenu) => {
    const menues = {...this.state.menues};
    menues[key] = updatedMenu;
    this.setState({ menues });
  };

  updateExistingOrder = (key, value, ordersKey, order) => {
    const orders = {...this.state.orders};
    order[key] = value;
    orders[ordersKey] = order;
    this.setState({ orders });
    // firebaseApp.database.ref('/orders').push({
    //   this.state.orders
    // })

  }

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

  addToOrder(menuNameKey) {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of menu ordered
    order[menuNameKey] = order[menuNameKey] + 1 || 1;
    // update our state
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  placeOrder(nameKey, optionKey, name, option) {
    const orders = {...this.state.orders};
    // add in our new menu
    this.state.order[nameKey] = name;
    this.state.order[optionKey] = option;
    this.state.order['status'] = 'ordered'
    const timestamp = Date(Date.now()).toLocaleString();
    orders[`ordered at ${timestamp}`] = this.state.order;
    this.setState({ orders });
    this.setState({ order: {} });
    // this.setState({ order: null });
  }

  updateOrders(key, order) {
    const orders = {...this.state.orders};
    // add in our new menu
    const timestamp = Date.now();
    orders[key] = order;
    this.setState({ orders });
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
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
          params={this.props.match.params}
          removeFromOrder={this.removeFromOrder}
          placeOrder={this.placeOrder}
        />
        <OrderManagement
          authed={this.state.authed}
          addOrder={this.addOrder}
          updateExistingOrder={this.updateExistingOrder}
          orders={this.state.orders}
          params={this.props.match.params}
          removeFromOrder={this.removeFromOrder}
          placeOrder={this.placeOrder}
          removeMenu={this.removeMenu}
          loadSamples={this.loadSamples}
          menues={this.state.menues}
          updateMenu={this.updateMenu}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
}

export default App;
