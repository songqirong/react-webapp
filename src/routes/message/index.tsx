import React from 'react';
import { NavBar } from '@components/index';
import { useSelector, useDispatch } from 'react-redux';
import { IInitalStateType as UserType } from '@redux/user/type';
import { IInitalStateType as MessageType, IUserObj } from '@redux/message/type';
import { List, Badge } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { fetchUpdateRead } from '@api/socket';
import { fetchReduxUpdateUserList } from '@redux/message/actions';
import { clone_deep } from '@utils/socket';
import './index.scss';
const { Item, Item: { Brief } } = List;
const Message: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const { user, message: { message_user_list } }: { user: UserType, message: MessageType } = useSelector((store: any) => store);
  const jump_to_chat = (chat_id: string, nickname: string, avatar: string, index: number) => {
    updateRead(chat_id, index, () => {
      props.history.push({
        pathname: '/chat',
        state: {chat_id, nickname, avatar}
      });
    })

  }
  // 更新已读
  const updateRead = async(chat_id: string, index: number, cb: () => void) => {
    if(message_user_list[index].count > 0){
      const res: any = await fetchUpdateRead({ chat_id });
      if(res.err_code === 0){
        const new_user_list = clone_deep(message_user_list);
        new_user_list[index].count = 0;
        dispatch(fetchReduxUpdateUserList(new_user_list));
      }
    }
    cb();
  }


  const generateEle = () => <>{ 
    message_user_list?.map((item: IUserObj, index) => 
    <Item key={item._id} extra={ <Badge text={item.count} /> } arrow="horizontal" thumb={item.user_avatar} onClick={() => { jump_to_chat(item.user_id, item.nickname, item.user_avatar, index) }} >
      { item.nickname }
      <Brief>{item.last_content}</Brief>
    </Item> )
  } </>
  return (
    <div className="message-container">
      <NavBar content="消息中心" />
      <div className="user-content">
        <List>
          { generateEle() }
        </List>
      </div>
    </div>
  )
}
export default withRouter(Message); 