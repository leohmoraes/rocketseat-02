// Video 35 17 configurando a fila com redis

import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail]; // Assim como usado nos Models

class Queue {
  constructor() {
    this.queues = {};

    this.init(); // dividir em outro metodo
  } // construct

  init() {
    // pode-se usar o Map ou forEach
    jobs.forEach(({ key, handle }) => {
      // desestruturado
      // this.queues[key] = new Bee(key, {
      //   redis: redisConfig,
      // }), //this

      this.queues[key] = {
        bee: new Bee(key, {
          // objeto: fila
          redis: redisConfig, // grava o trabalho no Redis
        }), // this
        handle, // vem lá do Job, metodo que vai processar
      };
    }); // foreach
  } // init

  /**
   * Adicionar novos trabalhos dentro da fila
   * @param queue a qual fila eu quero adicionar novo trabalho (por enquanto somente a CancellationMail)
   * @param job a tarefa que será adicionada
   * add(CancellationMail, appointment)
   */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  } // add

  /**
   * Metodo para processar a fila, percorre toda a fila de trabalhos
   * executando a tarefa
   */
  processQueue() {
    jobs.forEach(job => {
      // fila, metodo = fila daquele job
      const { bee, handle } = this.queues[job.key];
      bee
        .on('failed', this.handleFailure) // Video 36 18 monitorando falhas na fila
        .process(handle); // processa em tempo real em background
    });
  } // processQueue

  handleFailure(job, err) { // Video 36 18 monitorando falhas na fila
    console.log(`QUEUE ${job.queue.name}: FAILED`, err);
  }
} // class

export default new Queue();
