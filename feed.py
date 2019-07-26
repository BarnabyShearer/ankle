#!/usr/bin/env python3

import asyncio
import datetime

import aioamqp
import aiopg


async def send():
    last = datetime.datetime.now() - datetime.timedelta(days=1)
    transport, protocol = await aioamqp.connect()
    channel = await protocol.channel()
    async with aiopg.create_pool("postgres://postgres@localhost/postgres") as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                while True:
                    await cur.execute("SELECT lat, long, time FROM delivery d INNER JOIN postcode p ON d.postcode = p.postcode WHERE d.time > %s ORDER BY time LIMIT 1;", (last,))
                    row = await cur.fetchone()
                    last = row[2]
                    delay = (last - (datetime.datetime.now() - datetime.timedelta(days=1))).total_seconds()
                    print("Waiting", delay)
                    await asyncio.sleep(delay)
                    await channel.basic_publish(
                        payload='{"lat": %s, "long": %s}' % (row[0], row[1]),
                        exchange_name='amq.topic',
                        routing_key='point'
                    )
    await protocol.close()
    transport.close()


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(send())

