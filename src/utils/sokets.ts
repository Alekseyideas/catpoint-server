import WebSocket from 'ws';
import { BadRequest } from './CpError';

export const wss = new WebSocket.Server({ port: 8011 });

const clients: {
  [key: string]: WebSocket;
} = {};

const TSocketTypes = ['getKey', 'getCompanies'] as const;

export const webSoketConnection = () =>
  wss.on('connection', (ws, req) => {
    const id: string = req.headers['sec-websocket-key'] as string;
    clients[id] = ws;
    let count = 0;
    for (const _key in clients) {
      count++;
    }
    console.log('новое соединение ' + id);

    ws.on('message', function (resp) {
      console.log('🚀 ~ file: sokets.ts ~ line 20 ~ resp', resp);
      try {
        console.log(count, 'count client');

        const parsedResp: {
          type: typeof TSocketTypes[number];
          data: {} | null;
        } = JSON.parse(`${resp}`);
        if (!parsedResp) throw new BadRequest('bad data format');
        if (!clients[id]) throw new BadRequest('client does not exist');

        switch (parsedResp.type) {
          case TSocketTypes[1]:
            return sendObj({
              type: TSocketTypes[1],
              data: {
                companies: [1, 2, 3, 4, 5],
              },
            });
          default:
            return sendObj({
              type: TSocketTypes[0],
              data: {
                clientId: id,
              },
            });
        }

        function sendObj(obj: { type: typeof TSocketTypes[number]; data: {} | null }) {
          return clients[id].send(JSON.stringify(obj));
        }
        // for (const client of wss.clients) {
        //   client.send(JSON.stringify({ clientIp: id }));
        // }
      } catch (e) {
        console.log(e);
      }
      // console.log(JSON.parse(`${data}`));

      // console.log('получено сообщение ' + data);
    });

    ws.on('close', function () {
      console.log('соединение закрыто ' + id);
      delete clients[id];
    });
  });
