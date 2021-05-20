import React, { FC } from "react";
import "./index.scss";
type IProps = {
  content: string;
};
const NavBarComponent: FC<IProps> = (props) => {
  const { content } = props;
  return (
    <div className="navBar">
      <span>{content}</span>
    </div>
  );
};
export default NavBarComponent;
