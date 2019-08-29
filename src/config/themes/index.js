import red from '@material-ui/core/colors/red'
import pink from '@material-ui/core/colors/pink'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'

const themes = [
  {
    id: 'default',
    color: green[500],
    source: {
      palette: {
        primary: green,
        secondary: red,
        error: red
      }
    }
  },
  {
    id: 'red',
    color: red[500],
    source: {
      palette: {
        primary: red,
        secondary: pink,
        error: red
      }
    }
  },
  {
    id: 'blue',
    color: blue[500]
  }
]

export default themes
