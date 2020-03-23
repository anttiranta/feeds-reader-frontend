import { 
    TYPE_ERROR,
    TYPE_NOTICE,
    TYPE_SUCCESS
} from "./Notification"

export function getBootstrapNotificationType(notificationType) {
    switch(notificationType) {
        case TYPE_ERROR:
            return 'danger'
        case TYPE_NOTICE:
            return 'info'
        case TYPE_SUCCESS:
            return 'success'
        default:
            return ""
    }
}