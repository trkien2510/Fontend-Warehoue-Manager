import React from 'react';
import '../Styles/AuditLogItemStyle.css'

const AuditLogItem = ({ action, timestamp }) => {
    return (
        <div className='audit_log_item'>
            <span>Bạn đã <span className='action'>{action}</span></span>
            <br></br>
            <span>Thời gian: <span className='timestamp'>{new Date(timestamp).toLocaleString()}</span></span>
        </div>
    );
};

export default AuditLogItem;