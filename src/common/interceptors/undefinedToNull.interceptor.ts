import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';

// 관심사의 분리 (미들웨어: A, B, C, D ...)
// 각 라우터 마다
// A -> B -> C -> D

// A -> C -> D

// A -> E -> E -> D -> G

// Z -> A -> X -> D
// 세로로 나오는 중첩된 미들웨어를 제거하기 위해 인터셉터가 등장

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // controller 도달 전 전역 handler
    return next.handle().pipe(
      // data가 controller 에서 return 해주는 영역
      map(data => {
        if (typeof data !== 'undefined') {
          ({ uuid: uuidV4(), data, code: 'SUCCESS' });
        } else {
          ({ uuid: uuidV4(), data: null, code: 'SUCCESS' });
        }
      }),
    );

    // return next.handle().pipe(catchError); // exception filter에서 제어
  }
}
