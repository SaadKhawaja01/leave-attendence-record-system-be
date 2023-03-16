import { Injectable } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport/dist';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Employee } from 'src/employee/employee.entity';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

// payload
export interface IJwtPayload {
  id: string;
  name: string;
  password: string;
  contact: string;
  departmentId: string;
  salary: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtSecret,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await Employee.findOneBy({ id: payload.id });
    if (!user) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

//guard
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): TUser {
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}

export const JwtSecret =
  'vW0szUyLXZMN03JYOWzdo9Brjxavnl5tmLLLDAWu9ugqfz0Je7756v8Ja0iw3Consdklf';
