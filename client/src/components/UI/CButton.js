import React from 'react'
import './CButton.css'

const CButton = props => {
  let { className, children, iconPosition, ...otherProps } = props;
  const getClassName = (kind) => {
    const classList= [className, 'cbutton']
    switch(kind) {
      case 'primary':
      case 'secondary':
      case 'danger':  
        classList.push(kind);
        break;
      default:
        classList.push('primary');
        break;
    }
    return classList.join(' ');
  }
  const iconPositionRight = iconPosition && iconPosition === 'right';
  
  return (
    <button {...props} className={getClassName()} onClick={props.onClick} {...otherProps} >
      <div className="cbutton__container">
        { !iconPositionRight && <span className='cbutton__icon-left'></span> }
        <span className="cbutton_slot">{ children }</span>
        { iconPositionRight && <span className='cbutton__icon-right'></span> }
      </div>
    </button>
  )
}

export default CButton