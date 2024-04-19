import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, DismissibleTag, Modal } from '@carbon/react';
import { ModalPortal } from '@components/ModalPortal';
import { isValidTag, storeTags } from '@utilities/instance-util';
import { TagInput } from './TagInput';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {object} props.instance
 * @param {(tags: string[]) => void} props.onSave
 * @param {() => void} props.onClose
 */
export const InstanceTagsModal = props => {
  const { open, instance, onSave: onSaveProp, onClose: onCloseProp } = props;

  const [tags, setTags] = useState([]);
  const inputValueAfterBlur = useRef('');

  const tagSet = useMemo(() => new Set(tags), [tags]);

  useEffect(() => {
    if (open && instance?.tags) {
      setTags([...instance.tags]);
    } else {
      // Reset `inputValueAfterBlur` when modal is closed.
      inputValueAfterBlur.current = '';
    }
  }, [open, instance?.tags]);

  const addTag = newTag => {
    setTags(prev => [...prev, newTag]);
  };

  const removeTag = index => {
    setTags(prev => {
      const newTags = [...prev];
      newTags.splice(index, 1);
      return newTags;
    });
  };

  /**
   * @param {React.FocusEvent<HTMLInputElement>} e
   */
  const onTagInputBlur = e => {
    inputValueAfterBlur.current = e.target.value;
  };

  const onSave = () => {
    const newTags = [...tags];

    // Add unsaved value to the tag list, if possible.
    if (
      inputValueAfterBlur.current &&
      !tagSet.has(inputValueAfterBlur.current) &&
      isValidTag(inputValueAfterBlur.current)
    ) {
      newTags.push(inputValueAfterBlur.current);
    }

    storeTags(instance.id, newTags);
    onSaveProp(newTags);
    onClose(false);
  };

  /**
   * @param {boolean} checkChanges Whether to check if tags have changed before close.
   */
  const onClose = checkChanges => {
    let changed = false;

    if (checkChanges) {
      changed =
        instance.tags.length !== tags.length ||
        !tags.every((tag, index) => tag === instance.tags[index]);
    }

    if (
      changed &&
      !confirm('Are you sure you want to exit without saving your changes?')
    ) {
      return;
    }

    onCloseProp();
  };

  return (
    <ModalPortal>
      <Modal
        className="instance-tags-modal"
        open={open}
        passiveModal={true}
        preventCloseOnClickOutside={true}
        modalHeading={`Edit tags of ${instance?.name}`}
        onRequestClose={() => onClose(true)}
      >
        <div className="hint">
          Tags can only contain letters, numbers, dashes and underscores.
        </div>
        <div className="content-wrap">
          {tags.map((tag, index) => (
            <DismissibleTag
              key={tag}
              type="cool-gray"
              onClose={() => removeTag(index)}
            >
              {tag}
            </DismissibleTag>
          ))}
          <TagInput
            // Use key to "reset" the value of input when modal is toggled.
            key={open}
            tagSet={tagSet}
            onBlur={onTagInputBlur}
            onSubmit={addTag}
          />
        </div>
        <div className="footer-wrap">
          <Button className="save-button" onClick={onSave}>
            Save
          </Button>
        </div>
      </Modal>
    </ModalPortal>
  );
};
