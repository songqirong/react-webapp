import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { fetchDeleteUserCompleteInfo } from '@api/user';
import { updateReduxDetailInfo } from '@redux/user/actions';
import { NavBar, FixIcon } from '@/components';
import { IInitalStateType } from '@/redux/user/type';
import { useSelector, useDispatch } from 'react-redux';
import { IJobs } from '@/routes/index/type';
import { clone_deep } from '@utils/socket';
import { Modal, Toast } from 'antd-mobile';
import './index.scss';

const JobCard: React.FC<any> = (props) => {

  const { user: { completeInfo } }: { user: IInitalStateType } = useSelector((store: any) => store);
  const dispatch = useDispatch();
  // 返回上一页
  const goBack = () => {
    props.history.goBack();
  };

  // 点击删除
  const deleteFun = (id: string, index: number) => {
    Modal.alert('确认删除', '删除后将不可恢复', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: async() => {
        const res: any = await fetchDeleteUserCompleteInfo(id);
        if(res.err_code === 0){
          const new_data = clone_deep(completeInfo);
          new_data.splice(index, 1);
          dispatch(updateReduxDetailInfo(new_data));
          Toast.info(res.msg);
        }
      } },
    ]);
  };

  // 点击编辑跳转
  const jump_to_update = (id: string) => {
    props.history.push(`update?type=card&id=${id}`);
  };

  // 点击新增
  const cb = () => {
    jump_to_update('');
  };

  return (
    <div className='jobcard-container'>
      <NavBar content="岗位列表" leftType="left" leftCallback={goBack} rightType="ellipsis" rightCallback={() => { console.log('右边回调触发了'); }} />
      <div className="content">
        <QueueAnim type={['scale', 'left']} delay={100} duration={500} >
          { completeInfo.map((item: IJobs, index: number) => (
            <div className="item"key={item._id} >
              <div className="txt-item">
                <span>公司名称：</span>{item.company_name}
              </div>
              <div className="txt-item">
                <span>招聘岗位：</span>{item.recruitment_job}
              </div>
              <div className="txt-item">
                <span>招聘要求：</span>{item.recruitment_request}
              </div>
              <div className="txt-item">
                <span>招聘薪资：</span>{item.recruitment_salary}
              </div>
              <div className='btn'>
                <span className='editor' onClick={() => {jump_to_update(item._id);}} >编辑</span>
                <span className='delete' onClick={() => {deleteFun(item._id, index);}} >删除</span>
              </div>
            </div>
          )) }
        </QueueAnim>
      </div>
      <FixIcon callback={cb} />
    </div>
  );
};

export default JobCard;
