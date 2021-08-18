import { Icon } from 'antd-mobile';
import React, { memo } from 'react';
import './index.scss';
type Iprops = {
  callback?: () => void;
}

const FixIcon: React.FC<Iprops> = (props) => {
  const { callback } = props;
  return (
    <div className="fix-icon" onClick={callback} >
      +
    </div>
  );
};

export default memo(FixIcon);
