import { Sequelize } from "sequelize";

class Database {
  public sequelize: Sequelize;

  constructor() {
    // @ts-ignore
    this.sequelize = new Sequelize({
      dialect: "mysql",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
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
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default Database;
