import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Card, Table, Button,
} from 'reactstrap';
// import { toggleFavourite } from './redux/actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import { toggleModal, editTodoAction, clearDoneTodoStatusAction } from './redux/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      editedTodo: {},
    };
    this.handleActionButton = this.handleActionButton.bind(this);
  }

  handleActionButton(actionName, data) {
    if (actionName === 'edit') {
      this.setState({
        isEditable: Object.keys(data).length !== 0,
        editedTodo: data,
      });
      this.props.toggleModal(!this.props.isOpen);
    } else if (actionName === 'status') {
      this.props.editTodoAction({
        ...data,
        status: true,
      });
    } else {
      this.props.clearDoneTodoStatusAction();
    }
  }

  render() {
    const { todoList } = this.props;
    return (
      <div className="App">
        <div className="App-intro">
          <br />
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <Header
                  handleActionButton={this.handleActionButton}
                  editTodoAction={this.props.editTodoAction}
                  isEditable={this.state.isEditable}
                  editedTodo={this.state.editedTodo}
                  clearDoneTodoStatusAction={this.props.clearDoneTodoStatusAction}
                />
                <Card>
                  {this.props.todoList.length > 0 ? (
                    <Table borderless>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Task Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todoList.map((todo, i) => (
                          <tr key={todo.id}>
                            <th scope="row">{i + 1}</th>
                            <td>{todo.taskName}</td>
                            <td>
                              {todo.status ? (
                                <span className="done">DONE</span>
                              ) : (
                                <span className="undone">UNDONE</span>
                              )}
                            </td>
                            <td>
                              <div className="display-flex">
                                <Button
                                  outline
                                  size="sm"
                                  color="primary"
                                  onClick={() => this.handleActionButton('edit', todo)}
                                >
                                  {' '}
                                  Edit
                                </Button>
                                {!todo.status && (
                                  <Button
                                    outline
                                    color="primary"
                                    size="sm"
                                    onClick={() => this.handleActionButton('status', todo)}
                                    style={{ marginLeft: '4px' }}
                                  >
                                    {' '}
                                    Done
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    "No todo's added yet!"
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  // boolean to control the state of the popover
  todoList: PropTypes.arrayOf(PropTypes.object),
  clearDoneTodoStatusAction: PropTypes.func.isRequired,
  editTodoAction: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
App.defaultProps = {
  todoList: [],
  isOpen: false,
};

function mapStateToProps(state) {
  return {
    todoList: state.data.todos,
    isOpen: state.data.isOpen,
  };
}
const mapDispatchToProps = dispatch => ({
  clearDoneTodoStatusAction: () => dispatch(clearDoneTodoStatusAction()),
  editTodoAction: formData => dispatch(editTodoAction(formData)),
  toggleModal: bool => dispatch(toggleModal(bool)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
