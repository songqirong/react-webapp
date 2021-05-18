import React, { useState, useRef, useEffect } from "react";
import { List, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { NavBar, InputItem, Message } from "@components/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { check_phone, fun_to_promise } from "@/utils";
import {
  fetchReduxRegist,
  fetchReduxLogin,
  fetchReduxUserInfo,
} from "@/redux/user/actions";
import { IStoreType } from "@redux/type";
import "./index.scss";
const LOGO = require("@/assets/logo.jpeg").default;
const Regist: React.FC<any> = (props) => {
  const [userType, setUserType] = useState<string>("SEEKERS");
  const [submitType, setSubmitType] = useState<"login" | "regist">("login");
  const USERNAME = useRef<HTMLInputElement>();
  const PASSWORD = useRef<HTMLInputElement>();
  const PASSWORD2 = useRef<HTMLInputElement>();
  const { fetchRegist, fetchLogin, fetchUserInfo, user } = props;
  const isLogin = submitType === "login";
  const data = [
    { value: "SEEKERS", label: "大神" },
    { value: "BOSS", label: "老板" },
  ];
  const onChange = (value: string) => {
    setUserType(value);
  };
  console.log(user, "user");
  const submit_to_regist = () => {
    const username = USERNAME.current?.value;
    const password = PASSWORD.current?.value;
    const password2 = PASSWORD2.current?.value;
    if (!username) {
      Message.show("请输入手机号", "warn");
    } else if (!check_phone(username)) {
      Message.show("请输入正确的手机号", "warn");
    } else if (!password) {
      Message.show("请输入密码", "warn");
    } else if (!isLogin && !password2) {
      Message.show("请输入确认密码", "warn");
    } else if (!isLogin && password !== password2) {
      Message.show("两次输入密码不一致", "warn");
      (PASSWORD.current as any).value = "";
      (PASSWORD2.current as any).value = "";
    } else {
      // 发送注册或登录请求
      if (isLogin) {
        fun_to_promise({ phone_number: username, password }, fetchLogin).then(
          (res: any) => {
            Message.show(res.msg, "success");
            (PASSWORD.current as any).value = "";
            (USERNAME.current as any).value = "";
          }
        );
      } else {
        fun_to_promise(
          { phone_number: username, password2, password, user_type: userType },
          fetchRegist
        ).then((res: any) => {
          Message.show(res.msg, "success");
          (PASSWORD.current as any).value = "";
          (PASSWORD2.current as any).value = "";
          (USERNAME.current as any).value = "";
          setUserType("SEEKERS");
        });
      }
    }
  };
  useEffect(() => {
    fun_to_promise({}, fetchUserInfo).then((res) => {
      console.log(res, "res");
    });
  }, []);
  // 转换登录与注册
  const change_submit_type = (type: "login" | "regist") => {
    setSubmitType(type);
  };
  return (
    <section className="register-container">
      <NavBar />
      <div className="img">
        <img src={LOGO} alt="" />
      </div>
      <WingBlank size="lg">
        <List style={{ borderRadius: "5px", overflow: "hidden" }}>
          <InputItem
            name="用户名"
            refEle={USERNAME}
            type="text"
            placeHolder="请输入手机号"
            maxLength={11}
          />
          <WhiteSpace size="lg" />
          <InputItem name="密码" refEle={PASSWORD} type="password" />
          {submitType === "regist" && (
            <>
              <WhiteSpace size="lg" />
              <InputItem name="确认密码" refEle={PASSWORD2} type="password" />
              <WhiteSpace size="lg" />
              <InputItem
                name="用户类型"
                type="checkbox"
                onChange={onChange}
                data={data}
                value={userType}
              />
            </>
          )}
        </List>
        <Button type="primary" className="btn" onClick={submit_to_regist}>
          {isLogin ? "登录" : "注册"}
        </Button>
        <Button
          className="btn btn1"
          onClick={() => {
            change_submit_type(isLogin ? "regist" : "login");
          }}
        >
          {isLogin ? "去注册" : "已有账户"}
        </Button>
        <div className="msg">{user.userInfo.user_name}</div>
      </WingBlank>
    </section>
  );
};
const MapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchLogin: fetchReduxLogin,
      fetchRegist: fetchReduxRegist,
      fetchUserInfo: fetchReduxUserInfo,
    },
    dispatch
  );

const MapStateToProps = (store: IStoreType) => {
  const { user } = store;
  return {
    user,
  };
};
export default connect(MapStateToProps, MapDispatchToProps)(Regist);
