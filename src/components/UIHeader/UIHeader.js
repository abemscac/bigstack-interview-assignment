import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenuButton,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavDivider
} from '@carbon/react';
import { Home } from '@carbon/icons-react';
import { Link } from 'react-router-dom';
import cube from '@images/cube.png';

export const UIHeader = () => {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Cube Interview Assignment">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            isCollapsible
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <SideNav
            aria-label="Side navigation"
            isRail
            expanded={isSideNavExpanded}
            onOverlayClick={onClickSideNavExpand}
          >
            <SideNavItems>
              <SideNavLink renderIcon={Home} large>
                Home
              </SideNavLink>
              <SideNavDivider />
            </SideNavItems>
          </SideNav>
          <div className="cube--header-logo__wrapper">
            <Link to="/">
              <img
                src={cube}
                alt="logo"
                width="30px"
                style={{ marginLeft: '1rem' }}
              />
            </Link>
            <span className="cube-header-logo__divider" />
            <HeaderName
              as={Link}
              to="/"
              prefix=""
              style={{ paddingLeft: '0.5rem' }}
            >
              {process.env.APP_NAME || 'Cube Interview Assignment'}
            </HeaderName>
          </div>
        </Header>
      )}
    />
  );
};
