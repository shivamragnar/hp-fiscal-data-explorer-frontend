import React, {
  Component
} from "react";
import {Content} from 'carbon-components-react/lib/components/UIShell';
import FPieChart from '../../datavizcomps/FPieChart';
import FBarChart from '../../datavizcomps/FBarChart';

import { DataTable } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
// De-structure `DataTable` directly to get local references
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableToolbar,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  TableToolbarContent
} = DataTable;

const rows = [
  {
    id: 'a',
    foo: 'Foo a',
    bar: 'Bar a',
    baz: 'Baz a',
  },
  {
    id: 'b',
    foo: 'Foo b',
    bar: 'Bar b',
    baz: 'Baz b',
  },
  {
    id: 'c',
    foo: 'Foo c',
    bar: 'Bar c',
    baz: 'Baz c',
  },
];

// We would have a headers array like the following
const headers = [
  {
    // `key` is the name of the field on the row object itself for the header
    key: 'foo',
    // `header` will be the name you want rendered in the Table Header
    header: 'Foo',
  },
  {
    key: 'bar',
    header: 'Bar',
  },
  {
    key: 'baz',
    header: 'Baz',
  },
];

class ExpSummary extends Component {


  render() {



    return (
      <div>
        <Content>
          <div className="bx--grid">
            <div className="bx--row">
              <div className="left-col bx--col-lg-4">
                <h3>Some title text</h3>
                <p>
                  Carbon is IBM’s open-source design system for digital
                  products and experiences. With the IBM Design Language
                  as its foundation, the system consists of working code,
                  design tools and resources, human interface guidelines,
                  and a vibrant community of contributors.
                </p>
              </div>
              <div className="right-col bx--col-lg-8">

              </div>
            </div>
            <div className="bx--row">
              <DataTable
                rows={rows}
                headers={headers}
                render={({ rows, headers, getHeaderProps, onInputChange }) => (
                  <TableContainer title="DataTable with Toolbar">
                    <TableToolbar>


                        <TableToolbarContent>
                          <TableToolbarSearch  onChange={onInputChange} />
                          <TableToolbarMenu />
                          {
                          // <TableToolbarAction
                          //   icon={iconDownload}
                          //   iconDescription="Download"
                          //   onClick={action('TableToolbarAction - Download')}
                          // />
                          // <TableToolbarAction
                          //   icon={iconEdit}
                          //   iconDescription="Edit"
                          //   onClick={action('TableToolbarAction - Edit')}
                          // />
                          // <TableToolbarAction
                          //   icon={iconSettings}
                          //   iconDescription="Settings"
                          //   onClick={action('TableToolbarAction - Settings')}
                          // />

                          }
                          <Button onClick={"yo"} small kind="primary">
                            Add new
                          </Button>
                        </TableToolbarContent>
                      </TableToolbar>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {headers.map(header => (
                            <TableHeader {...getHeaderProps({ header })}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.id}>
                            {row.cells.map(cell => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              />
            </div>
          </div>
        </Content>
      </div>
    )
  }
}
export default ExpSummary;
