import env from 'node-env-file';

export interface EnvironmentModel {
    BOT_TOKEN?: string;
}

//load environment file
try {
    env(`${__dirname}/../.env`);
} catch (e) {
    console.log('no environment file found');
}

const environment: EnvironmentModel = {};
try {
    Object.keys(process.env).forEach(key => {
        environment[key] = process.env[key];
    });
} catch (e) {
    console.log(`Environment variables failed to load: ${e}`);
    process.exit(1);
}

export default environment as EnvironmentModel;
