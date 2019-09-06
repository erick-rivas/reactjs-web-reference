/*
__Seed builder__v1.0
  (Read_only) Builder helper
*/

import * as React from 'react';
import cx from 'classnames';

import ModalContainer from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';

import c from 'resources/css/seed/helpers/Modal.module.css';

class Modal extends React.Component
{
  render() 
  {
    const children = React.Children.map(this.props.children,
      child =>
      {
        return React.cloneElement(child, {
          onClose: this.onClose,
          match: this.props.match
        });
      });

    const { width, height, animation = "zoomIn" } = this.props;

    const containerStyle = width && height ? {
      width: width + 'px',
      marginLeft: -(width / 2) + 'px',
      height: height + 'px',
      marginTop: -(height / 2) + 'px'
    } : {};

    const closeStyle = width && height ? {
      marginLeft: (width - 30) + "px"
    } : {};

    return (
      <ModalContainer
        className={c.module}
        open={true}
        transitionDuration={0}
        onClose={this.onClose}>

        <div className={cx(c.container,'animated',animation)} style={containerStyle}>

          <IconButton
            className={c.close}
            style={closeStyle}
            onClick={this.onClose}>
            <i class="fas fa-times"></i>
          </IconButton>

          {children}

        </div>

      </ModalContainer>
    );
  }

  /*
  * Component logic
  */

  constructor(props)
  {
    super(props);
    this.state = {
      open: false
    }
    this.onClose = this.onClose.bind(this);
  }

  onClose()
  {
    if (this.props.onClose == null)
      this.props.history.goBack()
    else this.props.onClose(this.props.match);
  }
}

export default Modal;