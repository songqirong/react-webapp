import React, { PureComponent } from "react";
import "./index.scss";
import { Button } from "antd-mobile";
import { qs_parse } from "src/utils";
export default class Test extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      phone: "15727531836",
    };
  }
  componentDidMount() {
    qs_parse();
  }
  render() {
    const { phone } = this.state;
    return (
      <section className="register-container">
        <div>
          <span>{phone}</span>
          <Button>呵呵</Button>
        </div>
      </section>
    );
  }
}
