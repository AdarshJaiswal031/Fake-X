import React from 'react'
import { Hero, Typography, Button, SvgArrowCircleRight } from 'web3uikit'
const Message = ({ msg }) => {
    return (
        <div className='bg-yellow-400 flex h-10 flex ali'>
            <p className="mt-2 ml-8">
                {msg}
            </p>
        </div >
    )
}

export default Message