/**
 * @param {object} instance
 * @returns {string}
 */
export const computeInstanceType = instance => {
  if (!instance) {
    return 'INSTANCE_NOT_FOUND';
  }

  const {
    provider: { region },
    instanceType: { vcpu, memory, disk }
  } = instance;

  return `${vcpu} vCPU / ${memory} GB / ${disk} GB / ${region}`;
};
