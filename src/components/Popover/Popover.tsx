import React, { createRef } from 'react';

interface IPopoverState {
  popoverStyles: React.CSSProperties;
  shouldRenderPopover: boolean;
}

interface IInjectedPopoverProps extends IPopoverState {
  anchorRef: React.RefObject<HTMLDivElement>;
  popoverRef: React.RefObject<HTMLDivElement>;
}

interface IPopoverProps {
  children(props: IInjectedPopoverProps): React.ReactNode;
}

class Popover extends React.Component<IPopoverProps, IPopoverState> {
  state = { popoverStyles: {}, shouldRenderPopover: false };
  private anchorRef = createRef<HTMLDivElement>();
  private popoverRef = createRef<HTMLDivElement>();

  componentDidMount() {
    const anchor = this.anchorRef.current;

    if (anchor) {
      anchor.addEventListener('touchstart', e => {
        e.preventDefault();
      });

      anchor.addEventListener('mousemove', e => {
        this.setState({
          popoverStyles: {
            top: 0,
            left: 0,
            position: 'absolute',
            transform: `translate3d(${e.clientX + 20}px, ${e.clientY +
              20}px, 0)`,
          },
          shouldRenderPopover: true,
        });
      });

      anchor.addEventListener('mouseout', () => {
        this.setState({ shouldRenderPopover: false });
      });
    }
  }

  render() {
    const { children } = this.props;
    const { popoverStyles, shouldRenderPopover } = this.state;

    return (
      <>
        {children({
          anchorRef: this.anchorRef,
          popoverRef: this.popoverRef,
          popoverStyles,
          shouldRenderPopover,
        })}
      </>
    );
  }
}

export default Popover;