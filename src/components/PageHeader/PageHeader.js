import React from 'react';

/**
 * @typedef {object} DefaultIconProps
 * @property {number} size
 */

/**
 * @type {DefaultIconProps}
 */
const DEFAULT_ICON_PROPS = {
  size: 32
};

/**
 * @param {object} props
 * @param {(defaultProps: DefaultIconProps) => JSX.Element} props.icon
 * @param {string} props.title
 * @param {string} props.subtitle
 */
export const PageHeader = props => {
  const { icon, title, subtitle } = props;

  return (
    <div className="page-header">
      <div className="icon-wrap">{icon(DEFAULT_ICON_PROPS)}</div>
      <div className="info-wrap">
        <h2 className="header-title">{title}</h2>
        <small className="header-subtitle">{subtitle}</small>
      </div>
    </div>
  );
};
