import React, { useEffect } from 'react';
import Routes from "@/routes/routes";
import { StaticContext, withRouter } from "react-router";
import { MyTabBar } from "@components/index";
import {
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import { IInitalStateType } from "@/redux/user/type";
import { IInitalStateType as MessageType, IMessageObj, IUserObj } from "@/redux/message/type";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetDetailInfo, fetchReduxUserInfo } from '@/redux/user/actions';
import { fetchGetMessageList, fetchGetUserList } from '@/api/socket';
import { fetchReduxUpdateMessageList, fetchReduxUpdateUserList } from '@/redux/message/actions';
const Main: React.FC<any> = (props) => {
  const navList = [ '/home', '/my', '/message' ];
  const { user: { userInfo: { _id }}, message: { message_user_list } }: { user: IInitalStateType, message: MessageType } = useSelector((store: any) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    if(props.location.pathname !== '/register-or-login'){
      if(_id){
        message_user_list.length === 0 && init();
      } else {
        dispatch(fetchReduxUserInfo({}));
        dispatch(fetchGetDetailInfo({}));
      }
    }
  }, [_id])
  const init = async() => {
    const res: any = await fetchGetUserList({});
    let obj: any = {};
    if(res.err_code === 0){
      const arr = res.data.map(async(item: IUserObj) => {
        const res1 = await fetchGetMessageList({user_id: item.user_id, limit: 50, page: 1});
        // 计算收到的未读数量
        const count = res1.data.reduce((total: any, item: IMessageObj)=> {
          return total = total + Number(item.to_user_id === _id && !item.read);
        }, 0)
        return { [item.user_id]: [ res1.data, count ] }
      });
      const resArr = await Promise.all(arr);
      resArr.map((item: any, index: number) => {
        for(const key in item){
          obj = { ...obj, [key]: item[key][0]};
          // 插入到数据中
          res.data[index].count = item[key][1];
        }     
      })
    }
    dispatch(fetchReduxUpdateMessageList(obj));
    dispatch(fetchReduxUpdateUserList(res.data));
  }
  return (
    <>
      <Switch>
        {Routes.map(
          (item: {
            path: any;
            component:
              | React.ComponentType<any>
              | React.ComponentType<
                  RouteComponentProps<any, StaticContext, unknown>
                >
              | undefined;
            id: React.Key | undefined;
          }) => (
            <Route
              path={item.path}
              component={item.component}
              exact
              key={item.id}
            ></Route>
          )
        )}
        <Redirect from="/*" to="/home" />
      </Switch>
      { navList.includes(props.location.pathname) && <MyTabBar /> }
    </>
  )
}
export default withRouter(Main);