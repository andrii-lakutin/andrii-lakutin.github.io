type SplitStringCallbackFn<ReturnType> = (element: string, index: number, array: string[]) => ReturnType;
export declare function splitString<ReturnType = string>(source: string, splitFunction?: SplitStringCallbackFn<ReturnType>, separator?: RegExp | string): ReturnType[];
export {};
//# sourceMappingURL=split-string.d.ts.map