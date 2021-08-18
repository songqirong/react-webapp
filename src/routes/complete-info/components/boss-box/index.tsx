import React, { memo } from 'react';
import cx from 'classnames';
import { InputItem } from '@/components';
import './index.scss';
type IProps = {
  className?: string;
  jobRef: React.MutableRefObject<HTMLInputElement | undefined>;
  nameRef: React.MutableRefObject<HTMLInputElement | undefined>;
  salaryRef: React.MutableRefObject<HTMLInputElement | undefined>;
  requestRef: React.MutableRefObject<HTMLInputElement | undefined>;
}

const BossBOx: React.FC<IProps> = (props) => {
  const { className, jobRef, nameRef, salaryRef, requestRef } = props;
  return(
    <div className={cx({ className })}>
      <InputItem name="招聘职位" refEle={jobRef} type="text" />
      <InputItem name="公司名称" refEle={nameRef} type="text" />
      <InputItem name="职位薪资" refEle={salaryRef} type="text" />
      <InputItem name="职位要求" refEle={requestRef} type="text" />
    </div>
  );
};

export default memo(BossBOx);
