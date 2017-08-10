import React from 'react';

class AddOrderForm extends React.Component {
  createOrder(event) {
    event.preventDefault();
    console.log('Gonna make some order! 🎣');
    const order = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      menu: this.menu.value,
      option: this.option.value,
    }
    this.props.placeOrder(order);
    this.orderForm.reset();
  }

  render() {
    return (
      <form ref={(input) => this.orderForm = input} className="fish-edit" onSubmit={(e) => this.createOrder(e)}>
        <input ref={(input) => this.name = input} type="text" placeholder="Your Name" />
        <input ref={(input) => this.price = input} type="text" placeholder="Total Price" />
        <select ref={(input) => this.status = input}>
          <option value="ordered">Ordered</option>
          <option value="finished">Finished</option>
          <option value="delievered">Delievered</option>
        </select>
        <input ref={(input) => this.menu = input} type="text" placeholder="Which ones would you like?" />
        <textarea ref={(input) => this.option = input} placeholder="Option" ></textarea>
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

AddOrderForm.propTypes = {
  placeOrder: React.PropTypes.func.isRequired
}

export default AddOrderForm;
