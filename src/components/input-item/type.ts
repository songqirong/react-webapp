export interface IData {
  value: string;
  label: string;
}
export type IProps = {
  refEle?: any;
  placeHolder?: string;
  name: string;
  className?: string;
  type: 'checkbox' | 'text' | 'password';
  data?: IData[];
  value?: string;
  onChange?: (val: any) => any;
  maxLength?: number;
};
