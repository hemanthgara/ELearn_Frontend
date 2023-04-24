import moment from 'moment'

export const date = (date)=>{
    return moment(date).format('DD/MM/YYYY'); 
}