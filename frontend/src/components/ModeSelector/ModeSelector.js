import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import InfoIcon from '@material-ui/icons/Info'
import { IconButton, Tooltip } from '@material-ui/core'
import useStyle from './style'

const tooltipTitle = (
  <div style={{ fontSize: '15px', padding: '8px', lineHeight: '15px' }}>
    <div>En mode Asakai, réponds à 10 questions pour connaître ton Alterodo.</div>
    <div style={{ marginTop: '8px' }}> Les réponses ne sont pas enregsitrées.</div>
  </div>
)

const ModeSelector = ({ handleModeChange, handleFilterOptionChange, isAsakaiMode, filterOption }) => {
  const handleSwitch = (event) => {
    handleModeChange(!!event.target.checked)
  }
  const classes = useStyle()

  return (
    <div className={classes.modeSelectorContainer}>
      <div className={classes.selectorWithInfo}>
        <FormControlLabel
          control={
            <Switch
              color="default"
              classes={{ checked: classes.switchChecked, track: classes.switchTrack }}
              checked={isAsakaiMode}
              onChange={handleSwitch}
              value="asakai"
            />
          }
          label="Mode Asakai"
          classes={{ root: classes.switchControl }}
        />
        <Tooltip title={tooltipTitle} enterTouchDelay={0} leaveTouchDelay={3000}>
          <IconButton color="secondary" classes={{ root: classes.infoButton }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default ModeSelector
