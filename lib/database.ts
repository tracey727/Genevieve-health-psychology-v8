import "server-only";

import {
  createClient,
  type Client,
  type InStatement,
  type InValue,
} from "@libsql/client";

export type QueryResult<T> = {
  results: T[];
};

export class PreparedStatement {
  constructor(
    private readonly client: Client,
    private readonly sql: string,
    private readonly args: InValue[] = [],
  ) {}

  bind(...args: InValue[]) {
    return new PreparedStatement(this.client, this.sql, args);
  }

  async first<T = Record<string, unknown>>(): Promise<T | null> {
    const result = await this.client.execute(this.toInStatement());
    return (result.rows[0] as T | undefined) ?? null;
  }

  async all<T = Record<string, unknown>>(): Promise<QueryResult<T>> {
    const result = await this.client.execute(this.toInStatement());
    return { results: result.rows as unknown as T[] };
  }

  async run() {
    const result = await this.client.execute(this.toInStatement());
    return {
      success: true,
      meta: {
        changes: result.rowsAffected,
        lastRowId: result.lastInsertRowid?.toString() ?? null,
      },
    };
  }

  toInStatement(): InStatement {
    return { sql: this.sql, args: this.args };
  }
}

export class GenevieveDatabase {
  constructor(private readonly client: Client) {}

  prepare(sql: string) {
    return new PreparedStatement(this.client, sql);
  }

  async batch(statements: PreparedStatement[]) {
    return this.client.batch(
      statements.map((statement) => statement.toInStatement()),
      "write",
    );
  }
}

type DatabaseGlobal = typeof globalThis & {
  genevieveIreneDatabase?: GenevieveDatabase;
};

function createDatabase() {
  const remoteUrl =
    process.env.TURSO_DATABASE_URL?.trim() ||
    process.env.LIBSQL_DATABASE_URL?.trim();
  const url = remoteUrl
    ? remoteUrl
    : process.env.VERCEL
      ? "file:/tmp/genevieve-irene-demo.db"
      : "file:genevieve-irene-demo.db";

  const client = createClient({
    url,
    authToken:
      process.env.TURSO_AUTH_TOKEN?.trim() ||
      process.env.LIBSQL_AUTH_TOKEN?.trim() ||
      undefined,
  });

  return new GenevieveDatabase(client);
}

const databaseGlobal = globalThis as DatabaseGlobal;

export function db() {
  databaseGlobal.genevieveIreneDatabase ??= createDatabase();
  return databaseGlobal.genevieveIreneDatabase;
}

export function databaseMode() {
  return process.env.TURSO_DATABASE_URL || process.env.LIBSQL_DATABASE_URL
    ? "persistent-turso"
    : "temporary-demo";
}
