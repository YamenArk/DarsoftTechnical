import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import e from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JWTAuthGuardUser extends AuthGuard('user-jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Call the super method to authenticate the user and get the doctor object
    const isAuthed = await super.canActivate(context);

    const isObservable = isAuthed instanceof Observable;
    if (isObservable) {
      const isAuthedValue = await isAuthed.toPromise();
      return isAuthedValue;
    }
    const user = request.user.user;
    // Save the doctor object to the request object
    request.userId = user.id;

    return isAuthed;
  }
}


@Injectable()
export class JWTAuthGuardAdmin extends AuthGuard('admin-jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Call the super method to authenticate the user and get the doctor object
    const isAuthed = await super.canActivate(context);
    const isObservable = isAuthed instanceof Observable;
    if (isObservable) {
      const isAuthedValue = await isAuthed.toPromise();
      return isAuthedValue;
    }
    const user = request.user.user;
    // Save the doctor object to the request object
    request.userId = user.id;
    request.isAdmin = user.isAdmin;
    return isAuthed;
  }
}

