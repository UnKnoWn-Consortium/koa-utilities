/**
 * Koa timer middleware factory
 * Koa Utilities
 * Created by Thomas Sham on 20/9/2020.
 */
import { ParameterizedContext, DefaultState, DefaultContext, Next } from "koa";
declare function timer(ctx: ParameterizedContext<DefaultState, DefaultContext, any>, next: Next): Promise<void>;
export default timer;
