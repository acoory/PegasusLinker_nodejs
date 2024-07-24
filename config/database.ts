import { Sequelize } from "sequelize";
import { MySqlDialect } from '@sequelize/mysql';

class Database {
  public sequelize: Sequelize;

  constructor() {
    // @ts-ignore
    this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
    });

    this.connectToDatabase();
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log(
        "Connection to the database has been established successfully.",
      );
    } catch (error) {
      console.log("process.env.DB_HOST", process.env.DB_HOST);
      console.log("process.env.DB_PORT", process.env.DB_PORT);
        console.log("process.env.DB_USER", process.env.DB_USER);
        console.log("process.env.DB_PASS", process.env.DB_PASSWORD);
        console.log("process.env.DB_NAME", process.env.DB_NAME);
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default Database;
