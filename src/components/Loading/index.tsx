import React, { PureComponent } from 'react';
import './index.scss';

export default class Loading extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="loading_mask">
        <div className="loading_container">
          <div className="load-3">
            loading
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </div>
    );
  }
}
export function LoadingComponentFn() {
  return <Loading />;
}
