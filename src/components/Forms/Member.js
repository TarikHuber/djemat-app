import Add from '@material-ui/icons/Add'
import AltIconAvatar from 'rmw-shell/lib/components/AltIconAvatar'
import AvatarImageField from 'rmw-shell/lib/components/ReduxFormFields/AvatarImageField'
import Business from '@material-ui/icons/Business'
import Checkbox from 'rmw-shell/lib/components/ReduxFormFields/Checkbox'
import DateField from 'rmw-shell/lib/components/ReduxFormFields/DateField'
import Delete from '@material-ui/icons/Delete'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Person from '@material-ui/icons/Person'
import React from 'react'
import TextField from 'rmw-shell/lib/components/ReduxFormFields/TextField'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { VirtualizedSelectField } from 'muishift'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

const renderChild = ({ fields, intl }) => {
  return (
    <div>
      {fields.map((children, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <Field
            style={{ marginBottom: 12 }}
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
            style={{ marginBottom: 9 }}
            label={intl.formatMessage({ id: 'birthday_label' })}
          />
          <Divider />
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
  const { handleSubmit, intl, initialized, match, users, handleUserSelected } = props

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
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
          <div style={blockStyle}>
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
            <br />
            <br />
            <br />
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
          </div>
          <div style={blockStyle}>
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
            <br />
            <div>
              <Field
                name="user"
                rowHeight={54}
                onChange={handleUserSelected}
                component={VirtualizedSelectField}
                variant="outlined"
                items={users.map(snap =>
                  snap && snap.val
                    ? {
                      value: snap.key,
                      label: snap.val.displayName,
                      photoURL: snap.val.photoURL ? snap.val.photoURL : null
                    }
                    : null
                )}
                itemToString={item => (item ? item.label : '')}
                inputProps={{
                  placeholder: intl.formatMessage({ id: 'user_hint' }),
                  label: intl.formatMessage({ id: 'user_label' }),
                  variant: 'outlined',
                  fullWidth: true
                }}
                renderSuggestion={({ rootProps, downshiftProps, suggestion, index }) => {
                  const { getItemProps, highlightedIndex } = downshiftProps
                  const itemProps = getItemProps({ item: suggestion })
                  const isHighlighted = highlightedIndex === index
                  return (
                    <MenuItem {...itemProps} selected={isHighlighted} key={index}>
                      <AltIconAvatar alt="avatar" src={suggestion.photoURL} icon={<Person />} />
                      <ListItemText primary={suggestion.label} />
                    </MenuItem>
                  )
                }}
              />
            </div>
            <br />

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
