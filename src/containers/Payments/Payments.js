import Fab from '@material-ui/core/Fab'
import AltIconAvatar from 'rmw-shell/lib/components/AltIconAvatar'
import Divider from '@material-ui/core/Divider'
import Add from '@material-ui/icons/Add'
import EuroSymbol from '@material-ui/icons/EuroSymbol'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React, { Component } from 'react'
import ReactList from 'react-list'
import isGranted from 'rmw-shell/lib/utils/auth'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import { getList } from 'firekit'
import moment from 'moment'

class CompanyKeys extends Component {
  componentDidMount() {
    const { watchList, path } = this.props
    watchList(path)
  }

  componentWillUnmount() {
    const { destroyList, path } = this.props
    destroyList(path)
  }

  handleCreateKey = async () => {
    const { history, memberUid, firebaseApp, auth = {} } = this.props
    const { uid = '', displayName = '' } = auth ? auth : {}

    const snap = await firebaseApp
      .database()
      .ref(`/payments/${memberUid}`)
      .push({ date: moment().format(), author: { uid, displayName }, creationTime: moment().format(), amount: 0 })

    history.push(`/payments/edit/${memberUid}/${snap.key}`)
  }

  renderItem = (i, k) => {
    const { list, memberUid, history } = this.props

    const key = list[i].key
    const val = list[i].val

    const { amount = 0, description = '', comment = '', date = false } = val

    return (
      <div key={i}>
        <ListItem
          key={i}
          onClick={() => {
            history.push(`/payments/edit/${memberUid}/${key}`)
          }}
          id={i}
          button
        >
          <AltIconAvatar alt="payment" icon={<EuroSymbol />} />
          <ListItemText
            primary={`${amount} - ${description}`}
            secondary={`${date ? moment(date).format('DD.MM.YYYY') : ''}  ${comment}`}
          />
        </ListItem>
        <Divider variant="inset" />
      </div>
    )
  }

  render() {
    const { list, isGranted } = this.props

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <List>
          <ReactList itemRenderer={this.renderItem} length={list.length} type="simple" />
        </List>
        {isGranted('create_payment') && (
          <Fab
            onClick={this.handleCreateKey}
            style={{ position: 'fixed', bottom: 15, right: 20, zIndex: 99 }}
            color="secondary"
          >
            <Add />
          </Fab>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { lists, auth } = state
  const { match } = ownProps

  const memberUid = match.params.uid
  const path = `payments/${memberUid}`
  const contacts = lists[path]
  const list = getList(state, path)

  return {
    path,
    auth,
    contacts,
    memberUid,
    list,
    isGranted: grant => isGranted(state, grant)
  }
}

export default connect(mapStateToProps)(injectIntl(withFirebase(withRouter(withTheme(CompanyKeys)))))
