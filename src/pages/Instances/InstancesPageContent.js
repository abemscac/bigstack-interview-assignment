import React, { useState, useMemo } from 'react';
import { InstanceApi } from '@apis/instance-api';
import {
  InstanceTagsModal,
  useInstanceTagsModal
} from '@components/InstanceTagsModal';
import { debounce } from '@utilities/debounce-util';
import { InstancesToolbar } from './InstancesToolbar';
import { filterInstances } from './filter-instances';
import { InstancesTable } from './InstancesTable';
import { createDefaultCriteria } from './InstancesSearch';

const { useListInstances } = InstanceApi;

export const InstancesPageContent = () => {
  const { data: instances = [], isLoading, error, mutate } = useListInstances();

  // Duplicate `searchCriteria` to reduce the number of re-renders.
  const [searchCriteria, setSearchCriteria] = useState(createDefaultCriteria);

  const filteredInstances = useMemo(
    () => filterInstances(instances, searchCriteria),
    [instances, searchCriteria]
  );

  const statusOptions = useMemo(() => {
    const set = new Set();
    instances.forEach(instance => {
      if (!set.has(instance.status)) {
        set.add(instance.status);
      }
    });
    return Array.from(set);
  }, [instances]);

  const ownerOptions = useMemo(() => {
    const set = new Set();
    instances.forEach(instance => {
      if (!set.has(instance.user)) {
        set.add(instance.user);
      }
    });
    return Array.from(set);
  }, [instances]);

  const onSearchCriteriaChange = debounce(setSearchCriteria, 400);

  const { modalOpen, editedInstance, openModal, closeModal } =
    useInstanceTagsModal();

  /**
   * @param {string[]} newTags
   */
  const updateTags = newTags => {
    const newInstances = [...instances];
    const instance = newInstances.find(
      instance => instance.id === editedInstance.id
    );
    if (instance) {
      instance.tags = newTags;
      mutate(newInstances);
    }
  };

  return (
    <div className="instances-page-content">
      <InstancesToolbar
        statusOptions={statusOptions}
        ownerOptions={ownerOptions}
        onSearchCriteriaChange={onSearchCriteriaChange}
      />
      <InstancesTable
        instances={filteredInstances}
        isLoading={isLoading}
        error={error}
        onEditTag={openModal}
      />
      <InstanceTagsModal
        open={modalOpen}
        instance={editedInstance}
        onSave={updateTags}
        onClose={closeModal}
      />
    </div>
  );
};
