import React from 'react';
import { Add } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { InstancesSearch } from './InstancesSearch';

/**
 * @param {object} props
 * @param {string[]} props.statusOptions
 * @param {string[]} props.ownerOptions
 * @param {(criteria: object) => void} props.onSearchCriteriaChange
 */
export const InstancesToolbar = props => {
  const { statusOptions, ownerOptions, onSearchCriteriaChange } = props;

  return (
    <div className="instances-toolbar">
      <InstancesSearch
        statusOptions={statusOptions}
        ownerOptions={ownerOptions}
        onChange={onSearchCriteriaChange}
      />
      <Button className="add-instance-button" kind="ghost" renderIcon={Add}>
        Add Instance
      </Button>
    </div>
  );
};
