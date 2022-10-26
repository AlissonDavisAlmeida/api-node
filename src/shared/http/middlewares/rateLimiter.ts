import { Request, Response, NextFunction } from "express"
import * as redis from "redis"
import { RateLimiterRedis } from "rate-limiter-flexible"
import { AppError } from "@shared/http/AppError"


const redisClient = redis.createClient({

    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
    password: process.env.REDIS_PASS,

})


const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 5,
    duration: 1,
})

export default async function rateLimiter(request: Request, response: Response, next: NextFunction) {

    try {

        await limiter.consume(request.ip)

        return next()

    } catch (error) {

        throw new AppError("Too many requests", 429)

    }

}

