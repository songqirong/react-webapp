import * as React from "react";
import * as PubSub from "pubsub-js";
const cx = require("classnames");
import "./index.scss";
export const Popup = {
  info,
};
function info(Popuptype: any) {
  const popup_cont = document.createElement("div");
  popup_cont.innerHTML = Popuptype.cont;
  popup_cont.id = "popup_cont";
  popup_cont.style.cssText +=
    "font-size:14px;color:#fff;text-align:center;padding:20px 60px;position:fixed;background:rgba(0, 0, 0, 0.6);min-height:36px;top:50%;left:50%;transform:translate(-50%, -50%);z-index:30;margin-top:-20px;word-wrap: break-word;";
  document.body.appendChild(popup_cont);
  setTimeout(() => {
    document.body.removeChild(popup_cont);
  }, 3000);
}
export interface NoticeState {
  notice_show: boolean;
  msg: string;
  link: string;
  link_name: string;
}
export class Notices extends React.Component<null, NoticeState> {
  private notice_subscribe: any;
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      notice_show: false,
      msg: "",
      link: "",
      link_name: "",
    };
  }
  componentDidMount() {
    this.notice_subscribe = PubSub.subscribe(
      "show_tips",
      (type: string, msg: string) => {
        if (!msg) {
          return false;
        }
        if (typeof msg === "string") {
          this.setState({ notice_show: true, msg: msg });
        }
        setTimeout(() => {
          this.setState({ notice_show: false });
        }, 3000);
      }
    );
  }
  componentWillUnMount() {
    PubSub.unsubscribe(this.notice_subscribe);
  }
  render() {
    let html = undefined;
    html = (
      <div
        className={cx("msg_cont", { show: this.state.notice_show })}
        dangerouslySetInnerHTML={{ __html: this.state.msg }}
      ></div>
    );
    return html;
  }
}
