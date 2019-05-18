import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Card } from 'reactstrap';
import { toggleModal, createTodoAction } from '../redux/actions';
import ModalWrapper from './ModalWrapper';

const randomId = () => `_${Math.random()
  .toString(36)
  .substr(2, 9)}`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.submitCreateTodo = this.submitCreateTodo.bind(this);
  }

  handleToggleModal() {
    this.props.toggleModal(!this.props.isOpen);
  }

  submitCreateTodo(data) {
    if (this.props.isEditable) {
      this.props.editTodoAction({ ...this.props.editedTodo, ...data });
      this.props.handleActionButton('edit', {});
    } else {
      this.props.createTodoAction({ ...data, status: false, id: randomId() });
    }
    this.props.toggleModal(false);
  }

  render() {
    return (
      <Fragment>
        <Card className="card header">
          <div className="card-inner">
            <Button color="primary" onClick={() => this.props.toggleModal(true)}>
              ADD TASK
            </Button>
            {this.props.todoList.map(todo => todo.status).includes(true) ? (
              <Button color="link" onClick={() => this.props.clearDoneTodoStatusAction()}>
                clear all the done tasks
              </Button>
            ) : null}
          </div>
        </Card>
        <ModalWrapper
          isEditable={this.props.isEditable}
          submitCreateTodo={this.submitCreateTodo}
          handleToggleModal={this.handleToggleModal}
          handleActionButton={this.props.handleActionButton}
          isOpen={this.props.isOpen}
          dispatch={this.props.dispatch}
          initialValues={this.props.editedTodo}
        />
        <hr style={{ margin: '0' }} />
      </Fragment>
    );
  }
}

Header.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  createTodoAction: PropTypes.func.isRequired,
  handleActionButton: PropTypes.func.isRequired,
  editedTodo: PropTypes.object, //eslint-disable-line
  todoList: PropTypes.array, //eslint-disable-line
  editTodoAction: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
  clearDoneTodoStatusAction: PropTypes.func.isRequired,
};
Header.defaultProps = {
  isOpen: false,
  isEditable: false,
  todoList: [],
  editedTodo: {},
};

// function mapStateToProps() {}
const mapStateToProps = state => ({
  isOpen: state.data.isOpen,
  todoList: state.data.todos,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  toggleModal: bool => dispatch(toggleModal(bool)),
  createTodoAction: formData => dispatch(createTodoAction(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
