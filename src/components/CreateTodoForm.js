import React from 'react';
import PropTypes from 'prop-types';
import { Label, Col, FormGroup } from 'reactstrap';
import { reduxForm, Form, Field } from 'redux-form';
import RenderInput from './RenderInput';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const CreateTodoForm = props => (
  <div className="flexBox">
    <Form
      id="addRestaurantForm"
      onSubmit={props.handleSubmit(props.submitCreateTodo)}
      style={{
        width: '-webkit-fill-available',
        margin: 'auto 15px',
        textAlign: 'left',
      }}
    >
      <FormGroup row>
        <Col sm={12}>
          <Label htmlFor="taskName" sm={12}>
            Task Name
          </Label>
          <Field
            id="taskName"
            type="text"
            name="taskName"
            component={RenderInput}
            validate={required}
          />
          {' '}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={12}>
          <Label htmlFor="date" sm={12}>
            Create Date
          </Label>
          <Field
            name="date"
            type="date"
            component={RenderInput}
            label="start typing.."
            validate={required}
          />
        </Col>
      </FormGroup>
    </Form>
  </div>
);

CreateTodoForm.propTypes = {
  submitCreateTodo: PropTypes.func,
  handleSubmit: PropTypes.func,
};

CreateTodoForm.defaultProps = {
  submitCreateTodo: () => ({}),
  handleSubmit: () => ({}),
};

export default reduxForm({ form: 'createTodoForm' })(CreateTodoForm);
