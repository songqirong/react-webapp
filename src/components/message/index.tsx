import * as React from 'react';
import * as ReactDOM from 'react-dom';
import cx from 'classnames';
import './index.scss';

type ToastProps = {
  duration?: number;
  onClose?: () => any;
  closable?: boolean;
  prefixCls?: string;
  className?: string;
  content: string;
  style?: any;
  type: 'success' | 'warn' | 'error';
};

class ToastIn extends React.Component<ToastProps, any> {
  private closeTimer: any;
  static defaultProps = {
    duration: 3,
    style: {},
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    this.startCloseTimer();
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  close = () => {
    const { onClose } = this.props;
    this.clearCloseTimer();
    onClose && onClose();
  };

  startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.props.duration * 1000);
    }
  };

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = undefined;
    }
  };

  render() {
    const props = this.props;
    const type = props.type;
    const componentClass = 'toast';
    const animationDuration = `${props.duration}s`;
    const className = {
      [props.className as any]: !!props.className,
    };
    return (
      <div
        className={cx(className, `${componentClass}_wrapper`, { [type]: type })}
        style={{
          ...props.style,
          animationDuration,
        }}
      >
        <div className={`${componentClass}_content`}>{props.content}</div>
      </div>
    );
  }
}

const notice = (
  content: string,
  type: 'success' | 'warn' | 'error',
  duration: number | undefined,
  onClose?: () => any,
) => {
  const div = document.createElement('div');
  div.className = 'message';
  document.body.appendChild(div);
  const propsCalled = {
    content,
    duration,
    type,
    onClose: () => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
      !!onClose && onClose();
    },
  };
  ReactDOM.render(<ToastIn {...propsCalled} />, div);
};

export const Message = {
  show(
    content: string,
    type: 'success' | 'warn' | 'error',
    duration?: number,
    onClose?: () => any,
  ) {
    return notice(content, type, duration, onClose);
  },
};
