import React from "react";
import { Link } from "react-router-dom";
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

const FHeader = () => ( <HeaderContainer render={( { isSideNavExpanded, onClickSideNavExpand } ) => ( <div>
    <Header aria-label="Carbon Tutorial">
      <SkipToContent/>
      <HeaderMenuButton aria-label="Open menu" onClick={onClickSideNavExpand} isActive={isSideNavExpanded}/>
      <HeaderName element={Link} to="/" prefix="">
        Fiscal Data Explorer
      </HeaderName>
      <HeaderNavigation aria-label="Carbon Tutorial">
        <HeaderMenuItem element={Link} to="/expenditure">
          Expenditure
        </HeaderMenuItem>
        <HeaderMenuItem element={Link} to="/receipts">
          Receipts
        </HeaderMenuItem>
      </HeaderNavigation>
      <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isPersistent={false}>
        <SideNavItems>
          <HeaderSideNavItems>
            <HeaderMenuItem element={Link} to="/expenditure" onClick={onClickSideNavExpand}>
              Expenditure
            </HeaderMenuItem>
            <HeaderMenuItem element={Link} to="/receipts" onClick={onClickSideNavExpand}>
              Receipts
            </HeaderMenuItem>
          </HeaderSideNavItems>
        </SideNavItems>
      </SideNav>
      <HeaderGlobalBar/>
    </Header>
  </div> )}/> );
export default FHeader;
