import { Connection } from 'mysql2';

export function toObj(rows: any): any {
  return JSON.parse(JSON.stringify(rows));
}

// sometimes javascript makes me really sad
export async function lastInsertId(db: Connection): Promise<number> {
  const result = await db.promise().query('SELECT LAST_INSERT_ID() as id');
  const rows = toObj((result as unknown as any)[0]) as any;
  return rows[0].id;
}
