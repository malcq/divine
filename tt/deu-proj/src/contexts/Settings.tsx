import PropTypes from 'prop-types'
import React from 'react'

import { DeviceInfo, ClientInfo } from '../models/appSettings';
import { DeviceTypes } from '../utils/constants';
import { mediaValues } from '../utils/media';
import { NextPage } from 'next';

type ContextProps = {
  initialDeviceInfo?: DeviceInfo,
  reqType?: 'user' | 'bot',
};
type ContexStateType = {
  deviceInfo: DeviceInfo,
  clientInfo: ClientInfo,
  reqType: 'user' | 'bot',
}

export const SettingsContext = React.createContext<ContexStateType>({
  deviceInfo: {
    type: DeviceTypes.mobile,
  },
  clientInfo: {
    isBodyOverflowing: false
  },
  reqType: 'user'
});

class SettingsContextProvider extends React.Component<ContextProps, ContexStateType> {
  constructor(props: ContextProps) {
    super(props)

    const initialDeviceInfo: DeviceInfo = props?.initialDeviceInfo ?? {
      type: this.initDeviceInfoValue(window.innerWidth)
    }

    this.state = {
      deviceInfo: initialDeviceInfo,
      clientInfo: {
        isBodyOverflowing: false,
      },
      reqType:  props.reqType ?? 'user'
    }
  }
  initDeviceInfoValue = (value: number) => {

    if (value < mediaValues.desktop) {
      return DeviceTypes.mobile;
    }

    if (value < mediaValues.ld) {
      return DeviceTypes.tablet;
    } else {
      return DeviceTypes.desktop;
    }
  }

  getBodyOverflowing = () => {
    const rect = document.body.getBoundingClientRect();
    const isBodyOverflowing = rect.left + rect.right < window.innerWidth;
    return isBodyOverflowing;
  }

  handleResize = (event: UIEvent) => {
    const target: Window = event.target as Window;
    const { innerWidth } = target;
    const isBodyOverflowing = this.getBodyOverflowing();

    if (innerWidth < mediaValues.desktop) {
      this.setState({
        deviceInfo: {
          type: DeviceTypes.mobile,
        },
        clientInfo: {
          isBodyOverflowing
        },
      })
    } else if (innerWidth < mediaValues.ld) {
      this.setState({
        deviceInfo: {
          type: DeviceTypes.tablet,
        },
        clientInfo: {
          isBodyOverflowing
        },
      })
    } else {
      this.setState({
        deviceInfo: {
          type: DeviceTypes.desktop,
        },
        clientInfo: {
          isBodyOverflowing
        },
      })
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    const isBodyOverflowing = this.getBodyOverflowing();
    this.setState({
      clientInfo: {
        isBodyOverflowing
      },
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { children } = this.props
    return (<SettingsContext.Provider value={{ ...this.state }}>{children}</SettingsContext.Provider>)
  }
}



export function withSettings<T>(
  Component: React.ComponentType<T> & { getInitialProps?: any },
) {
  return class WithSettingsHoc extends React.Component<T & { settingsContext: ContexStateType }> {
    static getInitialProps = Component.getInitialProps;
    render() {
      return (
        <SettingsContext.Consumer>
          {(state) => (
            <Component
              settingContext={state}
              {...this.props}
            />
          )}
        </SettingsContext.Consumer>
      )
    }
  }
}
export default SettingsContextProvider