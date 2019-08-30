import PropTypes from 'prop-types'
import React, { Component } from 'react'
import TextField from 'rmw-shell/lib/components/ReduxFormFields/TextField'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import DateField from 'rmw-shell/lib/components/ReduxFormFields/DateField'
import moment from 'moment'

class Form extends Component {
  render() {
    const { handleSubmit, intl, initialized } = this.props

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'strech',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <button type="submit" style={{ display: 'none' }} />

        <div style={{ margin: 15, display: 'flex', flexDirection: 'column' }}>
          <Field
            name="description"
            disabled={!initialized}
            component={TextField}
            variant="outlined"
            label={intl.formatMessage({ id: 'description_label' })}
          />
          <br />
          <Field
            name="amount"
            disabled={!initialized}
            component={TextField}
            type="number"
            variant="outlined"
            label={intl.formatMessage({ id: 'amount_label' })}
          />
          <br />
          <Field
            name="receiver"
            disabled={!initialized}
            component={TextField}
            variant="outlined"
            label={intl.formatMessage({ id: 'receiver_label' })}
          />
          <br />

          <Field
            name="date"
            variant="outlined"
            defaultValue={moment()}
            label={intl.formatMessage({ id: 'date_label' })}
            disabled={!initialized}
            component={DateField}
          />
          <br />

          <Field
            name="comment"
            disabled={!initialized}
            component={TextField}
            multiline
            variant="outlined"
            rows={4}
            label={intl.formatMessage({ id: 'comment_label' })}
          />
        </div>
      </form>
    )
  }
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

Form = reduxForm({ form: 'payment' })(Form)
const selector = formValueSelector('payment')

const mapStateToProps = state => {
  const { intl, vehicleTypes, users, dialogs } = state

  return {
    intl,
    vehicleTypes,
    users,
    dialogs,
    photoURL: selector(state, 'photoURL')
  }
}

export default connect(
  mapStateToProps,
  { setDialogIsOpen }
)(injectIntl(withRouter(withTheme(Form))))
