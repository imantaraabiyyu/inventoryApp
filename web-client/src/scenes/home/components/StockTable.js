import React, { Component } from "react";
import { Card, CircularProgress, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import { stockSummary } from "../../../actions/home";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class StockTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: [],
      error: null,
      rowsSelected: []
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    this.props.stockSummary();
  }

  componentDidUpdate(prevProps) {
    const { dataTable, error } = this.props;

    if (prevProps.dataTable !== dataTable) {
      this.setState({ dataTable: dataTable });
    } else if (error && prevProps.error !== error) {
      this.setState({ error: error });
    }
  }

  onAdd = () => {
    this.props.history.push("/items/add");
  };

  onReload = () => {
    this.reload();
  };
  render() {
    const { loading } = this.props;
    const { dataTable } = this.state;

    const columns = [
      {
        name: "itemName",
        label: "Name"
      },
      {
        name: "qty",
        label: "Quantity"
      },
      {
        name: "unitName",
        label: "Unit"
      }
    ];
    const options = {
      page: 5,
      rowsPerPageOptions: [5, 10, 15, 25, 30],
      responsive: "scroll",
      selectableRows: false,
      textLabels: {
        body: {
          noMatch: loading ? (
            <CircularProgress />
          ) : (
            "Sorry, not match records not found"
          )
        }
      }
    };
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.onReload}>
          reload
        </Button>
        <Card>
          <MUIDataTable
            title={"Stock Summary"}
            data={!loading ? dataTable : []}
            columns={columns}
            options={options}
          />
        </Card>
      </div>
    );
  }
}

StockTable.propTypes = {
  classes: PropTypes.any,
  dataTable: PropTypes.any,
  deleteData: PropTypes.any,
  deleteError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.any,
  loading: PropTypes.any,
  stockSummary: PropTypes.any
};

const mapStateToProps = (state) => ({
  dataTable: state.Table.dataTable,
  error: state.Table.error || state.Table.error,
  loading: state.Table.loading || state.Table.loading,
  deleteData: state.Table.dataTable,
  deleteError: state.Table.error
});

const mapDispatchToProps = {
  stockSummary
};

export default connect(mapStateToProps, mapDispatchToProps)(StockTable);
