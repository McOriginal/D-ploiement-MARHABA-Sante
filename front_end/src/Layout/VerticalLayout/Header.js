import React from 'react';

import { connect } from 'react-redux';

//i18n
import { withTranslation } from 'react-i18next';

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from '../../store/actions';
import ProfileMenu from '../../components/Common/TopbarDropdown/ProfileMenu';
import {
  hospitalLittleName,
  hospitalName,
  logoMedical,
} from '../../Pages/Logo/logo';

const Header = (props) => {
  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle('sidebar-enable');
    } else {
      body.classList.toggle('vertical-collpsed');
      body.classList.toggle('sidebar-enable');
    }
  }

  return (
    <React.Fragment>
      <header id='page-topbar'>
        <div className='navbar-header'>
          <div className='d-flex'>
            <div className='navbar-brand-box text-center'>
              <span>
                <img
                  src={logoMedical}
                  style={{
                    width: '80px',
                  }}
                  alt=''
                />
                <h5 className='text-white'>{hospitalLittleName} </h5>
              </span>
            </div>

            <button
              type='button'
              className='btn btn-sm px-3 font-size-24 header-item waves-effect'
              id='vertical-menu-btn'
              onClick={() => {
                tToggle();
              }}
            >
              <i className='ri-menu-2-line align-middle'></i>
            </button>

            <p
              className='d-flex justify-content-center align-items-center fw-bold font-size-16'
              style={{
                color: ' #27548A',
              }}
            >
              {hospitalName}
            </p>
          </div>

          <div className='d-flex'>
            <div className='dropdown d-none d-lg-inline-block ms-1'>
              <button
                type='button'
                onClick={() => {
                  toggleFullscreen();
                }}
                className='btn header-item noti-icon'
                data-toggle='fullscreen'
              >
                <i className='ri-fullscreen-line' />
              </button>
            </div>

            <ProfileMenu />

            <div
              className='dropdown d-inline-block'
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
            >
              <button
                type='button'
                className='btn header-item noti-icon right-bar-toggle waves-effect'
              >
                <i className='mdi mdi-cog'></i>
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
