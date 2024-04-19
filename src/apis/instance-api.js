import useSWR from 'swr';

const useListInstances = () => {
  return useSWR('listInstances', () => require('@server-data/instances.json'));
};

export const InstanceApi = {
  useListInstances
};
