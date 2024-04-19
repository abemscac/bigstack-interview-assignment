import useSWR from 'swr';
import { getStoredTags } from '@utilities/instance-util';
import { axios } from './axios-instance';

const useListInstances = () =>
  useSWR('listInstances', async () => {
    const response = await axios.get('/instances');

    if (Array.isArray(response.data)) {
      response.data.forEach(instance => {
        const storedTags = getStoredTags(instance.id);
        if (storedTags) {
          instance.tags = storedTags;
        }
      });
    }

    return response.data;
  });

export const InstanceApi = {
  useListInstances
};
