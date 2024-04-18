import { axios } from './axios-instance';
import useSWR from 'swr';

const useListInstances = () =>
  useSWR('listInstances', async () => {
    const response = await axios.get('/instances');
    return response.data;
  });

export const InstanceApi = {
  useListInstances
};
