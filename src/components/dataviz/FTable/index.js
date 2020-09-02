import React, {
  Component
} from "react";
import {Content} from 'carbon-components-react/lib/components/UIShell';
import { DataTable, Button } from 'carbon-components-react';
import { Tooltip, Progress } from 'antd';
import { legend_point_1, legend_point_2, legend_point_3, legend_point_4, legend_point_5 } from '../../../scss/_vars.scss'


import FDownloadActionTooltip from '../../molecules/FDownloadActionTooltip'


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

  handleTotalColumn = (rows) => {
    if(!rows.length){
      return
    }
    let colspan = 0
    let total = []
    rows[0].cells.forEach((cell, index) => {
      if(isNaN(Number(cell.value))){
        colspan = index + 1
      }
    })
    rows.forEach((row) => {
      row.cells.forEach((cell, index) => {
        if(index >= colspan){
          total[index] = total[index] ? +(total[index] + parseFloat(cell.value)).toFixed(2).toLocaleString('en-IN') : parseFloat(cell.value)
        }
      })
    })
    let totalRow = ["Total", ...total.slice(colspan)]
    return {totalRow, colspan}
  }

  getColor = (cellValue) => {
    return cellValue > 0.8
    ? "hsl(177, 100%, 70%)"
    : cellValue > 0.6
    ? "hsl(177, 100%, 56%)"
    : cellValue > 0.4
    ? "hsl(177, 100%, 42%)"
    : cellValue > 0.2
    ? "hsl(177, 100%, 28%)"
    : "hsl(177, 100%, 14%)";
  }


  render() {
    
    const dataG = this.props.headers && this.props.rows && this.props.rows.map((rowItem) => {
      const obj = {}
      this.props.headers.forEach(header => {
        obj[header.header] = rowItem[header.key]
      })
      return obj
    })

    return (
      <div className="f-table-comp-wrapper">
              {
                this.props.showInCroresText
                ?
                <span>Figures are in Crores.</span>
                :null
              }
              <DataTable
                rows={this.props.rows}
                headers={this.props.headers}
                isSortable={this.props.sort === false ? this.props.sort : true}
                render={({ rows, headers, getHeaderProps, getBatchActionProps, onInputChange, sortBy }) => {
                  let footerData = this.handleTotalColumn(rows)
                  return(
                  <TableContainer title="DataTable with Toolbar">
                    <TableToolbar>
                        <TableToolbarContent>
                          <TableToolbarSearch  onChange={onInputChange} />
                          <TableToolbarAction onClick={this.props.onClickDownloadBtn}>
                            <FDownloadActionTooltip
                              // data={this.props.rows}
                              data={dataG}
                              />
                        </TableToolbarAction>
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
                          {headers.map(header => {
                            if(this.props.showHeaderTooltip){
                                return(
                                  <Tooltip title={header.tooltip}>
                                    <TableHeader {...getHeaderProps({ header })}>
                                      {header.header}
                                    </TableHeader>
                                  </Tooltip>
                                )
                            }
                            else{
                              return(
                                <TableHeader {...getHeaderProps({ header })}>
                                  {header.header}
                                </TableHeader>
                              )
                            }
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.id}>
                            {row.cells.map(cell => (
                              <TableCell key={cell.id}>
                                {
                                  this.props.showBar && !this.props.kpis.includes(cell.value) && (cell.value !== "null")
                                  ?
                                  <Progress percent={cell.value*100} trailColor="#b3b3b3" strokeColor={this.getColor(cell.value)} format={(percent) => percent/100 } />
                                  :
                                  cell.value === "null" ? "Not Available" : cell.value
                                }
                                </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                      {
                        rows.length && this.props.showTotal
                        ?
                          <tfoot>
                            <tr>
                              {
                                footerData.totalRow.map((data, index) => (
                                    <td className="total-column" colspan={index === 0 ? footerData.colspan : 1}>{data}</td>
                                ))
                              }
                            </tr>
                          </tfoot>
                        :null
                      }
                    </Table>
                    </div>
                  </TableContainer>
                )}
              }
              />
      </div>
    )
  }
}
export default FTable;
