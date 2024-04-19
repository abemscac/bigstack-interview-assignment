import React from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  DataTableSkeleton,
  TableCell
} from '@carbon/react';
import { InstanceRow } from './InstanceRow';

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

/**
 * @param {object} props
 * @param {object[]} props.instances
 * @param {boolean} props.isLoading
 * @param {any} props.error
 * @param {(instance: object) => void} props.onEditTag
 */
export const InstancesTable = props => {
  const { instances, isLoading, error, onEditTag } = props;

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
            {/* Data */}
            {rows.map((row, index) => {
              const instance = instances[index];
              return (
                <InstanceRow
                  key={instance.id}
                  rowProps={getRowProps({ row })}
                  instance={instance}
                  onEditTag={() => onEditTag(instance)}
                />
              );
            })}
            {/* No Results */}
            {!rows.length && (
              <TableRow>
                <TableCell className="no-results-cell" colSpan={headers.length}>
                  No Results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );

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
