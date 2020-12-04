import WebSocket from 'ws';
import { wsGetUserCompanies } from '../controllers/CompanyUser';
import { BadRequest } from './CpError';
import { verifyToken } from './getTokenData';

export const wss = new WebSocket.Server({
  port: 8011,
});

const clients: {
  [key: string]: WebSocket;
} = {};

const TSocketTypes = ['error', 'getKey', 'getUserCompanies', 'addPoint'] as const;

export const webSoketConnection = () =>
  wss.on('connection', (ws, req) => {
    const id: string = req.headers['sec-websocket-key'] as string;
    clients[id] = ws;
    let count = 0;
    for (const _key in clients) {
      count++;
    }
    console.log('новое соединение ' + id);

    ws.on('message', async (resp) => {
      console.log('🚀 ~ file: sokets.ts ~ line 20 ~ resp', resp);
      try {
        console.log(count, 'count client');

        const parsedResp: {
          type: typeof TSocketTypes[number];
          data: {
            token: string;
            ids?: number[];
          };
        } = JSON.parse(`${resp}`);

        if (!parsedResp) throw new BadRequest('bad data format');
        if (!clients[id]) throw new BadRequest('client does not exist');
        if (!parsedResp.data) throw new BadRequest('not authenticated');
        if (!parsedResp.data.token) throw new BadRequest('not authenticated');

        // verifyToken(parsedResp.data.token);

        switch (parsedResp.type) {
          case 'getUserCompanies':
            const companies = await wsGetUserCompanies(parsedResp.data?.ids || []);
            return sendObj({
              type: 'getUserCompanies',
              data: {
                companies,
              },
            });
          default:
            return sendObj({
              type: 'getKey',
              data: {
                clientId: id,
              },
            });
        }
      } catch (e) {
        sendObj({
          type: 'error',
          data: {
            message: e.message,
          },
        });
        ws.close();
      }
      function sendObj(obj: { type: typeof TSocketTypes[number]; data: {} | null }) {
        return clients[id].send(JSON.stringify(obj));
      }
      // console.log(JSON.parse(`${data}`));

      // console.log('получено сообщение ' + data);
    });

    ws.on('close', function () {
      console.log('соединение закрыто ' + id);
      delete clients[id];
    });
  });
