import React, {Component} from 'react';
import './StocksTable.css';
import MaterialTable from 'material-table';

class StocksTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRow: null
        }
    }

    render() {
        return (
            <MaterialTable
                style={{width: "1400px"}}
                columns={this.props.columns}
                data={this.props.data}
                title="Company Search"
                options={{
                    headerStyle: {
                        backgroundColor: '#0084f3',
                        color: '#FFF',
                        fontSize: "20px"
                    },
                    rowStyle: rowData => ({
                        fontSize: "25px",
                        fontWeight: "bold",
                        backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                    })
                }}
                onRowClick={((evt, selectedRow) => this.setState({selectedRow}))}
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