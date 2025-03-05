FROM oven/bun:1 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:1 as production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

RUN bun install --production

ENV NODE_ENV=production

EXPOSE 3000

CMD sh -c 'export $(cat /vault/secrets/env-config | xargs) && bun run start'
