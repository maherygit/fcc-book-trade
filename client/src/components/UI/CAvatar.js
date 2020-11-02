import React from 'react';
import './CAvatar.css';

export default function CAvatar({ image = "", name = "°°", ...rest }) {
    return (
        <div className="avatar_container" {...rest}>
            <div className="avatar_mask">
                {image && <img className="avatar_image" src={image} alt={name} />}
                {!image && <span>{ name.substring(0, 2) }</span>}
            </div>
        </div>
    )
}
