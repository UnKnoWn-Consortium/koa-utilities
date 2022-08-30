/**
 * Image Transformer
 * Koa Utilities
 * Created by Thomas Sham on 22/10/2020.
 */
/**
 * const sizes = [320, 480, 800, 1200, 2400]
 */
import sharp from "sharp";
export declare function transformStreamBuilderFactory(sizes?: number[], formats?: [string, any][], options?: any): (sharp.Sharp | (number | sharp.Sharp | any[][])[][])[];
export default transformStreamBuilderFactory;
