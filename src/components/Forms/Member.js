import AvatarImageField from 'rmw-shell/lib/components/ReduxFormFields/AvatarImageField'
import Business from '@material-ui/icons/Business'
import Checkbox from 'rmw-shell/lib/components/ReduxFormFields/Checkbox'
import DateField from 'rmw-shell/lib/components/ReduxFormFields/DateField'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import TextField from 'rmw-shell/lib/components/ReduxFormFields/TextField'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { ImageCropDialog } from 'rmw-shell/lib/containers/ImageCropDialog'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

class Form extends Component {
  render() {
    const { handleSubmit, intl, initialized, setDialogIsOpen, dialogs, match } = this.props

    const uid = match.params.uid

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
          <AvatarImageField
            name="photoURL"
            disabled={!initialized}
            uid={uid}
            change={this.props.change}
            initialized={initialized}
            icon={<Business fontSize="large" />}
            intl={intl}
            path={'companies'}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: 15 }}>
              <Field
                name="name"
                variant="outlined"
                disabled={!initialized}
                component={TextField}
                label={intl.formatMessage({ id: 'name_label' })}
              />
              <br />
              <Field
                name="surname"
                variant="outlined"
                disabled={!initialized}
                component={TextField}
                label={intl.formatMessage({ id: 'surname_label' })}
              />
              <br />
              <Field
                name="father_name"
                variant="outlined"
                disabled={!initialized}
                component={TextField}
                label={intl.formatMessage({ id: 'father_name_label' })}
              />

              <br />
              <Field
                name="birthdate"
                variant="outlined"
                label={intl.formatMessage({ id: 'birthdate_label' })}
                disabled={!initialized}
                component={DateField}
              />
              <br />
              <Field
                name="birthplace"
                variant="outlined"
                disabled={!initialized}
                component={TextField}
                label={intl.formatMessage({ id: 'birthplace_label' })}
              />
              <br />
              <Field
                name="birthpland"
                variant="outlined"
                disabled={!initialized}
                component={TextField}
                label={intl.formatMessage({ id: 'birthpland_label' })}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: 15 }}>
              <Field
                name="street"
                variant="outlined"
                disabled={!initialized}
                component={TextField}
                label={intl.formatMessage({ id: 'street_label' })}
              />
              <br />
              <Field
                name="zip"
                variant="outlined"
                disabled={!initialized}
                component={TextField}
                label={intl.formatMessage({ id: 'zip_label' })}
              />
              <br />
              <Field
                name="place"
                variant="outlined"
                disabled={!initialized}
                component={TextField}
                label={intl.formatMessage({ id: 'place_label' })}
              />
              <br />
              <Field
                name="country"
                variant="outlined"
                disabled={!initialized}
                component={TextField}
                label={intl.formatMessage({ id: 'country_label' })}
              />
              <br />
              <Field
                name="phone"
                variant="outlined"
                disabled={!initialized}
                component={TextField}
                label={intl.formatMessage({ id: 'phone_label' })}
              />
              <br />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', margin: 15 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Pick two</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Field name="isStudent" component={Checkbox} />}
                    label={intl.formatMessage({ id: 'isStudent_label' })}
                  />
                  <FormControlLabel
                    control={<Field name="isRetired" component={Checkbox} />}
                    label={intl.formatMessage({ id: 'isRetired_label' })}
                  />
                  <FormControlLabel
                    control={<Field name="isSingleParent" component={Checkbox} />}
                    label={intl.formatMessage({ id: 'isSingleParent_label' })}
                  />
                  <FormControlLabel
                    control={<Field name="isDistanceOver30Km" component={Checkbox} />}
                    label={intl.formatMessage({ id: 'isDistanceOver30Km_label' })}
                  />
                </FormGroup>
              </FormControl>
            </div>
          </div>

          <ImageCropDialog
            path={`members/${uid}`}
            fileName={'photoURL'}
            onUploadSuccess={s => {
              this.handlePhotoUploadSuccess(s)
            }}
            open={dialogs.new_company_photo !== undefined}
            src={dialogs.new_company_photo}
            handleClose={() => {
              setDialogIsOpen('new_member_photo', undefined)
            }}
            title={intl.formatMessage({ id: 'change_photo' })}
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

Form = reduxForm({ form: 'member' })(Form)
const selector = formValueSelector('member')

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
