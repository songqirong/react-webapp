export type ISeekers = {
  apply_job: String; // 求职岗位
  personal_introduction: String; // 自我介绍
  user_id: String; // 账号唯一标识（加密后的手机号）
  nickname: String; // 用户昵称
  create_time: Number; // 创建时间
  avatar_url: String; // 用户头像
  __v: number;
  _id: string;
}
export type IJobs = {
  recruitment_job: String; // 招聘岗位
  recruitment_request: String; // 招聘要求
  recruitment_salary: Number; // 招聘薪资
  company_name: String; // 公司名称
  nickname: String; // 创建的人
  user_id: String; // 创建人的唯一标识
  create_time: Number; // 创建时间
  avatar_url: String; // 用户头像
  __v: number;
  _id: string;
}