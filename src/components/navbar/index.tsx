import { Icon } from "antd-mobile";
import React, { FC } from "react";
import "./index.scss";
type IProps = {
  content: string;
  leftType?: string;
  leftCallback?: () => void;
  rightType?: string;
  rightCallback?: () => void;
};
const NavBarComponent: FC<IProps> = (props) => {
  const { content, leftType, leftCallback, rightCallback, rightType } = props;
  return (
    <div className="navBar">
      { leftType && <Icon type={leftType} onClick={leftCallback} className="left" /> }
      <span>{content}</span>
      { rightType && <Icon type={rightType} onClick={rightCallback} className="right" />  }
    </div>
  );
};
export default NavBarComponent;
