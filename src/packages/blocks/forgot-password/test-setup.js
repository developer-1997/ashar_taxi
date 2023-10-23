// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
var localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    getElementsByName: jest.fn()
  };
  global.localStorage = localStorageMock;

jest.mock("./src/ForgotPasswordOTPconfirmation.web.css" , () => {})
jest.mock("./src/CreatedNewPassword.web.css" , () => {})
jest.mock("./src/ForgotPasswordContainer.web.css" , () => {})
jest.mock("./src/ForgotPasswordHeader.web.css" , () => {})
jest.mock("./src/ForgotPassword.web.css" , () => {})
