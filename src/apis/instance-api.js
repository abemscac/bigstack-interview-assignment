import useSWR from 'swr';
import { getStoredTags } from '@utilities/instance-util';
import { axios } from './axios-instance';

const useListInstances = () => {
  let fetcher = undefined;

  if (process.env.NODE_ENV === 'production') {
    // Use fixed instances data in production environment. (for Github Pages)
    fetcher = () => require('@server-data/instances.json');
  } else {
    // Get instances from server in non-production environment.
    fetcher = async () => {
      const { data } = await axios.get('/instances');

      if (Array.isArray(data)) {
        data.forEach(instance => {
          const storedTags = getStoredTags(instance.id);
          if (storedTags) {
            instance.tags = storedTags;
          }
        });
      }
      return data;
    };
  }

  return useSWR('listInstances', fetcher);
};

export const InstanceApi = {
  useListInstances
};
