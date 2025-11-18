import {authService} from "./authService";
import {w3cwebsocket as W3cwebsocket} from 'websocket'


const baseURL = 'ws://localhost/api'

const socketService = async () => {
    const {data: {token}} = await authService.getSocketToken();
    return {
        diagnostics: () => new W3cwebsocket(`${baseURL}/diagnostics/?token=${token}`),
        bookingDiagnostics: () => new W3cwebsocket(`${baseURL}/booking_diagnostic/?token=${token}`),
        bookingDoctor: () => new W3cwebsocket(`${baseURL}/booking_doctor/?token=${token}`),
        patientCard: () => new W3cwebsocket(`${baseURL}/patient_card/?token=${token}`),
    }
}

export {socketService};