import Activity from 'rmw-shell/lib/containers/Activity'
import AppBar from '@material-ui/core/AppBar'
import Delete from '@material-ui/icons/Delete'
import Person from '@material-ui/icons/Person'
import Euro from '@material-ui/icons/EuroSymbol'
import DeleteDialog from 'rmw-shell/lib/containers/DeleteDialog'
import FireForm from 'fireform'
import Form from '../../components/Forms/Member'
import GetApp from '@material-ui/icons/GetApp'
import IconButton from '@material-ui/core/IconButton'
import React, { Component } from 'react'
import Save from '@material-ui/icons/Save'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Tooltip from '@material-ui/core/Tooltip'
import isGranted from 'rmw-shell/lib/utils/auth'
import { change, submit, isDirty } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { setSimpleValue } from 'rmw-shell/lib/store/simpleValues/actions'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import Payments from '../../containers/Payments/Payments'
import { getList } from 'firekit'

const name = 'member'
const path = 'members'

class WarehouseTask extends Component {
  componentDidMount() {
    const { watchList } = this.props
    watchList('users')
  }

  handleUserSelected = (e, value) => {
    const { change } = this.props
    const { photoURL } = value ? value : {}

    change(name, 'photoURL', photoURL)
  }

  handleDelete = async handleClose => {
    const { history, match, firebaseApp } = this.props
    const uid = match.params.uid

    if (uid) {
      await firebaseApp
        .database()
        .ref(`/${path}/${uid}`)
        .set(null)
      handleClose()
      history.replace(`/${path}`)
    }
  }

  hanldeSubmitSuccess = () => {
    const { history } = this.props
    history.push('/members')
  }

  handleTabActive = (e, value) => {
    const { history, uid } = this.props

    history.replace(`/members/edit/${uid}/${value}`)
  }

  render() {
    const {
      history,
      setSimpleValue,
      intl,
      submit,
      match,
      isGranted,
      firebaseApp,
      editType,
      isDirty,
      files = []
    } = this.props

    const uid = match.params.uid

    return (
      <Activity
        title={intl.formatMessage({
          id: this.props.match.params.uid ? `edit_${name}` : `create_${name}`
        })}
        appBarContent={
          <div>
            {editType === 'data' && (
              <div style={{ display: 'flex' }}>
                {((uid !== undefined && isGranted(`edit_${name}`)) ||
                  (uid === undefined && isGranted(`create_${name}`))) && (
                  <Tooltip title={intl.formatMessage({ id: 'save' })}>
                    <IconButton
                      color={isDirty ? 'secondary' : 'inherit'}
                      aria-label="save"
                      onClick={() => {
                        submit(name)
                      }}
                    >
                      <Save />
                    </IconButton>
                  </Tooltip>
                )}

                {uid && isGranted(`delete_${name}`) && (
                  <Tooltip title={intl.formatMessage({ id: 'delete' })}>
                    <IconButton
                      color="inherit"
                      aria-label="delete"
                      onClick={() => {
                        setSimpleValue(`delete_${name}`, true)
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            )}

            {editType === 'payments' && uid && isGranted('read_container_task_files') && (
              <Tooltip title={intl.formatMessage({ id: 'download' })}>
                <IconButton disabled={!files.length} color={isDirty ? 'secondary' : 'inherit'} aria-label="import">
                  <GetApp />
                </IconButton>
              </Tooltip>
            )}
          </div>
        }
        onBackClick={() => {
          history.push('/members')
        }}
      >
        <div style={{ height: '100%' }}>
          <AppBar position="static">
            <Tabs value={editType} onChange={this.handleTabActive} fullWidth centered>
              <Tab value="data" icon={<Person />} />
              {isGranted('read_member_payments') && <Tab value="payments" icon={<Euro />} />}
            </Tabs>
          </AppBar>
          {editType === 'data' && (
            <Scrollbar style={{ height: 'calc(100vh - 112px)' }}>
              <FireForm
                firebaseApp={firebaseApp}
                name={name}
                path={`/${path}/`}
                uid={match.params.uid}
                onSubmitSuccess={this.hanldeSubmitSuccess}
                handleUserSelected={this.handleUserSelected}
                {...this.props}
              >
                <Form />
              </FireForm>
            </Scrollbar>
          )}

          {editType === 'payments' && (
            <Scrollbar style={{ height: 'calc(100vh - 112px)' }}>
              <Payments {...this.props} />
            </Scrollbar>
          )}
        </div>
        <DeleteDialog name={name} handleDelete={this.handleDelete} />
      </Activity>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth, intl } = state
  const { match } = ownProps

  const uid = match.params.uid
  const editType = match.params.editType ? match.params.editType : 'data'

  return {
    uid,
    editType,
    auth,
    intl,
    isDirty: isDirty(name)(state),
    users: getList(state, 'users'),
    isGranted: grant => isGranted(state, grant)
  }
}

export default compose(
  connect(
    mapStateToProps,
    { setSimpleValue, change, submit }
  ),
  injectIntl,
  withRouter,
  withFirebase,
  withTheme
)(WarehouseTask)
