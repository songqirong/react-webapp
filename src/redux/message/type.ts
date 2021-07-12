
export interface IChatInfo{
  chat_id: string;
  nickname: string;
  avatar: string;
}
export type IMessageObj = {
  chat_id: string;
  content: string;
  create_time: number;
  from_user_id: string;
  read: boolean;
  to_user_id: string;
  __v: number;
  _id: string;
}

export type IUserObj = {
  _id: string;
  __v: number;
  user_id: string,
  nickname: string, // 用户昵称
  user_avatar: string, // 用户头像
  belong_user_id: string, // 属于某个用户id的用户对话列表
  last_content: string, // 最后一次对话内容
  update_time: number, //最后一次发消息的时间
  count: number, // 未读消息的数量
}

export type IInitalStateType = {
  message_user_list: any[];
  message_list: Record<string, IMessageObj[]>;
};


export const UPDATEUSERLIST = 'update_user_list';
export const UPDATEMESSAGELIST = 'update_message_list';
export const CLEARLIST = 'clear_list';
export const UPDATEIDX = 'update_idx';
export const UPDATEUSERADDRESS = 'update_user_address';

