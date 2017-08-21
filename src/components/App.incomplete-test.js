import React from "react";
import { shallow, mount, render } from 'enzyme';
import App from "./App";
import Order from './Order';
import OrderManagement from './OrderManagement';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const localStorageMock = (() => {
  let store = {}
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    }
  };
})()

global.localStorage = localStorageMock

describe("App is mounted", () => {
  let state;
  let props;
  let removeFromOrder;
  let placeOrder;

  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <MuiThemeProvider>
          <App {...props}/>
        </MuiThemeProvider>
      );
      mountedApp.setState(state);
    }
    return mountedApp;
  }

  // beforeEach(() => {
  //   props = {
  //     menues: undefined,
  //     order: undefined,
  //     removeFromOrder: undefined,
  //     placeOrder: undefined
  //   };
  //   mountedOrder = undefined
  // });

  beforeEach(() => {
    props = {
      match: {
        params: {
          storeId: 'Korean Restaurant'
        }
      }
    };
    state = {
      match: {
        params: {
          storeId: 'Korean Restaurant'
        }
      },
      menues: {
        menu1: {
          name: 'Pacific Halibut',
          image: 'http://i.istockimg.com/file_thumbview_approve/36248396/5/stock-photo-36248396-blackened-cajun-sea-bass.jpg',
          desc: 'Everyones favorite white fish. We will cut it to the size you need and ship it.',
          price: 1724,
          status: 'available'
        },

        menu2: {
          name: 'Lobster',
          image: 'http://i.istockimg.com/file_thumbview_approve/32135274/5/stock-photo-32135274-cooked-lobster.jpg',
          desc: 'These tender, mouth-watering beauties are a fantastic hit at any dinner party.',
          price: 3200,
          status: 'available'
        },

        menu3: {
          name: 'Sea Scallops',
          image: 'http://i.istockimg.com/file_thumbview_approve/58624176/5/stock-photo-58624176-scallops-on-black-stone-plate.jpg',
          desc: 'Big, sweet and tender. True dry-pack scallops from the icey waters of Alaska. About 8-10 per pound',
          price: 1684,
          status: 'unavailable'
        },

        menu4: {
          name: 'Mahi Mahi',
          image: 'http://i.istockimg.com/file_thumbview_approve/12556651/5/stock-photo-12556651-mahimahi.jpg',
          desc: 'Lean flesh with a mild, sweet flavor profile, moderately firm texture and large, moist flakes. ',
          price: 1129,
          status: 'available'
        },

        menu5: {
          name: 'King Crab',
          image: 'http://i.istockimg.com/file_thumbview_approve/18294110/5/stock-photo-18294110-king-crab-legs.jpg',
          desc: 'Crack these open and enjoy them plain or with one of our cocktail sauces',
          price: 4234,
          status: 'available'
        },

        menu6: {
          name: 'Atlantic Salmon',
          image: 'http://i.istockimg.com/file_thumbview_approve/56241842/5/stock-photo-56241842-salmon-menu.jpg',
          desc: 'This flaky, oily salmon is truly the king of the sea. Bake it, grill it, broil it...as good as it gets!',
          price: 1453,
          status: 'available'
        },

        menu7: {
          name: 'Oysters',
          image: 'http://i.istockimg.com/file_thumbview_approve/58626682/5/stock-photo-58626682-fresh-oysters-on-a-black-stone-plate-top-view.jpg',
          desc: 'A soft plump oyster with a sweet salty flavor and a clean finish.',
          price: 2543,
          status: 'available'
        },

        menu8: {
          name: 'Mussels',
          image: 'http://i.istockimg.com/file_thumbview_approve/40450406/5/stock-photo-40450406-steamed-mussels.jpg',
          desc: 'The best mussels from the Pacific Northwest with a full-flavored and complex taste.',
          price: 425,
          status: 'available'
        },

        menu9: {
          name: 'Jumbo Prawns',
          image: 'http://i.istockimg.com/file_thumbview_approve/67121439/5/stock-photo-67121439-fresh-tiger-shrimp-on-ice-on-a-black-stone-table.jpg',
          desc: 'With 21-25 two bite prawns in each pound, these sweet morsels are perfect for shish-kabobs.',
          price: 2250,
          status: 'available'
        }
      },
      order: {
        name: 'seunghun Lee',
        status: 'ordered',
        option: 'rare',
        menu1: 3
      },
      orders: {
        order1: {
          name: 'seunghun Lee',
          status: 'ordered',
          option: 'rare',
          menu1: 3
        },
        order2: {
          name: 'Szymon Korzeniowski',
          status: 'ordered',
          option: 'medium',
          menu2: 1
        },
        order3: {
          name: 'Marta Gajowczyk',
          status: 'ordered',
          option: 'well done',
          menu3: 3
        },
        order4: {
          name: 'Bartosz Pietrzak',
          status: 'ordered',
          option: 'medium',
          menu1: 1
        },
        order5: {
          name: 'Szymon Boniecki',
          status: 'ordered',
          option: 'rare',
          menu1: 2
        }
      }
    };
    mountedApp = undefined;
    removeFromOrder= jest.fn();
    placeOrder= jest.fn();
  });

  // All tests will go here
  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = app().find("div");
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children()
      // method on lockScreen(). This is annoying, but we can use it
      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv.children()).toEqual(app().children());
    });
  });

  it("always renders two Header properly", () => {
    expect(app().find('Header').length).toBe(1);
  });

  // describe("rendered `OrderManagement`", () => {
  //   it("does not receive any props", () => {
  //     const clockDisplay = mountedOrder().find(ClockDisplay);
  //     expect(Object.keys(clockDisplay.props()).length).toBe(0);
  //   });
  // });

  describe("when `placeOrder` is defined", () => {
    const order = app().find('Order');
    it("renders an `Order`", () => {
      expect(order.length).toBe(1);
    });
    it("sets the rendered `Order`'s `placeOrder` prop to the same value as `placeOrder`'", () => {
      expect(order.instance().placeOrder()).toBe(state.placeOrder);
    });
  });

  describe("when prop `orders` is passed", () => {

    it("renders an `OrderManagement`", () => {
      expect(app().find('OrderManagement').length).toBe(1);
    });

    it("passes `orders` to the rendered `orderManagement` as `children`", () => {
      // const orderManagement = app().find('OrderManagement');
      const wrapper = app().find('OrderManagement')

      expect(wrapper.props().orders).toBe(state.orders);
    });
  });

  describe("when `orders` is undefined", () => {
    beforeEach(() => {
      state.orders = {};
    });

    it("sets the rendered `OrderManagement`'s `orders` prop to undefined'", () => {
      const orderManagement = app().find('OrderManagement');
      expect(orderManagement.props().orders).not.toBeDefined();
    });
  });


});
