import {defineStore} from 'pinia';
import {toRaw} from "vue";

export const appointmentStore = defineStore('appointmentStore', {
    state: () => ({
        appointment: {}
    }),

    actions: {
        setAppointment(appointment) {
            this.appointment = appointment;
        }
    },

    getters: {
        getAppointment() {
            return toRaw(this.appointment);
        }
    }
})
