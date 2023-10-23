import React, { Component } from "react"
import { Rings } from 'react-loader-spinner'
export default class Loader extends Component {
    render() {
        return (
            <div style={{position:"fixed", top:"50%", left:"50%", width:"100%", height:"100%"}}>

                <Rings
                    height="100"
                    width="100"
                    color="#05bf61"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        )
    }
}