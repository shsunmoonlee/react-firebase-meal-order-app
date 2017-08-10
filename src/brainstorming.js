        <SelectField
          floatingLabelText="Status"
          value={this.state.orderStatus}
          onChange={this.handleChange}
        >
          <MenuItem value={"ordered"} primaryText="ordered" />
          <MenuItem value={"finalized"} primaryText="finalized" />
          <MenuItem value={"delievered"} primaryText="delievered" />
        </SelectField>

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
    orders[key] = orders[key] + 1 || 1;
    this.setState({ orders });
  }




  Fishes => Menues
  fishes => menues
  fish => menu
  Fish => Menu
