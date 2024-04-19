import React, { useState } from 'react';
import { Search } from '@carbon/react';
import { StatusFilter } from './StatusFilter';
import { OwnerFilter } from './OwnerFilter';
import { useStatusFilterHandlers } from './use-status-filter-handlers';
import { useOwnerFilterHandlers } from './use-owner-filter-handlers';

export const createDefaultCriteria = () => ({
  name: '',
  status: {
    name: '',
    options: []
  },
  owner: {
    name: '',
    options: []
  }
});

/**
 * @param {object} props
 * @param {string[]} props.statusOptions
 * @param {string[]} props.ownerOptions
 * @param {(criteria: object) => void} props.onChange
 */
export const InstancesSearch = props => {
  const { statusOptions, ownerOptions, onChange } = props;

  const [criteria, setCriteria] = useState(createDefaultCriteria);

  const updateCriteria = newCriteria => {
    setCriteria(newCriteria);
    onChange(newCriteria);
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onNameChange = e => {
    const newCriteria = {
      ...criteria,
      name: e.target.value
    };
    updateCriteria(newCriteria);
  };

  const { onStatusNameChange, onStatusOptionCheck } = useStatusFilterHandlers({
    criteria,
    onChange: updateCriteria
  });

  const { onOwnerNameChange, onOwnerOptionCheck } = useOwnerFilterHandlers({
    criteria,
    onChange: updateCriteria
  });

  return (
    <div className="instances-search">
      <Search
        className="search-input-wrap"
        placeholder="Search by instance name"
        labelText="Search by instance name"
        value={criteria.name}
        onChange={onNameChange}
      />
      <StatusFilter
        criteria={criteria.status}
        statuses={statusOptions}
        onNameChange={onStatusNameChange}
        onOptionCheck={onStatusOptionCheck}
      />
      <OwnerFilter
        criteria={criteria.owner}
        users={ownerOptions}
        onNameChange={onOwnerNameChange}
        onOptionCheck={onOwnerOptionCheck}
      />
    </div>
  );
};
