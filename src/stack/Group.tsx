import React from 'react';

export interface GroupProps {
  children: React.ReactNode;
}

const Group: React.FC<GroupProps> = (props) => {
  const { children } = props;

  return <>{children}</>;
};

export default Group;
