import React, { useMemo } from 'react';
import { Checkbox, MenuButton, Search } from '@carbon/react';

/**
 * @param {object} props
 * @param {object} props.criteria
 * @param {string[]} props.statuses
 * @param {React.ChangeEventHandler<HTMLInputElement>} props.onNameChange
 * @param {(e: React.ChangeEvent<HTMLInputElement>, status: string) => void} props.onOptionCheck
 */
export const StatusFilter = props => {
  const { criteria, statuses, onNameChange, onOptionCheck } = props;

  const selectedStatuses = useMemo(
    () => new Set(criteria.options),
    [criteria.options]
  );

  return (
    <MenuButton
      className="status-filter-wrap"
      kind="ghost"
      label="Status"
      size="md"
      menuAlignment="bottom-start"
    >
      <div className="status-filter-content">
        <Search
          className="search-input-wrap"
          placeholder="Search"
          labelText="Search"
          size="sm"
          value={criteria.name}
          onChange={onNameChange}
        />
        <div className="options-wrap">
          {statuses.map(status => (
            <Checkbox
              key={status}
              id={status}
              labelText={status}
              checked={selectedStatuses.has(status)}
              onChange={e => onOptionCheck(e, status)}
            />
          ))}
        </div>
      </div>
    </MenuButton>
  );
};
