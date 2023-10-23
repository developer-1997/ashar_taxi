import React, { useEffect, useRef, useState } from "react"
import { Box, Typography } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"

const CustomFilterSelectBox = ({ labelIcon, label, children, value}: any) => {
    const [dropdown,setDropdown] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event:any) => {
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
            <Box className="LandingPageFiltersSubBox"
                id="basic-button"
                data-testId='RentalPeriodMenu'
                onClick={()=> setDropdown(true)}
            >
                <img src={labelIcon} className="iconImage" />
                <Typography className="iconText" >{value || label}</Typography>
            </Box>
            {dropdown && <div className="dropdownList" ref={ref}>
                <span className="pointer"></span>
                {children}
            </div>}
        </DropdownMain>
    )
}

export default CustomFilterSelectBox



const DropdownMain: any = styled('div')({
    position: 'relative',
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