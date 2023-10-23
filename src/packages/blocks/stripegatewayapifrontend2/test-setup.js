// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    getElementsByName:jest.fn()
  };

  const localWindow = {
    localStorage:{
      getItem:jest.fn(()=> "qwertyuixcvbnjdfghj")
    }
  }
  global.localStorage = localStorageMock;
  global.window = localWindow;



jest.mock("./src/stripe.css" , () => {})
jest.mock("../landingpage/src/Footer.css" , () => {})
jest.mock("../landingpage/src/Navbar.css" , () => {})
jest.mock("../../web/src/GlobleStyle.css" , () => {})
jest.mock("../../components/src/CustomModal.css" , () => {})

