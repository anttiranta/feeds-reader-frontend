// App imports
import { Type } from "./MessageInterface"

export function getBootstrapNotificationType(
    notificationType: string
):
| 'success'
| 'danger'
| 'info' {
    switch(notificationType) {
        case Type.TYPE_ERROR:
            return 'danger'
        case Type.TYPE_NOTICE:
            return 'info'
        case Type.TYPE_SUCCESS:
            return 'success'
        default:
            throw new Error("Unknown message type given as parameter.")
    }
}