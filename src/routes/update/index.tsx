import { NavBar } from '@/components';
import React, { useEffect, useState, useRef } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpdateUserCompleteInfo, fetchInsertUserCompleteInfo, fetchUpdateAvatar } from '@api/user';
import { Button, Toast } from 'antd-mobile';
import { updateReduxDetailInfo, updateReduxUserInfo } from '@redux/user/actions';
import { IInitalStateType } from '@/redux/user/type';
import { clone_deep, findObjIdxFromArr } from '@/utils/socket';
import { BossBox, AvatarSelect } from '@/routes/complete-info/components';
import { qs_parse } from '@/utils';
import cx from 'classnames';
import './index.scss';
enum TypeToName {
  company_name = '公司名称',
  personal_introduction = '自我介绍',
  apply_job = '求职意向',

}
const Update: React.FC<any> = (props) => {
  const { type, id } = qs_parse();
  // 获取redux中的数据
  const { user: { completeInfo, userInfo } }: { user: IInitalStateType } = useSelector((store: any) => store);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [user_avatar, set_user_avatar] = useState<string>();
  const [idx, setIdx] = useState<any>(undefined);
  const iptEle = useRef<any>();
  const RECRUITMENTJOB = useRef<HTMLInputElement>();
  const COMPANYNAME = useRef<HTMLInputElement>();
  const RECRUITMENTSALARY = useRef<HTMLInputElement>();
  const RECRUITMENTREQUEST = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  useEffect(() => {
    if(id && completeInfo.length > 0){
      const index = findObjIdxFromArr(completeInfo, { _id: id });
      setIdx(index);
      if(type === 'card' && RECRUITMENTJOB.current && COMPANYNAME.current && RECRUITMENTSALARY.current && RECRUITMENTREQUEST.current){
        RECRUITMENTJOB.current.value = completeInfo[index].recruitment_job;
        COMPANYNAME.current.value = completeInfo[index].company_name;
        RECRUITMENTSALARY.current.value = completeInfo[index].recruitment_salary;
        RECRUITMENTREQUEST.current.value = completeInfo[index].recruitment_request;
      }else if(iptEle.current){
        // 存在即赋初始值
        iptEle.current.value = completeInfo[index][type];
      }
    }
  }, [completeInfo]);

  useEffect(() => {
    if(user_avatar && user_avatar !== userInfo?.user_avatar){
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [user_avatar]);

  useEffect(() => {
    if(userInfo?.user_avatar){
      set_user_avatar(userInfo.user_avatar);
    }
  }, [userInfo]);

  // 返回上一页
  const goBack = () => {
    props.history.goBack();
  };

  // 更新redux中的数据
  const updateInfo = async(data: any, cb: () => void) => {
    dispatch(updateReduxDetailInfo(data));
    cb();
  };

  // 点击提交
  const submit = async() => {
    let res: any, new_complete_info: any[] = clone_deep(completeInfo);
    const val = iptEle.current?.value;
    const data = { [type]: val };
    if(!!id){ // 证明完善过了信息
      res = await fetchUpdateUserCompleteInfo(data, id);
      new_complete_info[idx][type] = val;

    } else { // 没有任何完善信息
      res = await fetchInsertUserCompleteInfo(data);
      new_complete_info = [res.data];
    }
    updateInfo(new_complete_info, goBack);
    Toast.info(res.msg);
  };

  // input的change事件
  const changeStatus = (e: any) => {
    const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$/;
    setCanSubmit(e.target.value.match(reg));
  };

  // 保存
  const save = async() => {
    const [
      recruitment_job,
      recruitment_salary,
      company_name,
      recruitment_request,
    ] = [
      RECRUITMENTJOB.current?.value,
      RECRUITMENTSALARY.current?.value,
      COMPANYNAME.current?.value,
      RECRUITMENTREQUEST.current?.value,
    ];
    if (!recruitment_job) {
      return Toast.info('请填写招聘职位');
    } else if (!company_name) {
      return Toast.info('请填写公司名称');
    } else if (!recruitment_salary) {
      return Toast.info('请填写职位薪资');
    } else if (!recruitment_request) {
      return Toast.info('请填写职位要求');
    } else if(!recruitment_salary.match(/^[1-9][0-9]*$/)){
      return Toast.info('请输入纯数值的薪资，不包含小数');
    }else {
      // 发送请求更新
      const data = {
        recruitment_job,
        recruitment_salary: Number(recruitment_salary),
        company_name,
        recruitment_request,
      };
      let res: any, new_complete_info: any[] = clone_deep(completeInfo);
      if(id){
        res = await fetchUpdateUserCompleteInfo(data, id);
        new_complete_info[idx] = { ...new_complete_info[idx], ...data };
      } else {
        res = await fetchInsertUserCompleteInfo(data);
        new_complete_info = [res.data, ...new_complete_info];
      }
      if(res.err_code === 0){
        dispatch(updateReduxDetailInfo(new_complete_info));
        Toast.info(res.msg);
        goBack();
      }
    }
  };

  // 保存头像
  const avatarSubmit = async() => {
    if(user_avatar){
      const data = { user_avatar };
      const res: any = await fetchUpdateAvatar(data);
      if(res.err_code === 0){
        Toast.info(res.msg);
        // 更新userInfo
        dispatch(updateReduxUserInfo({ ...userInfo, ...data }));
        goBack();
      }
    }
  };


  const generEle = () => {
    const types = ['company_name', 'personal_introduction', 'apply_job'];
    const update_type = types.includes(type) ? 'input' : type;
    switch(update_type){
      case 'input':
        return (
          <div className="input_box">
            <div className="title">{`编辑${(TypeToName as any)[type]}`}</div>
            <div className="desc">请输入1～10个字符</div>
            <input type="text" placeholder="请输入公司名称" maxLength={10} ref={iptEle} onInput={changeStatus}/>
            <button className={cx({ canSubmit })} disabled={!canSubmit} onClick={submit}></button>
          </div>
        );
      case 'card':
        return (
          <div className='card_box'>
            <BossBox jobRef={RECRUITMENTJOB} nameRef={COMPANYNAME} salaryRef={RECRUITMENTSALARY} requestRef={RECRUITMENTREQUEST} />
            <Button type="primary" className="btn" onClick={save}>
                确认保存
            </Button>
          </div>
        );
      case 'avatar':
        return (
          <div className="avatar_box">
            <AvatarSelect
              user_avatar={user_avatar}
              set_user_avatar={set_user_avatar}
            />
            <button className={cx({ canSubmit })} disabled={!canSubmit} onClick={avatarSubmit}></button>
          </div>
        );

    }
  };

  return (
    <section className="update-container">
      <NavBar content="更改信息" leftType="left" leftCallback={goBack} />
      { generEle() }
    </section>
  );
};
export default withRouter(Update);
