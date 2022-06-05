// @ts-nocheck

import React from "react"
import Tooltip from '@atlaskit/tooltip';

const PlusIcon = () => {

    return (
        <img src="../assets/icons/plus_icon.png" />
    )
}

const ArrowIcon = () => {
    return (
        <img className="arrowIcon" src="./assets/icons/icon-right.svg" />
    )
}

const EditRuleIcon = () => {
    return (
        <svg className="edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.988 2.012L21.988 5.012L19.701 7.3L16.701 4.3L18.988 2.012ZM8 16H11L18.287 8.713L15.287 5.713L8 13V16Z" fill="#44475A" />
            <path d="M19 19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.896 3 5V19C3 20.104 3.897 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V10.332L19 12.332V19Z" fill="#44475A" />
        </svg>
    )
}

const RemoveRuleIcon = () => {
    return (
        <svg className="remove" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 1.5L1.5 16.5" stroke="#C22424" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.5 1.5L16.5 16.5" stroke="#C22424" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const Info = ({message}) => {
    return (
        <Tooltip position="right" content={message}>
            <img className="infoIcon" src="./assets/icons/info-icon.svg" />
        </Tooltip>
        
    )
}



export { PlusIcon, ArrowIcon, EditRuleIcon, RemoveRuleIcon, Info }

