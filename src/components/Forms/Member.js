import Add from '@material-ui/icons/Add'
import AvatarImageField from 'rmw-shell/lib/components/ReduxFormFields/AvatarImageField'
import Business from '@material-ui/icons/Business'
import Delete from '@material-ui/icons/Delete'
import Checkbox from 'rmw-shell/lib/components/ReduxFormFields/Checkbox'
import DateField from 'rmw-shell/lib/components/ReduxFormFields/DateField'
import Fab from '@material-ui/core/Fab'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import IconButton from '@material-ui/core/IconButton'
import React from 'react'
import TextField from 'rmw-shell/lib/components/ReduxFormFields/TextField'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

const renderChild = ({ fields, intl }) => {
  return (
    <div>
      {fields.map((children, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <Field
            style={{ marginBottom: 9 }}
            name={`${children}.fullName`}
            variant="outlined"
            component={TextField}
            label={intl.formatMessage({ id: 'fullName_label' })}
          />
          <IconButton onClick={() => fields.remove(index)}>
            <Delete color="secondary" />
          </IconButton>

          <Field
            name={`${children}.birthday`}
            variant="outlined"
            component={DateField}
            label={intl.formatMessage({ id: 'birthday_label' })}
          />
        </div>
      ))}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Fab size="small" color="secondary" style={{ margin: 5 }} onClick={() => fields.push({})}>
          <Add />
        </Fab>
      </div>
    </div>
  )
}

const renderChildren = injectIntl(renderChild)

const Form = props => {
  const { handleSubmit, intl, initialized, match } = props

  const uid = match.params.uid

  const blockStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: 15,
    minWidth: 280,
    maxWidth: 300
  }

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
          change={props.change}
          initialized={initialized}
          icon={<Business fontSize="large" />}
          intl={intl}
          path={'members'}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
          <div style={blockStyle}>
            <FormLabel component="legend">{intl.formatMessage({ id: 'main_data_label' })}</FormLabel>
            <br />
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
            <br />
            <FormControl component="fieldset">
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
          <div style={blockStyle}>
            <FormLabel component="legend">{intl.formatMessage({ id: 'kontakt_label' })}</FormLabel>
            <br />
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
          <div style={blockStyle}>
            <FormLabel component="legend">{intl.formatMessage({ id: 'family_label' })}</FormLabel>
            <br />
            <Field
              name="partner"
              variant="outlined"
              disabled={!initialized}
              component={TextField}
              label={intl.formatMessage({ id: 'partner_label' })}
            />
            <br />
            <FormLabel component="legend">{intl.formatMessage({ id: 'children_label' })}</FormLabel>
            <br />
            <FieldArray name="children" component={renderChildren} />
          </div>
        </div>
      </div>
    </form>
  )
}

export default injectIntl(withRouter(withTheme(reduxForm({ form: 'member' })(Form))))
