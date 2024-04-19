import React, { useState, useEffect, useMemo } from 'react';
import { Button, DismissibleTag, Modal } from '@carbon/react';
import { ModalPortal } from '@components/ModalPortal';
import { storeTags } from '@utilities/instance-util';
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

  const tagSet = useMemo(() => new Set(tags), [tags]);

  useEffect(() => {
    if (open && instance?.tags) {
      setTags([...instance.tags]);
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

  const onSave = () => {
    storeTags(instance.id, tags);
    onSaveProp(tags);
    onClose(false);
  };

  /**
   * @param {boolean} checkChange Whether to check if tags have changed before close.
   */
  const onClose = checkChange => {
    let changed = false;

    if (checkChange) {
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
          <TagInput key={open} tagSet={tagSet} onSubmit={addTag} />
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
