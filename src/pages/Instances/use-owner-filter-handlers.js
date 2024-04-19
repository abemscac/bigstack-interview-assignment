/**
 * @param {object} options
 * @param {object} options.criteria
 * @param {(ownerCriteria: object) => void} options.onChange
 */
export const useOwnerFilterHandlers = options => {
  const { criteria, onChange } = options;

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onOwnerNameChange = e => {
    const newCriteria = {
      ...criteria
    };
    newCriteria.owner.name = e.target.value;
    onChange(newCriteria);
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param {string} owner
   */
  const onOwnerOptionCheck = (e, owner) => {
    const { checked } = e.target;
    const newCriteria = {
      ...criteria
    };
    const options = [...newCriteria.owner.options];
    if (checked) {
      options.push(owner);
    } else {
      const index = options.indexOf(owner);
      if (index >= 0) {
        options.splice(index, 1);
      }
    }
    newCriteria.owner.options = options;
    onChange(newCriteria);
  };

  return {
    onOwnerNameChange,
    onOwnerOptionCheck
  };
};
