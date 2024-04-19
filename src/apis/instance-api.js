import useSWR from 'swr';
import { getStoredTags } from '@utilities/instance-util';
import { axios } from './axios-instance';

const useListInstances = () => {
  return useSWR('listInstances', async () => {
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
  });
};

export const InstanceApi = {
  useListInstances
};
