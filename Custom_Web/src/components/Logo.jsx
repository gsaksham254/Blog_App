import React from 'react'

const Logo = ({width = '100px'}) => {
    const URL= 'https://png.pngtree.com/png-vector/20190919/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1742031.jpg'
    return (
        <div>
            <img src={URL} alt="Login Image"/>
        </div>
    )
}

export default Logo