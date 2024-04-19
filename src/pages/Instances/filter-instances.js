/**
 * @param {obect[]} instances
 * @param {object} criteria
 * @returns {object[]}
 */
export const filterInstances = (instances, criteria) => {
  const { name, status, owner } = criteria;

  const filters = [];

  if (name) {
    filters.push(instance =>
      instance.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (status.name) {
    filters.push(instance =>
      instance.status.toLowerCase().includes(status.name.toLowerCase())
    );
  }

  if (status.options.length) {
    const set = new Set(status.options);
    filters.push(instance => set.has(instance.status));
  }

  if (owner.name) {
    filters.push(instance =>
      instance.user.toLowerCase().includes(owner.name.toLowerCase())
    );
  }

  if (owner.options.length) {
    const set = new Set(owner.options);
    filters.push(instance => set.has(instance.user));
  }

  if (filters.length) {
    return instances.filter(instance =>
      filters.every(filter => filter(instance))
    );
  } else {
    return instances;
  }
};
