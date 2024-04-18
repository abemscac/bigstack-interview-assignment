import React from 'react';
import classNames from 'classnames';
import {
  OverflowMenu,
  OverflowMenuItem,
  TableCell,
  TableRow,
  Tag,
  Tooltip
} from '@carbon/react';
import { BareMetalServer, Edit } from '@carbon/icons-react';
import UserAvatar from '@components/UserAvatar';
import { computeInstanceType } from '@utilities/instance-util';
import { computeTimeAgo } from '@utilities/date-util';

const statusTagType = {
  active: 'green',
  canceled: 'blue',
  expired: 'cool-gray',
  rejected: 'red',
  stopped: 'cool-gray'
};

/**
 * @param {object} props
 * @param {object} props.instance
 * @param {object} props.rowProps
 */
export const InstanceRow = props => {
  const { instance, rowProps } = props;

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
      return (
        <span className="tags-wrap">
          {instance.tags.map(tag => (
            <Tag key={tag} className="instance-tag" type="cool-gray">
              {tag}
            </Tag>
          ))}
        </span>
      );
    } else {
      return <button className="add-tag-button">Add...</button>;
    }
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
        {instance.key_name && (
          <Tooltip className="keypair-tooltip" label={instance.key_name}>
            <Tag className="keypair-tag" type="cool-gray" size="sm">
              {instance.key_name}
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
