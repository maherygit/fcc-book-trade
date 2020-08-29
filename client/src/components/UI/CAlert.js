import React from 'react';
import './CAlert.css';

const alertClasses = { info: 'alert--info', succes: 'alert--succes', warning: 'alert--warning', error: 'alert--error' };
const alertIcons = { info: 'ⓘ', succes: '✓', warning: '⚠', error: '⤬' };

const getClassNameForProp = (condition, result, defaultValue) => {
  if (condition) {
    return result;
  } else if (defaultValue) {
    return defaultValue;
  } else {
    return '';
  }
}

const getKindClassName = kind => getClassNameForProp((kind && alertClasses[kind]), alertClasses[kind], alertClasses.info); 
const getCenteredClassName = centered => getClassNameForProp(centered, 'alert__container--centered'); 
const getInvertedClassName = inverted => getClassNameForProp(inverted, 'alert--inverted'); 

const getClassName = (kind, centered, inverted ) => {
  const className = ['c_alert'];
  const _mainClass = getKindClassName(kind);
  const _centered = getCenteredClassName(centered);
  const _inverted = getInvertedClassName(inverted);
  
  className.push(_mainClass)
  if (_centered) className.push(_centered)
  if (_inverted) className.push(_inverted)
  
  return className;
}

const getIcon = kind => alertIcons[kind] ? alertIcons[kind] : alertIcons.info; 

const Alert = ({ kind, centered, inverted, children }) => {
  return (
    <div className={ getClassName(kind, centered, inverted) }>
      <span className="alert__icon">{ getIcon(kind) }</span>
      <span className="alert__text">{ children }</span>
    </div>
  );
}

export default Alert;