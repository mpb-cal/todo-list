import React from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { changeDone, deleteItem, addItem, makeTop, importItems, moveUp, moveDown, clearMove, clearNew } from './actions';
import FormGroup from 'react-bootstrap/FormGroup';

const EXPORT_JSON_NAME = "action-item-manager-state.json";

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
    saveAs(blob, EXPORT_JSON_NAME);
  }

  const changeChooseFile = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      let file = files[0];
      if (typeof file !== 'undefined') {
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = function () {
          console.log(reader.result);
          let data = JSON.parse(reader.result);
          if (typeof data.items !== 'undefined') {
            let items = data.items;
            console.log(items);
            store.dispatch(importItems(items));
          }
        };
      }
    }
  }

  const submitAddItem = (e) => {
    e.preventDefault();
    store.dispatch(addItem(newItemRef.current.value));
    setTimeout(() => {store.dispatch(clearNew())}, 1000);
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
        </Col>
      </Row>
      <Row className="d-print-none">
        <Col>
          <Button onClick={clickExport} className="mb-3">
            Export JSON
          </Button>
          <Form className="">
            <Form.Row>
              <FormGroup>
                <Col>
                  Import JSON:
                </Col>
                <Col>
                  <Form.Control type="file" className="mb-3" onChange={changeChooseFile} />
                </Col>
              </FormGroup>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <Form onSubmit={submitAddItem} className="">
        <Form.Row className="d-print-none">
          <Col xs={10}>
            <Form.Group>
              <Form.Control name="newItem" ref={newItemRef} />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button type="submit" >
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
      store.getState().items.map((e, i, a) => (
        <ActionItem key={i.toString()} store={store} item={e} idx={i} />
      ))
    :
      "No Items"
    }
  </>
);

const clickActionButton = (store, action, item) => {
  store.dispatch(action);
  setTimeout(() => {store.dispatch(clearMove(item.id))}, 1000);
}

const ActionItem = ({store, item, idx}) => (
  <Form.Row className={"actionItemRow " + (item.done ? "done " : "") + (item.isNew ? "new " : "") + (item.justMoved ? "justMoved " : "")} >
    <ActionButton store={store} item={item} text="Up" action={moveUp(item.id)} disabled={item.done || idx < 1} />
    <ActionButton store={store} item={item} text="Down" action={moveDown(item.id)} disabled={item.done} />
    <ActionButton store={store} item={item} text="Top" action={makeTop(item.id)} disabled={item.done || idx < 1} />
    <ActionButton store={store} item={item} text="Delete" action={deleteItem(item.id)} disabled={!item.done} />
    <Col className="d-print-none">
      <Form.Group className="done">
        <Form.Check type="checkbox" checked={item.done} id={"done_" + idx} onChange={(e) => clickActionButton(store, changeDone(item.id, e.target.checked), item)} label="Done" />
      </Form.Group>
    </Col>
    <Col xs={6} md={8} className="d-print-none description">
      {item.description}
    </Col>
    <Col xs={true} className="d-none d-print-block description">
      {item.description}
    </Col>
  </Form.Row>
);

const ActionButton = ({store, item, text, action, disabled}) => (
  <Col className="d-print-none">
    <Button size="sm" variant="success" onClick={() => clickActionButton(store, action, item)} disabled={disabled}>
     {text}
    </Button>
  </Col>
);

