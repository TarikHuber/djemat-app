/* eslint-disable react/jsx-key */
import React from 'react'
import RestrictedRoute from 'rmw-shell/lib/containers/RestrictedRoute'
import makeLoadable from 'rmw-shell/lib/containers/MyLoadable'

const MyLoadable = (opts, preloadComponents) =>
  makeLoadable({ ...opts, firebase: () => import('./firebase') }, preloadComponents)

const AsyncDashboard = MyLoadable({ loader: () => import('../pages/Dashboard') })
const AsyncAbout = MyLoadable({ loader: () => import('../pages/About') })
const AsyncCompany = MyLoadable({ loader: () => import('../pages/Companies/Company') })
const AsyncCompanies = MyLoadable({ loader: () => import('../pages/Companies/Companies') }, [AsyncCompany])
const AsyncMember = MyLoadable({ loader: () => import('../pages/Members/Member') })
const AsyncMembers = MyLoadable({ loader: () => import('../pages/Members/Members') }, [AsyncMember])
const AsyncTask = MyLoadable({ loader: () => import('../pages/Tasks/Task') })
const AsyncTasks = MyLoadable({ loader: () => import('../pages/Tasks/Tasks') }, [AsyncTask])
const AsyncPayment = MyLoadable({ loader: () => import('../pages/Payments/Payment') })

const routes = [
  <RestrictedRoute type="private" path="/" exact component={AsyncDashboard} />,
  <RestrictedRoute type="private" path="/dashboard" exact component={AsyncDashboard} />,
  <RestrictedRoute type="private" path="/about" exact component={AsyncAbout} />,
  <RestrictedRoute type="private" path="/companies" exact component={AsyncCompanies} />,
  <RestrictedRoute type="private" path="/companies/edit/:uid" exact component={AsyncCompany} />,
  <RestrictedRoute type="private" path="/companies/create" exact component={AsyncCompany} />,
  <RestrictedRoute type="private" path="/members" exact component={AsyncMembers} />,
  <RestrictedRoute type="private" path="/members/edit/:uid/:editType" exact component={AsyncMember} />,
  <RestrictedRoute type="private" path="/members/create" exact component={AsyncMember} />,
  <RestrictedRoute type="private" path="/payments/edit/:memberUid/:uid" exact component={AsyncPayment} />,
  <RestrictedRoute type="private" path="/payments/:memberUid/create" exact component={AsyncPayment} />,
  <RestrictedRoute type="private" path="/tasks" exact component={AsyncTasks} />,
  <RestrictedRoute type="private" path="/tasks/create" exact component={AsyncTask} />,
  <RestrictedRoute type="private" path="/tasks/edit/:uid" exact component={AsyncTask} />
]

export default routes
