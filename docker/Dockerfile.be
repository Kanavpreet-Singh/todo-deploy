FROM oven/bun:1

WORKDIR /usr/src/app


COPY ./packages ./packages
COPY ./bun.lock ./bun.lock
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json  
COPY ./apps/backend ./apps/backend


RUN bun install

# Set a dummy DATABASE_URL for Prisma generate
ENV DATABASE_URL="postgresql://neondb_owner:npg_Z4bgySvFpN3i@ep-wispy-band-a88duacl-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
RUN bun run db:generate

EXPOSE 3001
CMD [ "bun","run","start:be" ]