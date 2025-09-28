import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const userAgent = req.get('User-Agent') || '';
    const startTime = Date.now();

    console.log(`🚀 [${new Date().toLocaleString()}] ${method} ${originalUrl} - ${userAgent}`);

    // 记录响应时间
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;
      console.log(`✅ [${new Date().toLocaleString()}] ${method} ${originalUrl} ${statusCode} - ${responseTime}ms`);
    });

    next();
  }
}
