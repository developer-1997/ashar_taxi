import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import RentalCard, { Props } from "../../src/RentalCard.web";
import CheckBoxWrapper from "../../src/CheckBoxWrapper.web";

const feature = loadFeature("./__tests__/features/RentalCard-scenario.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper<Props>;

  const initialProps: Props = {
    shiftCheck: "Monthly",
    depotCheck: "",
    handleRentalPeriodMenuClose: jest.fn(),
    handleDepotChange: jest.fn(),
    handleChange: jest.fn(),
    handleSearch: jest.fn(),
    handleConfirm: jest.fn(),
    handleDateRangeClean: jest.fn(),
    tempDepotCheck: "",
    startDate: "",
    endDate: "",
    rentalPriceFilter: {},
    rentalTimeFilter: {},
    nearestLocation: "",
  };

  test("User navigates to catalogue Page with Rental Card", ({ given, when, then }) => {
    given("I am a User loading catalogue Page with Rental Card", () => {
      wrapper = shallow(<RentalCard {...initialProps} />);
    });

    when("I navigate to the catalogue with Rental Card", () => {
      // No need to do anything here since rendering is already in "given"
    });

    then("Rental Search list will load without errors", () => {
      expect(wrapper.exists()).toBe(true);
    });

    then("Rental Search list should render the shift checkbox", () => {
      wrapper = shallow(<CheckBoxWrapper
        shiftCheck={initialProps.shiftCheck}
        handleChange={initialProps.handleChange}
        id="weekly-change"
        data-test-id="weekly-change"
        check="Weekly"
      />);
      const weeklyCheckbox = wrapper.find('[data-test-id="weekly-change"]');
      

      expect(weeklyCheckbox.exists()).toBe(true);
      expect(weeklyCheckbox.prop("checked")).toBe(false);
      wrapper = shallow(<CheckBoxWrapper
        shiftCheck={initialProps.shiftCheck}
        handleChange={initialProps.handleChange}
        id="monthly-change"
        data-test-id="monthly-change"
        check="Monthly"
      />);
      const monthlyCheckbox = wrapper.find('[data-test-id="monthly-change"]');
      expect(monthlyCheckbox.exists()).toBe(true);
      expect(monthlyCheckbox.prop("checked")).toBe(true);
    });

    when('user selects a particular rental period', () => {
      const shiftCheckbox = wrapper.find('[data-test-id="monthly-change"]');
      shiftCheckbox.simulate("change", { target: { value: "Monthly" } });
    });

    then('particular shift is selected for the rental period', () => {
      const monthlyCheckbox = wrapper.find('[data-test-id="monthly-change"]');
      const check = monthlyCheckbox.prop("checked")
      expect(check).toBe(true);
    });
  });
});






