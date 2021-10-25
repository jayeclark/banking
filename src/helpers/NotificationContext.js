import { createContext } from "react";

const NotificationContext = createContext({notification: null, displayNotification: null});

export default NotificationContext;