/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.table("users", (table) => {
    table.renameColumn("roleId", "roleid")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.table("users", (table) => {
    table.renameColumn("roleid", "roleId")
  })
}
