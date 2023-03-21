import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response = context.getResponse();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number }
      | { error: string; statusCode: 400; message: string[] }; // class-validator 타이핑
    let httpError;
    // console.log(status, err);
    // return response.status(status).json({ message: err });
    if (typeof err !== 'string' && err.statusCode === 400) {
      // class-validator 에러
      return response.status(status).json({
        success: false,
        code: status,
        data: err,
      });
    }

    response.status(status).json({
      success: false,
      code: status,
      data: err,
    });
  }
  // if (exception instanceof HttpException) {
  //   httpError = {
  //     status: exception.getStatus(),
  //     message: exception.message,
  //     validation: exception.getResponse()['validation'],
  //   };
  // } else {
  //   httpError = {
  //     status: 500,
  //     message: '서버 오류입니다.',
  //   };
  // }
  //
  // Logger.error({
  //   ...httpError,
  //   name: exception.name,
  // });
  //
  // const { status, message, validation } = httpError;
  // return response.status(status).json({
  //   status,
  //   message,
  //   validation,
  // });
}
