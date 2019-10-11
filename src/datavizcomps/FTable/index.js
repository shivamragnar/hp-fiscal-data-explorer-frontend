import React, {
  Component
} from "react";
import {Content} from 'carbon-components-react/lib/components/UIShell';

import { DataTable } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
// De-structure `DataTable` directly to get local references
import Download16 from '@carbon/icons-react/lib/download/16';


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
  TableToolbarContent,
  TableBatchActions,
  TableBatchAction,
  TableSelectAll,
  TableSelectRow
} = DataTable;


class FTable extends Component {

  constructor(props){
    super(props);
    this.consoleFilteredRows = this.consoleFilteredRows.bind(this);
  }

  consoleFilteredRows(rows){
    console.log(rows);
  }

  render() {



    return (
      <div>
              <DataTable
                rows={this.props.rows}
                headers={this.props.headers}
                render={({ rows, headers, getHeaderProps, getBatchActionProps, onInputChange }) => (
                  <TableContainer title="DataTable with Toolbar">
                    <TableToolbar>
                        <TableToolbarContent>
                          <TableToolbarSearch  onChange={onInputChange} />
                          <TableToolbarAction> <Download16/> </TableToolbarAction>
                          {
                            // <Button onClick={() => this.consoleFilteredRows(rows)} small kind="primary">
                            //   Add new
                            // </Button>
                          }

                        </TableToolbarContent>
                      </TableToolbar>
                      <div className="data-table-wrapper">
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
                    </div>
                  </TableContainer>
                )}
              />
      </div>
    )
  }
}
export default FTable;
