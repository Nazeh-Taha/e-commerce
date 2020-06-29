import React from 'react';

import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const AlertMessage = ({msg,clear}) =>{

    return(
        <>
{msg.msg &&
<div>
<Alert severity="error"           action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={clear}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
<AlertTitle><strong>{msg.type}</strong></AlertTitle>
{msg.msg}
</Alert>
        </div>
}
        </>
    )
}

export default AlertMessage;