
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
  await knex.schema.createTable('role', (table) => {
      table.increments('id');
      table.string('name', 10);
      table.timestamps();
  });
  const[,{id}] = await knex('role').insert([{name: 'admin'},{name: 'user'}]).returning('id')
  await knex.schema.createTable('lists', (table) => {
    table
      .increments('id')
      .primary()
      .comment('Идентификатор');
    table
      .string('title', 256)
      .notNullable()
      .comment('Заголовок');
    table
      .string('author', 256)
      .notNullable()
      .comment('Автор');
  table
      .string('responsible', 256)
      .notNullable()
      .comment('Ответственный');
  table
      .string('priority', 256)
      .notNullable()
      .comment('Приоритет');
  table
      .text('description', 256)
      .notNullable()
      .comment('Описание задачи');
    table
      .string('status', 256)
      .notNullable()
      .defaultTo('not_ready')
      .comment('Статус выполнения задачи');
    table
      .timestamp('created_at', {useTz: false})
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment('Дата создания');
    table
      .timestamp('finished_at', {useTz: false})
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment('Дата завершения');
    table
      .timestamp('updated_at', {useTz: false})
      .nullable()
      .comment('Дата обновления');
    table.comment('Список');
  });
  await knex.schema.createTable('users', (table) => {
    table
      .increments('id')
      .primary()
      .comment('Идентификатор');
    table
      .string('login', 256)
      .notNullable()
      .unique()
      .comment('Логин');
    table
      .string('name', 256)
      .notNullable()
      .comment('Имя');
  table
      .string('surname', 256)
      .notNullable()
      .comment('Фамилия');
  table
      .string('patronymic', 256)
      .notNullable()
      .comment('Отчество');
    table
      .string('password', 256)
      .notNullable()
      .comment('Пароль');
   table
      .integer('role_id', 64)
      .comment('Роль')
      .references('id')
      .inTable('role');
    table
      .timestamp('created_at', {useTz: false})
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment('Дата создания');
    table
      .timestamp('updated_at', {useTz: false})
      .nullable()
      .comment('Дата обновления');
    table.comment('Пользователи');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
  await knex.schema.dropTable('role');
  await knex.schema.dropTable('lists');
  await knex.schema.dropTable('users');

  
  

  
  
  
};
