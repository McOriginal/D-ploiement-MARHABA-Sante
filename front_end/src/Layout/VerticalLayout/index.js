import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withRouter from '../../components/Common/withRouter';

// import Components
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import RightSidebar from '../../components/Common/RightSideBar';

//redux
import { useSelector, useDispatch } from 'react-redux';

import {
  changeLayout,
  changeLayoutMode,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  showRightSidebarAction,
} from '../../store/actions';

import { createSelector } from 'reselect';
import { AuthContext } from '../../Auth/AuthContext';
import SidebarMedecins from './SidebarMedecins';
import { connectedUserRole } from '../../Pages/Authentication/userInfos';

const Layout = (props) => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutModeTypes: layout.layoutModeTypes,
      leftSideBarType: layout.leftSideBarType,
      layoutWidth: layout.layoutWidth,
      topbarTheme: layout.topbarTheme,
      showRightSidebar: layout.showRightSidebar,
      leftSideBarTheme: layout.leftSideBarTheme,
    })
  );

  const {
    layoutModeTypes,
    layoutWidth,
    leftSideBarType,
    topbarTheme,
    showRightSidebar,
    leftSideBarTheme,
  } = useSelector(selectLayoutProperties);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    if (leftSideBarType === 'default') {
      dispatch(changeSidebarType('condensed', isMobile));
    } else if (leftSideBarType === 'condensed') {
      dispatch(changeSidebarType('default', isMobile));
    }
  };

  //hides right sidebar on body click
  const hideRightbar = useCallback(
    (event) => {
      var rightbar = document.getElementById('right-bar');
      //if clicked in inside right bar, then do nothing
      if (rightbar && rightbar.contains(event.target)) {
        return;
      } else {
        //if clicked in outside of rightbar then fire action for hide rightbar
        dispatch(showRightSidebarAction(false));
      }
    },
    [dispatch]
  );

  /*
  layout  settings
  */

  useEffect(() => {
    if (
      // layoutTypes ||
      layoutModeTypes ||
      leftSideBarTheme ||
      layoutWidth ||
      leftSideBarType ||
      topbarTheme
    ) {
      window.dispatchEvent(new Event('resize'));
      dispatch(changeLayout('vertical'));
      dispatch(changeLayoutMode(layoutModeTypes));
      dispatch(changeSidebarTheme(leftSideBarTheme));
      dispatch(changeLayoutWidth(layoutWidth));
      dispatch(changeSidebarType(leftSideBarType));
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [
    // layoutTypes,
    layoutModeTypes,
    leftSideBarTheme,
    layoutWidth,
    leftSideBarType,
    topbarTheme,
    dispatch,
  ]);

  useEffect(() => {
    //init body click event fot toggle rightbar
    document.body.addEventListener('click', hideRightbar, true);
  }, [hideRightbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ---------------------------------------------------
  // ---------------------------------------------------
  // Vérification de role d'utilisateur pour afficher le SIDEBAR en fonction de cela
  const [contentSidebar, setContentSidebar] = useState();
  const role = connectedUserRole;

  useEffect(() => {
    if (!role) return;

    if (role === 'admin') {
      setContentSidebar(
        <Sidebar
          theme={leftSideBarTheme}
          type={leftSideBarType}
          isMobile={isMobile}
        />
      );
    } else if (role === 'medecin') {
      setContentSidebar(
        <SidebarMedecins
          theme={leftSideBarTheme}
          type={leftSideBarType}
          isMobile={isMobile}
        />
      );
    }
  }, [role, leftSideBarTheme, leftSideBarType, isMobile]);

  // ---------------------------------------------------
  // ---------------------------------------------------

  return (
    <React.Fragment>
      <div id='layout-wrapper'>
        <Header toggleMenuCallback={toggleMenuCallback} />

        {/* ----------------------------------------------------- */}
        {/* ---------- Dinamyque SIDBAR Content------------------------------------ */}

        {contentSidebar}

        {/* ----------------------------------------------------- */}

        <div className='main-content'>{props.children}</div>
        <Footer />
      </div>
      {showRightSidebar ? <RightSidebar /> : null}
    </React.Fragment>
  );
};

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeLayoutMode: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
};

export default withRouter(Layout);
