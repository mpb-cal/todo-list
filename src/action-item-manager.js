import React from 'react';
import PropTypes from 'prop-types';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class ActionItemManager extends React.Component {
  constructor(props) {
    super(props);
    this.makeTop = this.makeTop.bind(this);
    this.changeDone = this.changeDone.bind(this);
    this.submitAddItem = this.submitAddItem.bind(this);
    this.changeNewItem = this.changeNewItem.bind(this);
    this.clickExport = this.clickExport.bind(this);

    this.state = {
      items: props.items,
      newItem: '',
    };
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  static defaultProps = {
    items: [],
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.props.onChangeState({items: this.state.items});
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.onChangeState({items: this.state.items});
  }

  makeTop(item) {
    this.setState((state, props) => ({
      items: [
        state.items[item], 
        ...state.items.slice(0, item), 
        ...state.items.slice(item + 1)
      ],
    }));
  }

  changeDone(e, item) {
    //console.log(e.target);
    const done = e.target.checked;

    this.setState((state, props) => {
      let items = state.items;
      items[item].done = done;

      if (done) {
        items = [
          ...items.slice(0, item), 
          ...items.slice(item + 1, items.length), 
          items[item], 
        ];
      }

      return {
        items,
      }
    });
  }

  clickExport() {
    var blob = new Blob([JSON.stringify({items: this.state.items})], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "action-item-manager-state.json");
  }

  submitAddItem(e) {
    e.preventDefault();
    this.setState((state, props) => {
      let items = state.items;
      items.unshift({
        description: this.state.newItem,
        done: false,
      });
      return {
        items,
        newItem: '',
      };
    });
  }

  changeNewItem(e) {
    const value = e.target.value;

    this.setState({
      newItem: value,
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button onClick={this.clickExport} className="noprint">
              Export
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.submitAddItem} className="noprint">
              <Form.Row>
                <Col xs={10}>
                  <Form.Group>
                    <Form.Control name="newItem" value={this.state.newItem} onChange={this.changeNewItem} />
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Button type="submit">
                    Add Item
                  </Button>
                </Col>
              </Form.Row>
              {this.state.items ?
                <ActionItemList items={this.state.items} onMakeTop={this.makeTop} onChangeDone={this.changeDone} />
              :
                "No Items"
              }
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const ActionItemList = ({items, onMakeTop, onChangeDone}) => (
  <>
    {items.map((e, i) => (
      <Form.Row key={i.toString()} className={e.done ? "font-weight-light" : ""}>
        <Col xs={1}>
          <Button size="sm" variant="secondary" onClick={() => onMakeTop(i)} disabled={e.done} className="noprint">
            Top
          </Button>
        </Col>
        <Col xs={1}>
          <Form.Group>
            <Form.Check className="noprint" type="checkbox" checked={e.done} id={"done_" + i} onChange={(e) => onChangeDone(e, i)} label="Done" />
          </Form.Group>
        </Col>
        <Col xs={10}>
          {e.description}
        </Col>
      </Form.Row>
    ))}
  </>
);

