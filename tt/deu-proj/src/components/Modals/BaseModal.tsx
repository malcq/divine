import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

interface BaseModalProps {
  isOpen: boolean,
  onClose?: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
  contentClassName?: string,
  isBodyOverflowing?: boolean,
}

interface State {
  isScrollBody: boolean,
}
class BaseModal extends React.Component<BaseModalProps, State> {
  private element: HTMLElement | null = null;

  constructor(props: BaseModalProps) {
    super(props);
    this.element = null;
    this.state = {
      isScrollBody: false,
    }
  }

  componentDidMount() {
    const { isOpen } = this.props;
    this.element = document.createElement('div');
    document.body.appendChild(
      this.element
    );

    this.getHaveScroll();

    if (isOpen) {
      document?.body?.classList.add(`modal-open${this.state.isScrollBody ? '--scroll' : ''}`);
    }
  }

  componentDidUpdate(prevProps: BaseModalProps) {
    const { 
      isOpen, 
      isBodyOverflowing = false 
    } = this.props;
    const { isOpen: prevIsOpen } = prevProps;

    if (!isBodyOverflowing) {
      isOpen ?
        document?.body?.classList.add('modal-open--body-overflowing')
        : document?.body?.classList.remove('modal-open--body-overflowing')
    }

    if (prevIsOpen !== isOpen) {
      this.getHaveScroll();
      isOpen ?
        document?.body?.classList.add(
          `modal-open${this.state.isScrollBody ? '--scroll' : ''}`,
        )
        : document?.body?.classList.remove(
          `modal-open${this.state.isScrollBody ? '--scroll' : ''}`,
          'modal-open--body-overflowing',
        )
    }
  }

  componentWillUnmount() {
    if (!this.element) { return; }
    document.body.removeChild(
      this.element,
    );
    document?.body?.classList.remove(`modal-open${this.state.isScrollBody ? '--scroll' : ''}`);
  }

  getHaveScroll = () => {
    if (document?.body?.scrollHeight > document?.body?.clientHeight) {
      this.setState({ isScrollBody: true });
    } else {
      this.setState({ isScrollBody: false });
    }
  }

  render() {
    const {
      isOpen,
      onClose,
      children,
      contentClassName,
    } = this.props;

    if (!this.element) { return null; }

    const contentClassNames = classNames('base-modal__content', contentClassName);

    return (
      ReactDOM.createPortal(
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames="modal-transition"
          unmountOnExit
        >
          <div
            className="base-modal__overlay"
            onClick={onClose}
          >
            <div className="base-modal__dialog" role="document">
              <div className={contentClassNames} onClick={(ev) => { ev.stopPropagation() }}>
                {children}
              </div>
            </div>
          </div>
        </CSSTransition>
        ,
        this.element,
      )
    )
  }
}

export default BaseModal;