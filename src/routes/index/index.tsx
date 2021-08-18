import React, { useEffect, useState, useRef, useMemo } from 'react';
import { NavBar } from '@components/index';
import { useSelector, useDispatch } from 'react-redux';
import { IInitalStateType } from '@redux/user/type';
import { IInitalStateType as MessageType } from '@redux/message/type';
import { IInitalStateType as HomeType } from '@redux/home/type';
import { ListView, PullToRefresh, Toast } from 'antd-mobile';
import { fetchReduxList, updateReduxIsNew } from '@/redux/home/actions';
import { withRouter } from 'react-router';
import { socketObj } from '@utils/socket';
import { fetchGetList } from '@/api/home';
import './index.scss';

const Index: React.FC = (props: any) => {
  const { user: { userInfo, completeInfo }, home: { total, list, scrollTop } }: { user: IInitalStateType, home: HomeType } = useSelector((store: any) => store);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false); // 用来标识数据是否加载完成
  const listRef = useRef<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    if(page === 1 && refreshing === false && list.length > 0) return;
    fetchList({ page, limit });
  }, [page]);

  useEffect(() => {
    listRef.current.getInnerViewNode().parentNode.scrollTop = scrollTop;
  }, [scrollTop]);

  const fetchList = async(params: any) => {
    try {
      const res: any = await fetchGetList(params);
      if(res.err_code === 0){
        dispatch(fetchReduxList({ total: res.data.total, list: page === 1 ? res.data.list : [ ...list, ...res.data.list ] }));
      }
      setIsLoading(false);
      setRefreshing(false);
    } catch(error) {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const MyBody: React.FC<any> = (props) => {
    const { children } = props;
    return (
      <div className="index-content am-list-body" >
        { children }
      </div>
    );
  };
  // 触底
  const Reached = (event: any) => {
    if(isLoading || finish) return;
    if(total > list.length){
      setIsLoading(true);
      setPage(page + 1);
    } else {
      setFinish(true);
      Toast.info('已经没有更多了～', 1);
    }
  };

  // 下拉刷新
  const refresh = async() => {
    if(isLoading) return;
    setFinish(false); // 置为为未加载完
    setRefreshing(true); // 开始加载
    dispatch(updateReduxIsNew(false));
    // 第一页直接请求
    if(page === 1){
      fetchList({ page: 1, limit });
    } else {
      // 获取第一页的数据
      setPage(1);
    }

    // fetchList({ page: 1, limit });
  };

  const listConver = () => new ListView.DataSource({
    rowHasChanged: (row1: any, row2: any) => row1 !== row2,
  });

  // 跳转到聊天界面
  const jumpToChat = (id: string, to_user_avatar: string, to_user_nickname: string) => {
    const { _id: from_user_id, user_avatar: from_user_avatar, nickname: from_user_nickname } = userInfo;
    if(completeInfo.length === 0){
      return Toast.info('请先完善个人信息～');
    }
    const content = userInfo.user_type === 'BOSS' ? '我对你有兴趣，能看看简历吗？' : '我对贵公司发布的职位有兴趣，能聊聊吗？';
    socketObj.send({ from_user_id, from_user_avatar, to_user_id: id, content, to_user_avatar, to_user_nickname, from_user_nickname });
    props.history.push({
      pathname: '/chat',
      state: { chat_id: id, nickname: to_user_nickname, avatar: to_user_avatar },
    });
  };




  const row = (rowData: any, sectionID: any, rowID: any) => {
    const data = JSON.parse(rowData);
    const isBoss = userInfo.user_type === 'BOSS';
    return (
      <div key={data._id}
        className="card"
        onClick={() => { jumpToChat(data.user_id, data.avatar_url, data.nickname); }}
      >
        <div className="title">
          <div className="avatar" style={{ backgroundImage: `url(${data.avatar_url})` }}></div>
          <div className="username">{ data.nickname }</div>
        </div>
        <div className="content">
          {
            isBoss ? <>
              <div className="content-desc">意向职位：{ data.apply_job }</div>
              <div className="content-desc">个人介绍：{ data.personal_introduction }</div>
            </>
              :
              <>
                <div className="content-desc">招聘职位：{ data.recruitment_job }</div>
                <div className="content-desc">招聘要求：{ data.recruitment_request }</div>
                <div className="content-desc">薪资待遇：¥{ data.recruitment_salary }</div>
                <div className="content-desc">公司名称：{ data.company_name }</div>
              </>
          }
        </div>
      </div>
    );
  };

  const separator = (sectionID: any, rowID: any) => (
    <div
      key={`${sectionID}-${rowID}`}
      className="separator"
    />
  );
  return (
    <div className="index-container">
      <NavBar content={userInfo.user_type === 'BOSS' ? '求职者列表' : '职位列表'} />
      <ListView
        key={'0'}
        ref={listRef}
        dataSource={listConver().cloneWithRows(list.map(JSON.stringify as any))}
        renderHeader={() => <></>}
        renderFooter={() => (<div className="footer">
          {isLoading ? '加载中...' : '加载完成'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        pullToRefresh={
          <PullToRefresh
            refreshing={refreshing}
            onRefresh={refresh}
            direction='down'
            getScrollContainer={() => null}
            distanceToRefresh={25}
            indicator={{}}
          />}
        onEndReached={Reached}
        pageSize={5}
        renderBodyComponent={() => <MyBody />}
        className="scroll-view"
        onEndReachedThreshold={100}
      />
    </div>
  );
};
export default withRouter(Index);
