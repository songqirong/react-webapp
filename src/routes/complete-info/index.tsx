import React, { useEffect, useRef, useState } from "react";
import { NavBar, InputItem } from "@components/index";
import { connect } from "react-redux";
import { fetchCompleteMessage } from "@api/user";
import { bindActionCreators } from "redux";
import { fetchReduxUserInfo } from "@/redux/user/actions";
import { IStoreType } from "@redux/type";
import { AvatarSelect, BossBox } from './components';
import { Button, Toast } from "antd-mobile";
import "./index.scss";
import { qs_parse } from "@/utils";
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
      <BossBox jobRef={RECRUITMENTJOB} nameRef={COMPANYNAME} salaryRef={RECRUITMENTSALARY} requestRef={RECRUITMENTREQUEST}  />
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
      } else if(!recruitment_salary.match(/^[1-9][0-9]*$/)){
        return Toast.info('请输入纯数值的薪资，不包含小数')
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
          recruitment_salary: Number(recruitment_salary),
          recruitment_request,
        }
      : { user_avatar, apply_job, personal_introduction };
    fetchCompleteMessage(data).then((res: any) => {
      const { from } = qs_parse();
      if(res.err_code === 0){
        Toast.success(res.msg, 2, () => {
          location.href = from || '/'
        })
      } else if(res.err_code === 'CONFLICT_BEHAVIOR'){
        props.history.push('/home');
      }
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
