export class Config {

    public start() {

        // Environnement
        process.env.ENV = 'dev'

        // MySQL
        process.env.DB_HOST = '127.0.0.1'
        process.env.DB_USER = 'root'
        process.env.DB_PASSWORD = ''
        process.env.DB_NAME = 'lifeinlife'

        // User

    }

}

export default new Config