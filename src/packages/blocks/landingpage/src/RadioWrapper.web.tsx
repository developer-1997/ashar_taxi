import React, { FunctionComponent } from "react";
import { Radio } from "@material-ui/core";
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import './LandingPageFilters.css'


export type Props = {
    tempDepot: string | null,
    handleDepotSelection: (value: string) => void;
    id: string;
}

const RadioWrapper: FunctionComponent<Props> = (props) => {
    return (
        <Radio
            style={{ color: '#05BF61', fontWeight: 300 }}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleChecked />}
            checked={props.tempDepot === props.id}
            onClick={() => props.handleDepotSelection(props.id)}
            data-test-id={props.id}
        />
    );
};

export default RadioWrapper;
