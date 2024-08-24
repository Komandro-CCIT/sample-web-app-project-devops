import db from '@adonisjs/lucid/services/db'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {

    let i = 0;
    while (i < 10) {
      await db
        .table('todos')
        .insert({
          "title": `Judul Todo ke-${i}`,
          "description": `Deskripsi Todo ke-${i}`,
          "status": "TODO",
          "created_at": new Date(),
          "updated_at": new Date()
        })
      i++;
    }
  }
}
