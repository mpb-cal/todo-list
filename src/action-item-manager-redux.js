import React from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { changeDone, deleteItem, addItem, makeTop } from './actions';

export default class ActionItemManagerRedux extends React.Component {
  constructor(props) {
    super(props);

    props.store.subscribe(() => this.forceUpdate());
  }

  render() {
    return (
      <ActionItemLayout store={this.props.store} />
    );
  }
}

const ActionItemLayout = ({store}) => {
  const clickExport = () => {
    var blob = new Blob(
      [JSON.stringify({items: store.getState().items})], 
      {type: "text/plain;charset=utf-8"}
    );
    saveAs(blob, "action-item-manager-state.json");
  }

  const clickImport = () => {
  }

  const submitAddItem = (e) => {
    e.preventDefault();
    store.dispatch(addItem(newItemRef.current.value));
    newItemRef.current.value = '';
  }

  let newItemRef = React.createRef();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h1 className="text-center">
            TODO List
          </h1>
          <Button onClick={clickExport} className="noprint mb-3">
            Export JSON
          </Button>
          <p>
            Import JSON: <Form.Control type="file" className="noprint mb-3" />
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={clickExport} className="d-print-none mb-3">
            Export JSON
          </Button>
        </Col>
      </Row>
      <Form onSubmit={submitAddItem} className="">
        <Form.Row className="d-print-none">
          <Col xs={10}>
            <Form.Group>
              <Form.Control name="newItem" ref={newItemRef}/>
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button type="submit">
              Add Item
            </Button>
          </Col>
        </Form.Row>
        <ActionItemList store={store} />
      </Form>
    </Container>
  );
}

const ActionItemList = ({store}) => (
  <>
    {store.getState().items ?
      store.getState().items.map((e, i) => (
        <Form.Row key={i.toString()} className={e.done ? "font-weight-light" : ""}>
          <Col className="d-print-none">
            <Button size="sm" variant="secondary" onClick={() => store.dispatch(makeTop(i))} disabled={e.done}>
              Top
            </Button>
          </Col>
          <Col className="d-print-none">
            <Button size="sm" variant="secondary" onClick={() => store.dispatch(deleteItem(i))} disabled={!e.done}>
              Delete
            </Button>
          </Col>
          <Col className="d-print-none">
            <Form.Group>
              <Form.Check type="checkbox" checked={e.done} id={"done_" + i} onChange={(e) => store.dispatch(changeDone(i, e.target.checked))} label="Done" />
            </Form.Group>
          </Col>
          <Col xs={6} md={8} className="d-print-none">
            {e.description}
          </Col>
          <Col xs={true} className="d-none d-print-block">
            {e.description}
          </Col>
        </Form.Row>
      ))
    :
      "No Items"
    }
  </>
);

