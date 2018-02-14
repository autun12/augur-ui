import React, { Component } from "react";
import { Connect } from "uport-connect";
import QRCode from "qrcode.react";
import { decode } from "mnid";
import {
  AppleAppStore,
  GooglePlayStore
} from "modules/common/components/icons/icons";
import debounce from "utils/debounce";
import getValue from "utils/get-value";
import Styles from "modules/auth/components/uport-connect/uport-connect.styles";
type UportConnectProps = {
  isMobile: boolean,
  isMobileSmall: boolean,
  login: (...args: any[]) => any
};
type UportConnectState = {
  qrSize: any,
  uri: any,
  uri: string,
  qrSize: number
};
export default class UportConnect extends Component<
  UportConnectProps,
  UportConnectState
> {
  constructor() {
    super();
    this.uPort = new Connect("AUGUR -- DEV", {
      clientId: "2ofGiHuZhhpDMAQeDxjoDhEsUQd1MayECgd"
    });
    this.state = {
      uri: "",
      qrSize: 0
    };
    this.uPortURIHandler = this.uPortURIHandler.bind(this);
    this.setQRSize = this.setQRSize.bind(this);
    this.debouncedSetQRSize = debounce(this.setQRSize.bind(this));
  }
  componentWillMount() {
    this.uPort
      .requestCredentials(
        {
          notifcations: true
        },
        this.uPortURIHandler
      )
      .then(account => {
        const signingMethod = this.uPort.getWeb3().eth.sendTransaction;
        this.props.login(decode(account.address), signingMethod);
      });
  }
  componentDidMount() {
    this.setQRSize();
    window.addEventListener("resize", this.debouncedSetQRSize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedSetQRSize);
  }
  setQRSize() {
    const width = getValue(this, "uPortCreate.clientWidth");
    const height = getValue(this, "uPortCreate.clientHeight");
    if (width > height) {
    } else {
    }
    if (width) {
      let qrSize;
      switch (true) {
        case this.props.isMobileSmall:
          qrSize = width / 2.5;
          break;
        case this.props.isMobile:
          qrSize = width / 2.8;
          break;
        default:
          qrSize = width / 3.5;
      }
      this.setState({ qrSize });
    }
  }
  uPortURIHandler(uri) {
    this.setState({ uri });
  }
  render() {
    const s = this.state;
    return (
      <section
        ref={uPortCreate => {
          this.uPortCreate = uPortCreate;
        }}
        className={Styles.Uport__connect}
      >
        <div>
          <h3>Connect a uPort Account</h3>
          <QRCode value={s.uri} size={s.qrSize} />
          <h4>Need a uPort Account?</h4>
          <div className={Styles.Uport__apps}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://play.google.com/store/apps/details?id=com.uportMobile"
            >
              <GooglePlayStore />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://itunes.apple.com/us/app/uport-id/id1123434510"
            >
              <AppleAppStore />
            </a>
          </div>
        </div>
      </section>
    );
  }
}
