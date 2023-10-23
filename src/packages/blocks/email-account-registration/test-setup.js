// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    getElementsByName:jest.fn()
  };
  global.localStorage = localStorageMock;

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock;

const urlMock={
  createObjectURL : jest.fn()
};
global.URL=urlMock

jest.mock("./src/SignUpOtpConfirmation.web.css" , () => {})

