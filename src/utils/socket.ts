import io from 'socket.io-client';
import { fetchReduxUpdateUserList, fetchReduxUpdateMessageList } from '@/redux/message/actions';
import { updateReduxIsNew } from '@/redux/home/actions';
import store from '@redux/store';
const { dispatch, getState } = store;
export let socketObj: Socket;
class Socket{
  public socket;
  constructor(){
    this.socket = io('wss://recruitmentapi.persion.cn');
  }
  // 与服务器断开连接
  public close(){
    this.socket.close();
  }
  // 与服务器建立连接
  public connect(){
    this.socket.connect();
  }
  // 发送信息
  public send(payload: sendMsg){
    this.socket.emit('server', payload)
  }
  // 监听事件
  public listen(str: string){
    this.socket.on(str, (res) => {
      if(res.err_code === 0){
        switch(res.type){
          case 'sendMsg':
            const { user_obj, message_obj, insert, isMe } = res;
            const { message: { message_user_list, message_list } } = getState();
            const user_list = clone_deep(message_user_list);
            const new_message_list = clone_deep(message_list)
            const { to_user_id, from_user_id } = message_obj;
            const chat_id = isMe ? to_user_id : from_user_id;
            const arr = new_message_list[chat_id] ? [message_obj, ...new_message_list[chat_id]] : [ message_obj ];
            // 如果列表里有这个人就先删除后插入，没有就直接插入
            if(!insert){
              const idx = findObjIdxFromArr(message_user_list, { _id: user_obj._id  });
              const item =  user_list.splice(idx, 1);
              if( !isMe ){
                user_obj.count = item[0].count + 1;
              } else {
                user_obj.count = item[0].count
              }
            } else {
              if( !isMe ){
                user_obj.count = 1;
              }
            }
            const new_user_list = [user_obj, ...user_list]; 
            // 更新列表
            dispatch(fetchReduxUpdateUserList(new_user_list) as any);
            // 插入消息
            dispatch(fetchReduxUpdateMessageList({ ...new_message_list, [chat_id]: arr }) as any);
            break;
          default:
            return;
        }
      }
    })
    this.socket.on('completeInfo', (res) => {
      if(res.err_code === 0){
        switch(res.type){
          case 'completeInfo':
            const { user_type: type } = res;
            const { user: { userInfo: { user_type } } } = getState();
            type !== user_type && dispatch(updateReduxIsNew(true) as any); // 和用户不同类型才推送
            break;
          default:
            return;
        }
      }
    })
  }
}
// 初始化socket;
export const initSocket = () => {
  if(!socketObj){
    socketObj = new Socket();
    socketObj.close();
  }
}

// 找到数组中对象的坐标
export const findObjIdxFromArr = (arr: any[], obj: any) => {
  return arr.findIndex((item) => {
    for(const key in obj){
      if(item[key] === obj[key]){
        return item;
      }
    }
  })
}

// 深拷贝
export const clone_deep = (obj: any) => JSON.parse(JSON.stringify(obj))