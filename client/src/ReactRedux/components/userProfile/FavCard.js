import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Container,
  Button
} from "reactstrap";
import PropTypes from "prop-types";
import "./style.css";
import $ from "jquery";

class FavCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }
  handleRemove = event => {
    console.log("removeBTN", event.target.id);
    const target = event.target;
    const id = JSON.parse(target.id);
    $.ajax({
      type: "DELETE",
      url: "/delCharities" /* THIS URL IS CALLING CORRECTLY ie. /items/8 */,
      dataType: "text",
      data: { id: id },
      success: function (response) {
        console.log("successfully deleted");
        // return ;
        console.log("response", response);
      }
    });
    // window.location.reload()
  };
  render() {
    return (
      <Col sm="3">
        <Card body>
          <CardBody>
            <CardTitle>
              <strong>{this.props.item.name}</strong>
            </CardTitle>
          </CardBody>
          <img width="100%" src={this.props.item.image} alt="Card image cap" />
          <CardBody>
            <CardText><strong>What we support: </strong>{this.props.item.description}</CardText>
            <CardText><strong>Amount: </strong>{this.props.item.amount}</CardText>
            <CardText><strong>Location: </strong> {this.props.item.location}</CardText>
            <Button
              color="danger"
              href="#"
              id={this.props.item.id}
              onClick={this.handleRemove}
            >
              Remove
            </Button>{" "}
            <Button
              color="info"
              href="#"
              id={this.props.item.id}
              onClick={this.handleRemove}
            >
              Edit
            </Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

Container.propTypes = {
  fluid: PropTypes.bool
  // applies .container-fluid class
};

Row.propTypes = {
  noGutters: PropTypes.bool,
  // see https://reactstrap.github.io/components/form Form Grid with Form Row
  form: PropTypes.bool
};

const stringOrNumberProp = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
]);
const columnProps = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool,
  PropTypes.shape({
    size: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string
    ]),
    order: stringOrNumberProp,
    offset: stringOrNumberProp
  })
]);

Col.propTypes = {
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  xl: columnProps,
  widths: PropTypes.array
};

export default FavCard;
