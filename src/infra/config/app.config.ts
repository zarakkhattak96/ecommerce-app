import 'dotenv/config';
import env from 'env-var';

const PORT = env.get('PORT').required().asPortNumber();

export default { PORT };
