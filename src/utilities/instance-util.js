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

/**
 * @param {string} instanceId
 */
const computeTagsStorageKey = instanceId => `${instanceId}-tags`;

/**
 * Retrieve the tags of the given instance from localStorage.
 * @param {string} instanceId
 * @returns {string[] | undefined}
 */
export const getStoredTags = instanceId => {
  if ('localStorage' in window) {
    const key = computeTagsStorageKey(instanceId);
    const serializedTags = localStorage.getItem(key);
    if (serializedTags) {
      return JSON.parse(serializedTags);
    }
  }
  return undefined;
};

/**
 * Save the tags of the given instance to localStorage.
 * @param {string} instanceId
 * @param {string[]} tags
 */
export const storeTags = (instanceId, tags) => {
  if ('localStorage' in window) {
    const key = computeTagsStorageKey(instanceId);
    localStorage.setItem(key, JSON.stringify(tags));
  }
};
