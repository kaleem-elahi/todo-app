import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, ModalFooter, ModalBody, Modal,
} from 'reactstrap';
import { submit } from 'redux-form';

import CreateTodoForm from './CreateTodoForm';

const ModalWrapper = props => (
  <Modal
    centered
    backdrop={false}
    fade={false}
    backdropClassName="backdropModal"
    // backdropTransition={{ timeout: 0 }}
    isOpen={props.isOpen || props.isEditable}
    toggle={() => props.handleToggleModal()}
    className={props.className}
  >
    <ModalBody>
      <CreateTodoForm
        handleActionButton={props.handleActionButton}
        submitCreateTodo={props.submitCreateTodo}
        initialValues={props.initialValues}
        isEditable={props.isEditable}
      />
    </ModalBody>
    <ModalFooter>
      <Button
        style={{ background: '#f2f4f7', color: '#aab3bd', borderColor: '#f2f4f7' }}
        onClick={() => {
          props.handleToggleModal();
          props.handleActionButton('edit', {});
        }}
      >
        CANCEL
      </Button>
      {' '}
      <Button
        color="primary"
        onClick={() => {
          props.dispatch(submit('createTodoForm'));
          props.handleToggleModal();
        }}
      >
        {props.isEditable ? 'UPDATE' : 'CREATE'}
      </Button>
    </ModalFooter>
  </Modal>
);

ModalWrapper.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  isEditable: PropTypes.bool,
  handleToggleModal: PropTypes.func.isRequired,
  handleActionButton: PropTypes.func.isRequired,
  submitCreateTodo: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  initialValues: PropTypes.object, // eslint-disable-line
};
ModalWrapper.defaultProps = {
  className: '',
  isOpen: false,
  isEditable: false,
};

export default ModalWrapper;
