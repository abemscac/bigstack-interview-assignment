import React from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  DataTableSkeleton
} from '@carbon/react';
import { InstanceApi } from '@apis/instance-api';
import { InstanceRow } from './InstanceRow';
import {
  InstanceTagsModal,
  useInstanceTagsModal
} from '@components/InstanceTagsModal';

const headers = [
  {
    key: 'leading_icon',
    header: ''
  },
  {
    key: 'name',
    header: 'name'
  },
  {
    key: 'key_name',
    header: 'keypair'
  },
  {
    key: 'volumes',
    header: 'volumes'
  },
  {
    key: 'interface_ip',
    header: 'interface Ip'
  },
  {
    key: 'floating_ip',
    header: 'floating ip'
  },
  {
    key: 'tags',
    header: 'tags'
  },
  {
    key: 'user',
    header: 'owner'
  },
  {
    key: 'expiresAt',
    header: 'expires'
  },
  {
    key: 'launched_at',
    header: 'created'
  },
  {
    key: 'status',
    header: 'status'
  },
  {
    key: 'action_button',
    header: ''
  }
];

const { useListInstances } = InstanceApi;

export const InstancesTableWrap = () => {
  const { data: instances = [], isLoading, error, mutate } = useListInstances();

  const renderDataTable = () => (
    <DataTable rows={instances} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const instance = instances[index];
              return (
                <InstanceRow
                  key={instance.id}
                  rowProps={getRowProps({ row })}
                  instance={instance}
                  onEditTag={() => openModal(instance)}
                />
              );
            })}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );

  const renderContent = () => {
    if (error) {
      return <div className="error">{error.message}</div>;
    } else if (isLoading) {
      return (
        <DataTableSkeleton
          headers={headers}
          columnCount={headers.length}
          showHeader={false}
          showToolbar={false}
        />
      );
    } else {
      return renderDataTable();
    }
  };

  const { modalOpen, editedInstance, openModal, closeModal } =
    useInstanceTagsModal();

  /**
   * @param {string[]} newTags
   */
  const updateTags = newTags => {
    const newInstances = [...instances];
    const instance = newInstances.find(
      instance => instance.id === editedInstance.id
    );
    if (instance) {
      instance.tags = newTags;
      mutate(newInstances);
    }
  };

  return (
    <div className="instances-table-wrap">
      <div className="search-bar">Search bar</div>
      {renderContent()}
      <InstanceTagsModal
        open={modalOpen}
        instance={editedInstance}
        onSave={updateTags}
        onClose={closeModal}
      />
    </div>
  );
};
