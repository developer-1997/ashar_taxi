import React, { FunctionComponent } from "react";
import { Checkbox } from "@material-ui/core";

import "./RentalCard.css";


export type Props = {
    shiftCheck: string | null,
    handleChange?: (event: { target: { value: string } }) => void;
    id:string;
    check:string;
}

const CheckboxWrapper: FunctionComponent<Props> = (props) => {
  return (
    <Checkbox
        value={props.check}
        style={{ color: "green" }}
        checked={props.shiftCheck === props.check}
        onChange={props.handleChange}
        data-test-id={props.id}
         // Add data-test-id attribute
      />
  );
};

export default CheckboxWrapper;
