import React, { FC, memo } from "react";
import "./index.scss";
import cx from "classnames";
import { IProps } from "./type";

const InputItem: FC<IProps> = (props) => {
  const {
    refEle,
    name,
    placeHolder,
    className,
    type,
    data,
    onChange,
    value,
    maxLength,
  } = props;
  const renderHtml = () => {
    switch (type) {
      case "text":
        return (
          <div className={cx("input-container", className)}>
            <div>{name}：</div>
            <input
              type="text"
              ref={refEle}
              placeholder={placeHolder ?? `请输入${name}`}
              maxLength={maxLength}
            />
          </div>
        );
      case "password":
        return (
          <div className={cx("input-container", className)}>
            <div>{name}：</div>
            <input
              type="password"
              ref={refEle}
              placeholder={placeHolder ?? `请输入${name}`}
              maxLength={maxLength}
            />
          </div>
        );
      case "checkbox":
        return (
          <div className={cx("checkbox-container", className)}>
            <div className="name">{name}：</div>
            <div className="options">
              {data?.map((i) => (
                <div key={i.value}>
                  <input
                    id={i.value}
                    type="checkbox"
                    checked={value === i.value}
                    onChange={() => onChange && onChange(i.value)}
                  />
                  <label htmlFor={i.value}>{i.label}</label>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };
  return renderHtml();
};
export default memo(InputItem);
