import EditActivity from 'rmw-shell/lib/containers/Activities/EditActivity'
import Form from '../../components/Forms/Payment'
import React from 'react'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'

const name = 'payment'

const Edit = props => {
  const { intl, match } = props
  const validate = values => {
    const errors = {}

    errors.name = !values.name ? intl.formatMessage({ id: 'error_required_field' }) : ''

    return errors
  }

  const path = `/payments/${match.params.memberUid}/`

  const onSubmitSuccess = () => {
    const { history, match } = props

    history.push(`/members/edit/${match.params.memberUid}/payments`)
  }

  return (
    <EditActivity
      name={name}
      path={path}
      fireFormProps={{
        validate,
        onSubmitSuccess
      }}
    >
      <Form {...props} />
    </EditActivity>
  )
}

export default withRouter(injectIntl(Edit))
