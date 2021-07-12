import React, { useEffect, useRef, useState } from 'react';
import { NavBar } from '@components/index';
import { useSelector } from 'react-redux';
import { Grid, List, Icon } from 'antd-mobile';
import { socketObj } from '@utils/socket';
import { IInitalStateType as userType } from '@/redux/user/type';
import { IInitalStateType as messageType } from '@/redux/message/type';
import { withRouter } from 'react-router-dom';
import { emojipedias } from './contant';
import cx from 'classnames';
import './index.scss';
const emojis = emojipedias.map(item => ({ text: item }))
const Item = List.Item;
const Chat: React.FC<any> = (props) => {
  const { user: { userInfo : { _id, user_avatar, nickname: from_user_nickname } }, message: { message_list} }: { user: userType, message: messageType } = useSelector((store: any) => store);
  const { nickname, chat_id, avatar } = props.location.state;
  const iptEle = useRef<any>();
  const conEle = useRef<any>();
  const [show, setShow] =  useState<boolean>(false);

  useEffect(() => {
    conEle.current.scrollTop = conEle.current.scrollHeight - conEle.current.clientHeight;
  }, [message_list])

  // 排除组件bug, 需要异步派发action
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }, [])

  // 生成聊天列表
  const generateEle = () => <>{ message_list[chat_id]?.map(item => {
    const isMe: boolean = _id === item.from_user_id; // 判断是谁发出的消息
    return <Item key={item._id} wrap multipleLine={true} thumb={isMe ? null : avatar} extra={isMe ? <div className="am-list-thumb"><img src={user_avatar} /></div>  : null} className={ isMe ? 'chat-me' : 'chat-you' } > <div className="arrow_box">{item.content}</div> </Item>
  })} </>

  const sendMsg = () => {
    if(!iptEle.current.value) return;
    socketObj.send({ from_user_avatar: user_avatar, from_user_id: _id, from_user_nickname, to_user_avatar: avatar, to_user_id: chat_id, to_user_nickname: nickname, content: iptEle.current?.value });
    iptEle.current.value = '';
    closeShow();
  }

  const keyEve = (e: any) => {
    if(e.keyCode === 13){
      sendMsg();
    }
  }

  // 关闭表情框
  const closeShow = () => {
    setShow(false);
  }

  // 选择表情后填入
  const selectEmoji = (_el: any) => {
    // console.log(_el)
    iptEle.current.value += _el.text
  }

  // 开启表情框
  const openShow = () => {
    setShow(true);
  }

  // 返回上一页
  const goBack = () => {
    props.history.goBack();
  }

  const emojiEle = <Grid data={emojis} isCarousel onClick={selectEmoji} carouselMaxRow={4} columnNum={8} />

  return (
    <div className="chat-container">
      <NavBar content={nickname} type="left" callback={goBack} />
      <div className="chat-content" ref={conEle} onClick={closeShow}>
        <List>
          { generateEle() }
        </List>
      </div>
      <div className={cx('chat-input-box', { show })}>
        <div className="box">
          <input type="text" placeholder="请输入"  ref={iptEle} onKeyDown={keyEve}/>
          <span onClick={openShow}>😊</span>
          <button onClick={sendMsg}>发送</button>
        </div>
        { emojiEle }
      </div>
    </div>
  )
}
export default withRouter(Chat); 