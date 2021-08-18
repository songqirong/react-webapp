import { Grid } from 'antd-mobile';
import React, { useEffect, useState } from 'react';
import { fetchGetUserAvatar } from '@api/user';
import './index.scss';
type IData = {
  create_time: number;
  name: string;
  avatar_url: string;
  _id: string;
};
type IProps = {
  user_avatar: string | undefined;
  set_user_avatar: (item: any) => void;
};
const AvatarSelect: React.FC<IProps> = (props) => {
  const [data, setData] = useState<IData[]>([]);
  const { user_avatar, set_user_avatar } = props;
  useEffect(() => {
    get_avatar();
  }, []);
  // 获取头像列表
  const get_avatar = async() => {
    try {
      const res = await fetchGetUserAvatar({});
      setData(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  // 改变选择的头像
  const change_select_avatar: any = (item: IData) => {
    set_user_avatar(item.avatar_url);
  };
  // 生成头部渲染节点
  const generate_dom: any = () => (user_avatar ? (
    <>
      <span>您已选择头像:</span>
      <img src={user_avatar} alt="selectAvatar" />
    </>
  ) : (
    <span>请选择您的头像:</span>
  ));
  return (
    <section className="avatar-container">
      <div className="sub-title">{generate_dom()}</div>
      <Grid
        data={data}
        columnNum={4}
        onClick={change_select_avatar}
        renderItem={(item) => (
          <div className="img-box">
            <img src={item?.avatar_url} className="img" alt="" />
            <div className="name">
              <span>{item?.name}</span>
            </div>
          </div>
        )}
      />
    </section>
  );
};
export default AvatarSelect;
