/**
 * @param {object} options
 * @param {object} options.criteria
 * @param {(statusCriteria: object) => void} options.onChange
 */
export const useStatusFilterHandlers = options => {
  const { criteria, onChange } = options;

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onStatusNameChange = e => {
    const newCriteria = {
      ...criteria
    };
    newCriteria.status.name = e.target.value;
    onChange(newCriteria);
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param {string} status
   */
  const onStatusOptionCheck = (e, status) => {
    const { checked } = e.target;
    const newCriteria = {
      ...criteria
    };
    const options = [...newCriteria.status.options];
    if (checked) {
      options.push(status);
    } else {
      const index = options.indexOf(status);
      if (index >= 0) {
        options.splice(index, 1);
      }
    }
    newCriteria.status.options = options;
    onChange(newCriteria);
  };

  return {
    onStatusNameChange,
    onStatusOptionCheck
  };
};
