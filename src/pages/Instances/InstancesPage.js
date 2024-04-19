import React from 'react';
import { BareMetalServer } from '@carbon/icons-react';
import { PageHeader } from '@components/PageHeader';
import { InstancesTableWrap } from './InstancesTableWrap';

export const InstancesPage = () => {
  return (
    <div className="instances-page">
      <PageHeader
        icon={defaultProps => <BareMetalServer size={defaultProps.size} />}
        title="Instances"
        subtitle="Overview of your virtual machines"
      />
      <InstancesTableWrap />
    </div>
  );
};
