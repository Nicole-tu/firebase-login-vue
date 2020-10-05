import format from 'date-fns/format'

const formatDate = (date, formater) => {
  return format(new Date(date), formater)
}

export default {
  methods: {
    formatDate
  }
}
