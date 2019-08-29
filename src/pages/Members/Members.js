import AltIconAvatar from 'rmw-shell/lib/components/AltIconAvatar'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import ListActivity from 'rmw-shell/lib/containers/Activities/ListActivity'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import { compose } from 'redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import moment from 'moment'

const Members = props => {
  const renderItem = (key, val) => {
    const { history } = props

    const { name = '', surname = '', birthdate = false } = val

    return (
      <div key={key}>
        <ListItem onClick={() => history.push(`/members/edit/${key}`)} key={key}>
          <AltIconAvatar alt="member" src={val.photoURL} icon={<Person />} />
          <ListItemText
            primary={`${name} ${surname}`}
            secondary={birthdate ? moment(birthdate).format('DD.MM.YYYY') : ''}
            style={{ minWidth: 120 }}
          />
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
