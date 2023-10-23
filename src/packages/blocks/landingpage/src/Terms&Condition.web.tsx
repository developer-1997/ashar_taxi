import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";

import NavbarComponent from "./Navbar.web";
import FooterComponent from "./Footer.web";

type Props = { children?: React.ReactNode };

const TermsAndCondition: FunctionComponent<Props> = (props) => {


    return (
        <Box className="landingPageContainerBox">
            <NavbarComponent match={undefined} history={undefined} location={undefined} />
            <div className="mainBody">
                <div className="mainBox">
                    <h3 className="heading">Terms & Condition</h3>
                    <p className="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor, sapien at dignissim laoreet, risus justo commodo nibh, non laoreet odio massa nec est. Sed condimentum vehicula egestas. Vivamus placerat risus vel scelerisque ultricies. Nulla facilisi. Sed a dictum lacus. Vestibulum ac purus luctus, laoreet nibh in, iaculis erat. Nulla ac porttitor turpis, sed tristique nunc. Duis sed ante ante. Nulla non justo quis nibh lobortis ullamcorper ac sit amet enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie in justo in imperdiet. Donec nibh eros, semper vitae tortor eu, placerat commodo ante. Morbi et dui aliquet, dapibus magna maximus, tincidunt neque. Mauris vel egestas felis. Nunc commodo sit amet velit ornare volutpat. Phasellus vitae libero quis purus suscipit accumsan.
                        <br />
                        In vestibulum turpis sit amet augue tempor rutrum vitae ut nulla. In ultrices quam nisi, id faucibus lacus tristique vitae. Maecenas quis tortor a erat elementum semper vel sed augue. Ut ullamcorper urna nisl, in dictum libero finibus nec. Ut pellentesque lacus eu bibendum fringilla. Suspendisse in quam at arcu sodales tincidunt. Ut vulputate non massa eu viverra.
                        <br />
                        Vestibulum blandit enim eget tincidunt consectetur. In placerat venenatis mauris, ac vestibulum nulla porttitor in. Ut imperdiet nisl a molestie convallis. Curabitur eu velit justo. Nulla vel justo ullamcorper, efficitur turpis vitae, vehicula lorem. Maecenas iaculis consequat mauris ut aliquet. Sed aliquam finibus malesuada. Mauris eu velit eget felis ultricies mattis id pretium lacus. Duis non felis nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec placerat dapibus risus a iaculis.
                    </p>
                </div>
            </div>
            <FooterComponent match={undefined} history={undefined} location={undefined} />
        </Box>
    );
}

// Customizable Area Start
export default TermsAndCondition
// Customizable Area End
