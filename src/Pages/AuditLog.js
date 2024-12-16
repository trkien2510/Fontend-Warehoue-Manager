import React, { useState, useEffect } from 'react';
import '../Styles/AuditLogStyle.css'
import { getToken } from '../Service/TokenService';
import { getAuditlog } from '../Service/AuditLogService';
import AuditLogItem from '../Components/AuditLogItem';

const AuditLog = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [auditLog, setAuditLog] = useState([]);

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);

        const fetchCategories = async () => {
            try {
                const response = await getAuditlog();
                setAuditLog(response.data);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        fetchCategories();
    }, []);

    const sortedAuditLog = [...auditLog].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <div className='audit_log_container'>
            <div className='audit_log_title'>Lịch sử hoạt động</div>
            <div className="audit_log_list">
                {sortedAuditLog.map(log => (
                    <AuditLogItem
                        key={log.id}
                        action={log.action}
                        timestamp={log.timestamp}
                    />
                ))}
            </div>
        </div>
    );
};

export default AuditLog;