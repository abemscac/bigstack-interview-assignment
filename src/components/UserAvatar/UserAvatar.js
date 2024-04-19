import React from 'react';
import classNames from 'classnames';

const COLOR_COUNT = 5;

/**
 * @param {object} props
 * @param {string} props.user
 * @param {'sm' | 'md'} [props.size] Default: `sm`
 */
export const UserAvatar = props => {
  const { user, size = 'sm' } = props;

  const firstChar = user[0] || '';
  const colorIndex = firstChar.charCodeAt(0) % COLOR_COUNT;

  return (
    <span className={classNames('user-avatar', size, `color-${colorIndex}`)}>
      {firstChar}
    </span>
  );
};
