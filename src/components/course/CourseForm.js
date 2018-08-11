import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
// import SelectInput from '../common/SelectInput';


class CourseForm extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting, handleSave, handleCancel } = this.props;
    return (
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="container">
          <div className="row col-sm-12">
            <div class="col-sm-6">
              <div className="colum">
                <Field
                  type="text"
                  name="title"
                  label="Title"
                  placeholder="Title of the course"
                  component={FieldInput}
                />

                <Field
                  name="authorId"
                  label="Author"
                  component={FieldInput}
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div className="colum">
                <Field
                  type="text"
                  name="category"
                  label="Category"
                  placeholder="Category of the course"
                  component={FieldInput}
                />

                <Field
                  type="text"
                  name="length"
                  label="Length"
                  placeholder="Lenght of course in minutes or hours"
                  component={FieldInput}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting} className="btn btn-primary"><i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default btn-space">Clear Values</button>
          <button type="button" className="btn btn-default btn-space" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    )
  }
}

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  if (!values.category) {
    errors.category = 'Required';
  }

  if (!values.length) {
    errors.length = 'Required';
  }

  if (!values.authorId) {
    errors.authorId = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'CourseForm',
  validate
})(CourseForm);
