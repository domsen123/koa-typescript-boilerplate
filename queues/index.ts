import { clog } from '../utils/logger';
import { getConnectionString } from '../db';
import { run as scheduler } from 'graphile-scheduler';
import { makeWorkerUtils, WorkerUtils, run } from 'graphile-worker';

let __workerUtils: WorkerUtils;

export const getWorkerQueue = async (): Promise<WorkerUtils> => {
  if (!__workerUtils) {
    __workerUtils = await makeWorkerUtils({
      connectionString: getConnectionString(),
    });
    try {
      await __workerUtils.migrate();
      const taskDirectory = `${__dirname}/tasks`;

      await createTestJob();
      await run({
        connectionString: getConnectionString(),
        taskDirectory,
      });

      await scheduler({
        connectionString: getConnectionString(),
        schedules: [
          // {
          //   name: 'app-test-job',
          //   pattern: '*/1 * * * *',
          //   timeZone: 'Europe/Berlin',
          // },
        ],
      });
    } catch (error) {
      clog('error', 'Cannot create Queue', error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve(__workerUtils);
};

export const createTestJob = async () => {
  await __workerUtils.addJob(
    'app-test-job',
    { success: 'true' },
    { queueName: 'test-jobs' }
  );
};
