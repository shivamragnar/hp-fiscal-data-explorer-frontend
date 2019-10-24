import React from "react";
import {Link} from "react-router-dom";
import {
  Header,
  HeaderName,
  HeaderContainer,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderMenu
} from "carbon-components-react/lib/components/UIShell";

const FHeader1 = () => (
  <HeaderContainer
    render={({isSideNavExpanded, onClickSideNavExpand}) => (
      <div>
        <Header aria-label="Carbon Tutorial">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName element={Link} to="/" prefix="">
            Fiscal Data Explorer
          </HeaderName>
          <HeaderNavigation
            className="f_secondarylinks_right"
            aria-label="Carbon Tutorial"
          >
            <HeaderMenuItem element={Link} to="/aboutus">
              About Us
            </HeaderMenuItem>
            <HeaderMenuItem element={Link} to="/contactus">
              Contact Us
            </HeaderMenuItem>
          </HeaderNavigation>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
          >
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenu aria-label="Expenditure" menuLinkName="Expenditure">
                  <HeaderMenuItem
                    element={Link}
                    to="/expenditure/summary"
                    onClick={onClickSideNavExpand}
                  >
                    Summary
                  </HeaderMenuItem>
                  <HeaderMenuItem
                    element={Link}
                    to="/expenditure/details"
                    onClick={onClickSideNavExpand}
                  >
                    Expenditure Details
                  </HeaderMenuItem>
                  <HeaderMenuItem
                    element={Link}
                    to="/expenditure/tracker"
                    onClick={onClickSideNavExpand}
                  >
                    Expenditure Tracker
                  </HeaderMenuItem>
                </HeaderMenu>
                <HeaderMenuItem
                  element={Link}
                  to="/aboutus"
                  onClick={onClickSideNavExpand}
                >
                  About Us
                </HeaderMenuItem>
                <HeaderMenuItem
                  element={Link}
                  to="/contactus"
                  onClick={onClickSideNavExpand}
                >
                  Contact Us
                </HeaderMenuItem>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
          <HeaderGlobalBar />
        </Header>
      </div>
    )}
  />
);
export default FHeader1;
