const config = require('./../../knexfile');
const knex = require('knex')(config.development)


class dataController {
    async postList(req, res) {
      await knex('lists').insert({
        title: req.body.title,
        author: req.body.author,
        priority: req.body.priority,
        responsible: req.body.responsible,
        description: req.body.description,
        finished_at: req.body.finished_at,
        status: 'not_read'
    })
  }

    async getResponsible(req, res) {
      let result = await knex.distinct('responsible')
        .from('lists')
        res.json(result)
    }

    async getList(req, res) {
      let result = await knex.select('id', 'title', 'author', 'responsible', 'priority', 'responsible', 'description', 'finished_at', 'created_at', 'updated_at', 'status')
        .from('lists')
        res.json(result)
    }

    async updateList(req, res) {
      const timestamp = knex.fn.now();
      await knex('lists')
      .where({ id: req.body.id})
      .update({
          title: req.body.title,
          author: req.body.author,
          priority: req.body.priority,
          responsible: req.body.responsible,
          description: req.body.description,
          finished_at: req.body.dateFinish,
          updated_at: timestamp
      })
    }

    async updateReady(req, res) {
      await knex('lists')
      .where({ id: req.body.id})
      .update({
          status: req.body.status
      })
    }

  }

module.exports = new dataController()
