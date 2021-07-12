import React, { useState, useRef } from "react";
import { List, WingBlank, WhiteSpace, Button, Toast } from "antd-mobile";
import { NavBar, InputItem, Message } from "@components/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchGetUserInfo } from "@api/user";
import { check_phone, fun_to_promise, qs_parse } from "@/utils";
import { fetchReduxRegist, fetchReduxLogin } from "@/redux/user/actions";
import "./index.scss";
const LOGO = require("@/assets/logo.jpeg").default;
const Regist: React.FC<any> = (props) => {
  const [userType, setUserType] = useState<string>("SEEKERS");
  const [submitType, setSubmitType] = useState<"login" | "regist">("login");
  const USERNAME = useRef<HTMLInputElement>();
  const PASSWORD = useRef<HTMLInputElement>();
  const PASSWORD2 = useRef<HTMLInputElement>();
  const { fetchRegist, fetchLogin } = props;
  const isLogin = submitType === "login";
  const data = [
    { value: "SEEKERS", label: "大神" },
    { value: "BOSS", label: "老板" },
  ];
  const onChange = (value: string) => {
    setUserType(value);
  };
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
      const content = isLogin ? "登录中..." : "注册中...";
      Toast.loading(content, 3, () => {}, true);
      // 发送注册或登录请求
      if (isLogin) {
        fun_to_promise({ phone_number: username, password }, fetchLogin).then(
          (res: any) => {
            (PASSWORD.current as any).value = "";
            (USERNAME.current as any).value = "";
            // 登录成功后获取用户信息，看是否需要跳转到完善用户信息页面
            fetchGetUserInfo({}).then((res: any) => {
              Toast.success("登录成功，即将跳转～", 2, () => {
                const { from } = qs_parse();
                const redirect_url = res.userInfo.user_avatar
                  ? from
                  : '/complete-info';
                location.href = redirect_url;
              });
            });
          }
        );
      } else {
        fun_to_promise(
          { phone_number: username, password2, password, user_type: userType },
          fetchRegist
        ).then((res: any) => {
          (PASSWORD.current as any).value = "";
          (PASSWORD2.current as any).value = "";
          (USERNAME.current as any).value = "";
          Toast.success("注册成功");
          Message.show(res.msg, "success");
          change_submit_type("login");
        });
      }
    }
  };
  // 转换登录与注册
  const change_submit_type = (type: "login" | "regist") => {
    (PASSWORD.current as any).value = "";
    if(type === 'login') (PASSWORD2.current as any).value = "";
    (USERNAME.current as any).value = "";
    setSubmitType(type);
  };
  return (
    <section className="register-container">
      <NavBar content="失联招聘" />
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
      </WingBlank>
    </section>
  );
};
const MapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchLogin: fetchReduxLogin,
      fetchRegist: fetchReduxRegist,
    },
    dispatch
  );

const MapStateToProps = () => {
  return {};
};
export default connect(MapStateToProps, MapDispatchToProps)(Regist);
