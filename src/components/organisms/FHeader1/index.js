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
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderMenu,
  HeaderGlobalAction
} from "carbon-components-react/lib/components/UIShell";

import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';

import MediaQuery from "react-responsive";

import OverflowMenuVertical20 from '@carbon/icons-react/lib/overflow-menu--vertical/20';

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
          <HeaderNavigation className="f_primarylinks_center" aria-label="Carbon Tutorial">
            <HeaderMenuItem element={Link} to="/budget_highlights">
              Budget Highlights
            </HeaderMenuItem>

            <HeaderMenu aria-label="Expenditure" menuLinkName="Expenditure">
              <HeaderMenuItem element={Link} to="/expenditure/summary">Summary</HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/expenditure/details">Demand Details</HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/expenditure/tracker">District Comparison</HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/expenditure/district_details">District Details</HeaderMenuItem>
            </HeaderMenu>
            <HeaderMenuItem element={Link} to="/receipts">
              Receipts
            </HeaderMenuItem>
            <HeaderMenuItem element={Link} to="/sectors">
              Sectors
            </HeaderMenuItem>
            <HeaderMenuItem element={Link} to="/schemes">
              Schemes
            </HeaderMenuItem>
          </HeaderNavigation>
          <HeaderNavigation
            className="f_secondarylinks_right"
            aria-label="Carbon Tutorial"
          >
          <MediaQuery query="(min-device-width: 1080px)">
            <HeaderMenuItem element={Link} to="/aboutus">
              About Us
            </HeaderMenuItem>
            <HeaderMenuItem element={Link} to="/contactus">
              Contact Us
            </HeaderMenuItem>
          </MediaQuery>
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
                    Demand Details
                  </HeaderMenuItem>
                  <HeaderMenuItem
                    element={Link}
                    to="/expenditure/tracker"
                    onClick={onClickSideNavExpand}
                  >
                    District Comparison
                  </HeaderMenuItem>
                  <HeaderMenuItem
                    element={Link}
                    to="/expenditure/district_details"
                    onClick={onClickSideNavExpand}
                  >
                    District Details
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
          <MediaQuery query="(max-device-width: 1080px)">
            <OverflowMenu
                flipped="true"
                renderIcon = {() => <OverflowMenuVertical20 style={{ fill: "white"}} />}
                >
              <OverflowMenuItem itemText="About Us" primaryFocus />
              <OverflowMenuItem itemText="Contact Us" />
            </OverflowMenu>
          </MediaQuery >
        </Header>
      </div>
    )}
  />
);
export default FHeader1;
