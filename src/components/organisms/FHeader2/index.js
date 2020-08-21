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
  HeaderMenu,

} from "carbon-components-react/lib/components/UIShell";

const FHeader2 = () => ( <HeaderContainer render={( { isSideNavExpanded, onClickSideNavExpand } ) => (
        <div>
          <Header className="f_header_2" aria-label="Carbon Tutorial">
            <SkipToContent/>

              <HeaderNavigation className="f_primarylinks_center" aria-label="Carbon Tutorial">
                <HeaderMenuItem element={Link} to="/budget_highlights">
                  Budget Highlights
                </HeaderMenuItem>

                <HeaderMenu aria-label="Expenditure" menuLinkName="Expenditure">
                  <HeaderMenuItem element={Link} to="/expenditure/summary">Summary</HeaderMenuItem>
                  <HeaderMenuItem element={Link} to="/expenditure/details">Expenditure Details</HeaderMenuItem>
                  <HeaderMenuItem element={Link} to="/expenditure/tracker">Expenditure Tracker</HeaderMenuItem>
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

            <HeaderGlobalBar/>
          </Header>
        </div>
      )
    }
  />
);

export default FHeader2;
