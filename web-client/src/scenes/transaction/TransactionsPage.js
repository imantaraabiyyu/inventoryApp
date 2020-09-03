import { Button, CircularProgress, ButtonGroup } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Cached as ReloadIcon } from "@material-ui/icons";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAll, findAll } from "../../actions/transactions";
import styles from "../styles.js";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";

class TransactionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      params: {
        search: { name: "" },
        sort: "asc",
        page: 0,
        size: 10
      },
      error: null,
      rowsSelected: []
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    this.props.findAll(this.state.params);
  }

  componentDidUpdate(prevProps, prevState) {
    const { deleteData, deleteError, data, error } = this.props;
    const { params } = this.state;

    if (prevProps.data !== data) {
      this.setState({ data: data.list, total: data.total });
    } else if (
      prevState.params !== params ||
      prevProps.deleteData !== deleteData
    ) {
      this.reload();
    } else if (deleteError && prevProps.deleteError !== deleteError) {
      this.setState({ error: deleteError });
    } else if (error && prevProps.error !== error) {
      this.setState({ error: error });
    }
  }

  onAdd = () => {
    this.props.history.push("/transactions/add");
  };

  onReload = () => {
    this.reload();
  };
  onRowsDelete = (rowsDeleted) => {
    const { list } = this.props.data;
    const { rowsSelected } = this.state;

    this.setState({ ...rowsSelected, rowsSelected: [] });
    let ids = [];
    rowsDeleted.data.forEach((data) => {
      const e = list[data.index];
      ids.push(e.id);
    });
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No, keep it"
    }).then((result) => {
      if (result.value) {
        this.props.deleteAll(ids);
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data is safe", "error");
      }
    });
  };

  onRowClick = (rowData) => {
    this.props.history.push(`/transactions/${rowData[0]}`);
  };

  onChangePage = (currentPage) => {
    const { params } = this.state;
    this.setState({ params: { ...params, page: currentPage } });
  };

  onChangeRowsPerPage = (numberOfRows) => {
    const { params } = this.state;
    this.setState({ params: { ...params, size: numberOfRows } });
  };

  onSearchChange = (searchText) => {
    const { params } = this.state;
    this.setState({ params: { ...params, search: { name: searchText } } });
  };

  onColumnSortChange = (changedColumn, direction) => {
    const { params } = this.state;
    const sort = direction === "descending" ? "desc" : "asc";
    this.setState({ params: { ...params, sort } });
  };

  onRowsSelect = (rowsSelected, allRows) => {
    const selected = allRows.map((item) => item.index);
    this.setState({
      rowsSelected: selected
    });
  };
  render() {
    const { classes, loading } = this.props;
    const { data, total, params } = this.state;
    const columns = [
      {
        name: "id",
        label: "ID",
        options: {
          sortDirection: params.sort
        }
      },
      {
        name: "type",
        label: "Type",
        options: {
          customBodyRender: (value) => {
            let type = "";
            switch (value) {
              case 0:
                type = "PURCHASE";
                break;
              case 1:
                type = "SELLING";
                break;
              case 2:
                type = "PAYDAY";
                break;

              default:
                break;
            }
            return <span>{type}</span>;
          }
        }
      },
      {
        name: "amount",
        label: "Amount",
        options: {
          customBodyRender: (value) => {
            return (
              <NumberFormat
                value={value}
                displayType={"text"}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"Rp."}
                renderText={(value) => <div>{value}</div>}
              />
            );
          }
        }
      },
      {
        name: "description",
        label: "Description",
        options: {
          sort: false
        }
      }
    ];
    const options = {
      serverSide: true,
      page: params.page,
      count: total,
      rowsPerPage: params.size,
      rowsPerPageOptions: [10, 15, 25, 30],
      filter: false,
      searchText: params.search.name,
      onRowClick: this.onRowClick,
      onRowsDelete: this.onRowsDelete,
      onChangePage: this.onChangePage,
      onChangeRowsPerPage: this.onChangeRowsPerPage,
      onSearchChange: this.onSearchChange,
      onColumnSortChange: this.onColumnSortChange,
      responsive: "scroll",
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
        <ButtonGroup
          variant="contained"
          className={classes.buttonContainerRight}
        >
          <Button
            className={classes.buttonReload}
            onClick={this.onReload}
            disabled={loading}
            color="primary"
            startIcon={<ReloadIcon />}
          >
            Reload
          </Button>
          <Button
            className={classes.buttonAdd}
            onClick={this.onAdd}
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
          >
            New Transaction
          </Button>
        </ButtonGroup>
        <div className={classes.table}>
          <MUIDataTable
            title={"Transaction List"}
            data={!loading ? data : []}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    );
  }
}
TransactionsPage.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  deleteAll: PropTypes.any,
  deleteById: PropTypes.func,
  deleteData: PropTypes.object,
  deleteError: PropTypes.object,
  error: PropTypes.object,
  findAll: PropTypes.func,
  history: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  data: state.Transactions.data,
  error: state.Transactions.error || state.Transactions.error,
  loading: state.Transactions.loading || state.Transactions.loading,
  deleteData: state.Transactions.data,
  deleteError: state.Transactions.error
});

const mapDispatchToProps = {
  deleteAll,
  findAll
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(TransactionsPage)
);
