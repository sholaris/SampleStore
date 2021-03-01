import React from 'react'
import {Stepper, Step, StepLabel} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
    root:{
        marginBottom: '3rem'
    }
})

const Steps = ({step, labels}) => {
    return (
        <Stepper activeStep={step-1} alternativeLabel className={useStyles().root}>
            {labels.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}

export default Steps
