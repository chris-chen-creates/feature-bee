import { ConnectionConfig } from 'mysql';

const ENV_BASE='FEATURE_BEE';

export interface ProcessEnv {
    [key: string]: string | undefined
}

export default class Config {
    constructor(
        public port: number,
        public db_host: string,
        public db_port: number,
        public db_name: string,
        public db_user: string,
        public db_password: string,
    ) {}

    public dbOptions(): ConnectionConfig {
        return {
            host: this.db_host,
            port: this.db_port,
            database: this.db_name,
            user: this.db_user,
            password: this.db_password,
        }
    }

    static readFromEnvironment(env: ProcessEnv=process.env): Config {
        return new Config(
            parseInt(env[`${ENV_BASE}_PORT`] || '5001'),
            env[`${ENV_BASE}_DB_HOST`] || '0.0.0.0',
            parseInt(env[`${ENV_BASE}_DB_PORT`] || '3306'),
            env[`${ENV_BASE}_DB_NAME`] || 'feature_bee',
            env[`${ENV_BASE}_DB_USER`] || 'root',
            env[`${ENV_BASE}_DB_PASSWORD`] || '',
        );
    }
}
