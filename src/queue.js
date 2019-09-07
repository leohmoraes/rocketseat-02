/**
 * Roda individualmente em outros processos
 * // Video 35 17 configurando a fila com redis
 */
import 'dotenv/config';

import Queue from './lib/Queue';

Queue.processQueue();
