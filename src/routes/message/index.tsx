import React from 'react';
import { NavBar } from '@components/index';
import { useSelector } from 'react-redux';
import { IInitalStateType as UserType } from '@redux/user/type';
import { IInitalStateType as MessageType, IUserObj } from '@redux/message/type';
import { List, Badge } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import './index.scss';
const { Item, Item: { Brief } } = List;
const Message: React.FC<any> = (props) => {
  const { user, message: { message_user_list } }: { user: UserType, message: MessageType } = useSelector((store: any) => store);
  const jump_to_chat = (chat_id: string, nickname: string, avatar: string) => {
    props.history.push({
      pathname: '/chat',
      state: {chat_id, nickname, avatar}
    });
  }
  const generateEle = () => <>{ 
    message_user_list?.map((item: IUserObj) => 
    <Item key={item._id} extra={ <Badge text={item.count} /> } arrow="horizontal" thumb={item.user_avatar} onClick={() => { jump_to_chat(item.user_id, item.nickname, item.user_avatar) }} >
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