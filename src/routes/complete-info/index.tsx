import React, { useEffect, useRef, useState } from "react";
import { NavBar, InputItem } from "@components/index";
import { connect } from "react-redux";
import { fetchCompleteMessage } from "@/utils/api";
import { bindActionCreators } from "redux";
import { fetchReduxUserInfo } from "@/redux/user/actions";
import { IStoreType } from "@redux/type";
import AvatarSelect from "./components/avatar-select";
import { Button, Toast } from "antd-mobile";
import "./index.scss";
const CompleteInfo: React.FC<any> = (props) => {
  const [user_avatar, set_user_avatar] = useState<string>();
  const RECRUITMENTJOB = useRef<HTMLInputElement>();
  const COMPANYNAME = useRef<HTMLInputElement>();
  const RECRUITMENTSALARY = useRef<HTMLInputElement>();
  const RECRUITMENTREQUEST = useRef<HTMLInputElement>();
  const APPLYJOB = useRef<HTMLInputElement>();
  const PERSONALINTRODUCTION = useRef<HTMLInputElement>();
  const { fetchUserInfo, user } = props;
  const { user_type, user_avatar: user_select } = user.userInfo;
  const isBoss = user_type === "BOSS";
  useEffect(() => {
    fetchUserInfo();
  }, []);
  useEffect(() => {
    set_user_avatar(user_select);
  }, [user]);
  const generate_input_dom = () => {
    return isBoss ? (
      <>
        <InputItem name="招聘职位" refEle={RECRUITMENTJOB} type="text" />
        <InputItem name="公司名称" refEle={COMPANYNAME} type="text" />
        <InputItem name="职位薪资" refEle={RECRUITMENTSALARY} type="text" />
        <InputItem name="职位要求" refEle={RECRUITMENTREQUEST} type="text" />
      </>
    ) : (
      <>
        <InputItem name="求职岗位" refEle={APPLYJOB} type="text" />
        <InputItem name="个人介绍" refEle={PERSONALINTRODUCTION} type="text" />
      </>
    );
  };
  const submit = () => {
    const [
      recruitment_job,
      recruitment_salary,
      company_name,
      recruitment_request,
      apply_job,
      personal_introduction,
    ] = [
      RECRUITMENTJOB.current?.value,
      RECRUITMENTSALARY.current?.value,
      COMPANYNAME.current?.value,
      RECRUITMENTREQUEST.current?.value,
      APPLYJOB.current?.value,
      PERSONALINTRODUCTION.current?.value,
    ];
    if (isBoss) {
      if (!recruitment_job) {
        return Toast.info("请填写招聘职位");
      } else if (!company_name) {
        return Toast.info("请填写公司名称");
      } else if (!recruitment_salary) {
        return Toast.info("请填写职位薪资");
      } else if (!recruitment_request) {
        return Toast.info("请填写职位要求");
      }
    } else {
      if (!apply_job) {
        return Toast.info("请填写求职岗位");
      } else if (!personal_introduction) {
        return Toast.info("请填写个人介绍");
      }
    }
    const data = isBoss
      ? {
          recruitment_job,
          company_name,
          user_avatar,
          recruitment_salary,
          recruitment_request,
        }
      : { user_avatar, apply_job, personal_introduction };
    fetchCompleteMessage(data).then((res) => {
      console.log(res, "res");
    });
  };
  return (
    <section className="register-container">
      <NavBar content={isBoss ? "老板信息完善" : "大神信息完善"} />
      <AvatarSelect
        user_avatar={user_avatar}
        set_user_avatar={set_user_avatar}
      />
      <div className="input-box">
        {generate_input_dom()}
        <Button type="primary" className="btn" onClick={submit}>
          保存
        </Button>
      </div>
    </section>
  );
};
const MapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
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
export default connect(MapStateToProps, MapDispatchToProps)(CompleteInfo);
