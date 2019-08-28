import AltIconAvatar from 'rmw-shell/lib/components/AltIconAvatar'
import Business from '@material-ui/icons/Business'
import Divider from '@material-ui/core/Divider'
import ListActivity from 'rmw-shell/lib/containers/Activities/ListActivity'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import { compose } from 'redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

const Members = props => {
  const renderItem = (key, val) => {
    const { history } = props

    const { name = '', full_name = '' } = val

    return (
      <div key={key}>
        <ListItem onClick={() => history.push(`/members/edit/${key}`)} key={key}>
          <AltIconAvatar alt="member" src={val.photoURL} icon={<Business />} />
          <ListItemText primary={name} secondary={full_name} style={{ minWidth: 120 }} />
        </ListItem>
        <Divider variant="inset" />
      </div>
    )
  }

  const filterFields = [{ name: 'name' }, { name: 'full_name' }]

  return <ListActivity name="members" createGrant="create_member" filterFields={filterFields} renderItem={renderItem} />
}

export default compose(
  injectIntl,
  withRouter,
  withTheme
)(Members)
