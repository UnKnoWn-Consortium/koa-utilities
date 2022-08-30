/**
 * Koa refresh reminder middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 20/9/2020.
 */
import { Middleware, DefaultState } from "koa";
interface State extends DefaultState {
    user: any;
}
declare function refreshReminderFactory(): Middleware<State>;
export default refreshReminderFactory;
