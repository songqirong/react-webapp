import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TabBar } from 'antd-mobile';
import { fetchReduxScrollTop } from '@redux/home/actions';
import { withRouter } from 'react-router-dom';
import { IInitalStateType } from '@/redux/user/type';
import { IInitalStateType as HomeType } from '@/redux/home/type';
import { IInitalStateType as MessageType, IUserObj } from '@/redux/message/type';
import './index.scss';
const MyTabBar: React.FC<any> = (props) => {
  const { user: { userInfo: { user_type } }, message: { message_user_list }, home: { isNew } }: { user: IInitalStateType, message: MessageType, home: HomeType } = useSelector((store) => (store as any)); // 根据用户角色来决定隐藏的tabbar
  const hideIdx = user_type === 'SEEKERS' ? 1 : 0;
  const messageUnreadTotal = message_user_list.reduce((total: number, item: IUserObj) => total += item.count, 0);
  const dispatch = useDispatch();
  const tabs = [
    {
      title: '职位',
      key: '/home',
      badge: isNew ? 'new' : 0,
      dot: false,
      icon: 'https://static.persion.cn/images/others/job.svg',
      activeIcon: 'https://static.persion.cn/images/others/job-active.svg',
    },
    {
      title: '求职者',
      key: '/home',
      badge: isNew ? 'new' : 0,
      dot: false,
      icon: 'https://static.persion.cn/images/others/seek.svg',
      activeIcon: 'https://static.persion.cn/images/others/seek-active.svg',
    },
    {
      title: '消息',
      key: '/message',
      badge: messageUnreadTotal,
      dot: false,
      icon: 'https://static.persion.cn/images/others/message.svg',
      activeIcon: 'https://static.persion.cn/images/others/message-active.svg',
    },
    {
      title: '我',
      key: '/my',
      badge: 0,
      dot: true,
      icon: 'https://static.persion.cn/images/others/my.svg',
      activeIcon: 'https://static.persion.cn/images/others/my-active.svg',
    },
  ];
  const showTabs = tabs.filter((item, index) => index !== hideIdx);
  /* 等待userInfo更新完成后再渲染节点  */
  const path = props.location.pathname;
  return (
    <div className="tab-container">
      { user_type && <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        tabBarPosition="bottom"
      >
        {
          showTabs.map((item) => <TabBar.Item
            title={item.title}
            key={item.key}
            icon={<div className="common" style={{ backgroundImage: `url(${item.icon})` }} />}
            selectedIcon={<div className="common" style={{ backgroundImage: `url(${item.activeIcon})` }} />}
            selected={path === item.key}
            badge={item.badge}
            dot={item.dot}
            onPress={() => {
              if(path === '/home'){
                dispatch(fetchReduxScrollTop(document.documentElement.querySelector('.scroll-view')?.scrollTop));
              }
              props.history.replace(item.key);
            }}
          >
          </TabBar.Item>)
        }
      </TabBar> }
    </div>
  );
};
export default withRouter(MyTabBar);
