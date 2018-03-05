import {Observable} from 'rxjs/Observable';

/**
 * @name JPush
 * @description
 * This plugin does something
 *
 * @usage
 * ```
 * import { JPush } from 'ionic-native';
 *
 * JPush.functionName('Hello', 123)
 *   .then((something: any) => doSomething(something))
 *   .catch((error: any) => console.log(error));
 *
 * ```
 */
export declare class JPush {
  init(): Promise<any>;

  stopPush(): Promise<any>;

  resumePush(): Promise<any>;

  isPushStopped(): Promise<any>;

  getRegistrationID(): Promise<any>;

  setAlias(param: { sequence: number, alias: string }, successFunc?: Function, errorFunc?: Function): Promise<any>;

  deleteAlias(param: { sequence: number }, successFunc?: Function, errorFunc?: Function): Promise<any>;

  setTags(param: { sequence: number, tags: Array<string> }, successFunc?: Function, errorFunc?: Function): Promise<any>;

  addTags(param: { sequence: number, tags: Array<string> }, successFunc?: Function, errorFunc?: Function): Promise<any>;

  deleteTags(param: { sequence: number, tags: Array<string> }, successFunc?: Function, errorFunc?: Function): Promise<any>;

  setBadge(badgeNum?: number): Promise<any>;

  setApplicationIconBadgeNumber(badgeNum?: number): Promise<any>;

  openNotification(): Observable<any>;

  receiveNotification(): Observable<any>;

  receiveMessage(): Observable<any>;

  getUserNotificationSettings(): Promise<any>;

  setDebugModeFromIos(): Promise<any>;

  setDebugMode(isDebug?: boolean): Promise<any>;
}
