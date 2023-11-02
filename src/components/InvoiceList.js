import React, { Component } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteInvoice, editInvoice, setSelectedInvoiceId } from "../Actions";
import InvoiceModal from "./InvoiceModal";

class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedInvoice: {},
    };
  }

  handleDelete = (id) => {
    this.props.deleteInvoice(id);
    console.log(this.props);
  };

  handleEdit = (id) => {
    this.props.setSelectedInvoiceId(id);

  };

  getInvoiceById = (id) => {
    return this.props.invoices.find((item) => item.id === id);
  };
  handleView = (id) => {
    this.setState({ isOpen: true });
    console.log(this.getInvoiceById(id), "selectedInvoice");
    this.setState({ selectedInvoice: this.getInvoiceById(id) });
  };

  closeModal = () => this.setState({ isOpen: false });
  render() {
    const invoices = this.props.invoices;
    const selectedInvoice = this.state.selectedInvoice;
    return (
      <>
        <InvoiceModal
          showModal={this.state.isOpen}
          closeModal={this.closeModal}
          info={selectedInvoice}
          items={selectedInvoice.items}
          currency={selectedInvoice.currency}
          subTotal={selectedInvoice.subTotal}
          taxAmmount={selectedInvoice.taxAmmount}
          discountAmmount={selectedInvoice.discountAmmount}
          total={selectedInvoice.total}
        />
        <Container>
          <h2>Items List</h2>
          <ListGroup className="rounded">
            {invoices.length !== 0 ? (
              invoices.map((item) => (
                <ListGroup.Item
                  className="d-flex justify-content-between align-items-start "
                  key={item.id}
                >
                  {item.id}
                  <div style={{ display: "flex", gap: ".50rem" }}>
                    <Button
                      variant="light"
                      onClick={() => this.handleView(item.id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => this.handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item
                className="d-flex justify-content-center align-items-center"
              >
                <span className="opacity-75">No invoices found</span>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    invoices: state.invoices,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteInvoice: (id) => dispatch(deleteInvoice(id)),
    editInvoice: (id) => dispatch(editInvoice(id)),
    setSelectedInvoiceId: (id) => dispatch(setSelectedInvoiceId(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
