import React, { useCallback } from 'react';
import { NavBar } from '@components/index';
import { useSelector, useDispatch } from 'react-redux';
import { IUserInfo } from '@redux/user/type';
import { fetchReduxLogout } from '@redux/user/actions'
import { fetchReduxClearList } from '@redux/home/actions';
import { fetchReduxClearList as fetchReduxClearMessageList } from '@redux/message/actions';
import { Result, List, Button, Toast, Modal } from 'antd-mobile';
import { withRouter } from 'react-router';
import { socketObj } from '@/utils/socket';
import './index.scss';
const My: React.FC = (props: any) => {
  const { userInfo, completeInfo }: { userInfo: IUserInfo, completeInfo: any[] } = useSelector((store: any) => store.user);
  const dispatch = useDispatch()
  const logout = () => {
    Modal.alert('退出登录', '退出登录后将无法接收到消息', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        dispatch(fetchReduxLogout({}));
        socketObj.close();
        Toast.success('退出成功', 2, () => {
          dispatch(fetchReduxClearList());
          dispatch(fetchReduxClearMessageList());
          props.history.push('/register-or-login')
        })
      } },
    ])
  }
  const streamlineFun = (str: string) => str.length > 10 ? `${str.slice(0, 9)}...` : str;
  const generateItem = () => {
    return userInfo.user_type === 'BOSS' ?  
      <>
      <List.Item arrow="horizontal" multipleLine onClick={() => {}} extra={streamlineFun(completeInfo[0]?.company_name || '无')}>
        公司名称
      </List.Item>
      <List.Item arrow="horizontal" multipleLine onClick={() => {}} extra={completeInfo.length}>
        招聘岗位个数
      </List.Item>
      </>
      : 
      <>
      <List.Item arrow="horizontal" multipleLine onClick={() => {}} extra={streamlineFun(completeInfo[0]?.apply_job || '无')}>
      求职意向
      </List.Item>
      <List.Item arrow="horizontal" multipleLine onClick={() => {}} extra={streamlineFun(completeInfo[0]?.personal_introduction || '无')}>
      个人介绍
      </List.Item>
      </>
  }
  useCallback(generateItem, [userInfo.user_type, completeInfo])
  return (
    <div className="my-container">
      <NavBar content="用户中心" />
      <div className="my-content">
        <Result
          img={<img src={userInfo.user_avatar || 'https://static.persion.cn/images/others/dog.webp'} className="avatar" />}
          title={userInfo.user_name}
          message={userInfo.nickname}
        />
        <List renderHeader={() => '相关信息'}>
          { generateItem() }
        </List>
        <Button type="primary" className="btn" onClick={logout}>
          退出登录
        </Button>
      </div>
    </div>
  )
}
export default withRouter(My); 