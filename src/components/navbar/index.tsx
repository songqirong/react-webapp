import { Icon } from "antd-mobile";
import React, { FC } from "react";
import "./index.scss";
type IProps = {
  content: string;
  type?: string;
  callback?: () => void;
};
const NavBarComponent: FC<IProps> = (props) => {
  const { content, type, callback } = props;
  return (
    <div className="navBar">
      { type && <Icon type={type} onClick={callback}/> }
      <span>{content}</span>
    </div>
  );
};
export default NavBarComponent;
