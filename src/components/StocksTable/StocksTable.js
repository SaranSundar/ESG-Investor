import React, {Component, Fragment} from 'react';
import './StocksTable.css';
import MaterialTable from 'material-table';

class StocksTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MaterialTable
                columns={this.props.columns}
                data={this.props.data}
                title="Stocks Table"
                // options={{
                //     headerStyle: {
                //         backgroundColor: '#01579b',
                //         color: '#FFF'
                //     },
                //     // rowStyle: rowData => ({
                //     //     backgroundColor: rowData.color_status.color
                //     // })
                // }}
                // detailPanel={rowData => {
                //     return (
                //         <Fragment>
                //             {rowData.failure_reasons &&
                //             <div className="Table-analytics-container">
                //                 {rowData.failure_reasons.map((value, index) =>
                //                     <Typography variant="subtitle1"
                //                                 className="Table-analytics-text" key={index}>{value}</Typography>)}
                //             </div>}
                //         </Fragment>
                //     )
                // }}
                // onRowClick={(event, rowData, togglePanel) => togglePanel()}
            />
        );
    }
}

export default StocksTable;