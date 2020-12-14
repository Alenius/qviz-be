const { getAnswer } = require('../handlers')

const connectAnswerRoutes = (router) => {
  router.get('/answer', getAnswer)
}

module.exports = { connectAnswerRoutes }
