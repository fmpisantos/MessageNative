import React, { Component } from 'react';
import '../Css/message.css';

class message extends Component {

  render() {
    return (
        <div className={"container spacingMessage"}>
                <div className={"row "+(this.props.mine?"justify-content-end":"justify-content-start")}>
                    <div className={"col-4 "+(this.props.mine?"mine":"other")}>
                        <h5 className="boldText">{this.props.name}</h5>
                    </div>
                </div>
                <div className={"row "+(this.props.mine?"justify-content-end":"justify-content-start")}>
                    <div className={"col-4 "+(this.props.mine?"mine":"other")}>
                        {this.props.message}
                    </div>
                </div>
        </div>
    );
  }
}

export default message;
