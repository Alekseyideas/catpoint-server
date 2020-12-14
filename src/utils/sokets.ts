import WebSocket from 'ws';
import { wsAddPoint, wsGetUserCompanies } from '../controllers/CompanyUser';
// import { PORT } from './const';
import { BadRequest } from './CpError';
import { verifyToken } from './getTokenData';

export const wss = new WebSocket.Server({
  port: 8080,
});

console.log(wss.options, 'wss');

const clients: {
  [key: string]: WebSocket;
} = {};

const TSocketTypes = ['error', 'getKey', 'getUserCompanies', 'addPoint'] as const;

export const webSoketConnection = () =>
  wss.on('connection', (ws, req) => {
    const id: string = req.headers['sec-websocket-key'] as string;
    clients[id] = ws;
    console.log('новое соединение ' + id);

    ws.on('message', async (resp) => {
      try {
        const parsedResp: {
          type: typeof TSocketTypes[number];
          data: {
            token: string;
            ids?: number[];
            userId?: number;
            clientId?: string;
            companyId?: number;
          };
        } = JSON.parse(`${resp}`);

        if (!parsedResp) throw new BadRequest('bad data format');
        if (!clients[id]) throw new BadRequest('client does not exist');
        if (!parsedResp.data) throw new BadRequest('not authenticated');
        if (!parsedResp.data.token) throw new BadRequest('not authenticated');

        type TPayloadToken = { id: number; isCompany: boolean };
        const payloadToken: TPayloadToken = verifyToken(parsedResp.data.token) as TPayloadToken;
        console.log(parsedResp.type);
        switch (parsedResp.type) {
          case 'addPoint':
            if (!clients[parsedResp.data?.clientId || ''])
              throw new BadRequest('client does not exist');
            const points = await wsAddPoint(payloadToken.id || 0, parsedResp.data?.userId || 0);
            return sendObj(
              {
                type: 'addPoint',
                data: points,
              },
              parsedResp.data?.clientId || ''
            );
          case 'getUserCompanies':
            const userCompanies = await wsGetUserCompanies(payloadToken.id);
            return sendObj({
              type: 'getUserCompanies',
              data: userCompanies,
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
        console.log(e);
        sendObj({
          type: 'error',
          data: {
            message: e.message,
          },
        });
        ws.close();
      }
      function sendObj(
        obj: { type: typeof TSocketTypes[number]; data: {} | null },
        appId?: string
      ) {
        return clients[appId || id].send(JSON.stringify(obj));
      }
    });

    ws.on('close', function () {
      console.log('соединение закрыто ' + id);
      delete clients[id];
    });
  });
