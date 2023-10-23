import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import './CustomModal.css'

interface Props {
    heading?: string
    open: boolean;
    children: any;
    maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    handleClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
}

export default function CustomModal({heading,open,handleClose, children,maxWidth = 'xs' }:Props) {
    return (
        <Dialog
        maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {heading && <DialogTitle id="alert-dialog-title">
                {heading}
            </DialogTitle>}
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}