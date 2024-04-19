import useSWR from 'swr';
import { getStoredTags } from '@utilities/instance-util';

const useListInstances = () => {
  return useSWR('listInstances', () => {
    const instances = require('@server-data/instances.json');

    instances.forEach(instance => {
      const storedTags = getStoredTags(instance.id);
      if (storedTags) {
        instance.tags = storedTags;
      }
    });

    return instances;
  });
};

export const InstanceApi = {
  useListInstances
};
