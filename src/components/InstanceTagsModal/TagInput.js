import { TextInput } from '@carbon/react';
import React, { useState, useMemo } from 'react';

const TAG_PATTERN = /^[a-zA-Z0-9_-]*$/;

/**
 * @param {object} props
 * @param {Set<string>} props.tagSet
 * @param {(value: string) => void} props.onSubmit
 */
export const TagInput = props => {
  const { tagSet, onSubmit: onSubmitProp } = props;

  const [value, setValue] = useState('');

  const errorMessage = useMemo(() => {
    if (tagSet.has(value)) {
      return 'Tag must be unique.';
    } else if (!TAG_PATTERN.test(value)) {
      return 'Tag must match the requested format.';
    } else {
      return undefined;
    }
  }, [value, tagSet]);

  const onSubmit = e => {
    e.preventDefault();
    if (value && !errorMessage) {
      onSubmitProp(value);
      setValue('');
    }
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        data-modal-primary-focus
        id="tag-input"
        className="tag-input-wrap"
        hideLabel={true}
        placeholder="Add tag here"
        labelText="Add tag here"
        invalid={!!errorMessage}
        invalidText={errorMessage}
        size="sm"
        value={value}
        onChange={onChange}
      />
    </form>
  );
};
