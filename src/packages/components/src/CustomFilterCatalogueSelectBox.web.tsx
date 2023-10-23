import React, { useEffect, useRef, useState } from "react"
import { Box, Typography } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"
// import "./RentalCard.css";

const CustomFilterCatalogueSelectBox = ({ labelIcon, label, children, value ,handleClick }: any) => {
    const [dropdown, setDropdown] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setDropdown(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <DropdownMain className="dropdownMain">
            <Box className="CataloguePageFiltersSubBox"
                id="basic-button"
                data-test-id='RentalPeriodMenu'
                onClick={() => {
                    if (handleClick) {
                        handleClick()
                    }
                    else { setDropdown(true) }
                }}
            >

                <Typography className="iconText" >{value || label}</Typography>


                <img src={labelIcon} className="iconImage" />
            </Box>
            {dropdown && children && <div className="dropdownList" ref={ref}>
                <span className="pointer"></span>
                {children}
            </div>}
        </DropdownMain>
    )
}

export default CustomFilterCatalogueSelectBox



const DropdownMain: any = styled('div')({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    '& .dropdownList': {
        position: 'absolute',
        top: '54px',
        left: '50%',
        backgroundColor: '#ffffff',
        transform: 'translateX(-50%)',
        borderRadius: '10px',
        padding: '15px',
        boxShadow: '0px 0px 15px 3px #00000040',
        zIndex: 9,

        '& .pointer': {
            display: 'inline-block',
            backgroundColor: '#ffffff',
            position: 'absolute',
            top: '-15px',
            left: '30%',
            width: '15px',
            height: '15px',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }
    }
})