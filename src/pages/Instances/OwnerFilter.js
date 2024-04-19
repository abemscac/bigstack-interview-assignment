import React, { useMemo } from 'react';
import { Checkbox, MenuButton, Search } from '@carbon/react';
import { UserAvatar } from '@components/UserAvatar';

/**
 * @param {object} props
 * @param {object} props.criteria
 * @param {string[]} props.users
 * @param {React.ChangeEventHandler<HTMLInputElement>} props.onNameChange
 * @param {(e: React.ChangeEvent<HTMLInputElement>, user: string) => void} props.onOptionCheck
 */
export const OwnerFilter = props => {
  const { criteria, users, onNameChange, onOptionCheck } = props;

  const selectedUsers = useMemo(
    () => new Set(criteria.options),
    [criteria.options]
  );

  return (
    <MenuButton
      className="owner-filter-wrap"
      kind="ghost"
      label="Owner"
      size="md"
      menuAlignment="bottom-start"
    >
      <div className="owner-filter-content">
        <Search
          className="search-input-wrap"
          placeholder="Search"
          labelText="Search"
          size="sm"
          value={criteria.name}
          onChange={onNameChange}
        />
        <div className="options-wrap">
          {users.map(user => (
            <div key={user} className="user-checkbox-wrap">
              <Checkbox
                id={user}
                labelText={''}
                checked={selectedUsers.has(user)}
                onChange={e => onOptionCheck(e, user)}
              />
              <label className="checkbox-label-wrap" htmlFor={user}>
                <UserAvatar user={user} size="sm" />
                <span className="user-name">{user}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </MenuButton>
  );
};
