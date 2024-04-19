import React, { useMemo } from 'react';
import classNames from 'classnames';
import {
  OverflowMenu,
  OverflowMenuItem,
  TableCell,
  TableRow,
  Tag,
  Tooltip
} from '@carbon/react';
import {
  BareMetalServer,
  Edit,
  OverflowMenuHorizontal
} from '@carbon/icons-react';
import { UserAvatar } from '@components/UserAvatar';
import { computeInstanceType } from '@utilities/instance-util';
import { computeTimeAgo } from '@utilities/date-util';

const statusTagType = {
  active: 'green',
  canceled: 'blue',
  expired: 'cool-gray',
  rejected: 'red',
  stopped: 'cool-gray'
};

const MAX_VISIBLE_TAG_COUNT = 5;

/**
 * @param {object} props
 * @param {object} props.instance
 * @param {object} props.rowProps
 * @param {() => void} props.onEditTag
 */
export const InstanceRow = props => {
  const { instance, rowProps, onEditTag } = props;

  const keyName = useMemo(
    () => instance.key_name.replace('bigstack-', ''),
    [instance.key_name]
  );

  const renderNameCell = () => {
    return (
      <span className="name-wrap">
        <b className="instance-name">{instance.name}</b>
        <span className="instance-type">{computeInstanceType(instance)}</span>
        <span className="instance-image">{instance.image}</span>
      </span>
    );
  };

  const renderTags = () => {
    const { tags } = instance;
    if (tags.length) {
      const moreTagsCount = tags.length - MAX_VISIBLE_TAG_COUNT;
      return (
        <span className="tags-wrap">
          {tags.slice(0, MAX_VISIBLE_TAG_COUNT).map(tag => (
            <Tooltip key={tag} className="tag-tooltip" label={tag}>
              <Tag
                className="instance-tag"
                type="cool-gray"
                size="sm"
                onClick={onEditTag}
              >
                {tag}
              </Tag>
            </Tooltip>
          ))}
          {moreTagsCount > 0 && renderMoreTags(moreTagsCount)}
        </span>
      );
    } else {
      return (
        <button className="add-tag-button" onClick={onEditTag}>
          Add...
        </button>
      );
    }
  };

  const renderMoreTags = count => {
    const tooltip = `${count} more tag(s)`;
    const text = count > 99 ? '99+' : `${count}+`;
    return (
      <Tooltip className="more-tag-tooltip" label={tooltip}>
        <Tag
          className="instance-tag instance-tag__more"
          type="cool-gray"
          size="sm"
          onClick={onEditTag}
        >
          {text}
        </Tag>
      </Tooltip>
    );
  };

  const renderExpires = () => {
    const { status, launched_at, expiresAt } = instance;

    if (!launched_at) {
      return null;
    }

    return (
      <span className="expires-wrap">
        <span
          className={classNames('expires-text', {
            expired: status === 'expired'
          })}
        >
          {expiresAt ? computeTimeAgo(expiresAt) : 'Never'}
        </span>
        {launched_at && <Edit className="edit-icon" />}
      </span>
    );
  };

  return (
    <TableRow {...rowProps}>
      <TableCell className="icon-cell">
        <BareMetalServer />
      </TableCell>
      <TableCell className="name-cell">{renderNameCell()}</TableCell>
      <TableCell className="keypair-cell">
        {keyName && (
          <Tooltip className="keypair-tooltip" label={keyName}>
            <Tag className="keypair-tag" type="cool-gray" size="sm">
              {keyName}
            </Tag>
          </Tooltip>
        )}
      </TableCell>
      <TableCell className="volumes-cell">
        <span className="volumes-text">{instance.volumes.length}</span>
      </TableCell>
      <TableCell className="interface-ip-cell">
        {instance.interface_ip}
      </TableCell>
      <TableCell className="floating-ip-cell">{instance.floating_ip}</TableCell>
      <TableCell className="tags-cell">{renderTags()}</TableCell>
      <TableCell className="owner-cell">
        <UserAvatar user={instance.user} />
      </TableCell>
      <TableCell className="expires-cell">{renderExpires()}</TableCell>
      <TableCell className="created-cell">
        {!!instance.launched_at && computeTimeAgo(instance.launched_at)}
      </TableCell>
      <TableCell className="status-cell">
        <Tag
          className="status-tag"
          type={statusTagType[instance.status]}
          size="sm"
        >
          {instance.status}
        </Tag>
      </TableCell>
      <TableCell className="action-cell">
        <OverflowMenu
          className="overflow-menu-toggle"
          aria-label="overflow-menu"
          flipped={true}
          renderIcon={OverflowMenuHorizontal}
        >
          <OverflowMenuItem itemText="Enable floating IP" />
          <OverflowMenuItem itemText="Reboot" />
          <OverflowMenuItem itemText="Power off" />
          <OverflowMenuItem itemText="Power cycle" />
          <OverflowMenuItem itemText="View usage" />
          <OverflowMenuItem itemText="Modify Lifecycle" hasDivider={true} />
          <OverflowMenuItem
            itemText="Commit to app image"
            requireTitle={true}
          />
          <OverflowMenuItem
            itemText="Destroy"
            hasDivider={true}
            isDelete={true}
          />
        </OverflowMenu>
      </TableCell>
    </TableRow>
  );
};
